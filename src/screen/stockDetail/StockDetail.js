import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ImageSize} from '../../constant/Image';

import { connect } from 'react-redux';
import StockAction from '../../actions/Stock/StockAction';
import StockActionType from '../../actions/Stock/StockActionType';
import { Codes } from '../../constant/Response';
import MessageBox from '../../components/MessageBox';

class StockDetail extends Component {
  constructor (props) {
    super(props);
    
  }

  // logic

  approve () {
    let {
      approve,
      navigateToStock,
    } = this.action;

    let {
      stock,
      token,
    } = this.dependencies;
    approve({
      token,
      _id: stock._id,
    },() => {},
    (res) => {navigateToStock()});
  }

  buy () {
    let {
      buy,
      navigateToStock,
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
      navigateToStock();
    })
  }

  get action () {
    let {
      buy = () => {console.log(`Vừa bấm đồng ý đổi quà`)},
      approve = () => {console.log(`Vừa bấm kiểm định`)},
      onBuy = () => {console.log(` Đang chờ nhận kết quả đổi quà.`)},
      onGetOne = () => {console.log(` Đang chờ nhận kết quả lấy chi tiết vật phẩm.`)},
      onApprove = () => {console.log(` Đang chờ nhận kết quả kiểm định chi tiết vật phẩm.`)},
      navigateToStock = () => {console.log(`Vừa bấm chuyển sang màn hình quà tặng`)},
    } = this.props;
    return {
      buy,
      approve,
      navigateToStock,
      onBuy,
      onGetOne,
      onApprove,
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
      navigateToStock,
    } = this.action;
    navigateToStock();
  }
  
  get label () {
    let {
      stock,
    } = this.dependencies;

    // console.log(`stock.id ${JSON.stringify(stock)}`);
    if (!stock._id){
      return {
        name: (<Text>Không có chi tiết vật phẩm</Text>),
        description: (<Text>Không có chi tiết vật phẩm</Text>),
        type: (<Text>Không có chi tiết vật phẩm</Text>),
        point: (<Text>Không có chi tiết vật phẩm</Text>),
        onwerName: (<Text>Không có chi tiết vật phẩm</Text>),
        onwerTotalStar: (<Text>Không có chi tiết vật phẩm</Text>),
        approve: (<Text>Không có chi tiết vật phẩm</Text>),
      }
    }

    let {
      name = '',
      id = '',
      description = '',
      photoUrl = '',
      type = '',
      point = 0,
      owner,
      approve = false,
    } = stock;

    return {
      name: (<Text style={{flex: 1,borderWidth: 1}}>{name}</Text>),
      description: (<Text style={{flex: 1,borderWidth: 1}}>{description}</Text>),
      type: (<Text style={{flex: 1,borderWidth: 1}}>Loại {type}</Text>),
      point: (<Text style={{flex: 1,borderWidth: 1}}>{point} điểm</Text>),
      onwerName: (<Text style={{flex: 1,borderWidth: 1}}>@{owner.name}</Text>),
      onwerTotalStar: (<Text style={{flex: 1,borderWidth: 1}}> {owner.totalStar} sao</Text>),
      approve: (<Text style={{flex: 1,borderWidth: 1}}> {!approve ?` Chưa phê duyệt`:` Đã phê duyệt`}</Text>),
    }
  }

  get image () {
    let {
      height, 

      photoUrl,
    } = this.dependencies; 

    return {
      ownerAvatar: (<Image style={ImageSize.huge} source={{uri: photoUrl}}/>),
    }
  }

  get button () {
    let {
      stock,
    } = this.dependencies;
    return {
      buy: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.buyButton_onClick()}}
          >
          <Text>Đổi quà</Text>
        </TouchableOpacity>
      ),
      back: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.backButton_onClick()}}
          >
          <Text>Trở lại</Text>
        </TouchableOpacity>
      ),
      approve: !!stock._id?(
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.approveButton_onClick()}}
          >
          <Text style={stock.approve?{color:`green`}:{color:`grey`}}>Đồng ý</Text>
        </TouchableOpacity>
      ):(<View/>),
    }
  }

  get header () {
    return (<View/>)
  }

  get body () {
    let {
      isAdmin,
    } = this.dependencies;

    return (
    <View style={{flex: 1,borderWidth: 1}}>
      {this.button.back}
      {this.label.onwerName}
      {this.label.onwerTotalStar}
      {this.label.name}
      {this.label.description}
      {this.label.approve}
      {this.label.point}
      {this.button.buy}
      {isAdmin?this.button.approve:(<View/>)}
    </View>)
  }

  get footer () {
    return (<View/>)
  }
  get form () {
    return (
      <View style={{flex: 1,borderWidth: 1}}>
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

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockDetail);