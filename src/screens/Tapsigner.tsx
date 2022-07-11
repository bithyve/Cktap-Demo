import { Image } from 'react-native';
import React from 'react';
import TapCommands from '../components/TapCommands';

const Tapsigner = ({ withModal, card }: any) => {
  return (
    <>
      <Image
        source={require('../assets/tapsigner-mockup-oj.png')}
        style={{ width: 571 / 1.5, height: 360 / 1.5 }}
      />
      <TapCommands withModal={withModal} card={card} />
    </>
  );
};

export default Tapsigner;
