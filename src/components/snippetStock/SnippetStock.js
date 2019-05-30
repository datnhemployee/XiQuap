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
import { WaittingIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import Typeface from '../../constant/Font';

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
      height = 200,
      // width = 100,

      name = '',
      id = '',
      photoUrl = '',
      point = 0,
      ownerTotalStar= '',
      ownerName = ``,
      approve = false,

      token =null,
      isAdmin = false,
      selling = true,

    } = this.props;
    return {
      height,
      // width,

      id ,
      photoUrl ,

      name ,
      point ,
      ownerTotalStar,
      ownerName,
      approve,

      token,
      isAdmin,
      selling,
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
      ownerTotalStar,
      approve,
      ownerName,
    } = this.dependencies;

    name = (name.length > 15)? name.slice(0,10) + `...`: name.slice();
    return {
      name: (<Text style={{
        flex: 1,
        // borderWidth: 1
        ...Typeface.header[4],
        textAlign: `left`,
        textAlignVertical: `center`,
        flexWrap: 'wrap',
      }}>{name}</Text>),
      point: (<Text style={{
        flex: 1,
        // borderWidth: 1,
        textAlign: `left`,
        textAlignVertical: `top`,
        ...Typeface.caption,
      }}>{point} điểm</Text>),
      approve: (<Text style={[{
        flex: 1,
        ...Typeface.overline,
        textAlign: `left`,
        textAlignVertical: `bottom`,
        // borderWidth: 1
      },!approve?{}:{color:`green`}]}> {!approve ?`CHƯA DUYỆT`:`ĐÃ DUYỆT`}</Text>),
    }
  }

  get image () {
    let {
      height, 

      photoUrl,
    } = this.dependencies; 

  return  (
    <View style= {{
      flex: 2,
      overflow: `hidden`,
      borderRadius: 20,
      }}>
      <Image 
        style={{
          flex: 1, 
          width: `100%`,
          height: `100%`,
        }} 
        resizeMode = {'stretch'}
        source={!!photoUrl ?
          {uri: photoUrl}
          :require('../../img/default.png')
        }
        />
    </View>
    );
  }

  get button () {
    let {
      approve,
    } = this.dependencies;

    return {
      buy: (
        <TouchableOpacity 
          style={{
            flex: 2,
            // borderWidth: 1,
            flexDirection: `row`,
          }}
          onPress={()=>{this.buyButton_onClick()}}
          >
            <WaittingIcon color = {Color.Red}/>
            <Text style={{
              flex: 2, 
              color:Color.Red,
              ...Typeface.button,
              textAlign: `left`,
              textAlignVertical: 'center',
            }}
              >ĐỔI QUÀ</Text>
        </TouchableOpacity>
      ),
      detail: (
        <TouchableOpacity 
          style={{
            flex: 5,
            // borderWidth: 1,
            paddingLeft: 10,
          }}
          onPress={()=>{this.detailButton_onClick()}}
          >
          {this.label.approve}
          {this.label.name}
          {this.label.point}
        </TouchableOpacity>
      ),
      approve: (
        <TouchableOpacity 
          style={{
            flex: 1,
            // borderWidth: 1,
          }}
          onPress={()=>{this.approveButton_onClick()}}
          >
          <Text style={[
            {
              flex: 1,
              ...Typeface.button,
              textAlign: `right`,
              textAlignVertical: 'center',
            },
            approve? {color: `green`}:{color: Color.Gray}]}>
              DUYỆT</Text>
        </TouchableOpacity>
      ),
    }
  }

  get header () {
    return (
    <View 
      style={{
        flex: 1,
      }}>
      <TouchableOpacity 
          style={{
            flex: 1,
          }}
          onPress={()=>{this.detailButton_onClick()}}
          >
          {this.image}
        </TouchableOpacity>
    </View>)
  }

  get body () {
    let {
      isAdmin = false,
      selling,
    } = this.dependencies;

    return (
    <View style={{
      flex: 1,
      // borderWidth: 1
      }}>
      {this.button.detail}
      <View style ={{
        flex: 1,
        flexDirection: `row`,
        }}>
        {!!selling ?this.button.buy:(<View/>)}
        {isAdmin?this.button.approve:(<View/>)}
      </View>
    </View>
    )
  }

  get footer () {
    return (
    <View />)
  }
  get form () {
    return (
      <View style={{
        flex: 1,
        // borderWidth: 1
        flexDirection: 'row',
        }}>
        {this.header}
        {this.body}
        {this.footer}
      </View>
    )
  }

  render() {
    let {
      height,
      // width,
    } = this.dependencies;

    return (
      <View style={{
        // flex: 1,
        // backgroundColor: `gradient`,
        height: height,
        // elevation: 1, 
        overflow: `hidden`,
        // borderRadius: 30,
        // margin: 5,
        padding: 10, 
      }}>
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