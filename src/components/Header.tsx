import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

const {width} = Dimensions.get('screen');

const Header = ({isTapsigner, setTapsigner}: any) => {
  const activateTapsigner = () => {
    setTapsigner(true);
  };
  const activateSatscard = () => {
    setTapsigner(false);
  };
  const tapStyles = [styles.text, isTapsigner ? {} : styles.disabled];
  const satStyles = [styles.text, isTapsigner ? styles.disabled : {}];
  return (
    <View style={styles.switch}>
      <TouchableOpacity onPress={activateTapsigner}>
        <Text style={tapStyles}>TAPSIGNNER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={activateSatscard}>
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
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.2,
  },
});
