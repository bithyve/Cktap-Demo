import { BinaryLike, createHash } from 'crypto';

import { jspack } from './JSPack';

export const sha256s = (msg: BinaryLike) => {
  const hash = createHash('sha256').update(msg).digest();
  return hash;
};

//used in signing a simple message
export const ser_compact_size = (l: number) => {
  if (l < 253) {
    return jspack.Pack('B', l);
  } else if (l < 0x10000) {
    return jspack.Pack('<BH', [253, l]);
  } else if (l < 0x100000000) {
    return jspack.Pack('<BI', [254, l]);
  } else {
    return jspack.Pack('<BQ', [255, l]);
  }
};

//used in signing a simple message
//yet to be verified!
export const getMessageDigest = (message: string) => {
  try {
    const xmsg = Buffer.concat([
      Buffer.from('\x18Bitcoin Signed Message:\n'),
      Buffer.from(ser_compact_size(message.length)),
      Buffer.from(message),
    ]);
    const messageHash = sha256s(sha256s(message));
    return messageHash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
