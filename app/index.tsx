import { Text, View } from "react-native";
import React, {useState, useEffect} from "react";
import * as Location from 'expo-location';

// https://github.com/pierreamgabriel/react-native-weather-api


export default function Index() {
  const [temperature, setTemp] = useState(0);
  const [city, setCity] = useState(null);
  const [clothing, setClothing] = useState(null);


useEffect(() => {

  Location.requestForegroundPermissionsAsync().then(
      (permission: Location.PermissionResponse) => {
        if (permission.status !== "granted") {
          console.log("Permission denied");
          return;
        }

    Location.getCurrentPositionAsync({}).then(
          (location: Location.LocationObject) => {
            const { latitude, longitude } = location.coords;

            const apiKey = "694a9a1429a0eb720906af6a6c3661b1";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;


            
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                setTemp(data.main.temp);
                
              });
          }
        );
      }
    );
  }, []);


    



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Current Temperature: {temperature} </Text>
      <Text>You should grab a {clothing} today!</Text>
    </View>
  );
}
