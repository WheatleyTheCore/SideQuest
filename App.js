import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Home, Quest, NewQuest, CompletedQuest, NewTask} from './Screens/Screens'
import { AppDataContextProvider } from './DataManagement/AppDataContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppDataContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Quest" component={Quest} />
          <Stack.Screen name="NewQuest" component={NewQuest} />
          <Stack.Screen name="CompletedQuest" component={CompletedQuest} />
          <Stack.Screen name="NewTask" component={Newtask} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppDataContextProvider>
  );
}

export default App;