import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { FlatList, RectButton } from "react-native-gesture-handler";

import CollectionListItem from "../components/CollectionListItem";

import {
  saveData,
  loadData,
  getAllKeys,
  deleteCollection,
} from "../utils/storageUtils";

export default ({ navigation }) => {
  const [collections, setCollections] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    if (!didLoad) {
      getAllKeys(setCollections);
      setDidLoad(true);
    }
  }, [didLoad]);

  const handleDelete = (index) => {
    deleteCollection(collections[index]);
    let temp = [...collections];
    temp.splice(index, 1);
    setCollections(temp);
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={collections}
        renderItem={({ item, index }) => {
          return (
            <CollectionListItem
              collection={item}
              deleteCollection={() => handleDelete(index)}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(collection) =>
          collections.indexOf(collection).toString()
        }
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: "black",
              }}
            />
          );
        }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("CreateCollection");
        }}
      >
        <Ionicons name="add-sharp" size={40} color="green" />
      </TouchableOpacity>
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
  addButton: {
    transform: [
      {
        translateX: 100,
      },
      {
        translateY: -45,
      },
    ],
  },
});
