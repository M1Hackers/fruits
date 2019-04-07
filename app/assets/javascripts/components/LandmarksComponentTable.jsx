class LandmarksComponentTable extends React.Component {
  constructor(props) {
      super(props);
      this.state={places:[]};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({places:nextProps.places});
    console.log(this.state.places);
  }

  render() {
    if (this.state.places.length < 1){
      return "";
    }

    const rows = [];
    this.props.places.forEach((place) => {
      rows.push(
        <LandmarksComponentRow
          place={place}
          key={place.name} />
      );
    });

    return <table className="landmarks-table">
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
}
