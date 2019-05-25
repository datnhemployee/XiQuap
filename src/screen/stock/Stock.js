import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Spacing,
} from 'react-native';
import SnippetStock from '../../components/snippetStock/SnippetStock';

import { Codes } from '../../constant/Response';
import MessageBox from '../../components/MessageBox';
import StockAction from '../../actions/Stock/StockAction';
import AuthAction from '../../actions/Auth/AuthAction';
import StockActionType from '../../actions/Stock/StockActionType';
import AuthActionType from '../../actions/Auth/AuthActionType';
import { connect } from 'react-redux';

class Stock extends Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
      amount: 0,
      refreshing: false,
    }

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  getMore () {
    let {
      getStocks,
    } = this.action;

    let {
      token,
    } = this.dependencies;

    getStocks({
      page: Math.floor((this.state.amount / 6)),
      token: token,
    },()=>{},
    (res)=>{});
  }

  get dependencies () {
    let {
      visible = false,
      stock = [],
      point = 0,
      token,
    } = this.props;
    return {
      visible,
      stock,
      point,
      token,
    };
  }

  get action () {
    let {
      navigateToAddStock = () => console.log(` Vừa nhấn nút chuyển sang màn hình thêm vật phẩm`),
      navigateToStockDetail = () => console.log(` Vừa nhấn nút chuyển sang màn hình chi tiết vật phẩm`),
      onInsert = () => console.log(` Đang chờ phản hồi thêm vật phẩm`),
      onGetStocks = () => console.log(` Đang chờ phản hồi lấy vật phẩm`),
      onBuy = () => console.log(` Đang chờ phản hồi đổi vật phẩm`),
      onApprove = () => console.log(` Đang chờ phản hồi kiểm định vật phẩm`),
      onGetInfo = () => console.log(` Đang chờ phản hồi lấy thông tin cá nhân`),
      getStocks = () => console.log(` Gửi yêu cầu lấy vật phẩm`),
      getInfo = () => console.log(` Gửi yêu cầu lấy thông tin cá nhân`),

    } = this.props;
    return {
      navigateToAddStock,
      navigateToStockDetail,
      onInsert,
      onGetStocks,
      getStocks,
      onBuy,
      onApprove,
      onGetInfo,
      getInfo,
    }
  }

  componentDidMount () {
    let {
      token,
    } = this.dependencies;
    let {
      onInsert,
      onGetStocks,
      onBuy,
      onApprove,
      onGetInfo,

      getInfo,
    } = this.action;

    this.onRefresh();
    onInsert((res)=>{
      if (res.code === Codes.Success) {
        MessageBox(res.content);        
      }
    })

    onGetStocks((res)=>{
      if(res.code === Codes.Success) {
        let temp = this.state.list.slice();
          temp.splice(
            Math.floor(this.state.list.length / 6) * 6,
            this.state.list.length % 6,
          );
        temp = temp.concat(this.dependencies.stock.list);
        console.log(`length: ${temp.length}`)
        this.setState({
          list: temp.slice(),
          amount: temp.length,
        });
        MessageBox(`Lấy thêm dữ liệu thành công`);

        getInfo({
          token,
        });
      }
    })

    onBuy ((res) => {
      if (res.code === Codes.Success) {
        
        // console.log(` Trả về cho người dùng ${JSON.stringify(res)}`)
        // console.log(` state.list ${JSON.stringify(this.state.list)}`)

        let temp = this.dependencies.stock;
        // console.log(` temp ${JSON.stringify(temp)}`)

        let foundPostIndex = this.state.list.findIndex((val)=>val._id === temp._id);
        // console.log(` foundPostIndex ${JSON.stringify(foundPostIndex)}`)

        if (foundPostIndex != -1) {
          this.state.list.splice(foundPostIndex - 1,1);
        // console.log(` state after${JSON.stringify(this.state.list)}`)

          this.setState({list: this.state.list.slice()});
        }
        
        getInfo({
          token,
        });
      }
    })

    onApprove((res) => {
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
        
        getInfo({
          token,
        });
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

  onEndReached () {
    
  }

  onRefresh () {
    this.setState({refreshing: true});
    this.getMore();
    this.setState({refreshing: false});
  }

  onAddButtonClick () {
    let {
      navigateToAddStock,
    } = this.action;
    navigateToAddStock();
  }

  get label () {
    let {
      point,
    } = this.dependencies;
    return {
      point: (<Text style={{flex: 1}}> Điểm của tôi: {point} điểm</Text>)
    };
  }

  get button () {
    return {
      add: (
      <TouchableOpacity 
        style={{flex: 1,borderWidth: 1}}
        onPress = {this.onAddButtonClick}>
        <Text>Đăng vật phẩm</Text>
      </TouchableOpacity>)
    }
  }

  get list () {
    let {
      navigateToStockDetail,
    } = this.action;

    return (
      <FlatList
        style = {{flex: 1,borderWidth: 1}}
        data = {this.state.list}
        numColumns = {2}
        renderItem = {({item}) => {
          
          // console.log(`snippetStock ${JSON.stringify(item)}`)
          return (
          <SnippetStock
            height = {400}
            width = {200}
            name = {item.name}
            id = {item._id}
            description = {item.description}
            photoUrl = {item.mainPicture}
            type = {item.typeName}
            point = {item.point}
            onwerName = {item.owner.name}
            onwerId= {item.owner._id}
            onwerTotalStar= {item.owner.totalStar}
            ownerAvatar= {item.owner.avatar}
            approve = {item.approve}

            navigateToStockDetail = {navigateToStockDetail}
          />)
        }}
        showsVerticalScrollIndicator = {false}
        refreshing = {this.state.refreshing}
        onRefresh = {this.onRefresh}
        onEndReached = {this.onEndReached}
        onEndReachedThreshold={0.5}
        keyExtractor={(item,index)=>`StockIndex${index}`}
      />
    )
  }
  
  get header () {
    return (
      <View
        style = {{flex: 1,borderWidth: 1}}>
            {this.label.point}
            {this.button.add}
      </View>
    )
  }

  get body () {
    return (
      <View 
        style={{flex: 8,borderWidth: 1}}>
          {this.list}
      </View>
    )
  }
  get footer () {return (<View/>)}

  get form () {
    return (
      <View 
        style={{flex: 1,borderWidth: 1}}>
        {this.header}
        {this.body}
        {this.footer}
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.form}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
    point: state.user.point,
    stock: state.stock,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStocks: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    StockAction.emit(
        StockActionType.emitGet,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  getInfo: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    AuthAction.emit(
        AuthActionType.emitGetInfo,
      ).inject(
        data,
        pre,
        next
      ),
  ),
  
  onGetStocks: (
    callback = (res)=>{},
  ) => dispatch(
    StockAction.on(
      StockActionType.onGet,
    ).inject(
      callback
    )
  ),
  onInsert: (
    callback = (res)=>{},
  ) => dispatch(
    StockAction.on(
      StockActionType.onInsert,
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
)(Stock);