class LandmarksComponentRow extends React.Component {
  constructor(props) {
      super(props);
  }
  
  render() {
    const place = this.props.place;

    return <tr>
      <td>{place.name}</td>
      <td>{place.rating}</td>
    </tr>;
  
  }
}