import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from "react-native";

import {
  Accelerometer,
  Barometer,
  Gyroscope,
  Magnetometer,
} from "expo-sensors";

import Input from "../components/Input";

import { saveData, loadData } from "../utils/storageUtils";

export default ({ route, navigation }) => {
  const [collection, setCollection] = useState({});
  const [newItem, setNewItem] = useState({});
  const [didLoad, setDidLoad] = useState(false);
  const [didInitializeItem, setDidInitializeItem] = useState(false);
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [barometerData, setBarometerData] = useState({});
  const [gyroscopeData, setGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [magnetometerData, setMagnetometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  //TODO disable sensors we don't have permissions for.

  const [sensorsEnabled, setSensorsEnabled] = useState({
    accelerometer: false,
    barometer: false,
    gyroscope: false,
    magnetometer: false,
  });

  //load data from memory
  useEffect(() => {
    loadData(setCollection, route.params.collectionTitle);
    setDidLoad(true);
  }, []);

  //initialize the item object, check state, add event listeners, etc.
  useEffect(() => {
    if (!didInitializeItem && Object.keys(collection).length > 0) {
      //initialize data item
      setNewItem(collection.structure.userDefinedAttributes);

      //check sensor availability
      updateSensorsEnabled(collection.structure.sensors);

      //set initialized
      setDidInitializeItem(true);
    }
    console.log(collection);
  }, [collection, sensorsEnabled]);

  useEffect(() => {
    //make it conditional if enabled
    if (sensorsEnabled.accelerometer) {
      Accelerometer.addListener((data) => {
        setAccelerometerData(data);
      });
      Accelerometer.setUpdateInterval(100);
    }
    if (sensorsEnabled.barometer) {
      Barometer.addListener((data) => {
        setBarometerData(data);
      });
    }

    if (sensorsEnabled.gyroscope) {
      Gyroscope.addListener((data) => {
        setGyroscopeData(data);
      });
    }
    if (sensorsEnabled.magnetometer) {
      Magnetometer.addListener((data) => {
        setMagnetometerData(data);
      });
    }

    //clean up event listeners when no longer listening
    return () => {
      Accelerometer.removeAllListeners();
      Barometer.removeAllListeners();
      Gyroscope.removeAllListeners();
      Magnetometer.removeAllListeners();
    };
  }, [sensorsEnabled]);

  const updateItem = (attribute, text) => {
    let updatedItem = newItem;
    updatedItem[attribute] = text;
    setNewItem(updatedItem);
  };

  const updateSensorsEnabled = async (sensorList) => {
    //check to see if we have permissions to record all sensors in the collection,
    // and if not set an alert to ask if they want to record all data without said sensor(s)
    const accelAvailable = await Accelerometer.getPermissionsAsync();
    const baroAvailable = await Barometer.getPermissionsAsync();
    const gyroAvailable = await Gyroscope.getPermissionsAsync();
    const magnoAvailable = await Magnetometer.getPermissionsAsync();

    setSensorsEnabled({
      accelerometer:
        accelAvailable.granted && sensorList.includes("Accelerometer"),
      barometer: baroAvailable.granted && sensorList.includes("Barometer"),
      gyroscope: gyroAvailable.granted && sensorList.includes("Gyroscope"),
      magnetometer:
        magnoAvailable.granted && sensorList.includes("Magnetometer"),
    });
  };

  const checkSensorAvailability = async () => {
    //use promise.all to optimize later
    const accelAvailable = await Accelerometer.isAvailableAsync();
    const baroAvailable = await Barometer.isAvailableAsync();
    const gyroAvailable = await Gyroscope.isAvailableAsync();
    const magnoAvailable = await Magnetometer.isAvailableAsync();

    return {
      accelAvailable: accelAvailable,
      baroAvailable: baroAvailable,
      gyroAvailable: gyroAvailable,
      magnoAvailable: magnoAvailable,
    };
  };

  const recordSensorData = () => {
    checkSensorAvailability()
      .then((data) => {
        updateItem(
          "Accelerometer",
          JSON.stringify({
            x: accelerometerData.x,
            y: accelerometerData.y,
            z: accelerometerData.z,
          })
        );
        updateItem(
          "Barometer",
          JSON.stringify({
            pressure: barometerData.pressure,
          })
        );
        updateItem(
          "Gyroscope",
          JSON.stringify({
            x: gyroscopeData.x,
            y: gyroscopeData.y,
            z: gyroscopeData.z,
          })
        );
        updateItem(
          "Magnetometer",
          JSON.stringify({
            x: magnetometerData.x,
            y: magnetometerData.y,
            z: magnetometerData.z,
          })
        );
      })
      .catch((e) => {
        console.log("there was an error");
      });
  };

  const appendDate = () => {
    const date = new Date();
    updateItem(
      "Date",
      `${date.getMonth()} ${date.getDate()} ${date.getFullYear()}`
    );
  };

  const appendTime = () => {
    const date = new Date();
    updateItem(
      "Time",
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
  };

  const saveItem = () => {
    recordSensorData();
    appendDate();
    appendTime();
    let updatedCollection = collection;
    updatedCollection.items[collection.items.length] = newItem;
    console.log(updatedCollection);
    //save to disk
  };

  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(collection).length > 0 && (
        <>
          <FlatList
            style={{ width: "100%" }}
            data={Object.keys(newItem).filter((item) => {
              return collection.structure.sensors.indexOf(item) == -1;
            })}
            keyExtractor={(item) =>
              Object.keys(newItem).indexOf(item).toString()
            }
            renderItem={({ item }) => {
              return (
                <View style={{ width: "100%" }}>
                  <Text>{item}</Text>
                  <Input
                    stateObject={newItem}
                    itemKey={item}
                    updateState={updateItem}
                  />
                </View>
              );
            }}
          />

          <FlatList
            style={{ width: "100%" }}
            data={Object.keys(newItem).filter((item) => {
              return collection.structure.sensors.indexOf(item) != -1;
            })}
            keyExtractor={(item) =>
              Object.keys(newItem).indexOf(item).toString()
            }
            renderItem={({ item }) => {
              return (
                <View style={{ width: "100%" }}>
                  <Text>
                    {item}: {newItem[item]}
                  </Text>
                </View>
              );
            }}
          />
        </>
      )}
      <Text>Accel: {accelerometerData.x}</Text>
      <Text>Barometer: {barometerData.pressure}</Text>
      <Text>Gyro: {gyroscopeData.x}</Text>
      <Text>Mag: {magnetometerData.x}</Text>
      <Button title="record data" onPress={saveItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
