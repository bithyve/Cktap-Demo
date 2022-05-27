import { Dimensions, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import QRCode from './QRCode';

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
          <Text style={styles.mainText}>{`${obj[key]}\n`}</Text>
          )}
            <View>
              <QRCode 
                value={key}
                title='Scan QR for address'
              />
            </View>
          :
            null
      </Text>
    );
  });
};
const StatusDetails = ({ status }: any) => {
  if (!status) {
    return null;
  }

  return (
    <View style={styles.shadow}>
      {typeof status !== 'object' ? (
        <Text
          numberOfLines={2}
          selectable
          style={[styles.mainText]}
        >{`${status}`}</Text>
      ) : (
        <ObjectRepr obj={status} />
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
