import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';

export default class Home extends Component {
  constructor (props) {
    super(props);
    
  }

  

  get action () {
    let {
      navigateToPost = () => {console.log(`Vừa bấm chuyển sang màn hình đăng bài`)},
    } = this.props;
    return {
      navigateToPost,
    }
  }

  get dependencies () {
    let {
      visible = false,
    } = this.props;
    return {
      visible,
    };
  }

  postButton_onClick () {
    let {
      navigateToPost,
    } = this.action;
    navigateToPost();
  }

  get button () {
    return {
      post: (
        <TouchableOpacity 
          style={{flex: 1}}
          onPress={()=>{this.postButton_onClick()}}
          >
          <Text>Thêm bài viết</Text>
        </TouchableOpacity>
      )
    }
  }
  get header () {
    return (<View/>)
  }

  get body () {
    return (
    <View style={{flex: 1}}>
      {this.button.post}
    </View>)
  }

  get footer () {
    return (<View/>)
  }
  get form () {
    return (
      <View style={{flex: 1}}>
        {this.header}
        {this.body}
        {this.footer}
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