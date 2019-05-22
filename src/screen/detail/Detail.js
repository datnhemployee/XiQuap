import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';

class Detail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      item: null,
    }
  }

  get action () {
    let {
      navigateToHome = () => console.log(` Vừa bấm chuyển sang màn hình chính.`),
      navigateToExchange = () => console.log(` Vừa bấm chuyển sang màn hình trao đổi .`),
      giveLike = () => console.log(` Vừa bấm thích vật phẩm .`),
      onGiveLike = () => {},
      
    } = this.props;
    return {
      navigateToHome,
      navigateToExchange,
      giveLike,
      onGiveLike,
    };
  }

  componentDidMount () {
    let {
      onGiveLike,
    } = this.action;

    onGiveLike((res) => {
      this.setState({})
    })
  }

  get dependencies () {
    let {
      visible = false,
      item = null,
    } = this.props;
    return {
      visible,
      item,
    };
  }

  get label () {
    let item = this.state.item;
    return {
      ownerName: (<Text >@{!item? ` Lỗi `:item.ownerName}</Text>),
      name: (<Text >{!item? ` Lỗi `:item.name}</Text>),
      description: (<Text >{!item? ` Lỗi `:item.description}</Text>),
      ownerName: (<Text >{!item? ` Lỗi `:item.ownerName}</Text>),
      vendeeTotalStar: !!item? (!!item.vendeeId? 
        (<Text >{item.vendeeGiveStar}</Text>)
        :(<View/>))
        :(<View/>),
      vendeeName: !!item? (!!item.vendeeId? 
        (<Text >Đã đồng ý với {item.vendeeName}</Text>)
        :(<View/>))
        :(<View/>),
      vendeeGiveStar: !!item? (!!item.vendeeGiveStar? 
        (<Text > Được 1 sao </Text>)
        :(<Text > Không được tặng sao </Text>))
        :(<View/>),
      totalLike: !!item? (<Text > {item.totalLike} lượt thích </Text>)
        :(<View/>),
      totalItem: !!item? (<Text > {item.totalItem} chờ trao đổi </Text>)
        :(<View/>),
    }
  }

  get button () {
    return {
      back: (<TouchableOpacity >
        <Text>Trở lại</Text>
      </TouchableOpacity>),
    }
  }

  get list () {
    return {
      exchange: (
      <FlatList 
        data={this.state.post.itemList}
      />)
    }
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

  get header () {
    let {
      _id,
      ownerId,
      ownerName,
      mainPicture,
      name,
      description,
      totalLike,
      totalItem,
    } = this.dependencies.item;

    return (
      <View>
        {this.button.back}
        <CardPost
            height = {500}

            id = {_id}
            ownerId = {ownerId}
            ownerName = {ownerName}
            ownerAvatar = {ownerAvatar}
            mainPicture = {mainPicture}
            name = {name}
            description = {description}
            totalLike = {totalLike}
            totalItem = {totalItem}

            giveLike = {this.onCardPostLikeClick}
            navigateToExchange = {this.onCardPostExchangeClick}
            navigateToDetail = {this.onCardPostClick}
          />
      </View>  
    )}
  get body () {
    return (
      <View  style={{flex: 1}}>
        {this.list.exchange}
      </View>
    )}
  get footer () {
    return (
      <View  style={{flex: 1}}>
        {this.button.like}
        {this.button.exchange}
      </View>
    )}
  
  get form () {
    return (
      <View style={{flex: 1}}>
        <Text > Detail screen </Text>
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

  onGiveLike: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGiveLike,
    ).inject(
      callback
    )
  ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);