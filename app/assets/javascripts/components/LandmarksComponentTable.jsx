class LandmarksComponentTable extends React.Component {
  constructor(props) {
      super(props);
      this.state={places:[]};
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
    var id = 0;
    this.props.places.forEach((place) => {
      rows.push(
        <LandmarksComponentRow
          place={place}
          key={id} 
          thing = {id}
          itinerary_id = {this.props.itinerary_id} />
      );
      id += 1;
    });

    // console.log("id, ", id);
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
  itinerary_id: PropTypes.number
}
