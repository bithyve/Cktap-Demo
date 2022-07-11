import { Image } from 'react-native';
import React from 'react';
import SatCommands from '../components/SatCommands';
import StatusDetails from '../components/StatusDetails';

const Satscard = ({ withModal, card, status, startOver }: any) => {
  return (
    <>
      <Image
        source={require('../assets/satscard-front.png')}
        style={{ width: 571 / 1.5, height: 360 / 1.5 }}
      />
      <StatusDetails status={status} />
      <SatCommands withModal={withModal} card={card} startOver={startOver} />
    </>
  );
};

export default Satscard;
