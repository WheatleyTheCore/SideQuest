import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import CreateCollection from "./screens/CreateCollection";
import AddItem from "./screens/AddItem";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="CreateCollection" component={CreateCollection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
