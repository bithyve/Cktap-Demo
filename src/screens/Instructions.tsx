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
];

const Instruction = ({ text, index }: { text: string; index: number }) => {
  return (
    <View style={[styles.card, index % 2 == 0 ? styles.fs : styles.fe]}>
      <Text style={styles.text}>{text}</Text>
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
        {INSTRUCTIONS.map((instruction, index) => {
          return (
            <Instruction text={instruction} key={instruction} index={index} />
          );
        })}
      </View>
      <TouchableOpacity style={styles.footer} onPress={onPress}>
        <Proceed />
      </TouchableOpacity>
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
  card: {
    backgroundColor: 'rgba(230,230,230,1)',
    borderRadius: 10,
    width: '80%',
    padding: 10,
    marginVertical: 20,
  },
  fs: {
    alignSelf: 'flex-start',
  },
  fe: {
    alignSelf: 'flex-end',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
  },
});
