class LandmarksComponentTable extends React.Component {
  constructor(props) {
      super(props);
      this.state={places:[]};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({places:nextProps.places});
  }

  render() {
    const rows = [];
    this.props.places.forEach((place) => {
      rows.push(
        <LandmarksComponentRow
          place={place}
          key={place.name} />
      );
    });

    return <table>
      <thead>
        <tr>
          <th>Name</th>
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
