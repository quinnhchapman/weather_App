import { Text, View } from "react-native";
import { getWeather, dailyForecast, showWeather, getLocation } from 'react-native-weather-api';

// https://github.com/pierreamgabriel/react-native-weather-api

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Weather App</Text>
    </View>
  );
}
