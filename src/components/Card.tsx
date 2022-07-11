import React from 'react';
import Satscard from '../screens/Satscard';
import Tapsigner from '../screens/Tapsigner';

const Card = ({ isTapsigner, card, withModal, status, startOver }: any) => {
  return isTapsigner ? (
    <Tapsigner
      card={card}
      withModal={withModal}
      status={status}
      startOver={startOver}
    />
  ) : (
    <Satscard
      card={card}
      withModal={withModal}
      status={status}
      startOver={startOver}
    />
  );
};

export default Card;
