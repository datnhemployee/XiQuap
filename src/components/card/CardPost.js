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
import Color from '../../constant/Color';
import styles from './CardPost.styles';
import { SwapIcon, HeartoIcon, HeartIcon } from '../../constant/Icon';
import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
import { Codes } from '../../constant/Response';
import MessageBox from '../MessageBox';

class CardPost extends Component {
  constructor (props) {
    super(props);
    
    this.onOtherButtonClick = this.onOtherButtonClick.bind(this);
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

  onOtherButtonClick () {
    let {
      getOther,
    } = this.action;
    let {
      ownerId,
      token,
    } = this.dependencies;

    getOther ({
      _id: ownerId,
      token,
    });
  }

  get action () {
    let {
      navigateToDetail = () => {console.log(`Vừa bấm chuyển sang màn hình chi tiết`)},
      navigateToExchange = () => {console.log(`Vừa bấm chuyển sang màn hình trao đổi`)},
      navigateToChatBox = () => {console.log(`Vừa bấm chuyển sang màn hình nói chuyện`)},
      navigateToOther = () => {console.log(`Vừa bấm chuyển sang màn hình người dùng khác`)},
      
      giveLike = () => {console.log(`Vừa bấm thích bài viết`)},
      getOther = () => {console.log(`Vừa bấm lấy thông tin người khác`)},
      onGetOther = () => {console.log(`Vừa bấm lấy thông tin người khác`)},
      getItem = () => {console.log(`Vừa bấm lấy thông tin chi tiết vật phẩm`)},
    } = this.props;
    return {
      navigateToDetail,
      navigateToExchange,
      navigateToChatBox,
      navigateToOther,
      
      giveLike,
      getItem,
      getOther,
      onGetOther,
    }
  }

  componentDidMount () {
    const {
      onGetOther,
      navigateToOther,
    } = this.action;

    onGetOther(
      (res) => {
        console.log(`res là: `,JSON.stringify(res));
        if(res.code === Codes.Success)
          navigateToOther();
        else {
          MessageBox(`Lỗi`,res.content);
        }
      });
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
      isBrief = true,
      isLike = false,
      isSwaping = true,

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
      isBrief,
      isLike,
      isSwaping,

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
        isBrief,
    } = this.dependencies;
    if (description.length > 200 && isBrief)
      description = description.slice(0,100) + ` ...Đọc thêm. `;
    // console.log(` Vẽ lên màn hình ${
    //   JSON.stringify({ownerName,
    //   name,
    //   description,
    //   likeTotal,
    //   exchangeTotal})}`)
    const _style = styles.label;
    return {
      ownerName: (<Text style={_style.ownerName}>{ownerName}</Text>),
      name: (<Text style={_style.name}>{name}</Text>),
      description: (<Text 
        style={_style.description}
      >{description}</Text>),
      likeAndExchange: (<Text style={_style.likeAndExchange}>{totalLike} thích - {totalItem} chờ trao đổi</Text>),
    }
  }

  get image () {
    let {
      height, 

      ownerAvatar,
      mainPicture,
    } = this.dependencies; 

    return {
      ownerAvatar: (
        <View 
          style = {{
            height: 50,
            width: 50, 
            borderRadius: 1000, 
            overflow: 'hidden'}}>
          <Image 
            style = {{
              flex: 1,
              height: `100%`,
              width: `100%`,
            }} 
            resizeMode = {'stretch'}
            source = {
              !!ownerAvatar?
              {uri: ownerAvatar}
              :require(`../../img/default.png`)}
            />
        </View>),
      mainPicture: (
        <View 
          style = {{flex: 5, borderRadius: 10, marginTop: 10, overflow: 'hidden'}}>
          <Image 
            style = {{
              flex: 1,
              height: 100,
              width: `100%`,
            }} 
            resizeMode = {'stretch'}
            source = {
              !!mainPicture?
              {uri: mainPicture}
              :require(`../../img/default.png`)}
            />
        </View>)
      ,
    }
  }

  get button () {
    const {
      isLike,
    } = this.dependencies;
    
    const _style = styles.button;
    return {
      info: (
        <TouchableOpacity 
          onPress = {this.onOtherButtonClick}
          style={_style.info}>
          {this.image.ownerAvatar}
          {this.label.ownerName}
        </TouchableOpacity>
      ),
      detail: (
        <TouchableOpacity 
          style={{
            flex: 4,
            // borderWidth: 1,
          }}
          onPress={()=>{this.detailButton_onClick()}}
          >
          {this.image.mainPicture}
          {this.label.name}
          {this.label.description}
          {this.label.likeAndExchange}
        </TouchableOpacity>
      ),
      like: (
        <TouchableOpacity 
          style={_style.like}
          onPress={()=>{this.likeButton_onClick()}}
          >
          {!isLike ?<HeartoIcon 
            color = {Color.Gray}/>
            :<HeartIcon
            color = {Color.Red}/>}
          <Text style = {[_style.likeText,!isLike?{color:Color.Gray}:{color:Color.Red}]}>THÍCH</Text>
        </TouchableOpacity>
      ),
      exchange: (
        <TouchableOpacity 
          style={_style.exchange}
          onPress={()=>{this.exchangeButton_onClick()}}
          >
          <SwapIcon 
            color = {Color.Gray}/>
          <Text style = {_style.exchangeText}>TRAO ĐỔI</Text>
        </TouchableOpacity>
      ),
      contact: (
        <TouchableOpacity 
          style={{
            flex: 1,
            // borderWidth: 1
          }}
          onPress={()=>{this.contactButton_onClick()}}
          >
          <Text>Liên hệ</Text>
        </TouchableOpacity>
      )
    }
  }

  get header () {
    return (
    <View style= {styles.header}>
      {this.button.info}
    </View>)
  }

  get body () {
    return (
    <View style={styles.body}>
      {this.button.detail}
    </View>)
  }

  get footer () {
    let {
      isSwaping
    } = this.dependencies;
    return (
    <View style={styles.footer}>
      {this.button.like}
      {!!isSwaping?this.button.exchange:(<View/>)}
    </View>)
  }
  get form () {
    return (
      <View style={{
        flex: 1,
        // borderWidth: 1,
        }}>
        {this.header}
        {this.body}
        {this.footer}
      </View>
    )
  }

  render() {
    let {
      height,
      isBrief,
      description,
    } = this.dependencies;

    let _height = height;
    if (!isBrief){
      _height = _height + description.length / 2;
    }
    return (
      <View style={{
        height: _height, 
        marginBottom: 20,
        backgroundColor: Color.White,
        padding: 10,
        }}>
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
  
  getOther: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    AuthAction.emit(
        AuthActionType.emitGetOther,
      ).inject(
        data,
        pre,
        next
      ),
  ),

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

  onGetOther: (
    callback = (res)=>{},
  ) => dispatch(
    AuthAction.on(
      AuthActionType.onGetOther,
    ).inject(
      callback
    )
  ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardPost);