import React, {Component} from 'react';
import {
  View, 
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
import styles from './Info.styles';

import { connect } from 'react-redux';

class Info extends Component {
  constructor (props) {
    super(props);
    
  }

  get action () {
    let {
      onGetInfo = () => console.log(` Đang chờ dợi thông tin cá nhân của người dùng.`),
    } = this.props;
    return {
      onGetInfo,
    }
  }

  get dependencies () {
    let {
      visible = false,
      user = null,
    } = this.props;
    return {
      visible,
      user,
    };
  }

  componentDidMount () {
    let {
      onGetInfo,
    } = this.action;

    onGetInfo ((res) => {
      this.renew();
    })
  }

  renew () {
    this.setState({});
  }

  get errorView () {
    return (<Text>Lỗi hiển thị</Text>);
  }

  get lable () {
    let {
      user,
    } = this.dependencies;

    const _style = styles.label;
    return !user? {
      name: errorView,
      followers: errorView,
      star: errorView,
      email: errorView,
      phone: errorView,
      address: errorView,
    } : {
      name: (<Text style={_style.name}>{user.name}</Text>),
      followers: (<Text style={_style.followers}>{user.totalFollowers} người theo dõi</Text>),
      star: (<Text style={_style.star}>{user.totalStar} sao</Text>),
      email: (<Text style={_style.email}>email: {user.email}</Text>),
      phone: (<Text style={_style.phone}>Điện thoại: {user.phone}</Text>),
      address: (<Text style={_style.address}>Địa chỉ: {user.address}</Text>),
    }
  }

  get image () {
    let {
      avatar,
    } = this.dependencies.user;
    return {
      avatar: (
      <View style={{
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <Image 
          style={{
            flex: 1,
            height: `100%`,
            width: `100%`,
          }}
          resizeMode = {'stretch'}
          source = {!!avatar?{uri:avatar}:require('../../img/default.png')}
        />
      </View>
      )
    }
  }

  get button () {
    const _style = styles.button;
    return {
      favorite: (
      <TouchableOpacity
        style={_style.favorite}>
        <Text style={_style.favoriteText}>ƯU THÍCH</Text>
      </TouchableOpacity>
      ),
      account: (
        <TouchableOpacity
          style={_style.account}>
          <Text style={_style.accountText}>SỬA</Text>
        </TouchableOpacity>
        ),
    }
  }

  get header () {
    return (
      <View style={{flex: 3}}>
        {this.image.avatar}
      </View>
    )
  }

  get body () {
    return (
      <View style={{flex: 5}}>
        {this.lable.star}
        {this.lable.name}
        {this.lable.followers}
        {this.lable.email}
        {this.lable.phone}
        {this.lable.address}
      </View>
    )
  }

  get footer () {
    return (
      <View style={{flex: 1, flexDirection: "row"}}>
        {this.button.favorite}
        {this.button.account}
      </View>
    )
  }
  
  get form () {
    return (
      <View style={{flex: 1, padding: 10}}>
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
  // console.log(`state chỗ Info ${JSON.stringify(state)}`)

  return {
    token: state.auth.token,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
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
)(Info);