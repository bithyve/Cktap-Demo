/**
 * @format
 */

import './shim';

import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

require('cbor-rn-prereqs');
AppRegistry.registerComponent(appName, () => App);
