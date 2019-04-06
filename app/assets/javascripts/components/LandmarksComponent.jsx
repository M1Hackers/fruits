class LandmarksComponent extends React.Component {
    render() {
      return <div className="panel">
        <div className="search-container">
          <input type="text" placeholder="Search.." name="search"></input>
          <button type="submit">Search</button>
        </div>
        <h1>Hello, Landmarks</h1>
      </div>;
    }
  }