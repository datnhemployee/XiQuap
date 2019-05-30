import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import CardPost from '../../components/card/CardPost';
import ExchangeCard from '../../components/exchangeCard/ExchangeCard';

import { Codes } from '../../constant/Response';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import styles from './Detail.styles';

import { connect } from 'react-redux';
import { BackIcon, StarIcon, StarOuterIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import { interfaceDeclaration } from '@babel/types';
import Typeface from '../../constant/Font';

class Detail extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.onCardPostExchangeClick = this.onCardPostExchangeClick.bind(this);
  }

  // giveLike (id) {
  //   let {
  //     giveLike,
  //   } = this.action;

  //   giveLike({
  //     _id: id,
  //     token,
  //   })
  // }

  get action () {
    let {
      navigateToHome = () => console.log(` Vừa bấm chuyển sang màn hình chính.`),
      navigateToExchange = () => console.log(` Vừa bấm chuyển sang màn hình trao đổi .`),

      // giveLike = () => console.log(` Vừa bấm thích vật phẩm .`),
      onGiveLike = () => console.log(` Đang chờ thông tin like từ máy chủ .`),
      onGetItem = () => console.log(` Đang chờ vật phẩm từ máy chủ .`),
      onExchange = () => console.log(` Đang chờ thông tin trao đổi từ máy chủ .`),
      
    } = this.props;
    return {
      navigateToHome,
      navigateToExchange,

      // giveLike,
      onGiveLike,
      onGetItem,
      onExchange,
    };
  }

  get dependencies () {
    let {
      visible = false,
      item = null,
    } = this.props;
    return {
      visible,
      item,
    };
  }

  componentDidMount () {
    let {
      onGiveLike,
      onGetItem,
      onExchange,
    } = this.action;

    onGiveLike((res) => {
      if(res.code === Codes.Success){
        this.refresh();
      }
    });

    onGetItem((res) => {
      if(res.code === Codes.Success){
        this.refresh();
      }
    });

    onExchange((res) => {
      if(res.code === Codes.Success){
        this.refresh();
      }
    });
  }

  // Render

  refresh () {
    this.setState({});
  }

  get approvedCard () {
    let {
      item,
    } = this.dependencies;
    if (!item) {
      return (<View />)
    }
    if (!item.vendee) {
      return (<View />)
    }
    // const _style = styles.approvedCard;
    return (
      <TouchableOpacity style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginBottom: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{
            flex: 1,
            ...Typeface.overline,
            textAlign: `right`,
            textAlignVertical: `center`,
            }}>ĐÃ CHẤP NHẬN</Text>
          {this.label.vendeeName}
          {this.label.vendeeTotalStar}
        </View>
        <View 
          style = {{
            height: 100,
            width: 100, 
            borderRadius: 1000, 
            marginLeft: 10,
            overflow: 'hidden'}}>
          <Image 
            style = {{
              flex: 1,
              height: `100%`,
              width: `100%`,
            }} 
            resizeMode = {'stretch'}
            source = {
              !!item.vendee.avatar ?
              {uri: item.vendee.avatar}
              :require(`../../img/default.png`)}
            />
        </View>
      </TouchableOpacity>
    )
  }

  get label () {
    let {
      item,
    } = this.dependencies;
    const _style = styles.label;
    return {
      vendeeTotalStar:!!item.vendee? 
        (<Text style={_style.totalStar}>{item.vendee.totalStar} sao</Text>)
        :(<View/>),
      vendeeName: !!item.vendee? 
        (<Text style={_style.approveText}> {item.vendee.name}</Text>)
        :(<Text style={_style.waittingText}> Đang chờ trao đổi </Text>),
      vendeeGiveStar: !!item.giveStar? 
        (<StarIcon color={Color.Red}/>)
        :(<StarOuterIcon color={Color.Gray}/>),
    }
  }

  get button () {
    const _style = styles.button;
    return {
      back: (<TouchableOpacity 
        style={_style.back}
        onPress = {this.onBackButtonClick}>
        <BackIcon 
            color={Color.Gray}/>
        <Text 
          style={_style.backText}> Chi tiết </Text>
      </TouchableOpacity>),
    }
  }

  get list () {
    let {
      item,
    } = this.dependencies;

    let {
      navigateToHome
    } = this.action;

    // console.log(`onGetPost_vendeeName item: ${JSON.stringify(item)}`)

    return {
      exchange: (
      <FlatList 
        data={!item ? []: item.itemList}
        renderItem = {(element) => {
          element = element.item;
          // console.log(`onGetPost_vendeeName element: ${JSON.stringify(element)}`)

          return (
            <ExchangeCard 
              id = {element._id}
              idItem = {item._id}
              name = {element.name}
              description = {element.description}
              photoUrl = {element.photoUrl}
              vendeeName = {element.vendee.name}
              navigateToHome = {navigateToHome}
            />
          )
        }}
        refreshing = {false}
        keyExtractor = {(item,index) => `DetailListExchangeItem${index}`}
      />)
    }
  }

  onBackButtonClick () {
    let {
      navigateToHome,
    } = this.action;

    navigateToHome();
  }

  onCardPostExchangeClick () {
    let {
      navigateToExchange,
    } = this.action;

    navigateToExchange();
  }

  get header () {
    let item = this.dependencies.item;

    // console.log(`item header ${JSON.stringify(item)}`);
    return (
      <View>
        {(!item._id)? <Text >Thông tin rỗng </Text>
        :<CardPost
            height = {500}
            isBrief = {false}
            id = { item._id}
            ownerId = {item.owner._id}
            ownerName = {item.owner.name}
            ownerAvatar = {item.owner.avatar}
            mainPicture = {item.mainPicture}
            name = {item.name}
            description = {item.description}
            totalLike = {item.totalLike}
            totalItem = {item.totalItem}
            isLike = {item.isLike}

            navigateToExchange = {this.onCardPostExchangeClick}
            navigateToDetail = {() => {}}
          />}
      </View>  
    )}
  get body () {
    return (
      <View  style={{flex: 1}}>
        {this.approvedCard}
      </View>
    )}
  get footer () {
    return (
      <View  style={{flex: 1}}>
        {this.list.exchange}
      </View>
    )}
  
  get form () {
    return (
      <View style= {{flex: 1}}>
        {this.button.back}
        <ScrollView style={{flex: 1}}>
          {this.header}
          {this.body}
          {this.footer}
        </ScrollView>
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


const mapStateToProps = (state) => {
  // console.log(`state Detail: ${JSON.stringify(state)}`);

  return {
    token: state.auth.token,
    item: state.post,
  }
}

const mapDispatchToProps = (dispatch) => ({
  // giveLike: (
  //   data,
  //   pre = () => {},
  //   next = (res) => {},
  // ) => dispatch(
  //   ExchangeAction.emit(
  //       ExchangeActionType.emitGiveLike,
  //     ).inject(
  //       data,
  //       pre,
  //       next
  //     ),
  // ),

  onGiveLike: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGiveLike,
    ).inject(
      callback
    )
  ),

  onExchange: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onExchange,
    ).inject(
      callback
    )
  ),

  onGetItem: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGetItem,
    ).inject(
      callback
    )
  ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);