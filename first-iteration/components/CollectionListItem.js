import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/EvilIcons";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default ({ navigation, collection, deleteCollection }) => {
  const rightSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          deleteCollection();
        }}
      >
        <Icon name="trash" color="white" size={30} />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe} key={collection}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("AddItem", { collectionTitle: collection });
        }}
      >
        <Text>{collection}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  delete: {
    backgroundColor: "red",
    maxWidth: 60,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
