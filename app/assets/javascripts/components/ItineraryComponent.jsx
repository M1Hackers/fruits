class ItineraryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: '',
      start: new Date("2019-01-01T00:00:00.000Z"),
      end: new Date("2019-01-07T00:00:00.000Z"),
      visits: [
        {
          id: 1,
          name: 'Place1',
          latitude: 40.6,
          longitude: -55.5,
          rating: 5.0,
          start: new Date("2019-01-01T08:00:00.000Z"),
          end: new Date("2019-01-01T09:00:00.000Z"),
        },
      ],
    };
  }

  render() {
    n = Math.ceil((this.state.end - this.state.start)/1000/60/60/24);
    const gridStyle = {
      width: '100%',
      height: '600px',
      gridTemplateColumns: 'repeat(' + n + ', ' + 100/n + 'fr [col])',
      gridTemplateRows: 'repeat(' + 24 + ', ' + 100/24 + 'fr [row])',
    };
    return (
      <div className="panel">
        <h1>Your Itinerary</h1>
        <div className="itin-grid" style={gridStyle}>
          {this.state.visits.map(visit => {
            relative_start_day = (visit.start - this.state.start)/1000/60/60/24;
            day = Math.floor(relative_start_day);
            start_hr = (relative_start_day - day) * 24;
            duration = Math.floor((visit.end - visit.start)/1000/60/60);
            console.log(duration);
            const cellStyle = {
              gridColumn: 'col ' + day + ' / span 1',
              gridRow: 'row ' + start_hr + ' / span ' + duration + '',
              backgroundColor: 'orange',
            }
            return (
              <div key={visit.id} style={cellStyle}>
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
