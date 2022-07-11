import { Image } from 'react-native';
import React from 'react';
import StatusDetails from '../components/StatusDetails';
import TapCommands from '../components/TapCommands';

const Tapsigner = ({ withModal, card, status }: any) => {
  return (
    <>
      <Image
        source={require('../assets/tapsigner-mockup-oj.png')}
        style={{ width: 571 / 1.5, height: 360 / 1.5 }}
      />
      <StatusDetails status={status} />
      <TapCommands withModal={withModal} card={card} status={status} />
    </>
  );
};

export default Tapsigner;
