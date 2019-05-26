import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Codes } from '../../constant/Response';

import { connect } from 'react-redux';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import LocalStorage from '../../storage/LocalStorage';
import CardPost from '../../components/card/CardPost';

class MyShop extends Component {
  constructor (props) {
    super(props);
    this.state = {
      refreshing: false,
      list: [],
      amount: 0,
    }

    this.onRefresh = this.onRefresh.bind(this);
  }

  getMore () {
    // let {
    //   token,
    // } = this.dependencies;
    let {
      getMyShop,
    } = this.action;

    LocalStorage.getToken((res) => {
      getMyShop ({
        token: res,
        page: Math.floor((this.state.amount / 5)),
      });
    })
  }

  get action () {
    let {
      getMyShop = () => console.log(` Vừa gởi yêu cầu lấy những vật phẩm mà tôi đã đăng.`),
      navigateToExchange = () => console.log(` Vừa bấm chuyển sang màn hình trao đổi.`),
      navigateToDetail = () => console.log(` Vừa bấm chuyển sang màn hình chi tiết.`),
      navigateToHome = () => console.log(` Vừa bấm chuyển sang màn hình chính.`),
      onGetMyShop = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đã đăng.`),
      onGiveLike = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đã like.`),
      onApproved = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đã được chấp thuận.`),
      onExchange = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đang trao đổi.`),
    } = this.props;
    return {
      navigateToDetail,
      navigateToExchange,
      getMyShop,
      onGetMyShop,
      navigateToHome,
      onGiveLike,
      onApproved,
      onExchange,
    };
  }

  get dependencies () {
    let {
      visible = false,
      myShop = [],
      token = null,
      user= null,
      post,
    } = this.props;
    return {
      visible,
      myShop,
      token,
      user,
      post,
    };
  }

  componentDidMount () {
    let {
      onGetMyShop,
      onGiveLike,
      onApproved,
      onExchange,
    } = this.action;

    // this.onRefresh();

    onGetMyShop((res) => {
      if(res.code === Codes.Success) {
          let temp = this.state.list.slice();
            temp.splice(
              Math.floor(this.state.list.length / 5) * 5,
              this.state.list.length % 5,
            );
          temp = temp.concat(this.dependencies.myShop.list);
          console.log(`length: ${temp.length}`)
          this.setState({
            list: temp.slice(),
            amount: temp.length,
          });
          // MessageBox(`Lấy thêm dữ liệu thành công`);
      }
    })

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
  }

  onRefresh () {
    this.setState({refreshing: true});
    this.getMore();
    this.setState({refreshing: false});
  }

  get label () {
    return {
      screen: (<Text style={{flex: 1}}>Sạp của tôi</Text>)
    }
  }

  get button () {
    let {
      navigateToHome,
    } = this.action;
    return {
      back: (
        <TouchableOpacity 
          style={{flex: 1}}
          onPress={()=> {navigateToHome()}}>
          <Text>Trở lại </Text>
        </TouchableOpacity>
      )
    }
  }

  get header () {
    return (
      <View style={{flex: 1}}>
        {this.button.back}
        {this.label.screen}
      </View>
    )
  }

  get body () {
    let {
      navigateToDetail,
      navigateToExchange,
    } = this.action;

    let {
      user,
    } = this.dependencies;
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
            ownerId = {!user?undefined:user._id}
            ownerName = {!user?undefined:user.name}
            ownerAvatar = {!user?undefined:user.avatar}
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
        onEndReached = {() => {}}
        onEndReachedThreshold={0.5}
        keyExtractor={(item,index)=>`PostIndex${index}`}
      />
      </View>
    )
  }

  get header () {
    return (
      <View style={{flex: 1}}>
        {this.button.back}
        {this.label.screen}
      </View>
    )
  }

  get footer () {
    return (<View></View>)
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
        onShow={()=> {this.onRefresh()}}
        >
        {this.form}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
    myShop: state.myShop,
    user: state.user,
    post: state.post,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMyShop: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitGetMyShop,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  onGetMyShop: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGetMyShop,
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

  onGiveLike: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGiveLike,
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
)(MyShop);