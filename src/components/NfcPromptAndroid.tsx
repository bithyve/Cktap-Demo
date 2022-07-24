import {
  Animated,
  Easing,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import nfcManager from 'react-native-nfc-manager';

function NfcPrompt({
  visible,
  ignoreCommand,
}: {
  visible: boolean;
  ignoreCommand: any;
}) {
  if (Platform.OS === 'ios') {
    return null;
  }
  const animation = React.useRef(new Animated.Value(0)).current;
  const [_visible, setVisible] = React.useState(visible);

  const open = () => {
    setVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.elastic(0.8),
    }).start();
  };
  const close = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.elastic(0.8),
    }).start(() => setVisible(false));
  };
  React.useEffect(() => {
    visible ? open() : close();
  }, [visible]);

  const bgAnimStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: animation,
  };
  const promptAnimStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  const cancelNFC = async () => {
    if (Platform.OS === 'ios') {
      nfcManager.setAlertMessageIOS('Canceled!');
    }
    nfcManager.cancelTechnologyRequest();
    ignoreCommand();
  };

  return (
    <Modal transparent={true} visible={_visible}>
      <View style={[styles.wrapper]}>
        <View style={{ flex: 1 }} />
        <Animated.View style={[styles.prompt, promptAnimStyle]}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/nfc-512.png')}
              style={{ width: 120, height: 120, padding: 20 }}
              resizeMode='contain'
            />
            <Text style={styles.text}>{'NFC scanning'}</Text>
          </View>
          <TouchableOpacity style={styles.cancel} onPress={cancelNFC}>
            <Text style={styles.text}>{'CANCEL'}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.promptBg, bgAnimStyle]} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  promptBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  prompt: {
    height: 300,
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    zIndex: 2,
  },
  text: {
    color: 'black',
    letterSpacing: 1,
  },
  cancel: {
    backgroundColor: 'rgba(100,100,100,.3)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 35,
    borderRadius: 5,
  },
});

export default NfcPrompt;
