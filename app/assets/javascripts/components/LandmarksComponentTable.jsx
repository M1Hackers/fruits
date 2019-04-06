class LandmarksComponentTable extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    const rows = [];
    console.log(this.props)
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
          <th>Details</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>;
  

  }
}

LandmarksComponentTable.propTypes = {
  places: PropTypes.array
}
