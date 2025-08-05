import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import  SplashScreen from "../app/screens/SplashScreen";
import Home from "../app/screens/Home";
import login from "../app/screens/login";
import signup from "../app/screens/signup";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splashscreen" component={SplashScreen} />
            <Stack.Screen name="login" component={login} />
            <Stack.Screen name="Home" component={Home} /> 
            <Stack.Screen name="signup" component={signup} /> 

          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default MainStackNavigator;