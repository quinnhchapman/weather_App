import { Text, View, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";


// https://github.com/pierreamgabriel/react-native-weather-api


export default function Index() {

  // Weather Constants
  const [temperature, setTemp] = useState(0);
  const [clothing, setClothing] = useState("null");
  const [backColor, setbackColor] = useState('#fff');
  const [icon, setIcon] = useState("weather-sunny");

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
// Evaluate Temp function: determines what clothes should be worn that day,
// as well as what color and icon should be shown
function evaluateTemperature(temp: number){
  if (temp >= 90) {
    setClothing("Tank Top");
    setbackColor('#f76133ff');
    setIcon("weather-sunny");
  }
  else if (temp >= 70) {
    setClothing("T-Shirt");
    setbackColor('#feb21bff');
    setIcon("weather-partly-cloudy");

  }
  else if (temp >= 55){
    setClothing("Light Jacket");
    setbackColor('#faf2abff');
    setIcon("weather-cloudy");
  }
  else if (temp >= 40){
    setClothing("Jacket");
    setbackColor('#cafff1ff');
    setIcon("weather-windy");
  }
  else {
    setClothing("Winter Coat");
    setbackColor('#428effff');
    setIcon("weather-snowy");
  }
}


// Location Request
useEffect(() => {

  // Asks the user to request permission (IOS location permissions)
  Location.requestForegroundPermissionsAsync().then(
      (permission: Location.PermissionResponse) => {
        if (permission.status !== "granted") {
          console.log("Permission denied");
          // if permission is not granted, the app will not work!
          return;
        }

    Location.getCurrentPositionAsync({}).then(
          (location: Location.LocationObject) => {
            const { latitude, longitude } = location.coords;
            // stores latitude and longitude
            const apiKey = "694a9a1429a0eb720906af6a6c3661b1";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

            // allows access to the website with the api key and requests the temp for the location
            // based on the lat and long ^

            
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                // fetches the data and drills down, getting the temp for the loc requested
                setTemp(data.main.temp);
                evaluateTemperature(data.main.temp);
                // evaluateTemperature(90); TEST CASE A
                // evaluateTemperature(70); TEST CASE B
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
    <View style={[styles.container,{backgroundColor: backColor}]}>

      <Text style = {styles.dateText}>
        {weekday}, {getSuffix(day)} {month}
      </Text>

      <MaterialCommunityIcons name = {icon as any} size= {120} color ="#fff" />

      <Text style={styles.temp}>Current Temperature: {temperature} °F</Text>
      {/* <Text style={styles.temp}>Current Temperature: {90} °F</Text> TEST CASE A*/}
      {/* <Text style={styles.temp}>Current Temperature: {70} °F</Text> TEST CASE B*/}
      <Text style={styles.clothing}>You should grab a {clothing} today!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 10,
  },
  temp: {
    color: "#fff",
    fontSize: 30,
    marginTop: 10,
  },
  clothing: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
  }
});