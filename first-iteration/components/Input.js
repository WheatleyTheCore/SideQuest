import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

export default ({ stateObject, itemKey, updateState }) => {
  return (
    <View style={{ width: "100%" }}>
      <Input
        containerStyle={{
          height: 30,
          width: "70%",
        }}
        value={stateObject[itemKey]}
        onChangeText={(text) => {
          updateState(itemKey, text);
        }}
      />
    </View>
  );
};
