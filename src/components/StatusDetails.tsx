import {
  Clipboard,
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Fragment } from 'react';

import Copy from '../assets/copy.svg';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

const keysToIgnore = (isTapsigner: boolean) => {
  return isTapsigner
    ? ['card_nonce', 'card_pubkey', 'pubkey']
    : ['card_nonce', 'card_pubkey', 'pubkey', 'num_backups'];
};

const ObjectRepr = ({ obj }: any) => {
  const isObject = (key: string) => typeof obj[key] === 'object' && obj[key];
  return Object.keys(obj).map((key: string) => {
    if (keysToIgnore(obj.is_tapsigner).includes(key)) {
      return <Fragment key={key} />;
    }
    return (
      <Text style={styles.textWrap} key={key}>
        <Text style={styles.subText}>{`${key}\n`}</Text>
        {isObject(key) ? (
          <ObjectRepr obj={obj[key]} />
        ) : (
          <Text style={styles.mainText} selectable>{`${obj[key]}\n`}</Text>
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
    return <Fragment />;
  }
  const { command = '', error = null, response = null } = status;
  if (error) {
    return <Text selectable style={styles.mainText}>{`${error}`}</Text>;
  }
  if (!response) {
    return <Fragment />;
  }
  if (command === 'verify-certs') {
    return (
      <View style={styles.shadow}>
        <Text style={styles.mainText}>
          {`Verified. Root cert is from Coinkite. Card is legit!`}
        </Text>
      </View>
    );
  } else if (command === 'change-cvc') {
    return (
      <View style={styles.shadow}>
        <Text style={styles.mainText}>{`Successfully changed!`}</Text>
      </View>
    );
  } else if (['master-xpub', 'xpub'].includes(command)) {
    return (
      <View style={styles.shadow}>
        <QRCode value={response} size={150} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.textCopy}
          onPress={() => Clipboard.setString(response)}>
          <Text numberOfLines={1} style={styles.address}>
            {response}
          </Text>
          <Copy />
        </TouchableOpacity>
      </View>
    );
  } else if (['XFP'].includes(command)) {
    return (
      <View style={styles.shadow}>
        <Text selectable style={styles.mainText}>
          {'Extended fingerprint: ' + response.toString('hex')}
        </Text>
      </View>
    );
  } else if (['sign', 'get-privkey'].includes(command)) {
    return (
      <View style={styles.shadow}>
        <Text selectable style={styles.mainText}>
          {response.toString('hex')}
        </Text>
      </View>
    );
  } else if (['verify-cvc'].includes(command)) {
    return (
      <View style={styles.shadow}>
        <Text selectable style={styles.mainText}>
          {'CVC is correct.'}
        </Text>
      </View>
    );
  } else if (['slot-usage'].includes(command)) {
    return (
      <FlatList
        data={response}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={{
          maxHeight: '55%',
        }}
        contentContainerStyle={{ padding: '5%' }}
        snapToInterval={Dimensions.get('window').width * 0.9}
        snapToAlignment={'center'}
        scrollToOverflowEnabled
        renderItem={({ item: slot }) => {
          return (
            <View style={styles.slots}>
              {slot.address && <QRCode value={slot.address} size={100} />}
              {slot.address && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.textCopy}
                  onPress={() => Clipboard.setString(slot.address)}>
                  <Text numberOfLines={1} style={styles.address}>
                    {slot.address}
                  </Text>
                  <Copy />
                </TouchableOpacity>
              )}
              <Text selectable style={styles.mainText}>
                {`slot: ${slot['resp']['slot']}`}
              </Text>
              <Text selectable style={styles.mainText}>
                {`status: ${slot['status']}`}
              </Text>
              {slot['resp']['privkey'] && (
                <Text selectable style={styles.mainText}>
                  {`privkey: ${slot['resp']['privkey'].toString('hex')}`}
                </Text>
              )}
              {slot['resp']['pubkey'] && (
                <Text selectable style={styles.subText}>
                  {`pubkey: ${slot['resp']['pubkey'].toString('hex')}`}
                </Text>
              )}
              {slot['resp']['master_pk'] && (
                <Text selectable style={styles.subText}>
                  {`master pubkey: ${slot['resp']['master_pk'].toString(
                    'hex'
                  )}`}
                </Text>
              )}
              {slot.address && slot.status === 'UNSEALED' && (
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `https://www.blockchain.com/btc/address/${slot.address}`
                    );
                  }}>
                  <Text
                    selectable
                    style={[styles.mainText, { color: '#FF3300' }]}>
                    {`Balance ->`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    );
  } else if (['address'].includes(command)) {
    return (
      <View style={styles.shadow}>
        <QRCode value={response.addr} size={150} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.textCopy}
          onPress={() => Clipboard.setString(response.addr)}>
          <Text numberOfLines={1} style={styles.address}>
            {response.addr}
          </Text>
          <Copy />
        </TouchableOpacity>
        {response['pubkey'] && (
          <Text selectable style={styles.subText}>
            {`pubkey: ${response['pubkey'].toString('hex')}`}
          </Text>
        )}
      </View>
    );
  } else if (command === 'create-backup') {
    const encryptedKey = response.toString('hex');
    return (
      <View style={styles.shadow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.textCopy}
          onPress={() => Clipboard.setString(encryptedKey)}>
          <Text numberOfLines={1} style={styles.address}>
            {encryptedKey}
          </Text>
          <Copy />
        </TouchableOpacity>
        <Text style={styles.mainText}>
          {
            'This is the AES encrypted hex value.\n\nPlease use the AES key behind the card to decrypt your key and back it up.'
          }
        </Text>
      </View>
    );
  } else if (command === 'get-pubkey') {
    const pubkey = response.pubkey.toString('hex');
    const address = response.addr.toString('hex');
    return (
      <View style={styles.shadow}>
        <QRCode value={address} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.textCopy}
          onPress={() => Clipboard.setString(address)}>
          <Text numberOfLines={1} style={styles.address}>
            {address}
          </Text>
          <Copy />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.textCopy}
          onPress={() => Clipboard.setString(pubkey)}>
          <Text numberOfLines={1} style={styles.address}>
            pubkey: {pubkey}
          </Text>
          <Copy />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.shadow}>
        {typeof response !== 'object' ? (
          <Text
            numberOfLines={2}
            selectable
            style={styles.mainText}>{`${response}`}</Text>
        ) : (
          <ObjectRepr obj={response} />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  shadow: {
    padding: '5%',
    borderRadius: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    elevation: 8,
    maxHeight: '50%',
    width: width * 0.9,
    alignItems: 'center',
  },
  slots: {
    padding: '5%',
    borderRadius: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 8,
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
    paddingVertical: 5,
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1,
  },
  textWrap: {
    textAlign: 'center',
    paddingVertical: 5,
    maxWidth: '40%',
  },
  textCopy: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1.5,
    padding: 8,
    borderRadius: 10,
    marginVertical: 10,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 5,
    width: width * 0.7,
  },
});

export default StatusDetails;
