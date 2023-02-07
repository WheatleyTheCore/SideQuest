import React from 'react'
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Quest" onPress={() => navigation.navigate("Quest")} />
      </View>
    );
  }

  export default Home