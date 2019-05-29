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
import { BackIcon } from '../../constant/Icon';
import styles from './Waitting.styles';
import Color from '../../constant/Color';

class Waitting extends Component {
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
      getWaitting,
    } = this.action;

    LocalStorage.getToken((res) => {
      getWaitting ({
        token: res,
        page: Math.floor((this.state.amount / 5)),
      });
    })
  }

  get action () {
    let {
      getWaitting = () => console.log(` Vừa gởi yêu cầu lấy những vật phẩm mà tôi đang chờ chấp nhận trao đổi.`),
      navigateToExchange = () => console.log(` Vừa bấm chuyển sang màn hình trao đổi.`),
      navigateToDetail = () => console.log(` Vừa bấm chuyển sang màn hình chi tiết.`),
      navigateToHome = () => console.log(` Vừa bấm chuyển sang màn hình chính.`),
      onGetWaitting = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm mà tôi đang chờ được chấp nhận trao đổi.`),
      onGiveLike = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đã like.`),
      onApproved = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đã được chấp thuận.`),
      onExchange = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đang trao đổi.`),
    } = this.props;
    return {
      navigateToDetail,
      navigateToExchange,
      getWaitting,
      onGetWaitting,
      navigateToHome,
      onGiveLike,
      onApproved,
      onExchange,
    };
  }

  get dependencies () {
    let {
      visible = false,
      waitting = [],
      token = null,
      user= null,
      post,
    } = this.props;
    return {
      visible,
      waitting,
      token,
      user,
      post,
    };
  }

  componentDidMount () {
    let {
      onGetWaitting,
      onGiveLike,
      onApproved,
      onExchange,
    } = this.action;

    // this.onRefresh();

    onGetWaitting((res) => {
      if(res.code === Codes.Success) {
          let temp = this.state.list.slice();
            temp.splice(
              Math.floor(this.state.list.length / 5) * 5,
              this.state.list.length % 5,
            );

          let newAmount = this.state.list.length + this.dependencies.waitting.list.length;

          this.dependencies.waitting.list.forEach((val1) => {
            temp = temp.filter((val2) => val2.item._id !== val1.item._id);
            temp = temp.concat([val1]);
          })
          console.log(`length: ${newAmount}`)
          this.setState({
            list: temp.slice(),
            amount: newAmount,
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
    const _style = styles.label;
    return {
      screen: (<Text style={_style.screen}>Giỏ của tôi</Text>)
    }
  }

  get button () {
    let {
      navigateToHome,
    } = this.action;
    return {
      back: (
        <TouchableOpacity 
          style={{flex: 1, flexDirection: 'row'}}
          onPress={()=> {navigateToHome()}}>
          <BackIcon 
            color={Color.Gray}/>
          {this.label.screen}
        </TouchableOpacity>
      )
    }
  }

  get header () {
    return (
      <View style={{flex: 1}}>
        {this.button.back}
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
          
          item = {
            ...item.item
          };
          // console.log(`cardPost Waitting ${JSON.stringify(item)}`)
          // console.log(`cardPost Waitting ${JSON.stringify(item.owner)}`)

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
        onEndReached = {() => {}}
        onEndReachedThreshold={0.5}
        keyExtractor={(item,index)=>`PostIndex${index}`}
      />
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
  // console.log(`state chỗ waitting ${JSON.stringify(state)}`)

  return {
    token: state.auth.token,
    waitting: state.waitting,
    user: state.user,
    post: state.post,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getWaitting: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitGetWaitting,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  onGetWaitting: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGetWaitting,
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
)(Waitting);