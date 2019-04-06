/* global google */
/* eslint-disable no-undef */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
}
  // componentDidMount(){
  //   console.log(window);

  // }

    render() {
      return <div className="container">
          <LandmarksComponent />
          <ItineraryComponent />
      </div>
    }
  }