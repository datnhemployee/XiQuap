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
import LocalStorage from '../../storage/LocalStorage';
import StockAction from '../../actions/Stock/StockAction';
import StockActionType from '../../actions/Stock/StockActionType';
import SnippetStock from '../../components/snippetStock/SnippetStock';
import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
import { BackIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import Typeface from '../../constant/Font';

class Bought extends Component {
  constructor (props) {
    super(props);
    this.state = {
      refreshing: false,
      list: [],
      amount: 0,
      point: 0,
    }

    this.onRefresh = this.onRefresh.bind(this);
  }

  getMore () {
    // let {
    //   token,
    // } = this.dependencies;
    let {
      getBought,
    } = this.action;

    LocalStorage.getToken((res) => {

      getBought ({
        token: res,
        page: Math.floor((this.state.amount / 6)),
      });
    })
  }

  get action () {
    let {
      getBought = () => console.log(` Vừa gởi yêu cầu lấy những vật phẩm mà tôi đã mua.`),
      navigateToStockDetail = () => console.log(` Vừa bấm chuyển sang màn hình chi tiết vật phẩm.`),
      navigateToHome= () => console.log(` Vừa bấm chuyển sang màn hình vật phẩm.`),
      onGetBought = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đã mua.`),
      onGetInfo = () => console.log(` Đang chờ yêu cầu lấy thông tin cá nhân.`),
      onApprove = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đã được chấp thuận.`),
      onBuy = () => console.log(` Đang chờ yêu cầu lấy những vật phẩm đang mua.`),
    } = this.props;
    return {
      navigateToStockDetail,
      navigateToHome,
      getBought,
      onGetBought,
      onApprove,
      onBuy,
      onGetInfo,
    };
  }

  get dependencies () {
    let {
      visible = false,
      bought = [],
      token = null,
      user= null,
      stock,
      point = 0,
    } = this.props;
    return {
      visible,
      bought,
      token,
      user,
      stock,
      point,
    };
  }

  componentDidMount () {
    let {
      onApprove,
      onBuy,
      onGetBought,
      onGetInfo,
    } = this.action;

    this.onRefresh();

    onGetBought((res) => {
      if(res.code === Codes.Success) {
          let temp = this.state.list.slice();
            temp.splice(
              Math.floor(this.state.list.length / 6) * 6,
              this.state.list.length % 6,
            );
          temp = temp.concat(this.dependencies.bought.list);
          console.log(`length: ${temp.length}`)
          this.setState({
            list: temp.slice(),
            amount: temp.length,
          });
          // MessageBox(`Lấy thêm dữ liệu thành công`);
      }
    })

    onBuy ((res) => {
      if (res.code === Codes.Success) {
        
        let temp = this.dependencies.stock;

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

    onApprove ((res) => {
        console.log(`Approve nè ${JSON.stringify(res)}`)
        console.log(`state bought nè ${JSON.stringify(this.state)}`)
        if (res.code === Codes.Success) {
        
        let temp = this.dependencies.stock;
        console.log(`depende bought nè ${JSON.stringify(this.dependencies.stock)}`)

        let foundPostIndex = this.state.list.findIndex((val)=>{
          console.log(`val.id `,val._id)
          console.log(`temp.id `, temp._id)
          return val._id === temp._id});
        if (foundPostIndex != -1) {
          let returnList = this.state.list.slice();
          returnList[foundPostIndex] = temp;

          this.setState({
            list: returnList.slice(),
          });
        }
      }
    })

    onGetInfo((res) => {
      if (res.code === Codes.Success) {
        
        this.setState({
          point: this.dependencies.point,
        });
      }
    })
  }

  onRefresh () {
    this.setState({refreshing: true});
    this.getMore();
    this.setState({refreshing: false});
  }

  get label () {
    let {
      point,
    } = this.dependencies;
    return {
      screen: (<Text style={{
        flex: 1, 
        ...Typeface.header[5],
        textAlign: `left`,
        textAlignVertical: 'bottom',
      }}>Sạp điểm</Text>),
      point: (<Text style={{
        flex: 1,
        ...Typeface.overline,
        textAlign: `left`,
        textAlignVertical: 'top',
      }}> TÔI: {point} ĐIỂM</Text>),
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
          <BackIcon 
            color={Color.Gray}/>
        </TouchableOpacity>
      )
    }
  }

  get header () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Color.LighGray,
        flexDirection: `row`,
        }}>
        {this.button.back}
        <View 
        style={{
          flex: 5,
        }}>
          {this.label.screen}
          {this.label.point}
        </View>
      </View>
    )
  }

  get body () {
    let {
      navigateToStockDetail,
    } = this.action;

    let {
      user,
    } = this.dependencies;
    return (
      <View style={{flex: 8}}>
        <FlatList
        style = {{flex: 1,borderWidth: 1}}
        data = {this.state.list}
        // numColumns = {2}
        renderItem = {({item}) => {
          
          // item = item.stock;
          console.log(`snippetStock ${JSON.stringify(item)}`)
          return (
          <SnippetStock
            // height = {400}
            // width = {200}
            name = {item.name}
            id = {item._id}
            description = {item.description}
            photoUrl = {item.mainPicture}
            type = {item.typeName}
            point = {item.point}
            onwerName = {user.name}
            onwerId= {user._id}
            onwerTotalStar= {user.totalStar}
            ownerAvatar= {user.avatar}
            approve = {item.approve}
            selling = {false}

            navigateToStockDetail = {navigateToStockDetail}
          />)
        }}
        showsVerticalScrollIndicator = {false}
        refreshing = {this.state.refreshing}
        onRefresh = {this.onRefresh}
        onEndReached = {()=>{}}
        onEndReachedThreshold={0.5}
        keyExtractor={(item,index)=>`StockIndex${index}`}
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
  // console.log(`state chỗ Bought ${JSON.stringify(state.stock)}`)

  return {
    token: state.auth.token,
    point: state.user.point,
    bought: state.bought,
    user: state.user,
    stock: state.stock,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBought: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    StockAction.emit(
        StockActionType.emitGetBought,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  onGetBought: (
    callback = (res)=>{},
  ) => dispatch(
    StockAction.on(
      StockActionType.onGetBought,
    ).inject(
      callback
    )
  ),

  onBuy: (
    callback = (res)=>{},
  ) => dispatch(
    StockAction.on(
      StockActionType.onBuy,
    ).inject(
      callback
    )
  ),

  onApprove: (
    callback = (res)=>{},
  ) => dispatch(
    StockAction.on(
      StockActionType.onApprove,
    ).inject(
      callback
    )
  ),

  onGetInfo: (
    callback = (res)=>{},
  ) => dispatch(
    AuthAction.on(
      AuthActionType.onGetInfo,
    ).inject(
      callback
    )
  ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bought);