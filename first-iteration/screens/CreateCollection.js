import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Input } from "react-native-elements";

import ItemAttribute from "../components/ItemAttribute";
import SensorSelector from "../components/SensorSelector";

import { saveData, loadData } from "../utils/storageUtils";

//TODO make this screen scrollable if there are lots and lots of attributes.

export default ({ navigation }) => {
  const [collectionName, setCollectionName] = useState("");
  const [attributes, setAttributes] = useState([""]);
  const [sensors, setSensors] = useState([]);
  const userAttributesRef = useRef();

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Input
              containerStyle={{
                height: 30,
                width: "70%",
              }}
              onChangeText={(text) => {
                setCollectionName(text);
              }}
              value={collectionName}
              placeholder={"Collection Name"}
            />
            <Text>Attributes</Text>
          </>
        }
        ListFooterComponent={
          <>
            <Button
              title="new attribute"
              onPress={() => {
                let attrs = attributes;
                attrs[attrs.length] = "";
                setAttributes([...attrs]);
              }}
            />
            <View>
              <Text>Sensors to record when saving item</Text>
              <SensorSelector setSensors={setSensors} />
            </View>
            <Button
              title="Create Collection"
              onPress={() => {
                const userAttributesPrefab = attributes.reduce((acc, curr) => {
                  acc[curr] = "";
                  return acc;
                }, {});

                const data = JSON.stringify({
                  structure: {
                    userDefinedAttributes: userAttributesPrefab,
                    sensors: sensors,
                  },
                  items: [],
                });

                saveData(data, collectionName);

                navigation.navigate("AddItem", {
                  test: "what up this is a test",
                  collectionTitle: collectionName,
                });
              }}
            />
          </>
        }
        data={attributes}
        keyExtractor={(attr) => attributes.indexOf(attr).toString()}
        renderItem={({ item, index }) => {
          return (
            <ItemAttribute
              index={index}
              attributes={attributes}
              setAttributes={setAttributes}
            />
          );
        }}
      />
    </View>
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
