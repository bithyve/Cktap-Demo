import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';

import Header from '../components/Header';
import Satscard from './Satscard';
import Tapsigner from './Tapsigner';

const Demo = () => {
  const [isTapsigner, setTapsigner] = useState(true);

  return (
    <SafeAreaView style={styles.alignCenter}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Header isTapsigner={isTapsigner} setTapsigner={setTapsigner} />
      <ScrollView
        contentContainerStyle={styles.main}
        keyboardShouldPersistTaps={'always'}
      >
        {isTapsigner ? <Tapsigner /> : <Satscard />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Demo;

const styles = StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
});
