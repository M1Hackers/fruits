/* global google */

class LandmarksComponent extends React.Component {
    constructor(props) {
      super(props);
      
      this.places = [];
      this.autocomplete = null;
      this.state = {visits:this.props.visits, places: this.places, inputVal: "" ,displaySearch : false};
      this.setLatLong = this.setLatLong.bind(this);
      this.getPlaces = this.getPlaces.bind(this);
      this.addNewVisitMarker = this.addNewVisitMarker.bind(this);
    }

    componentDidMount() {
      loc = new window.google.maps.LatLng(0,0);
      infowindow = new google.maps.InfoWindow();
      if (this.props.visits.length>0) {
        loc = new window.google.maps.LatLng(this.props.visits[0].latitude,this.props.visits[0].longitude);
      }
      map = new window.google.maps.Map(document.getElementById("map"), {center: loc, zoom: 10});
      this.props.visits.forEach((visit) => {
        this.createMarkerWithLatLon(visit);
      })
    }
    
    setLatLong(newLat, newLong) {
      this.setState({ lat: newLat, long: newLong ,displaySearch:true});
    }
    
    addNewVisitMarker(place){
      newVisits = this.state.visits
      newVisits.push(place)
      this.setState({visits: newVisits})
      this.createMarkerWithLatLon(place);
    }

    createMarkerWithLatLon(place) {
      var marker = new window.google.maps.Marker({
        map: map,
        position: new window.google.maps.LatLng(place.latitude, place.longitude)
      });

      window.google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    createMarker(place) {
      var marker = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location,
        opacity:0.5
      });

      window.google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    getPlaces() {
      loc = new window.google.maps.LatLng(this.state.lat, this.state.long);
      map = new window.google.maps.Map(document.getElementById("map"), {center: loc, zoom: 10});
      autocomplete = new window.google.maps.places.PlacesService(map);
      places_to_display = [];
      var request = {
        location: loc,
        query: this.state.inputVal,
        radius: '500'
      };
  
      autocomplete.textSearch(request, (results, status) => {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((entry) => {
            places_to_display.push(
              { 
                name: entry["name"],
                rating: entry["rating"],
                geometry: entry["geometry"],
                address: entry["formatted_address"]
              }
            );
            this.createMarker(entry);
          });
        }
      
        this.state.visits.forEach((visit) => {
          this.createMarkerWithLatLon(visit);
        });  

      if (places_to_display.length > 0){
        this.setState({places:places_to_display});
      }
    });
      
    }

    render() {
      return<div className="left-panel"><div id="map"></div>
      <DestinationComponent setLatLong={this.setLatLong} />
      { this.state.displaySearch ?  
        <div className="search-container">
          <input id="landmark-search" type="text" placeholder="Search for a landmark.." name="search" value={this.state.inputVal} onChange={evt => this.updateInputValue(evt)}></input>
          {/* <button type="submit" onClick={this.getPlaces}> Search </button> */}
          <i id="search-icon" className="material-icons" onClick={this.getPlaces}>search</i>
        </div>
        : null}
        <LandmarksComponentTable id="table" places={this.state.places} itinerary_id = {this.props.id} markerCallback = {this.addNewVisitMarker}/>
      </div>;
    }
    
    updateInputValue(evt) {
      this.setState({
        inputVal: evt.target.value
      });
    }
}
