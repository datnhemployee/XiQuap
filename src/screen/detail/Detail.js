import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import CardPost from '../../components/card/CardPost';
import ExchangeCard from '../../components/exchangeCard/ExchangeCard';

import { Codes } from '../../constant/Response';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';

import { connect } from 'react-redux';

class Detail extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.onCardPostExchangeClick = this.onCardPostExchangeClick.bind(this);
  }

  giveLike (id) {
    let {
      giveLike,
    } = this.action;

    giveLike({
      _id: id,
      token,
    })
  }

  get action () {
    let {
      navigateToHome = () => console.log(` Vừa bấm chuyển sang màn hình chính.`),
      navigateToExchange = () => console.log(` Vừa bấm chuyển sang màn hình trao đổi .`),

      giveLike = () => console.log(` Vừa bấm thích vật phẩm .`),
      onGiveLike = () => console.log(` Đang chờ thông tin like từ máy chủ .`),
      onGetItem = () => console.log(` Đang chờ vật phẩm từ máy chủ .`),
      onExchange = () => console.log(` Đang chờ thông tin trao đổi từ máy chủ .`),
      
    } = this.props;
    return {
      navigateToHome,
      navigateToExchange,

      giveLike,
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

  get label () {
    let {
      item,
    } = this.dependencies;

    return {
      vendeeTotalStar:(<Text >{item.vendeeTotalStar} sao</Text>),
      vendeeName: !!item.vendeeName? 
        (<Text > Đã chấp nhận {item.vendeeName}</Text>)
        :(<Text > Chưa chấp nhận </Text>),
      vendeeGiveStar: !!item.vendeeGiveStar? 
        (<Text > Được 1 sao </Text>)
        :(<Text > Chưa tặng sao </Text>),
    }
  }

  get button () {
    return {
      back: (<TouchableOpacity 
        onPress = {this.onBackButtonClick}>
        <Text>Trở lại</Text>
      </TouchableOpacity>),
    }
  }

  get list () {
    let {
      item,
    } = this.dependencies;

    console.log(`onGetPost_vendeeName item: ${JSON.stringify(item)}`)

    return {
      exchange: (
      <FlatList 
        data={!item ? []: item.itemList}
        renderItem = {(element) => {
          element = element.item;
          console.log(`onGetPost_vendeeName element: ${JSON.stringify(element)}`)

          return (
            <ExchangeCard 
              id = {element._id}
              name = {element.name}
              description = {element.description}
              photoUrl = {element.photoUrl}
              vendeeName = {element.vendee.name}
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

    return (
      <View>
        {this.button.back}
        {!!item?  <CardPost
            height = {500}

            id = { item._id}
            ownerId = {item.ownerId}
            ownerName = {!item.ownerName}
            ownerAvatar = {item.ownerAvatar}
            mainPicture = {item.mainPicture}
            name = {item.name}
            description = {item.description}
            totalLike = {item.totalLike}
            totalItem = {item.totalItem}

            navigateToExchange = {this.onCardPostExchangeClick}
            navigateToDetail = {() => {}}
          />:<Text >Thông tin rỗng </Text>}
      </View>  
    )}
  get body () {
    return (
      <View  style={{flex: 1}}>
        {this.label.vendeeName}
        {this.label.vendeeGiveStar}
        {this.label.vendeeTotalStar}
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
      <ScrollView style={{flex: 1}}>
        {this.header}
        {this.body}
        {this.footer}
      </ScrollView>
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
  console.log(`state Detail: ${JSON.stringify(state)}`);

  return {
    token: state.auth.token,
    item: state.post,
  }
}

const mapDispatchToProps = (dispatch) => ({
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