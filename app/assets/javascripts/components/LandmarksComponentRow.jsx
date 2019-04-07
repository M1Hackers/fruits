class LandmarksComponentRow extends React.Component {
  constructor(props) {
      super(props);
      this.id = 0;
      this.place = this.props.place; 
      this.start = 0;
      this.end = 0;
  }
  
  render() {
    this.id = this.props.thing;

    getEventInfo = () => {
      const data = {
        visit: {
          name: this.place.name,
          latitude: this.place.geometry.location.lat(),
          longitude: this.place.geometry.location.lng(),
          rating: this.place.rating,
          date: $("#date-input").val(),
          start: $("#start-input").val(),
          end: $("#end-input").val(),
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

    return <tr>
      <td>{this.place.name}</td>
      <td>{this.place.address}</td>
      <td>{this.place.rating}</td>
      <td><input id="date-input" type="date" /><br/>
      <input id="start-input" type="time" /><br/>
      <input id="end-input" type="time" /><br/>
      <button class="btn btn-success" onClick={getEventInfo}>Add</button></td>
    </tr>;
  }



  
}