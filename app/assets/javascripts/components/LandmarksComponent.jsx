/* global google */

class LandmarksComponent extends React.Component {
    constructor(props) {
      super(props);

      this.places = [ {name: 'Place1', details: 'something'} ];
      this.autocomplete = null;
      this.state = { places: this.places, inputVal: "" };
      this.setLatLong = this.setLatLong.bind(this);
      this.getPlaces = this.getPlaces.bind(this);
    }
    
    setLatLong(newLat, newLong) {
      this.setState({ lat: newLat, long: newLong });
    }

    getPlaces() {
      var loc = new window.google.maps.LatLng(this.state.lat, this.state.long);
      map = new window.google.maps.Map(document.getElementById("map"), {center: loc, zoom: 10});
      autocomplete = new window.google.maps.places.PlacesService(map);
      places_to_display = [];
      var request = {
        query: this.state.inputVal,
        fields: ['name','rating','geometry'],
      };
  
      autocomplete.findPlaceFromQuery(request, (results, status) => {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((entry) => {
            places_to_display.push(
              { 
                name: entry["name"],
                rating: entry["rating"],
                geometry: entry["geometry"]
              }
            );
          });
        }

      if (places_to_display.length > 0){
        this.setState({places:places_to_display});
      }
    });
      
    }

    render() {
      return <div className="panel"><div id="map"></div>
      <DestinationComponent setLatLong={this.setLatLong} />
        <div className="search-container">
          <input type="text" placeholder="Search for a landmark.." name="search" value={this.state.inputVal} onChange={evt => this.updateInputValue(evt)}></input>
          <button type="submit" onClick={this.getPlaces}> Search </button>
        </div>
        <h1>Hello, Landmarks</h1>
        <LandmarksComponentTable id="table" places={this.state.places}/>
      </div>;
    }
    
    updateInputValue(evt) {
      this.setState({
        inputVal: evt.target.value
      });
    }
}
