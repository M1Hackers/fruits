/* global google */

class LandmarksComponent extends React.Component {
    constructor(props) {
      super(props);

      this.places = [ {name: 'Place1', details: 'something'} ];
      this.autocomplete = null;
      this.state = { lat: 0, long: 0 };
      this.setLatLong = this.setLatLong.bind(this);
      this.getPlaces = this.getPlaces.bind(this);
    }

    // componentWillMount() {


    // }
    
    setLatLong(newLat, newLong) {
      this.setState({ lat: newLat, long: newLong });
    }

    getPlaces() {
      var loc = new window.google.maps.LatLng(this.state.lat, this.state.long);
      map = new window.google.maps.Map(document.getElementById("map"), {center: loc, zoom: 15});
      // console.log(this.state);
      autocomplete = new window.google.maps.places.PlacesService(map);
      places_to_display = [];
      var request = {
        query: 'Old State House',
        fields: ['name','rating','geometry'],
      };
  
      autocomplete.findPlaceFromQuery(request, function(results, status) {
        console.log(results);
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
        this.places = places_to_display;
        document.getElementById("table").forceUpdate();
      });
    }

    render() {
      return <div className="panel"><div id="map"></div>
      <DestinationComponent setLatLong={this.setLatLong} />
        <div className="search-container">
          <input type="text" placeholder="Search for a landmark.." name="search"></input>
          <button type="submit" onClick={this.getPlaces}> Search </button>
        </div>
        <h1>Hello, Landmarks</h1>
        <LandmarksComponentTable id="table" places={this.places}/>
      </div>;
    }
}
