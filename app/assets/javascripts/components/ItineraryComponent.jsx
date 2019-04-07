class ItineraryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      start: new Date(props.start),
      end: new Date(props.end),
      visits: props.visits.map((visit) => {
        visit.start = new Date(visit.start);
        visit.end = new Date(visit.end);
        return visit;
      }),
    };
    this.setIt = this.setIt.bind(this);
    this.setMap = this.setMap.bind(this);
  }

  setIt() {
    document.getElementById("map").style.display="none";
  }

  setMap() {
    document.getElementById("map").style.display="inline";
  }

  render() {
    n = Math.ceil((this.state.end - this.state.start)/1000/60/60/24);
    const gridStyle = {
      gridTemplateColumns: 'repeat(' + n + ', [col] minmax(0, ' + 100/n + 'fr))',
      gridTemplateRows: 'repeat(' + 24 + ', [row] minmax(0, ' + 100/24 + 'fr))',
    };
    console.log("rerender");
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
        <div className="grid" style={gridStyle}>
          {this.state.visits.map(visit => {
            relative_start_day = (visit.start - this.state.start)/1000/60/60/24;
            day = Math.floor(relative_start_day);
            start_hr = Math.round((relative_start_day - day) * 24);
            duration = Math.max(Math.floor((visit.end - visit.start)/1000/60/60), 1);
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
      </div>
    );
  }
}
