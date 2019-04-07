class LandmarksComponentTable extends React.Component {
  constructor(props) {
      super(props);
      this.state={places:[]};
      this.id = 0;

  }

  componentWillReceiveProps(nextProps) {
    this.setState({places:nextProps.places});
  }

  render() {
    if (this.state.places.length < 1){
      return "";
    }
    $("#table1 > tr").remove();
    const rows = [];
    this.props.places.forEach((place) => {
      rows.push(
        <LandmarksComponentRow
          place={place}
          key={this.id}
          itinerary_id={this.props.itinerary_id}
          days={this.props.days}
          markerCallback = {this.props.markerCallback}/>
      );
      this.id += 1;
    });

    return <table id="table1" className="landmarks-table">
      <thead className="header">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>;
  }
}

LandmarksComponentTable.propTypes = {
  places: PropTypes.array,
  thing: PropTypes.number,
  itinerary_id: PropTypes.number,
  days: PropTypes.number,
  markerCallback: PropTypes.func,
}
