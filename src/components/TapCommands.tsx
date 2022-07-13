import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getMessageDigest, sha256s } from '../utils.ts/cryptoUtils';

import { AppContext } from '../contexts/AppContext';
import InputBox from './InputBox';
import { createHash } from 'crypto';

const COMMANDS = [
  'check-status',
  'verify-certs',
  'pick-secret',
  'get-derivation',
  'set-derivation',
  'master-xpub',
  'XFP',
  'xpub',
  'sign',
  'create-backup',
  'change-cvc',
  'verify-cvc',
  'wait',
  'Start Over',
];
const TapCommands = ({ withModal, card, startOver }: any) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [inputs, setInputs] = React.useState<Map<any, any>>(new Map());
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
      case 'pick-secret':
        withModal(() => card.setup(inputs.get('cvc') || cvc, null, true), name);
        cleanup();
        break;
      case 'set-derivation':
        withModal(
          () =>
            card.set_derivation(inputs.get('path'), inputs.get('cvc') || cvc),
          name
        );
        cleanup();
        break;
      case 'master-xpub':
        withModal(() => card.get_xpub(inputs.get('cvc') || cvc, true), name);
        cleanup();
        break;
      case 'XFP':
        withModal(() => card.get_xfp(inputs.get('cvc') || cvc), name);
        cleanup();
        break;
      case 'xpub':
        withModal(() => card.get_xpub(inputs.get('cvc') || cvc, false), name);
        cleanup();
        break;
      case 'sign':
        withModal(
          () =>
            card.sign_digest(
              inputs.get('cvc') || cvc,
              0,
              getMessageDigest(inputs.get('digest'))
            ),
          name
        );
        cleanup();
        break;
      case 'create-backup':
        withModal(() => card.make_backup(inputs.get('cvc') || cvc), name);
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
      case 'pick-secret':
        getInputs('pick-secret', ['cvc']);
        break;
      case 'get-derivation':
        withModal(() => card.get_derivation(), name);
        break;
      case 'set-derivation':
        getInputs('set-derivation', ['path', 'cvc']);
        break;
      case 'master-xpub':
        getInputs('master-xpub', ['cvc']);
        break;
      case 'XFP':
        getInputs('XFP', ['cvc']);
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

export default TapCommands;

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
