import React from 'react';
import Satscard from '../screens/Satscard';
import Tapsigner from '../screens/Tapsigner';

const Card = ({ isTapsigner, card, withModal, status }: any) => {
  return isTapsigner ? (
    <Tapsigner card={card} withModal={withModal} status={status} />
  ) : (
    <Satscard card={card} withModal={withModal} status={status} />
  );
};

export default Card;
