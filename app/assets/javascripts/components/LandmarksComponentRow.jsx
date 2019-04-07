class LandmarksComponentRow extends React.Component {
  constructor(props) {
      super(props);
      this.place = this.props.place;
  }
  
  render() {
    addEvent = () => {
      const data = {
        visit: {
          name: this.place.name,
          latitude: this.place.geometry.location.lat(),
          longitude: this.place.geometry.location.lng(),
          rating: this.place.rating,
          day: $("#day-input option:selected").val(),
          start: "2000-01-01T" + $("#start-input").val() + ":00Z",
          end: "2000-01-01T" + $("#end-input").val() + ":00Z",
          itinerary_id: this.props.itinerary_id,
        }
      };

      this.props.markerCallback(data.visit);

      fetch("/visits", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": $('meta[name="csrf-token"]').attr('content')
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      window.sendVisit(data.visit);
    };

    let items = [];
    for (let i = 1; i <= this.props.days; i++) {
        items.push(<option key={i} value={i}>{i}</option>);
    }

    return <tr>
      <td>{this.place.name}</td>
      <td>{this.place.address}</td>
      <td>{this.place.rating}</td>
      <td>
        <select id="day-input">
          {items}
        </select><br/>
        <input id="start-input" type="time" /><br/>
        <input id="end-input" type="time" /><br/>
        <button className="btn btn-success" onClick={addEvent}>Add</button>
      </td>
    </tr>;
  }



  
}
