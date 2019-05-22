import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
} from 'react-native';

export default class Messenger extends Component {
  constructor (props) {
    super(props);
    
  }

  get dependencies () {
    let {
      visible = false,
    } = this.props;
    return {
      visible,
    };
  }
  
  get form () {
    return (
      <View style={{flex: 1}}>
        <Text > Messenger screen </Text>
      </View>
    )
  }

  render() {
    let {
      visible,
    } = this.dependencies;

    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={()=>{}}
        >
        {this.form}
      </Modal>
    );
  }
}