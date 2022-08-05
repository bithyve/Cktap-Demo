import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';

import { AppContext } from '../contexts/AppContext';

const { height, width } = Dimensions.get('screen');

const OPTIONAL_INPUT = ['faster', 'includePubkey'];
const InputBox = ({
  command,
  visible,
  setVisible,
  items,
  inputs,
  setInputs,
  interact,
}: {
  command: string;
  visible: boolean;
  setVisible: any;
  items: string[];
  inputs: Map<any, any>;
  setInputs: any;
  interact: any;
}) => {
  const { setCvc } = useContext(AppContext);

  const close = () => {
    setVisible(false);
  };

  const done = () => {
    close();
    interact();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={close}>
      <TouchableOpacity activeOpacity={1} style={styles.main} onPress={close}>
        <View style={styles.centeredView}>
          {items.map((item, index) => {
            return (
              <TextInput
                autoFocus={!!!index}
                key={item}
                style={styles.input}
                placeholder={`${item} ${
                  OPTIONAL_INPUT.includes(item) ||
                  (command === 'slot-usage' && item === 'cvc') ||
                  (command === 'address' && item === 'slot') ||
                  command === 'get-pubkey' ||
                  command === 'verify-certs'
                    ? '(optinal)'
                    : ''
                }`}
                placeholderTextColor={'#aaa'}
                onChangeText={value => {
                  const updated = inputs.set(item, value);
                  setInputs(updated);
                  if (item === 'cvc') {
                    setCvc(value);
                  }
                }}
                keyboardType={
                  ['cvc', 'slot'].includes(item) ? 'numeric' : 'default'
                }
              />
            );
          })}
          <TouchableOpacity onPress={done}>
            <Text style={styles.done}>DONE</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  centeredView: {
    padding: 10,
    paddingVertical: 30,
    width: width * 0.9,
    backgroundColor: 'rgba(240,240,240,1)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  input: {
    height: 40,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  done: {
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    letterSpacing: 2,
    marginTop: 5,
  },
});
