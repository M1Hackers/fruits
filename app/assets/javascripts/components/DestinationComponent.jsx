/* global google */

class DestinationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
    }

    componentDidMount() {
        this.autocomplete =  new window.google.maps.places.Autocomplete(this.autocompleteInput.current, {
            types: ['(cities)']});

        this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    }

    onPlaceChanged() {
        var place = this.getPlace();
        console.log(place);
    }

    render() {
      return <div className="destination">
        <div id="cities" className="search-container">
            <input ref={this.autocompleteInput} id="city-input" placeholder="Enter a city" type="text" />
        </div>
      </div>;
    }
  }

//   DestinationComponent.propTypes = {
//     google: any
// };