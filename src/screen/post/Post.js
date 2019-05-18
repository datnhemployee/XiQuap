import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
} from 'react-native';

export default class Post extends Component {
  constructor (props) {
    super(props);
    
  }

  get action () {
    let {
      navigateToHome = () => {console.log(`Vừa nhấn quay trở lại màn hình Home`)},
    } = this.props;
    return {
      navigateToHome,
    };
  }

  get dependencies () {
    let {
      visible = false,
    } = this.props;
    return {
      visible,
    };
  }

  get textInput () {
    return {
      
    }
  }
  
  get form () {
    return (
      <View style={{flex: 1}}>
        <Text > Post screen </Text>
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