import React, { useState, useEffect } from "react";
import { Input } from "react-native-elements";

export default ({ saveValue, placeholder, index, attributes }) => {
  const [value, setValue] = useState("");

  return (
    <Input
      containerStyle={{
        height: 30,
        width: "70%",
      }}
      onChangeText={(text) => {
        setValue(text);
        saveValue(value);
      }}
      value={value}
      placeholder={placeholder}
    />
  );
};
