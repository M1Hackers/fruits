/* global google */

class DestinationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.setLocation = null;
    }

    componentDidMount() {
        this.autocomplete =  new window.google.maps.places.Autocomplete(this.autocompleteInput.current, {
            types: ['(cities)']});

        setLocation = this.props.setLatLong;
        this.autocomplete.addListener('place_changed', () => this.onPlaceChanged(setLocation));
    }

    onPlaceChanged(sf) {
        var place = this.autocomplete.getPlace();
        sf(place.geometry.location.lat(), place.geometry.location.lng());
    }

    render() {
      return <div className="destination">
        <div id="cities" className="search-container">
            <input ref={this.autocompleteInput} id="city-input" placeholder="Enter a city" type="text" />
        </div>
      </div>;
    }
  }

  DestinationComponent.propTypes = {
    setLatLong: PropTypes.func
};