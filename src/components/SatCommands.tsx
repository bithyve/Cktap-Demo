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
  'slot-usage',
  'setup-slot',
  'address',
  'unseal-slot',
  'get-privkey',
  'sign',
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

  useEffect(() => {
    card.initialise().then((res: any) => {
      setStatus(card);
    });
  }, []);

  const cleanup = () => {
    setInputs(new Map());
    setCallback(undefined);
  };

  const display = (data: any) => {
    console.log(data);
    setStatus(data);
  };

  useEffect(() => {
    if (!visible && (inputs.size || callback === 'address')) {
      switch (callback) {
        case 'setup-slot':
          card.setup(inputs.get('cvc'), null, true).then(display);
          cleanup();
          break;
        case 'sign':
          card
            .sign_digest(inputs.get('cvc'), 0, inputs.get('digest'))
            .then(display);
          cleanup();
          break;
        case 'change-cvc':
          card
            .change_cvc(inputs.get('old_cvc'), inputs.get('new_cvc'))
            .then(display);
          cleanup();
          break;
        case 'verify-cvc':
          card.read(inputs.get('cvc')).then(display);
          cleanup();
          break;
        case 'slot-usage':
          card
            .get_slot_usage(inputs.get('slot'), inputs.get('cvc'))
            .then(display);
          cleanup();
          break;
        case 'unseal-slot':
          card.unseal_slot(inputs.get('cvc')).then(display);
          cleanup();
          break;
        case 'get-privkey':
          card.get_privkey(inputs.get('cvc'), inputs.get('slot')).then(display);
          cleanup();
          break;
        case 'address':
          card
            .address(
              inputs.get('faster'),
              inputs.get('includePubkey'),
              inputs.get('slot')
            )
            .then(display);
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
        card.first_look().then(display);
        break;
      case 'verify-certs':
        card.certificate_check().then(display);
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
        card.wait().then(display);
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
