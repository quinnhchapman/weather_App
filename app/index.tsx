import { Text, View } from "react-native";
import React, {useState, useEffect} from "react";
import * as Location from 'expo-location';

// https://github.com/pierreamgabriel/react-native-weather-api


export default function Index() {

  // Weather Constants
  const [temperature, setTemp] = useState(0);
  const [city, setCity] = useState(null);
  const [clothing, setClothing] = useState(null);

  // Time Constants
  const [weekday, setWeekday] =  useState("null");
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState("null");

  const date = new Date();

// getSuffix Function
  // This ensures the number day has the right suffix (ex; 3rd instead of 3th)
function getSuffix(num: number) {

  const lastDigit = num % 10;
  const lastTwo = num % 100;
  
  if (lastTwo >= 11 && lastTwo <=13) {
    return num + "th";
  }

  switch (lastDigit) {
    case 1: return num + "st";
    case 2: return num + "nd";
    case 3: return num + "rd";
    default: return num + "th";
  }
}

// Location Request
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
                setWeekday(date.toLocaleDateString("en-US", {weekday: "long"}));
                setDay(parseInt(date.toLocaleDateString("en-US", {day: "numeric"})));
                setMonth(date.toLocaleDateString("en-US", {month: "long"}));
                
              });
          }
        );
      }
    );
  }, []);

  // Return Statement
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{weekday}, {getSuffix(day)}, {month} </Text>

      <Text>Current Temperature: {temperature} </Text>
      <Text>You should grab a {clothing} today!</Text>
    </View>
  );
}
