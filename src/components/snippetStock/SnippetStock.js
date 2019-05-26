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
import MessageBox from '../MessageBox';
import { Codes } from '../../constant/Response';

class SnippetStock extends Component {
  constructor (props) {
    super(props);
    
  }

  // logic

  approve () {
    let {
      emitApprove,
    } = this.action;

    let {
      token,
      id,
    } = this.dependencies;
    emitApprove({
      token,
      _id: id, 
    },()=> {},
    (res)=>{
    })
  }

  detailStock () {
    let {
      getOne,
      navigateToStockDetail,
    } = this.action;

    let {
      token,
      id,
    } = this.dependencies;

    getOne ({
      token,
      _id: id,
    },()=> {},
    (res)=>{
      navigateToStockDetail();
    })
  }

  buy () {
    let {
      buy,
    } = this.action;

    let {
      token,
      id,
    } = this.dependencies;

    buy ({
      token,
      _id: id,
    },()=> {},
    ()=>{MessageBox(` Đang gửi dữ liệu lên máy chủ.`)})
  }

  get action () {
    let {
      buy = () => {console.log(`Vừa bấm đồng ý đổi quà`)},
      emitApprove = () => {console.log(`Vừa bấm kiểm duyệt vật phẩm`)},
      getOne = () => {console.log(`Vừa bấm lấy chi tiết quà`)},
      navigateToStockDetail = () => {console.log(`Vừa bấm chuyển sang màn hình chi tiết vật phẩm`)},
    } = this.props;
    return {
      buy,
      navigateToStockDetail,
      getOne,
      emitApprove,
    }
  }

  get dependencies () {
    let {
      height = 700,
      width = 100,

      name = '',
      id = '',
      photoUrl = '',
      point = 0,
      onwerTotalStar= '',
      approve = false,

      token =null,
      isAdmin = false,

    } = this.props;
    return {
      height,
      width,

      id ,
      photoUrl ,

      name ,
      point ,
      onwerTotalStar,
      approve,

      token,
      isAdmin,
    };
  }

  // Design

  approveButton_onClick () {
    this.approve();
  }

  detailButton_onClick () {
    this.detailStock();
  }

  buyButton_onClick () {
    this.buy();
  }

  
  get label () {
    let {
      name ,
      point ,
      onwerTotalStar,
      approve,
    } = this.dependencies;

    return {
      name: (<Text style={{flex: 1,borderWidth: 1}}>{name}</Text>),
      point: (<Text style={{flex: 1,borderWidth: 1}}>{point} điểm</Text>),
      onwerTotalStar: (<Text style={{flex: 1,borderWidth: 1}}> Chủ sở hữu {onwerTotalStar} sao</Text>),
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
      approve,
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
      detail: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.detailButton_onClick()}}
          >
            {this.label.name}
            {this.label.onwerTotalStar}
            {this.label.approve}
            {this.label.point}
        </TouchableOpacity>
      ),
      approve: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.approveButton_onClick()}}
          >
          <Text style={approve? {color: `green`}:{color: `grey`}}>Đồng ý</Text>
        </TouchableOpacity>
      ),
    }
  }

  get header () {
    return (<View/>)
  }

  get body () {
    let {
      isAdmin = false,
    } = this.dependencies;
    return (
    <View style={{flex: 1,borderWidth: 1}}>
      {this.button.detail}
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
      height,
      width,
    } = this.dependencies;

    return (
      <View style={{flex: 1/2,margin: 1}}>
        {this.form}
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(`state chỗ SnippetStock ${JSON.stringify(state)}`)

  return {
    token: state.auth.token,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => ({
  
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

  

  emitApprove: (
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

  getOne: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    StockAction.emit(
        StockActionType.emitGetOne,
      ).inject(
        data,
        pre,
        next
      ),
  ),
  // Chỉ có thể emit ở component
  // on sẽ ở screen

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnippetStock);