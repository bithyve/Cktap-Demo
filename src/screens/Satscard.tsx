import { Image } from 'react-native';
import React from 'react';
import SatCommands from '../components/SatCommands';

const Satscard = ({ withModal, card }: any) => {
  return (
    <>
      <Image
        source={require('../assets/satscard-front.png')}
        style={{ width: 571 / 1.5, height: 360 / 1.5 }}
      />
      <SatCommands withModal={withModal} card={card} />
    </>
  );
};

export default Satscard;
