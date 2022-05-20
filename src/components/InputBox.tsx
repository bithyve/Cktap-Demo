import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

const {height, width} = Dimensions.get('screen');

const InputBox = ({
  visible,
  setVisible,
  items,
  inputs,
  setInputs,
}: {
  visible: boolean;
  setVisible: any;
  items: string[];
  inputs: Map<any, any>;
  setInputs: any;
}) => {
  const done = () => {
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.main}
        onPress={() => {
          setVisible(false);
        }}>
        <View style={styles.centeredView}>
          {items.map(item => {
            return (
              <TextInput
                key={item}
                style={styles.input}
                placeholder={item}
                placeholderTextColor={'#ddd'}
                onChangeText={value => {
                  const updated = inputs.set(item, value);
                  setInputs(updated);
                }}
              />
            );
          })}
          <TouchableOpacity style={styles.button} onPress={done}>
            <Text style={styles.done}>Done</Text>
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
    height: height * 0.25,
    width,
    backgroundColor: 'rgba(240,240,240,1)',
    borderRadius: 20,
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
    fontSize: 14,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  done: {
    color: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 5,
  },
});
