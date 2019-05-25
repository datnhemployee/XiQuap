import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SnippetStock from '../../components/snippetStock/SnippetStock';

import { Codes } from '../../constant/Response';
import LocalStorage from '../../storage/LocalStorage';
import MessageBox from '../../components/MessageBox';
import StockAction from '../../actions/Stock/StockAction';
import StockActionType from '../../actions/Stock/StockActionType';
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
    } = this.dependencies;

    LocalStorage.getToken((token)=>{
      getStocks({
        page: Math.floor((this.state.amount / 6)),
        token: token,
      });
    })
  }

  get dependencies () {
    let {
      visible = false,
      stock = [],
      point = 0,
    } = this.props;
    return {
      visible,
      stock,
      point,
    };
  }

  get action () {
    let {
      navigateToAddStock = () => console.log(` Vừa nhấn nút chuyển sang màn hình thêm vật phẩm`),
      onInsert = () => console.log(` Đang chờ phản hồi thêm vật phẩm`),
      onGetStocks = () => console.log(` Đang chờ phản hồi lấy vật phẩm`),
      getStocks = () => console.log(` Gửi yêu cầu lấy vật phẩm`),

    } = this.props;
    return {
      navigateToAddStock,
      onInsert,
      onGetStocks,
      getStocks,
    }
  }

  componentDidMount () {
    let {
      onInsert,
      onGetStocks,
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
        // MessageBox(`Lấy thêm dữ liệu thành công`);
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
        renderItem = {({item}) => {
          
          // console.log(`snippetStock ${JSON.stringify(item)}`)
          return (
          <SnippetStock
            height = {500}

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
    point: state.auth.point,
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stock);