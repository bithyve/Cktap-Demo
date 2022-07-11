import { Dimensions, StyleSheet, Text, View } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import React from 'react';

const { width } = Dimensions.get('window');

const ignoreKeys = ['card_nonce', 'card_pubkey', 'pubkey'];
const ObjectRepr = ({ obj }: any) => {
  return Object.keys(obj).map((key: string) => {
    if (ignoreKeys.includes(key)) {
      return null;
    }
    return (
      <Text style={styles.textWrap} key={key}>
        <Text style={styles.subText}>{`${key}\n`}</Text>
        {typeof obj[key] === 'object' && obj[key] !== null ? (
          <ObjectRepr obj={obj[key]} />
        ) : (
          <>
            <Text style={styles.mainText} selectable>{`${obj[key]}\n`}</Text>
            {['addr', 'address'].includes(key) ? (
              <QRCode value={obj[key]} />
            ) : null}
          </>
        )}
      </Text>
    );
  });
};
const StatusDetails = ({
  status,
}: {
  status: { type: string; command: string; error: any; response: any };
}) => {
  if (!status) {
    return null;
  }
  const { type = '', command = '', error = null, response = null } = status;
  if (error) {
    return <Text selectable style={[styles.mainText]}>{`${error}`}</Text>;
  }
  if (!response) {
    return null;
  }

  return (
    <View style={styles.shadow}>
      {typeof response !== 'object' ? (
        <Text
          numberOfLines={2}
          selectable
          style={[styles.mainText]}>{`${response}`}</Text>
      ) : (
        <ObjectRepr obj={response} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    elevation: 8,
    maxHeight: '40%',
    width: width * 0.9,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 8,
    borderRadius: 10,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  textWrap: {
    textAlign: 'center',
    paddingVertical: 5,
    maxWidth: '50%',
  },
});

export default StatusDetails;
