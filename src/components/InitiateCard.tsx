import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

const InitiateCard = ({ withModal, card, setTapsigner }: any) => {
  const initiate = () =>
    withModal(async () => {
      const selectedCard = await card.first_look();
      setTapsigner(selectedCard.is_tapsigner);
      return selectedCard;
    });
  return (
    <TouchableOpacity onPress={initiate} style={styles.container}>
      <Text style={styles.text}>GO</Text>
    </TouchableOpacity>
  );
};

export default InitiateCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: '100%',
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'rgba(100,200,50,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },
});
