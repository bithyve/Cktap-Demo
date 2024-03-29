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

const CVCPrompt = ({visible, setVisible, cvc, setCvc, callback}: any) => {
  const done = () => {
    setVisible(false);
    callback();
  };
  return (
    <>
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
            <Text style={styles.modalText}>Update CVC</Text>
            <TextInput
              style={styles.input}
              placeholder={'old cvc'}
              placeholderTextColor={'#ddd'}
              keyboardType={'numeric'}
              onChangeText={text => setCvc(cvc.set('old', text))}
            />
            <TextInput
              style={styles.input}
              placeholder={'new cvc'}
              placeholderTextColor={'#ddd'}
              keyboardType={'numeric'}
              onChangeText={text => setCvc(cvc.set('new', text))}
            />
            <TouchableOpacity style={styles.button} onPress={done}>
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default CVCPrompt;

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
  backdrop: {backgroundColor: 'rgba(0,0,0,.5)'},
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
