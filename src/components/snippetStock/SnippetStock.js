import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ImageSize} from '../../constant/Image';

export default class SnippetStock extends Component {
  constructor (props) {
    super(props);
    
  }

  // logic

  approve () {
    let {
      approve,
    } = this.action;

    let {
      id,
      token,
      itemId,
    } = this.dependencies;
    approve({
      itemId: id, // Id của mục trao đổi
      token,
      _id: itemId, // Id của bài viết
    });
  }

  get action () {
    let {
      approve = () => {console.log(`Vừa bấm đồng ý trao đổi`)},
    } = this.props;
    return {
      approve,
    }
  }

  get dependencies () {
    let {
      height = 700,

      name = '',
      id = '',
      description = '',
      photoUrl = '',
      type = '',

      point = 0,

    } = this.props;
    return {
      height,

      id,
      name,
      description,
      photoUrl,

      point,
    };
  }

  // Design

  approveButton_onClick () {
    this.approve();
  }



  contactButton_onClick () {
    let {
      navigateToChatBox,
    } = this.action;
    navigateToChatBox();
  }

  
  get label () {
    let {
  
      name,
      description,
      vendeeName,
    } = this.dependencies;

    return {
      name: (<Text style={{flex: 1,borderWidth: 1}}>{name}</Text>),
      description: (<Text style={{flex: 1,borderWidth: 1}}>{description}</Text>),
      vendeeName: (<Text style={{flex: 1,borderWidth: 1}}>@{vendeeName}</Text>),
    }
  }

  get image () {
    let {
      height, 

      photoUrl,
    } = this.dependencies; 

    return {
      ownerAvatar: (<Image style={ImageSize.huge} source={{uri: photoUrl}}/>),
    }
  }

  get button () {
    return {
      vendee: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.detailButton_onClick()}}
          >
          {this.label.vendeeName}
        </TouchableOpacity>
      ),
      approve: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.likeButton_onClick()}}
          >
          <Text>Đồng ý</Text>
        </TouchableOpacity>
      ),
    }
  }

  get header () {
    return (<View/>)
  }

  get body () {
    return (
    <View style={{flex: 1,borderWidth: 1}}>
      {this.button.vendeeName}
      {this.label.name}
      {this.label.description}
      {this.button.approve}
    </View>)
  }

  get footer () {
    return (<View/>)
  }
  get form () {
    return (
      <View style={{flex: 1,borderWidth: 1}}>
        {this.header}
        {this.body}
        {this.footer}
      </View>
    )
  }

  render() {
    let {
      height,
    } = this.dependencies;

    return (
      <View style={{height: height}}>
        {this.form}
      </View>
    );
  }
}