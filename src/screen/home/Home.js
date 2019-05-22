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
      page: 0,
      posts: [],
    }

    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onCardPostClick = this.onCardPostClick.bind(this);
    this.onCardPostLikeClick = this.onCardPostLikeClick.bind(this);
    this.onCardPostExchangeClick = this.onCardPostExchangeClick.bind(this);
  }

  getMore() {
    let {
      getMore,
    } = this.action;
    LocalStorage.getToken((token)=>{
      getMore({
        page: this.state.page,
        token: token,
      });
    })
  }

  giveLike (id) {
    let {
      giveLike,
    } = this.action;

    let {
      token,
    } = this.dependencies;
    giveLike({
      _id: id,
      token,
    });
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
      giveLike = () => {},
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
      giveLike,
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
        // console.log(`Đã lấy thêm được ${JSON.stringify(this.dependencies.posts.slice())}`)
        let temp = this.dependencies.posts.slice();
        temp = [...this.state.posts,...temp];
        this.setState({
          posts: temp,
          page: this.state.page + 1,
        });
        // MessageBox(`Lấy thêm dữ liệu thành công`);
      } else {
        // MessageBox(`Đã lấy được toàn bộ dữ liệu`);
      }
    });

    onGiveLike ((res) => {
      if (res.code === Codes.Success) {
        temp = this.dependencies.posts.slice();
        this.setState({
          posts: temp,
          page: this.state.page + 1,
        });
      }
    })

    onExchange ((res) => {
      if (res.code === Codes.Success) {
        temp = this.dependencies.posts.slice();
        this.setState({
          posts: temp,
          page: this.state.page + 1,
        });
      }
    })
  }

  onCardPostExchangeClick (item) {
    let {
      navigateToExchange,
    } = this.action;

    navigateToExchange(item);
  }

  onCardPostLikeClick (id) {
    this.giveLike(id);
  }

  onCardPostClick (item) {
    let {
      navigateToDetail, 
    } = this.props;

    navigateToDetail(item);
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
      posts = [],
      token,
    } = this.props;
    // console.log(`dependencies chỗ Home ${JSON.stringify(posts)}`)

    return {
      visible,
      posts,
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
    return (
    <View style={{flex: 1}}>
      <FlatList
        data = {this.state.posts}
        renderItem = {({item}) => {
          
          console.log(`cardPost ${JSON.stringify(item)}`)

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

            giveLike = {this.onCardPostLikeClick}
            navigateToExchange = {this.onCardPostExchangeClick}
            navigateToDetail = {this.onCardPostClick}
          />)
        }}
        showsVerticalScrollIndicator = {false}
        refreshing = {this.state.refreshing}
        onRefresh = {this.onRefresh}
        onEndReached = {this.onEndReached}
        onEndReachedThreshold={0.5}
        keyExtractor={(item,index)=>`PostIndex${item.ownerId}`}
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
    posts: state.post.list,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMore: (
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
  exchange: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitExchange,
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
      ExchangeActionType.onGetItem,
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