import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CKTapCard } from 'cktap-protocol-react-native';
import Card from '../components/Card';
import NfcPrompt from '../components/NfcPromptAndroid';
import { _setStatus } from '../utils.ts/commandUtils';
import { useTheme } from '@react-navigation/native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={[styles.openSourceText]}>Made by Hexa with ♥</Text>
    </View>
  );
};
const Demo = () => {
  const [isTapsigner, setTapsigner] = useState<boolean | null>(null);
  const [status, setStatus] = useState<any>();
  const card = useRef(new CKTapCard()).current;
  const [prompt, setPrompt] = React.useState<boolean>(false);

  const ignoreCommand = () => {
    setPrompt(false);
    _setStatus(
      status?.response ?? null,
      'none',
      false,
      setStatus,
      isTapsigner ? 'TAPSIGNER' : 'SATSCARD'
    );
  };

  const withModal = async (callback: any, command: string) => {
    try {
      const resp = await card.nfcWrapper(callback);
      _setStatus(
        resp,
        command,
        false,
        setStatus,
        isTapsigner ? 'TAPSIGNER' : 'SATSCARD'
      );
      return resp;
    } catch (error: any) {
      if (error.toString() === 'Error') {
        return;
      }
      _setStatus(
        error.toString(),
        command,
        true,
        setStatus,
        isTapsigner ? 'TAPSIGNER' : 'SATSCARD'
      );
    }
  };

  const startOver = async () => {
    _setStatus(
      null,
      '',
      false,
      setStatus,
      isTapsigner ? 'TAPSIGNER' : 'SATSCARD'
    );
    setTapsigner(null);
    await card.endNfcSession();
    initiate();
  };

  const initiate = async () => {
    setPrompt(true);
    await withModal(async () => {
      const selectedCard = await card.first_look();
      setTapsigner(selectedCard!.is_tapsigner);
      return selectedCard;
    }, 'check-status');
    setPrompt(false);
  };

  useEffect(() => {
    setTimeout(() => {
      initiate();
    }, 1000);
  }, []);

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
            <View style={styles.container}>
              <Text style={styles.text}>
                Waiting for a card to be scanned...
              </Text>
            </View>
          ) : (
            <View style={styles.container}>
              <Card
                card={card}
                status={status}
                isTapsigner={isTapsigner}
                withModal={withModal}
                startOver={startOver}
              />
            </View>
          )}
        </ScrollView>
        <NfcPrompt visible={prompt} ignoreCommand={ignoreCommand} />
        <Footer />
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
    paddingTop: 20,
    paddingBottom: 5,
  },
  footer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  openSourceText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    color: 'black',
  },
  text: {
    color: 'black',
    fontSize: 18,
    letterSpacing: 1,
  },
});
