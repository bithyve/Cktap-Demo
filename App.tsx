import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppProvider } from './src/contexts/AppContext';
import Demo from './src/screens/Demo';
import { LogBox } from 'react-native';
import React from 'react';
import Splash from './src/screens/Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function App() {
  LogBox.ignoreLogs([/^Require cycle:*/]);
  return (
    <AppProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Splash' component={Splash} />
          <Stack.Screen name='Home' component={Demo} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
