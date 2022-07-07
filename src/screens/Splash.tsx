import {
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';

import Map from '../assets/worldmap.svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Splash = () => {
  return (
    <Tab.Navigator
      tabBar={props => null}
      screenOptions={{
        swipeEnabled: true,
      }}>
      <Tab.Screen name='Landing' component={Landing} />
    </Tab.Navigator>
  );
};

const Footer = () => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      navigation.dispatch(CommonActions.navigate('Home'));
    });
  }, []);
  return (
    <Animated.Text style={[styles.footer, { opacity }]}>
      Made by Hexa with Coinkite and ♥
    </Animated.Text>
  );
};

const Landing = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
      <View>
        <Map style={styles.svg} />
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#494949',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '0%',
    padding: '15%',
  },
  svg: {
    position: 'absolute',
    transform: [{ translateX: 50 }, { translateY: 100 }, { scale: 1.3 }],
  },
  footer: {
    alignSelf: 'flex-end',
    fontWeight: '700',
    color: 'white',
  },
});
