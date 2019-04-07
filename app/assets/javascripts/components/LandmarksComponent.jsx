/* global google */

class LandmarksComponent extends React.Component {
    constructor(props) {
      super(props);

      this.places = [ {name: 'Place1', details: 'something'} ];
      this.autocomplete = null;
      this.state = { lat: 0, long: 0 };
    }

    componentWillMount() {
      let map = new google.maps.Map(document.createElement('div'));
      this.autocomplete = new window.google.maps.places.PlacesService(map)

    }
    
    setLatLong(newLat, newLong) {
      this.setState({ lat: newLat, long: newLong });
    }

    render() {
      while (this.autocomplete == null) {
        <div />
      }
      return <div className="panel">
      <DestinationComponent setLatLong={this.setLatLong} />
        <div className="search-container">
          <input type="text" placeholder="Search for a landmark.." name="search"></input>
          <button type="submit" onClick={this.getPlaces()}> Search </button>
        </div>
        <h1>Hello, Landmarks</h1>
        <LandmarksComponentTable places={this.places} lat={this.state.lat} long={this.state.long} />
      </div>;
    }

  getPlaces() {
    if (this.autocomplete == null) {
      console.log("in here")
      return [];
    }
    console.log("out here")
    console.log(this.autocomplete)

    places_to_display = [];
    var request = {
      query: 'Dunkin',
      fields: ['name','rating','geometry']
    };

    this.autocomplete.findPlaceFromQuery(request, function(results, status) {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((entry) => {
          places_to_display.push(
            { 
              name: entry[name],
              details: entry[rating],
              // details: entry[vicinity],
              rating: entry[rating],
              geometry: entry[geometry]
            }
          );
        });
      }
      console.log(places_to_display);
    });
  }

}

    // URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + '&keyword=dunkin&location=43.704587,-72.294892&radius=1000'
    
    // jQuery.get(URL, function(landmark_json) {
    //     landmark_json[results].forEach((entry) => {
    //       places_to_display.push(
    //         { 
    //           name: entry[name],
    //           details: entry[vicinity],
    //           rating: entry[rating],
    //           geometry: entry[geometry]
    //         }
    //       );
    //     });
    // });
  

  // LandmarksComponent.propTypes = {
  //     google: any
  // };