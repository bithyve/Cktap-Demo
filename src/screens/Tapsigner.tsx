import React, { useRef, useState } from 'react';

import {CKTapCard} from 'coinkite-tap-protocol-js';
import Commands from '../components/TapCommands';
import {Image} from 'react-native';
import StatusDetails from '../components/StatusDetails';

const Tapsigner = () => {
  const [status, setStatus] = useState();
  const card = useRef(new CKTapCard()).current;

  return (
    <>
      <Image
        source={require('../../tapsigner-mockup-oj.png')}
        style={{width: 571 / 1.5, height: 360 / 1.5}}
      />
      <StatusDetails status={status} />
      <Commands setStatus={setStatus} card={card} />
    </>
  );
};

export default Tapsigner;
