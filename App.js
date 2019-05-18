import React, {Component} from 'react';

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
import AppContainer from './src/screen/AppContainer';
import { Provider } from 'react-redux'
import RuntimeStorage from './src/storage/RuntimeStorage';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default class App extends Component {
  render() {

    return (
      <Provider store={RuntimeStorage}>
        <AppContainer style={{flex: 1,}}/>
      </Provider>
    );
  }
}