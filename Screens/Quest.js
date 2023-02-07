import React from 'react'
import { View, Text, Button } from 'react-native';

const Quest = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Quest Page</Text>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  }

  export default Quest