/* global google */

class LandmarksComponent extends React.Component {
    constructor(props) {
      super(props);
      this.places = [ {name: 'Place1', details: 'something'} ];
    }

    render() {
      return <div className="panel">
      <DestinationComponent />
        <div className="search-container">
          <input type="text" placeholder="Search.." name="search"></input>
          <button type="submit">Search</button>
        </div>
        <h1>Hello, Landmarks</h1>
        <LandmarksComponentTable places={this.places} />
      </div>;
    }
  }

  // LandmarksComponent.propTypes = {
  //     google: any
  // };