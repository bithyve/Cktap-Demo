import {
  CommonActions,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Proceed from '../assets/Proceed.svg';
import React from 'react';

const INSTRUCTIONS = [
  'The cards are sensitive. Please hold the card stably until the NFC modal is dismissed.',
  'The CVC is asked once when first required and stored for the current session. It is reset on Start Over.',
  'Please refer to the cktap library docs for detailed the error codes that is observed in the app.',
  `Please keep the card in the vicinity of the mobile only when the NFC modal is active to avoid annoying system pop-ups.`,
];

const Instruction = ({ text }: { text: string }) => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.ex}>{' ! '}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={[styles.openSourceText]}>Made by Hexa with ♥</Text>
    </View>
  );
};

const Instructions = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = () => navigation.dispatch(CommonActions.navigate('Demo'));

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View>
        <View style={styles.insContainer}>
          {INSTRUCTIONS.map(instruction => {
            return <Instruction text={instruction} key={instruction} />;
          })}
        </View>
        <TouchableOpacity style={styles.footer} onPress={onPress}>
          <Proceed />
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '10%',
    justifyContent: 'space-between',
  },
  insContainer: {
    backgroundColor: 'rgba(242,236,221,1)',
    borderRadius: 10,
  },
  card: {
    borderRadius: 10,
    width: '80%',
    padding: 10,
    marginVertical: 20,
    flexDirection: 'row',
  },
  text: {
    color: 'rgb(70,76,82)',
    fontSize: 16,
  },
  ex: {
    color: 'rgb(244,174,43)',
    fontSize: 20,
    fontWeight: '900',
    margin: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  openSourceText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    color: 'black',
  },
});
