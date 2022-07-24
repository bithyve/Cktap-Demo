import { Image } from 'react-native';
import React from 'react';
import StatusDetails from '../components/StatusDetails';
import TapCommands from '../components/TapCommands';

const Tapsigner = ({ withModal, card, status, startOver }: any) => {
  return (
    <>
      <Image
        source={require('../assets/tapsigner-mockup-oj.png')}
        style={{ width: 571 / 2.5, height: 360 / 2.5 }}
      />
      <StatusDetails status={status} />
      <TapCommands withModal={withModal} card={card} startOver={startOver} />
    </>
  );
};

export default Tapsigner;
