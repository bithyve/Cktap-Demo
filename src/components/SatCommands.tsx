import {
  DevSettings,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';

import InputBox from './InputBox';
import NfcPrompt from './NfcPromptAndroid';

const COMMANDS = [
  'check-status',
  'verify-certs',
  'slot-usage',
  'setup-slot',
  'address',
  'unseal-slot',
  'get-privkey',
  'change-cvc',
  'verify-cvc',
  'wait',
  'reload',
];
const SatCommands = ({ setStatus, card }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [inputs, setInputs] = React.useState(new Map());
  const [values, setValues] = React.useState<string[]>([]);
  const [callback, setCallback] = React.useState<string>();
  const [prompt, setPrompt] = React.useState<boolean>(false);

  const withModal = async (callback: any) => {
    setPrompt(true);
    const resp = await card.nfcWrapper(callback);
    setPrompt(false);
    return resp;
  };

  const cleanup = () => {
    setInputs(new Map());
    setCallback(undefined);
  };

  useEffect(() => {
    if (!visible && (inputs.size || callback === 'address')) {
      switch (callback) {
        case 'setup-slot':
          withModal(() => card.setup(inputs.get('cvc'), null, true)).then(
            setStatus
          );
          cleanup();
          break;
        case 'sign':
          withModal(() =>
            card.sign_digest(inputs.get('cvc'), 0, inputs.get('digest'))
          ).then(setStatus);
          cleanup();
          break;
        case 'change-cvc':
          withModal(() =>
            card.change_cvc(inputs.get('old_cvc'), inputs.get('new_cvc'))
          ).then(setStatus);
          cleanup();
          break;
        case 'verify-cvc':
          withModal(() => card.read(inputs.get('cvc'))).then(setStatus);
          cleanup();
          break;
        case 'slot-usage':
          withModal(() =>
            card.get_slot_usage(inputs.get('slot'), inputs.get('cvc'))
          ).then(setStatus);
          cleanup();
          break;
        case 'unseal-slot':
          withModal(() => card.unseal_slot(inputs.get('cvc'))).then(setStatus);
          cleanup();
          break;
        case 'get-privkey':
          withModal(() =>
            card.get_privkey(inputs.get('cvc'), inputs.get('slot'))
          ).then(setStatus);
          cleanup();
          break;
        case 'address':
          withModal(() =>
            card.address(
              inputs.get('faster'),
              inputs.get('includePubkey'),
              inputs.get('slot')
            )
          ).then(setStatus);
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
        withModal(() => card.first_look()).then(setStatus);
        break;
      case 'verify-certs':
        withModal(() => card.certificate_check()).then(setStatus);
        break;
      case 'slot-usage':
        getInputs('slot-usage', ['slot', 'cvc']);
        break;
      case 'unseal-slot':
        getInputs('unseal-slot', ['cvc']);
        break;
      case 'get-privkey':
        getInputs('get-privkey', ['cvc', 'slot']);
        break;
      case 'address':
        getInputs('address', ['faster', 'includePubkey', 'slot']);
        break;
      case 'setup-slot':
        getInputs('setup-slot', ['cvc']);
        break;
      case 'sign':
        getInputs('sign', ['cvc', 'digest']);
        break;
      case 'change-cvc':
        getInputs('change-cvc', ['old_cvc', 'new_cvc']);
        break;
      case 'wait':
        withModal(() => card.wait()).then(setStatus);
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
      <NfcPrompt visible={prompt} />
    </View>
  );
};

export default SatCommands;

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
