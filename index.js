/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

/* Warning ingnorado en esta version de RN,no es necesario hacerlo a partir de RN 0.73.4 */
LogBox.ignoreLogs(['RCTBridge required dispatch_sync to load REAModule']);
