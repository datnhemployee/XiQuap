import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CardPost from '../../components/card/CardPost';

import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import { Codes } from '../../constant/Response';
import MessageBox from '../../components/MessageBox';
import LocalStorage from '../../storage/LocalStorage';

import { connect } from 'react-redux';

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
      
      getMore = () => {console.log(`Đang lấy thêm dữ liệu`)},
      onGetMore = () => {},
      onGiveLike = () => {},
      onExchange = () => {},
    } = this.props;
    return {
      navigateToPost,
      navigateToLogIn,
      navigateToInfo,
      navigateToDetail,
      navigateToExchange,

      getMore,
      onGetMore,
      onGiveLike,
      onExchange,
    }
  }

  componentDidMount () {
    let {
      onGetMore,
      onGiveLike,
      onExchange,
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
      visible = false,
      post = [],
      token,
    } = this.props;
    // console.log(`dependencies chỗ Home ${JSON.stringify(list)}`)

    return {
      visible,
      post,
      token,
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
    return (
    <View
      style={{flex: 1}}
    >
      {this.button.post}
    </View>)
  }

  get body () {
    let {
      navigateToExchange,
      navigateToDetail,
    } = this.action;
    return (
    <View style={{flex: 1}}>
      <FlatList
        data = {this.state.list}
        renderItem = {({item}) => {
          
          // console.log(`cardPost ${JSON.stringify(item)}`)

          return (
          <CardPost
            height = {500}

            id = {item._id}
            ownerId = {item.ownerId}
            ownerName = {item.ownerName}
            ownerAvatar = {item.ownerAvatar}
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

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);