import React, {Component} from 'react';

console.ignoredYellowBox = ['Remote debugger'];
// import { YellowBox } from 'react-native';
import AppContainer from './src/screen/AppContainer';
import { Provider } from 'react-redux'
import RuntimeStorage from './src/storage/RuntimeStorage';


export default class App extends Component {
  render() {

    return (
      <Provider store={RuntimeStorage}>
        <AppContainer style={{flex: 1,}}/>
      </Provider>
    );
  }
}