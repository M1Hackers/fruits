class ItineraryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: null,
      start: null,
      end: null,
      visits: [],
    };
  }

  componentDidMount() {
    fetch('/itineraries/' + this.props.id + '.json')
      .then((response) => {
        return response.json();
      })
      .then((content) => {
        this.setState({
          name: content.name,
          start: new Date(content.start),
          end: new Date(content.end),
          visits: content.visits.map((visit) => {
            visit.start = new Date(visit.start);
            visit.end = new Date(visit.end);
            return visit;
          }),
        });
      });
  }

  render() {
    n = Math.ceil((this.state.end - this.state.start)/1000/60/60/24);
    const gridStyle = {
      gridTemplateColumns: 'repeat(' + n + ', [col] minmax(0, ' + 100/n + 'fr))',
      gridTemplateRows: 'repeat(' + 24 + ', [row] minmax(0, ' + 100/24 + 'fr))',
    };
    return (
      <div className="panel" id="itinerary">
      <div className="topbar">
        <span>Your Itinerary</span>
        <div className="swap">
          <div className="box btn btn-success">Itinerary</div>
          <div className="box btn btn-success">Map</div>
        </div></div>
        <div className="grid" style={gridStyle}>
          {this.state.visits.map(visit => {
            relative_start_day = (visit.start - this.state.start)/1000/60/60/24;
            day = Math.floor(relative_start_day);
            start_hr = (relative_start_day - day) * 24;
            console.log(start_hr);
            duration = Math.max(Math.floor((visit.end - visit.start)/1000/60/60), 1);
            console.log(duration);
            const cellStyle = {
              gridColumn: 'col ' + (day + 1) + ' / span 1',
              gridRow: 'row ' + (start_hr + 1) + ' / span ' + duration + '',
              backgroundColor: 'orange',
            }
            return (
              <div key={visit.id} className="item" style={cellStyle}>
                <p>{visit.name}</p>
                <p>{visit.latitude}', {visit.longitude}'</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
