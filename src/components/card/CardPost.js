import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ImageSize} from '../../constant/Image';

import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';

import { connect } from 'react-redux';
import { options } from '../../services/API/PostDocument';

class CardPost extends Component {
  constructor (props) {
    super(props);
    
  }

  // logic

  giveLike () {
    let {
      giveLike,
    } = this.action;
    let {
      id,
      token,
    } = this.dependencies;
    giveLike({
      _id: id,
      token,
    });
  }

  get action () {
    let {
      navigateToDetail = () => {console.log(`Vừa bấm chuyển sang màn hình chi tiết`)},
      navigateToExchange = () => {console.log(`Vừa bấm chuyển sang màn hình trao đổi`)},
      navigateToChatBox = () => {console.log(`Vừa bấm chuyển sang màn hình nói chuyện`)},
      
      giveLike = () => {console.log(`Vừa bấm thích bài viết`)},
      getItem = () => {console.log(`Vừa bấm lấy thông tin chi tiết vật phẩm`)},
    } = this.props;
    return {
      navigateToDetail,
      navigateToExchange,
      navigateToChatBox,
      
      giveLike,
      getItem,
    }
  }

  get dependencies () {
    let {
      height = 700,

      id = '',
      ownerId = '',
      ownerName = '',
      ownerAvatar = '',
      mainPicture = '',
      name = '',
      description = '',
      totalLike = 0,
      totalItem = 0,

      token = '',
    } = this.props;
    
    return {
      height,

      id,
      ownerId,
      ownerName,
      ownerAvatar,
      mainPicture,
      name,
      description,
      totalLike,
      totalItem,

      token,
    };
  }

  // Design

  detailButton_onClick () {
    let {
      navigateToDetail,
      getItem,
    } = this.action;

    let {
      id,
      token,
    } = this.dependencies;

    getItem ({
      _id: id,
      token,
      option: options.population.itemList,
    },()=> {},
    (res) => {navigateToDetail()})

  }

  likeButton_onClick () {
    
    this.giveLike();
  }

  exchangeButton_onClick () {
    let {
      navigateToExchange,
      getItem,
    } = this.action;
    let {
      id,
      token,
    } = this.dependencies;
    getItem({
      _id: id,
      token,
    },()=>{},
      (res) => {navigateToExchange();}
    )
    
  }

  contactButton_onClick () {
    let {
      navigateToChatBox,
    } = this.action;
    navigateToChatBox();
  }

  
  get label () {
    let {
  
        ownerName,
        name,
        description,
        totalLike,
        totalItem,
    } = this.dependencies;

    // console.log(` Vẽ lên màn hình ${
    //   JSON.stringify({ownerName,
    //   name,
    //   description,
    //   likeTotal,
    //   exchangeTotal})}`)

    return {
      ownerName: (<Text style={{flex: 1,borderWidth: 1,borderWidth: 1}}>tên người dùng {ownerName}</Text>),
      name: (<Text style={{flex: 1,borderWidth: 1}}>tên vật phẩm: {name}</Text>),
      description: (<Text style={{flex: 1,borderWidth: 1}}>mô tả: {description}</Text>),
      likeTotal: (<Text style={{flex: 1,borderWidth: 1}}>Lượt thích {totalLike}</Text>),
      exchangeTotal: (<Text style={{flex: 1,borderWidth: 1}}>Chờ trao đổi {totalItem}</Text>),
    }
  }

  get image () {
    let {
      height, 

      ownerAvatar,
      mainPicture,
    } = this.dependencies; 

    return {
      ownerAvatar: (<Image style={ImageSize.huge} source={{uri: ownerAvatar}}/>),
      mainPicture: (<Image style={{height: height * 2/3}} source={{uri: mainPicture}}/>),
    }
  }

  get button () {
    return {
      detail: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.detailButton_onClick()}}
          >
          {/* {this.image.ownerAvatar} */}
          {this.label.ownerName}
          {this.label.name}
          {this.label.description}
          {/* {this.image.mainPicture} */}
          {this.label.likeTotal}
          {this.label.exchangeTotal}
        </TouchableOpacity>
      ),
      like: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.likeButton_onClick()}}
          >
          <Text>Thích</Text>
        </TouchableOpacity>
      ),
      exchange: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.exchangeButton_onClick()}}
          >
          <Text>Trao đổi</Text>
        </TouchableOpacity>
      ),
      contact: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.contactButton_onClick()}}
          >
          <Text>Liên hệ</Text>
        </TouchableOpacity>
      )
    }
  }

  get header () {
    return (<View/>)
  }

  get body () {
    return (
    <View style={{flex: 1,borderWidth: 1}}>
      {this.button.detail}
      {this.button.like}
      {this.button.exchange}
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


const mapStateToProps = (state) => {
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => ({
  
  getItem: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitGetItem,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  giveLike: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitGiveLike,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  // Chỉ có thể emit ở component
  // on sẽ ở screen

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardPost);