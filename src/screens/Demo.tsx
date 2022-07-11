import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { CKTapCard } from 'coinkite-tap-protocol-js';
import Card from '../components/Card';
import InitiateCard from '../components/InitiateCard';
import NfcPrompt from '../components/NfcPromptAndroid';
import { _setStatus } from '../utils.ts/commandUtils';
import { useTheme } from '@react-navigation/native';

const Demo = () => {
  const [isTapsigner, setTapsigner] = useState(null);
  const [status, setStatus] = useState<any>();
  const card = useRef(new CKTapCard()).current;
  const [prompt, setPrompt] = React.useState<boolean>(false);

  const withModal = async (callback: any) => {
    try {
      setPrompt(true);
      const resp = await card.nfcWrapper(callback);
      _setStatus(
        resp,
        callback,
        false,
        setStatus,
        isTapsigner ? 'TAPSIGNER' : 'SATSCARD'
      );
      setPrompt(false);
      return resp;
    } catch (error: any) {
      setPrompt(false);
      _setStatus(
        error.toString(),
        callback,
        true,
        setStatus,
        isTapsigner ? 'TAPSIGNER' : 'SATSCARD'
      );
    }
  };

  const theme = useTheme();
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <SafeAreaView style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'always'}>
          {isTapsigner === null ? (
            <InitiateCard
              card={card}
              withModal={withModal}
              setTapsigner={setTapsigner}
            />
          ) : (
            <View style={styles.container}>
              <Card
                card={card}
                status={status}
                isTapsigner={isTapsigner}
                withModal={withModal}
              />
            </View>
          )}
        </ScrollView>
        <NfcPrompt visible={prompt} />
      </SafeAreaView>
    </>
  );
};

export default Demo;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
});
