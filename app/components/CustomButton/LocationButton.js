import React, { useState } from "react";
import { View, Text, Button, Alert,TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";

const LocationButton = ({ setUserLocation }) => {
  const [locationFound, setLocationFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);

    try {
      // Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

       // Get current location with high accuracy
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setUserLocation(userLocation);
      setLocationFound(true);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {loading ? (
        <LottieView
          source={require("../../assets/LocationSearch.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      ) : locationFound ? (
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={require("../../assets/NewDone.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: "#7c6ddd" }}>
            Location Found, proceed to submit
          </Text>
        </View>
      ) : (
        <TouchableOpacity 
            style={{
              width: 200, 
              backgroundColor: "#55A57F", 
              padding: 12, 
              borderRadius: 10, 
              alignItems: "center",
            }} 
            onPress={getLocation}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Get Current Location
            </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LocationButton;
