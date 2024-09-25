import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Animated } from 'react-native';
import Cloud from './Cloud'; // Import the Cloud component

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'e27313d4934d761fb58158ed60c0b356';

  // Cloud animations
  const cloudAnimation1 = new Animated.Value(-200); // Start off-screen
  const cloudAnimation2 = new Animated.Value(-200); // Second cloud

  useEffect(() => {
    const animateClouds = () => {
      // First cloud animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudAnimation1, {
            toValue: 400, // Move to the right
            duration: 35000, // Duration of the animation
            useNativeDriver: true,
          }),
          Animated.timing(cloudAnimation1, {
            toValue: -200, // Reset to off-screen
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      // Second cloud animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudAnimation2, {
            toValue: 400, // Move to the right
            duration: 15000, // Duration of the animation
            useNativeDriver: true,
          }),
          Animated.timing(cloudAnimation2, {
            toValue: -200, // Reset to off-screen
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateClouds();
  }, []); // Empty dependency array to run only once on mount

  const fetchWeather = () => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    axios.get(API_URL)
      .then(response => {
        setWeather(response.data);
        setError(null);
      })
      .catch(err => {
        setError('City not found or API error');
        setWeather(null);
      });
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpg')} // Ensure this path is correct
      style={styles.background}
    >
      <Cloud translateX={cloudAnimation1} />
      <Cloud translateX={cloudAnimation2} /> {/* Uncomment this line to use the second cloud */}
      <View style={styles.container}>
        <TextInput
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <Button title="Get Weather" onPress={fetchWeather} />
        
        {weather && (
          <View style={styles.weatherCard}>
            <Text style={styles.cityName}>{weather.name}</Text>
            <Text style={styles.temperature}>{weather.main.temp} °C</Text>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
          </View>
        )}
        
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  temperature: {
    fontSize: 48,
    fontWeight: '300',
    color: '#fff',
  },
  description: {
    fontSize: 18,
    color: '#d3d3d3',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});

export default App;
