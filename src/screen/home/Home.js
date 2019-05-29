import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import CardPost from '../../components/card/CardPost';

import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import { Codes } from '../../constant/Response';
import MessageBox from '../../components/MessageBox';
import LocalStorage from '../../storage/LocalStorage';

import { connect } from 'react-redux';
import { AddIcon, WaittingIcon, SellingIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import TypeItemAction from '../../actions/Type/TypeItemAction';
import TypeItemActionType from '../../actions/Type/TypeItemActionType';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      refreshing: false,
      amount: 0,
      list: [],
    }

    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  getMore() {
    let {
      getMore,
    } = this.action;
    LocalStorage.getToken((token)=>{
      getMore({
        page: Math.floor((this.state.amount / 5)),
        token: token,
      });
    })
  }

  get action () {
    let {
      navigateToPost = () => {console.log(`Vừa bấm chuyển sang màn hình đăng bài`)},
      navigateToLogIn = () => {console.log(`Vừa bấm chuyển sang màn hình đăng nhập`)},
      navigateToInfo = () => {console.log(`Vừa bấm chuyển sang màn hình chính`)},
      navigateToDetail = () => {console.log(`Vừa bấm chuyển sang màn hình chi tiết`)},
      navigateToExchange = () => {console.log(`Vừa bấm chuyển sang màn hình trao đổi`)},
      navigateToMyShop = () => {console.log(`Vừa bấm chuyển sang màn hình sạp của tôi`)},
      navigateToWaitting = () => {console.log(`Vừa bấm chuyển sang màn hình vật chờ trao đổi`)},
      
      getMore = () => {console.log(`Đang lấy thêm dữ liệu`)},
      getAllType = () => {console.log(`Đang lấy thêm toàn bộ loại vật phẩm`)},
      onGetMore = () => {},
      onGiveLike = () => {},
      onExchange = () => {},
      onApproved = () => {},
    } = this.props;
    return {
      navigateToPost,
      navigateToLogIn,
      navigateToInfo,
      navigateToDetail,
      navigateToExchange,
      navigateToMyShop,
      navigateToWaitting,
      getAllType,

      getMore,
      onGetMore,
      onGiveLike,
      onExchange,
      onApproved,
    }
  }

  componentDidMount () {
    let {
      onGetMore,
      onGiveLike,
      onExchange,
      onApproved,
    } = this.action;

    this.onRefresh();
    onGetMore((res)=>{

      if (res.code===Codes.Success){
        let temp = this.state.list.slice();
          temp.splice(
            Math.floor(this.state.list.length / 5) * 5,
            this.state.list.length % 5,
          );
        temp = temp.concat(this.dependencies.post.list);
        console.log(`length: ${temp.length}`)
        this.setState({
          list: temp.slice(),
          amount: temp.length,
        });
        // MessageBox(`Lấy thêm dữ liệu thành công`);
      } else {
        // MessageBox(`Đã lấy được toàn bộ dữ liệu`);
      }

    });

    onGiveLike ((res) => {
      if (res.code === Codes.Success) {
        
        let temp = this.dependencies.post;

        let foundPostIndex = this.state.list.findIndex((val)=>val._id === temp._id);
        if (foundPostIndex != -1) {
          let returnList = this.state.list.slice();
          returnList[foundPostIndex] = temp;

          this.setState({
            list: returnList.slice(),
          });
        }
        
      }
    })

    onExchange ((res) => {
      if (res.code === Codes.Success) {
        
        let temp = this.dependencies.post;

        let foundPostIndex = this.state.list.findIndex((val)=>val._id === temp._id);
        if (foundPostIndex != -1) {
          let returnList = this.state.list.slice();
          returnList[foundPostIndex] = temp;

          this.setState({
            list: returnList.slice(),
          });
        }
        
      }
    })

    onApproved ((res) => {
      if (res.code === Codes.Success) {
        
        console.log(` Trả về cho người dùng ${JSON.stringify(res)}`)
        console.log(` state.list ${JSON.stringify(this.state.list)}`)

        let temp = this.dependencies.post;
        console.log(` temp ${JSON.stringify(temp)}`)

        let foundPostIndex = this.state.list.findIndex((val)=>val._id === temp._id);
        console.log(` foundPostIndex ${JSON.stringify(foundPostIndex)}`)

        if (foundPostIndex != -1) {
          this.state.list.splice(foundPostIndex - 1,1);
        console.log(` state after${JSON.stringify(this.state.list)}`)

          this.setState({list: this.state.list.slice()});
        }
        
      }
    })
  }

  onRefresh () {
    this.setState({refreshing: true});
    this.getMore();
    this.setState({refreshing: false});
  }

  onEndReached () {
    // this.onRefresh();
  }

  get dependencies () {
    let {
      post = [],
      token,
    } = this.props;
    // console.log(`dependencies chỗ Home ${JSON.stringify(list)}`)

    return {
      post,
      token,
    };
  }

  postButton_onClick () {
    let {
      navigateToPost,
      getAllType,
    } = this.action;
    getAllType({},() => {},
    () => {navigateToPost();})
  }
  shopButton_onClick () {
    let {
      navigateToMyShop,
    } = this.action;
    navigateToMyShop();
  }
  waitButton_onClick () {
    let {
      navigateToWaitting,
    } = this.action;
    navigateToWaitting();
  }

  get button () {
    return {
      post: (
        <TouchableOpacity 
          style={{flex: 1, justifyContent: 'center', alignContent: 'flex-start'}}
          onPress={()=>{this.postButton_onClick()}}
          >
          <AddIcon color={Color.Black}/>
        </TouchableOpacity>
      ),
      shop: (
        <TouchableOpacity 
          style={{flex: 1, justifyContent: 'center', alignContent: 'flex-end'}}
          onPress={()=>{this.shopButton_onClick()}}
          >
          <SellingIcon color={Color.Black}/>
        </TouchableOpacity>
      ),
      wait: (
        <TouchableOpacity 
          style={{flex: 1, justifyContent: 'center', alignContent: 'flex-start'}}
          onPress={()=>{this.waitButton_onClick()}}
          >
          <WaittingIcon color={Color.Black}/>
        </TouchableOpacity>
      )
    }
  }
  get header () {
    return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Color.LighGray}}>
        {this.button.shop}
        <View style={{
          flex: 5,
          padding: 10,
          }}>
          <Image 
          style={{
            flex: 1,
            width: `100%`,
            height: `100%`,
            }}
          resizeMode = {'contain'}
          source = {require('../../img/name.png')}
          />
        </View>
        {this.button.wait}
        {this.button.post}
    </View>)
  }

  get body () {
    let {
      navigateToExchange,
      navigateToDetail,
    } = this.action;
    return (
    <View style={{flex: 8}}>
      <FlatList
        data = {this.state.list}
        renderItem = {({item}) => {
          
          // console.log(`cardPost ${JSON.stringify(item)}`)

          return (
          <CardPost
            height = {500}

            id = {item._id}
            ownerId = {item.owner._id}
            ownerName = {item.owner.name}
            ownerAvatar = {item.owner.avatar}
            mainPicture = {item.mainPicture}
            name = {item.name}
            description = {item.description}
            totalLike = {item.totalLike}
            totalItem = {item.totalItem}

            navigateToExchange = {navigateToExchange}
            navigateToDetail = {navigateToDetail}
          />)
        }}
        showsVerticalScrollIndicator = {false}
        refreshing = {this.state.refreshing}
        onRefresh = {this.onRefresh}
        onEndReached = {this.onEndReached}
        onEndReachedThreshold={0.5}
        keyExtractor={(item,index)=>`PostIndex${index}`}
      />
    </View>)
  }

  get footer () {
    return (<View/>)
  }
  get form () {
    return (
      <View style={{flex: 1, backgroundColor: Color.LighGray}}>
        {this.header}
        {this.body}
        {this.footer}
      </View>
    )
  }

  render() {
    return this.form;
  }
}


const mapStateToProps = (state) => {
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
    post: state.post,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMore: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitGetItemByPage,
      ).inject(
        data,
        pre,
        next
      ),
  ),
  getAllType:  (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    TypeItemAction.emit(
        TypeItemActionType.emitGetAll,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  onGetMore: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGetItemByPage,
    ).inject(
      callback
    )
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
  onApproved: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onApproveItem,
    ).inject(
      callback
    )
  ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);