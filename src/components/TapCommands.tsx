import {
  DevSettings,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';

import InputBox from './InputBox';
import { createHash } from 'crypto';

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
const TapCommands = ({ withModal, card }: any) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [inputs, setInputs] = React.useState<Map<any, any>>(new Map());
  const [values, setValues] = React.useState<string[]>([]);
  const [callback, setCallback] = React.useState<string>();

  const cleanup = () => {
    setInputs(new Map());
    setCallback('');
  };

  useEffect(() => {
    if (!visible && inputs.size) {
      switch (callback) {
        case 'pick-secret':
          withModal(() => card.setup(inputs.get('cvc'), null, true));
          cleanup();
          break;
        case 'set-derivation':
          withModal(() =>
            card.set_derivation(inputs.get('path'), inputs.get('cvc'))
          );
          cleanup();
          break;
        case 'master-xpub':
          withModal(() => card.get_xfp(inputs.get('cvc')));
          cleanup();
          break;
        case 'xpub':
          withModal(() => card.get_xpub(inputs.get('cvc'), false));
          cleanup();
          break;
        case 'sign':
          withModal(() =>
            card.sign_digest(
              inputs.get('cvc'),
              0,
              Buffer.from(
                createHash('sha256').update(inputs.get('digest')).digest()
              )
            )
          );
          cleanup();
          break;
        case 'create-backup':
          withModal(() => card.make_backup(inputs.get('cvc')));
          cleanup();
          break;
        case 'change-cvc':
          withModal(() =>
            card.change_cvc(inputs.get('old_cvc'), inputs.get('new_cvc'))
          );
          cleanup();
          break;
        case 'verify-cvc':
          withModal(() => card.read(inputs.get('cvc')));
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
        withModal(() => card.first_look());
        break;
      case 'verify-certs':
        withModal(() => card.certificate_check());
        break;
      case 'pick-secret':
        getInputs('pick-secret', ['cvc']);
        break;
      case 'get-derivation':
        withModal(() => card.get_derivation());
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
        withModal(() => card.wait());
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
