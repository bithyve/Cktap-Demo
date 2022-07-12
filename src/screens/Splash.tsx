import {
  Animated,
  Easing,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';

import Map from '../assets/worldmap.svg';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={[styles.openSourceText]}>Made by Hexa and ♥</Text>
    </View>
  );
};

const Fader = ({ children }: { children: Element }) => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      navigation.dispatch(CommonActions.navigate('Instructions'));
    });
  }, []);
  return (
    <Animated.View style={[{ opacity }, styles.container]}>
      {children}
    </Animated.View>
  );
};

const Splash = () => {
  return (
    <SafeAreaView style={styles.flex}>
      <Map style={styles.svg} />
      <StatusBar barStyle={'light-content'} backgroundColor={'#494949'} />
      <Fader>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={{ height: 150, width: 150 }}
          />
          <Text style={styles.appName}>CKTap</Text>
        </View>
        <Footer />
      </Fader>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#494949',
    justifyContent: 'center',
    padding: '10%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  svg: {
    position: 'absolute',
    transform: [{ translateX: 250 }, { translateY: -100 }, { scale: 1.5 }],
  },
  footer: {},
  appName: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
  openSourceText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    color: 'white',
  },
  logoContainer: {
    marginTop: '80%',
  },
});
