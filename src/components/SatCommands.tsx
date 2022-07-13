import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../contexts/AppContext';
import InputBox from './InputBox';

const COMMANDS = [
  'check-status',
  'verify-certs',
  'slot-usage',
  'setup-slot',
  'address',
  'unseal-slot',
  'get-privkey',
  'wait',
  'Start Over',
];
const SatCommands = ({ withModal, card, startOver }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [inputs, setInputs] = React.useState(new Map());
  const [values, setValues] = React.useState<string[]>([]);
  const [callback, setCallback] = React.useState<string>('');
  const { cvc, setCvc } = useContext(AppContext);

  const cleanup = () => {
    setInputs(new Map());
    setCallback('');
  };

  const interact = (cmd = '') => {
    const name = cmd ? cmd : callback;
    switch (name) {
      case 'setup-slot':
        withModal(() => card.setup(inputs.get('cvc') || cvc, null, true), name);
        cleanup();
        break;
      case 'sign':
        withModal(
          () =>
            card.sign_digest(inputs.get('cvc') || cvc, 0, inputs.get('digest')),
          name
        );
        cleanup();
        break;
      case 'change-cvc':
        withModal(
          () => card.change_cvc(inputs.get('old_cvc'), inputs.get('new_cvc')),
          name
        );
        cleanup();
        break;
      case 'verify-cvc':
        withModal(() => card.read(inputs.get('cvc') || cvc), name);
        cleanup();
        break;
      case 'slot-usage':
        withModal(
          () =>
            card.get_slot_usage(inputs.get('slot'), inputs.get('cvc') || cvc),
          name
        );
        cleanup();
        break;
      case 'unseal-slot':
        withModal(() => card.unseal_slot(inputs.get('cvc') || cvc), name);
        cleanup();
        break;
      case 'get-privkey':
        withModal(
          () => card.get_privkey(inputs.get('cvc') || cvc, inputs.get('slot')),
          name
        );
        cleanup();
        break;
      case 'address':
        withModal(
          () =>
            card.address(
              inputs.get('faster'),
              inputs.get('includePubkey'),
              inputs.get('slot')
            ),
          name
        );
        cleanup();
        break;
      default:
        break;
    }
  };

  const getInputs = (name: string, ins: string[]) => {
    ins = ins.filter(input => !(input === 'cvc' && cvc));
    if (!ins.length) {
      // passing name here as setCallback is async
      interact(name);
    } else {
      setValues(ins);
      setVisible(true);
    }
  };

  const onPress = (name: string) => {
    setCallback(name);
    switch (name) {
      case 'check-status':
        withModal(() => card.first_look(), name);
        break;
      case 'verify-certs':
        withModal(() => card.certificate_check(), name);
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
        withModal(() => card.wait(), name);
        break;
      case 'verify-cvc':
        getInputs('verify-cvc', ['cvc']);
        break;
      case 'Start Over':
        setCvc('');
        startOver();
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
        command={callback}
        visible={visible}
        inputs={inputs}
        items={values}
        setInputs={setInputs}
        setVisible={setVisible}
        interact={interact}
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
