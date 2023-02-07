import React from 'react'
import { View, Text, Button } from 'react-native';

const NewTask = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Details" onPress={() => navigation.navigate("Details")} />
      </View>
    );
  }

  export default NewTask