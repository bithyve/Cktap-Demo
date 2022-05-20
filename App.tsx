import Demo from './src/screens/Demo';
import {LogBox} from 'react-native';
import React from 'react';

function App() {
  LogBox.ignoreLogs([/^Require cycle:*/]);
  return <Demo />;
}

export default App;
