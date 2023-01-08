import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CheckBox } from "react-native-elements";

export default ({ setSensors }) => {
  //boxes in order: accelerometer, barometer, gyroscope, magnometer, pedometer
  const [checkBoxStates, setCheckBoxStates] = useState([0, 0, 0, 0, 0]);
  const boxTitles = ["Accelerometer", "Barometer", "Gyroscope", "Magnetometer"];

  useEffect(() => {
    //make this update sensors list and save that alongside attributes
    let sensors = [];
    boxTitles.forEach((title, index) => {
      if (checkBoxStates[index] == 1) {
        sensors.push(title);
      }
    });

    setSensors([...sensors]);
  }, [checkBoxStates]);

  return (
    <View>
      {boxTitles.map((title, index) => {
        return (
          <CheckBox
            title={title}
            key={index}
            checked={checkBoxStates[index]}
            onPress={() => {
              states = checkBoxStates;
              states[index] = !states[index];
              setCheckBoxStates([...states]);
            }}
          />
        );
      })}
    </View>
  );
};
