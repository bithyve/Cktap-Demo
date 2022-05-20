import {Dimensions, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const {width} = Dimensions.get('window')

const StatusDetails = ({status}: any) => {
  if (!status) {
    return null;
  }

  return (
    <View style={styles.shadow}>
      {typeof status === 'string'? <Text numberOfLines={2} selectable
       style={[styles.mainText, {maxWidth:width*.8}]}>{`${status}`}</Text>:Object.keys(status).map((key: string) => {
        return (
          <Text style={styles.textWrap} key={key} numberOfLines={2}>
            <Text style={styles.subText}>{`${key}\n`}</Text>
            <Text style={styles.mainText}>{`${status[key]}`}</Text>
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 1,
    shadowOpacity: 0.5,
    elevation: 8,
    maxHeight: '40%',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 8,
    borderRadius: 10,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    maxWidth:width*.8
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  textWrap: {
    width: '70%',
    paddingVertical: 5,
  },
});

export default StatusDetails;
