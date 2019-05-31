import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import StockAction from '../../actions/Stock/StockAction';
import StockActionType from '../../actions/Stock/StockActionType';
import { Codes } from '../../constant/Response';
import MessageBox from '../../components/MessageBox';
import { BackIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import Typeface from '../../constant/Font';

import styles from './StockDetail.styles';
import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
const {
  height,
} = Dimensions.get(`screen`);
class StockDetail extends Component {
  constructor (props) {
    super(props);

    this.getOther = this.getOther.bind(this);
    
  }

  // logic

  getOther () {
    let {
      stock,
      token,
    } = this.dependencies;
    let {
      getOther,
    } = this.action;

    getOther({
      _id: stock.owner._id,
      token: token,
    })
  }

  approve () {
    let {
      approve,
      navigateToHome,
    } = this.action;

    let {
      stock,
      token,
    } = this.dependencies;
    approve({
      token,
      _id: stock._id,
    },() => {},
    (res) => {});
  }

  buy () {
    let {
      buy,
      navigateToHome
    } = this.action;

    let {
      token,
      stock,
    } = this.dependencies;

    buy ({
      token,
      _id: stock._id,
    },()=> {},
    ()=>{
      MessageBox(` Đang gửi dữ liệu lên máy chủ.`);
      navigateToHome();
    })
  }

  get action () {
    let {
      buy = () => {console.log(`Vừa bấm đồng ý đổi quà`)},
      approve = () => {console.log(`Vừa bấm kiểm định`)},
      onBuy = () => {console.log(` Đang chờ nhận kết quả đổi quà.`)},
      onGetOne = () => {console.log(` Đang chờ nhận kết quả lấy chi tiết vật phẩm.`)},
      getOther = () => {console.log(` Đang chờ lấy thông tin người khác.`)},

      onGetOther = () => {console.log(` Đang chờ nhận thông tin người khác.`)},
      onApprove = () => {console.log(` Đang chờ nhận kết quả kiểm định chi tiết vật phẩm.`)},
      navigateToHome = () => {console.log(`Vừa bấm chuyển sang màn hình quà tặng`)},
      navigateToOther = () => {console.log(`Vừa bấm chuyển sang màn hình thông tin người khác`)},
    } = this.props;
    return {
      buy,
      approve,
      navigateToHome,
      onBuy,
      onGetOne,
      onApprove,
      getOther,
      onGetOther,
      navigateToOther,
    }
  }

  get dependencies () {
    let {
      stock = null,
      token =null,
      visible = false,
      isAdmin = false,
    } = this.props;
    return {
      stock,
      token,
      visible,
      isAdmin,
    };
  }

  componentDidMount () {
    let {
      onBuy,
      onGetOne,
      onApprove,
      onGetOther,
      navigateToOther,
    } = this.action;

    onBuy((res) => {
      if (res.code === Codes.Success){
        this.renew ();
      }
    })

    onGetOne((res) => {
      if (res.code === Codes.Success){
        this.renew ();
      }
    })

    onApprove((res) => {
      if (res.code === Codes.Success){
        this.renew ();
      }
    })

    onGetOther ((res) => {
      if (res.code === Codes.Success){
        navigateToOther();
      } else {
        MessageBox(res.content);
      }
    })
  }

  renew () {
    this.setState({});
  }

  // Design

  approveButton_onClick () {
    this.approve();
  }

  buyButton_onClick () {
    this.buy();
  }

  backButton_onClick () {
    let {
      navigateToHome
    } = this.action;
    navigateToHome();
  }

  get empty () {
    return (<Text>Lỗi hiển thị</Text>);
  }
  
  get label () {
    let {
      stock,
    } = this.dependencies;

    const screen = (
      <Text 
        style={{
          flex: 5, 
          ...Typeface.header[5],
          textAlign: 'left', 
          textAlignVertical: 'center'
        }}>Chi tiết</Text>);
    // console.log(`stock.id ${JSON.stringify(stock)}`);
    if (!stock._id){
      return {
        screen: screen,
        name: this.empty,
        description: this.empty,
        type: this.empty,
        point: this.empty,
        onwerName: this.empty,
        onwerTotalStar: this.empty,
        approve: this.empty,
      }
    }

    let {
      name = '',
      id = '',
      description = '',
      mainPicture = '',
      type = '',
      point = 0,
      owner,
      approve = false,
    } = stock;

    const _style = styles.label;

    return {
        screen: screen,
        name: (<Text style={_style.name}>{name}</Text>),
        description: (<Text style={_style.description}>{description}</Text>),
        type: (<Text style={_style.type}>{type}</Text>),
        point: (<Text style={_style.point}>{point} điểm</Text>),
        onwerName: (<Text style={_style.onwerName}>@{owner.name}</Text>),
        onwerTotalStar: (<Text style={_style.onwerTotalStar}>{owner.totalStar} sao</Text>),
        approve: (<Text style={[_style.approve,!approve?{}:{color: Color.DarkGreen}]}> 
          {!approve ?`CHƯA DUYỆT`:`ĐÃ DUYỆT`}</Text>),
    }
  }

  get image () {
    let {
      height, 

      mainPicture,
    } = this.dependencies.stock; 

    return {
      mainPicture: (
        <View 
          style={{
            flex: 5,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Image 
          style={{
            flex: 1,
            width: `100%`,
            height: `100%`,
          }}
          resizeMode = {'stretch'} 
          source={
            !!mainPicture?
            {uri: mainPicture}
            :require('../../img/default.png')}/>
        </View>
      ),
    }
  }

  get button () {
    let {
      stock,
    } = this.dependencies;
    const _style = styles.button;
    return {
      buy: (
        <TouchableOpacity 
          style={_style.buy}
          onPress={()=>{this.buyButton_onClick()}}
          >
          <Text style={_style.buyText}>ĐỔI QUÀ</Text>
        </TouchableOpacity>
      ),
      back: (
        <TouchableOpacity 
          style={{
            flex: 1,
            // borderWidth: 1,
          }}
          onPress={()=>{this.backButton_onClick()}}
          >
          <BackIcon 
            color = {Color.Gray}
          />
        </TouchableOpacity>
      ),
      approve: !!stock._id?(
        <TouchableOpacity 
          style={_style.approve}
          onPress={()=>{this.approveButton_onClick()}}
          >
          <Text style={[_style.approveText,
            stock.approve?{color:`green`}:{color:`grey`}]}>DUYỆT</Text>
        </TouchableOpacity>
      ):(<View/>),
      info: !!stock._id?(
        <TouchableOpacity 
          style={{
            flex: 2,
            // borderWidth: 1,
          }}
          onPress={()=>{this.getOther()}}
          >
          {this.label.onwerName}
          {this.label.onwerTotalStar}
        </TouchableOpacity>
      ):this.empty,
    }
  }

  get header () {
    return (
    <View  style={{
      flex: 1,
      // borderWidth: 1, 
      flexDirection: 'row',
      backgroundColor: Color.LighGray,
      }}>
      {this.button.back}
      {this.label.screen}
    </View>)
  }

  get body () {
    let {
      isAdmin,
    } = this.dependencies;

    return (
    <View style={{
      flex: 8,
      // borderWidth: 1, 
      padding: 10
      }}>
      {this.button.info}
      {this.image.mainPicture}
      {this.label.approve}
      {this.label.name}
      {this.label.point}
      {this.label.description}
      {this.button.buy}
      {isAdmin?this.button.approve:(<View/>)}
    </View>)
  }

  get footer () {
    return (<View/>)
  }
  get form () {
    const {
      description,
    } = this.dependencies.stock;
    const _height = height + ((!description)?0:description.length/ 2);
    return (
      <ScrollView style={{
        flex: 1,
        // borderWidth: 1,
        padding: 5
        }}>
        <View style={{
          height: _height,
          // borderWidth: 1
          }}>
          {this.header}
          {this.body}
          {this.footer}
        </View>
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
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
    stock: state.stock,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => ({
  
  approve: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    StockAction.emit(
        StockActionType.emitApprove,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  buy: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    StockAction.emit(
        StockActionType.emitBuy,
      ).inject(
        data,
        pre,
        next
      ),
  ),

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

  onBuy: (
    callback = (res)=>{},
  ) => dispatch(
    StockAction.on(
      StockActionType.onBuy,
    ).inject(
      callback
    )
  ),

  onGetOne: (
    callback = (res)=>{},
  ) => dispatch(
    StockAction.on(
      StockActionType.onGetOne,
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
)(StockDetail);