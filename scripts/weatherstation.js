/*************************************************************************
 * File: weatherstation.js
 * This file defines a React component that implements the Weather
 * Station app developed in Chapter 10.
 ************************************************************************/

/*************************************************************************
 * @class WeatherStation 
 * @Desc 
 * This React component uses the OpenWeatherMap API to render the weather
 * conditions at a given latitude and longitude.
 *************************************************************************/
 class WeatherStation extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {latitude: this.props.latitude,
                    longitude: this.props.longitude
                   };
    }

    componentDidMount = () => {
        this.getCurrentObservations();
    }

    toggleUnits = () => {
        if (this.state.tempUnit == "F") {
            this.setState({tempUnit: "C", temp: Math.round((this.state.temp - 32) * 5/9)});
        } else {
            this.setState({tempUnit: "F", temp: Math.round((this.state.temp * 9/5) + 32)});
        }
    }
    
    //National Weather service API
    // getCurrentObservations = async() => {
    //     const response = await fetch('https://api.weather.gov/points/' +               
    //     this.state.latitude + ',' +
    //     this.state.longitude);
    //     console.log(this.state.latitude);
    //     console.log(this.state.longitude);
    //     const currWeather = await response.json();
    //     console.log(currWeather);
    
    //     // this.setState({place: currWeather.name,
    //     //     retrieved: (new Date()).toLocaleDateString() + " at " + 
    //     //        (new Date()).toLocaleTimeString(),
    //     //     conditions: currWeather.weather[0].main,
    //     //     visibility: currWeather.weather.visibility,
    //     //     visibilityUnit: "Meters",
    //     //     temp: Math.round(currWeather.main.temp - 273.15),
    //     //     tempUnit: "C",
    //     //     humidity: currWeather.main.humidity,
    //     //     visibility: currWeather.visibility,
    //     //     wind: currWeather.wind.speed,
    //     //     windUnit: "Meters/sec",
    //     //     windDirection: currWeather.wind.deg,
    //     //     windDirectionUnit: "Degrees"
    //     // });
    // }

    //OpenWeatherMap API
    getCurrentObservations = async() => {
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' +               
          this.state.latitude + '&lon=' +
          this.state.longitude + '&appid=98cb8d2538da248784d8e1c1f9332ea9');
        const currWeather = await response.json();
        console.log(currWeather);
        this.setState({place: currWeather.name,
            retrieved: (new Date()).toLocaleDateString() + " at " + 
               (new Date()).toLocaleTimeString(),
            conditions: currWeather.weather[0].main,
            visibility: currWeather.weather.visibility,
            visibilityUnit: "Meters",
            temp: Math.round(currWeather.main.temp - 273.15),
            tempUnit: "C",
            humidity: currWeather.main.humidity,
            visibility: currWeather.visibility,
            wind: currWeather.wind.speed,
            windUnit: "Meters/sec",
            windDirection: currWeather.wind.deg,
            windDirectionUnit: "Degrees"
        });
    }

   render() {
        return (
        <section className="jumbotron ws-centered ws-padding">
            <h1>Weather Conditions at {this.state.place}</h1>
                <p><i>Last updated: {this.state.retrieved}</i></p>
                <p>Conditions: {this.state.conditions}</p>
                <p>Visibility: {this.state.visibility + " " + this.state.visibilityUnit}</p>
                <p>Temp: {this.state.temp}&deg;&nbsp;{this.state.tempUnit}</p>
                <p>Humidity: {this.state.humidity}%</p>
                <p>Wind Speed: {this.state.wind + " " + this.state.windUnit}</p>
                <p>Wind Direction: {this.state.windDirection + " " + 
                    this.state.windDirectionUnit}</p>
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" 
                       id={"switch-" + this.props.stationId} onClick={this.toggleUnits} />
                <label className="custom-control-label" 
                    htmlFor={"switch-" + this.props.stationId}>&nbsp;&deg;{this.state.tempUnit}</label>
            </div>
        </section>
        );
    }

}
