import {
  DevSettings,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';

import InputBox from './InputBox';

const COMMANDS = [
  'check-status',
  'verify-certs',
  'pick-secret',
  'get-derivation',
  'set-derivation',
  'master-xpub',
  'xpub',
  'sign',
  'create-backup',
  'change-cvc',
  'verify-cvc',
  'wait',
  'reload',
];
const TapCommands = ({ setStatus, card }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [inputs, setInputs] = React.useState(new Map());
  const [values, setValues] = React.useState<string[]>([]);
  const [callback, setCallback] = React.useState<string>();

  useEffect(() => {
    const init = async () => card.first_look();
    card.nfcWrapper(init).then(setStatus);
  }, []);

  const cleanup = () => {
    setInputs(new Map());
    setCallback(null);
  };

  const display = (data) => {
    console.log(data);
    setStatus(data);
  };

  useEffect(() => {
    if (!visible && inputs.size) {
      switch (callback) {
        case 'pick-secret':
          card
            .nfcWrapper(() => card.setup(inputs.get('cvc'), null, true))
            .then(display);
          cleanup();
          break;
        case 'set-derivation':
          card
            .nfcWrapper(() =>
              card.set_derivation(inputs.get('path'), inputs.get('cvc'))
            )
            .then(display);
          cleanup();
          break;
        case 'master-xpub':
          card.nfcWrapper(() => card.get_xfp(inputs.get('cvc'))).then(display);
          cleanup();
          break;
        case 'xpub':
          card
            .nfcWrapper(() => card.get_xpub(inputs.get('cvc'), false))
            .then(display);
          cleanup();
          break;
        case 'sign':
          card
            .nfcWrapper(() =>
              card.sign_digest(inputs.get('cvc'), 0, inputs.get('digest'))
            )
            .then(display);
          cleanup();
          break;
        case 'create-backup':
          card
            .nfcWrapper(() => card.make_backup(inputs.get('cvc')))
            .then(display);
          cleanup();
          break;
        case 'change-cvc':
          card
            .nfcWrapper(() =>
              card.change_cvc(inputs.get('old_cvc'), inputs.get('new_cvc'))
            )
            .then(display);
          cleanup();
          break;
        case 'verify-cvc':
          card.nfcWrapper(() => card.read(inputs.get('cvc'))).then(display);
          cleanup();
          break;
        default:
          break;
      }
    }
  }, [visible]);

  const getInputs = (name: string, ins: string[]) => {
    setCallback(name);
    setValues(ins);
    setVisible(true);
  };

  const onPress = (name: string) => {
    switch (name) {
      case 'check-status':
        card.nfcWrapper(() => card.first_look()).then(display);
        break;
      case 'verify-certs':
        card.nfcWrapper(() => card.certificate_check()).then(display);
        break;
      case 'pick-secret':
        getInputs('pick-secret', ['cvc']);
        break;
      case 'get-derivation':
        card.nfcWrapper(() => card.get_derivation()).then(display);
        break;
      case 'set-derivation':
        getInputs('set-derivation', ['path', 'cvc']);
        break;
      case 'master-xpub':
        getInputs('master-xpub', ['cvc']);
        break;
      case 'xpub':
        getInputs('xpub', ['cvc']);
        break;
      case 'sign':
        getInputs('sign', ['cvc', 'digest']);
        break;
      case 'create-backup':
        getInputs('create-backup', ['cvc']);
        break;
      case 'change-cvc':
        getInputs('change-cvc', ['old_cvc', 'new_cvc']);
        break;
      case 'wait':
        card.nfcWrapper(() => card.wait()).then(display);
        break;
      case 'verify-cvc':
        getInputs('verify-cvc', ['cvc']);
        break;
      case 'reload':
        DevSettings.reload();
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      {COMMANDS.map((name: any) => {
        const _onPress = () => onPress(name);
        return (
          <TouchableOpacity key={name} onPress={_onPress} style={styles.button}>
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        );
      })}
      <InputBox
        visible={visible}
        inputs={inputs}
        items={values}
        setInputs={setInputs}
        setVisible={setVisible}
      />
    </View>
  );
};

export default TapCommands;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 6,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 3 },
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  text: { color: 'black' },
});
