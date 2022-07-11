import React from 'react';
import Satscard from '../screens/Satscard';
import Tapsigner from '../screens/Tapsigner';

const Card = ({ isTapsigner, card, withModal }: any) => {
  return isTapsigner ? (
    <Tapsigner card={card} withModal={withModal} />
  ) : (
    <Satscard card={card} withModal={withModal} />
  );
};

export default Card;
