import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Input } from "react-native-elements";

import AttributeTextInput from "./AttributeTextInput";

export default ({ index, attributes, setAttributes }) => {
  //TODO remove state here, use array state in parent
  // and then just update it from there ykno

  const removeAttribute = (index) => {
    let attrs = attributes;
    attrs.splice(index, 1);
    setAttributes([...attrs]);
  };

  //TODO super weird error here, value and attributes[value] dont line up
  // attributes[value] is always one char behind value.
  const updateAttribute = (value) => {
    let arr = [...attributes];
    arr[index] = value;
    setAttributes(arr);
  };

  return (
    <View style={styles.container}>
      <Input
        className="attributeTitle"
        containerStyle={{
          height: 30,
          width: "70%",
        }}
        onChangeText={(text) => {
          updateAttribute(text);
        }}
        value={attributes[index]}
        placeholder={"Name"}
      />
      <EvilIcons
        name="trash"
        size={24}
        onPress={() => removeAttribute(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    minHeight: 100,
  },
});
