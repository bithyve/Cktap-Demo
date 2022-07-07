import { Image, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';

import { CKTapCard } from 'coinkite-tap-protocol-js';
import SatCommands from '../components/SatCommands';
import StatusDetails from '../components/StatusDetails';

const Satscard = () => {
  const [status, setStatus] = useState();
  const card = useRef(new CKTapCard()).current;

  return (
    <>
      <Image
        source={require('../assets/satscard-front.png')}
        style={{ width: 571 / 1.5, height: 360 / 1.5 }}
      />
      <StatusDetails status={status} />
      <SatCommands setStatus={setStatus} card={card} />
    </>
  );
};

export default Satscard;

const styles = StyleSheet.create({});
