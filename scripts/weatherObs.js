class WeatherObs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stations: [],
                      stationCount: 0};
      }

      getLocSuccess = (position) =>  {
        this.setState({stations: [{lat: position.coords.latitude, 
                                   lon: position.coords.longitude, 
                                   stationId: this.state.stationCount+1}],
                                   stationCount: this.state.stationCount + 1});
    }
    
    getLocError = (err) => {
        this.setState({stations: [{lat: 47.61, 
                                   lon: -122.33, 
                                   stationId: this.state.stationCount+1}],
                                   stationCount: this.state.stationCount + 1});
    }
    

    addStation = async() => {
        const newStation = prompt("Enter a City, State, and Country:");
        if (newStation != null) { //Need to see if we can find the station through the API 
          const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
              newStation +  '&appid=98cb8d2538da248784d8e1c1f9332ea9');
          const stationData = await response.json();
          //See if the requested station exists
          if (stationData != null && stationData.hasOwnProperty('coord')) { 
            //Push new station into stations list and update state
            let newStations = [...this.state.stations];
            newStations.push({lat: stationData.coord.lat, 
                    lon: stationData.coord.lon, 
                    stationId: this.state.stationCount + 1});
            this.setState({stations: newStations,
                stationCount: this.state.stationCount + 1});
          } else { 
              alert("Sorry, that weather location could not be found.");
          }
       }
    }
    
    componentDidMount = () => {
        //Initialize based on user's current location, if possible
        navigator.geolocation.getCurrentPosition(this.getLocSuccess,this.getLocError);
    }

    render() {
        if (this.state.stations.length != 0) {
            let rows = [];
            for (let i = 0; i < this.state.stations.length; ++i) {
                rows.push(<WeatherStation key={this.state.stations[i].stationId} 
                  latitude={this.state.stations[i].lat} 
                  longitude={this.state.stations[i].lon}
                  stationId={this.state.stations[i].stationId} />);
            }
           return (<main>
                    <div id="weatherStations">
                        {rows}
                    </div>
                    <button className="float" id="addStationBtn" onClick={this.addStation}>
                        <span className="float-btn-icon fa fa-plus" id="floatBtnIcon"></span>
                    </button>
                  </main> );
        } else {
            return null;
        }
    }
}


ReactDOM.render(
    <WeatherObs/>,
    document.getElementById('root')
);