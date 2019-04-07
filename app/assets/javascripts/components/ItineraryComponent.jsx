class ItineraryComponent extends React.Component {
  constructor(props) {
    super(props);
    self.max_visit_id = 0
    convertVisit = (visit) => {
      visit.id = self.max_visit_id;
      self.max_visit_id += 1;
      visit.day = parseInt(visit.day);
      visit.start = new Date(visit.start);
      visit.end = new Date(visit.end);
      return visit;
    }
    this.state = {
      name: props.name,
      start: new Date(props.start),
      end: new Date(props.end),
      visits: props.visits.map(convertVisit),
    };
    this.setIt = this.setIt.bind(this);
    this.setMap = this.setMap.bind(this);

    window.sendVisit = (visit) => {
      newVisits = this.state.visits;
      newVisits.push(convertVisit(visit));
      this.setState({visits: newVisits});
    };
  }

  setIt() {
    document.getElementById("map").style.display="none";
    document.getElementById("itinerary-grid").style.display="grid";
  }

  setMap() {
    document.getElementById("map").style.display="inline";
    document.getElementById("itinerary-grid").style.display="none";
  }

  render() {
    n = Math.ceil((this.state.end - this.state.start)/1000/60/60/24);
    const gridStyle = {
      gridTemplateColumns: 'repeat(' + n + ', [col] minmax(0, ' + 100/n + 'fr))',
      gridTemplateRows: 'repeat(' + 24 + ', [row] minmax(0, ' + 100/24 + 'fr))',
    };
    return (
      <div>
        <div className="topbar">
          <span>{this.state.name}</span>
          <div className="swap">
            <div className="box btn btn-success" onClick={this.setIt}>Itinerary</div>
            <div className="box btn btn-success" onClick={this.setMap}>Map</div>
          </div>
        </div>
        <div className="right-panel">
        <div id="itinerary-grid" className="grid" style={gridStyle}>
          {this.state.visits.map(visit => {
            duration = Math.max(Math.floor((visit.end - visit.start)/1000/60/60), 1);
            const cellStyle = {
              gridColumn: 'col ' + visit.day + ' / span 1',
              gridRow: 'row ' + (visit.start.getUTCHours() + 1) + ' / span ' + duration + '',
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
      </div>
    );
  }
}
