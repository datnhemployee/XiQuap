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

  // approve () {
  //   let {
  //     approve,
  //   } = this.action;

  //   let {
  //     id,
  //     token,
  //     itemId,
  //   } = this.dependencies;
  //   approve({
  //     itemId: id, // Id của mục trao đổi
  //     token,
  //     _id: itemId, // Id của bài viết
  //   });
  // }

  buy () {}

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
      onwerName = '',
      onwerId= '',
      onwerTotalStar= '',
      ownerAvatar= '',

    } = this.props;
    return {
      height,

      name ,
      id ,
      description ,
      photoUrl ,
      type ,
      point ,
      onwerName ,
      onwerId,
      onwerTotalStar,
      ownerAvatar,

    };
  }

  // Design

  // approveButton_onClick () {
  //   this.approve();
  // }

  buyButton_onClick () {
    this.buy();
  }

  
  get label () {
    let {
      name ,
      description ,
      type ,
      point ,
      onwerName ,
      onwerTotalStar,
    } = this.dependencies;

    return {
      name: (<Text style={{flex: 1,borderWidth: 1}}>{name}</Text>),
      description: (<Text style={{flex: 1,borderWidth: 1}}>{description}</Text>),
      type: (<Text style={{flex: 1,borderWidth: 1}}>Loại {type}</Text>),
      point: (<Text style={{flex: 1,borderWidth: 1}}>{point} điểm</Text>),
      onwerName: (<Text style={{flex: 1,borderWidth: 1}}>@{onwerName}</Text>),
      onwerTotalStar: (<Text style={{flex: 1,borderWidth: 1}}> {onwerTotalStar} sao</Text>),
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
      buy: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.buyButton_onClick()}}
          >
          <Text>Đổi quà</Text>
        </TouchableOpacity>
      ),
      // approve: (
      //   <TouchableOpacity 
      //     style={{flex: 1,borderWidth: 1}}
      //     onPress={()=>{this.approveButton_onClick()}}
      //     >
      //     <Text>Đồng ý</Text>
      //   </TouchableOpacity>
      // ),
    }
  }

  get header () {
    return (<View/>)
  }

  get body () {
    return (
    <View style={{flex: 1,borderWidth: 1}}>
      {this.button.vendeeName}
      {this.label.onwerName}
      {this.label.onwerTotalStar}
      {this.label.name}
      {this.label.description}
      {this.label.point}
      {this.button.buy}
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