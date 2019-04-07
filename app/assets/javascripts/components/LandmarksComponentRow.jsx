class LandmarksComponentRow extends React.Component {
  constructor(props) {
      super(props);
  }
  
  render() {
    const place = this.props.place;

    return <tr>
      <td>{place.name}</td>
      <td>{place.address}</td>
      <td>{place.rating}</td>
      <button class="btn btn-success"> Add </button>
    </tr>;
  
  }
}