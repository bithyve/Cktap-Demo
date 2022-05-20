/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

const {height, width} = Dimensions.get('screen');

const NfcPrompt = ({show, setShow}: {show: boolean; setShow: any}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPress={() => {
            setShow(false);
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Scanning</Text>
            <Image
              source={require('../../nfc-payment.png')}
              style={styles.nfc}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default NfcPrompt;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    height: height * 0.5,
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
  button: {
    borderRadius: 5,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
  nfc: {height: 200, width: 200},
});
