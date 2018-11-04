import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Weather from './Components/Weather';

import { API_KEY } from './Utils/WeatherApi';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.latitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Conditions'
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch
    (
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main,
        isLoading: false
      });
    })  
  }

  render() {
    const {isLoading, weatherCondition, temperature} = this.state;

    return (
      <View style={styles.container}>
        {
          isLoading ? (
            <Text>Fetching Data, Please Wait</Text>
          ) : (
            <Weather weather={weatherCondition} temperature={temperature} />
          )}
      </View>
    );
  }
}

// Create an instance from Stylesheet class and create new object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
