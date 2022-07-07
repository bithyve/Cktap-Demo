import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import nfcManager from 'react-native-nfc-manager';

const { width } = Dimensions.get('screen');

const Header = ({ isTapsigner, setTapsigner }: any) => {
  const activateTapsigner = async () => {
    await nfcManager.cancelTechnologyRequest();
    setTapsigner(true);
  };
  const activateSatscard = async () => {
    await nfcManager.cancelTechnologyRequest();
    setTapsigner(false);
  };
  const tapStyles = [styles.text, isTapsigner ? {} : styles.disabled];
  const satStyles = [styles.text, isTapsigner ? styles.disabled : {}];
  return (
    <View style={styles.switch}>
      <TouchableOpacity
        onPress={activateTapsigner}
        style={styles.shadow}
        activeOpacity={0.8}>
        <Text style={tapStyles}>TAPSIGNNER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={activateSatscard}
        style={styles.shadow}
        activeOpacity={0.8}>
        <Text style={satStyles}>SATSCARD</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  switch: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 30,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.2,
  },
  shadow: {
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    width: '40%',
    marginHorizontal: '5%',
  },
});
