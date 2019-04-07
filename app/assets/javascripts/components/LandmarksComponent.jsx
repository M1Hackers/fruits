/* global google */

class LandmarksComponent extends React.Component {
    constructor(props) {
      super(props);
      this.places = [ {name: 'Place1', details: 'something'} ];
      this.state = { lat: 0, long: 0 };
    }
    
    setLatLong(newLat, newLong) {
      this.setState({ lat: newLat, long: newLong });
    }

    render() {
      return <div className="panel">
      <DestinationComponent setLatLong={this.setLatLong} />
        <div className="search-container">
          <input type="text" placeholder="Search.." name="search"></input>
          <button type="submit">Search</button>
        </div>
        <h1>Hello, Landmarks</h1>
        <LandmarksComponentTable places={this.places} lat={this.state.lat} long={this.state.long} />
      </div>;
    }
  }

  // LandmarksComponent.propTypes = {
  //     google: any
  // };