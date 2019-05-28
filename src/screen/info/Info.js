import React, {Component} from 'react';
import {
  View, 
  Text,
  TouchableOpacity
} from 'react-native';

import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';

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

  get lable () {
    let {
      user,
    } = this.dependencies;

    return !user? {
      name: (<Text>Lỗi không lấy được thông tin người dùng</Text>),
      followers: (<Text>Lỗi không lấy được thông tin người dùng</Text>),
      star: (<Text>Lỗi không lấy được thông tin người dùng</Text>),
      email: (<Text>Lỗi không lấy được thông tin người dùng</Text>),
      phone: (<Text>Lỗi không lấy được thông tin người dùng</Text>),
      address: (<Text>Lỗi không lấy được thông tin người dùng</Text>),
    } : {
      name: (<Text style={{flex: 1}}>{user.name}</Text>),
      followers: (<Text style={{flex: 1}}>{user.totalFollowers} người theo dõi</Text>),
      star: (<Text style={{flex: 1}}>{user.totalStar} sao</Text>),
      email: (<Text style={{flex: 1}}>email: {user.email}</Text>),
      phone: (<Text style={{flex: 1}}>Điện thoại: {user.phone}</Text>),
      address: (<Text style={{flex: 1}}>Địa chỉ: {user.address}</Text>),
    }
  }

  get button () {
    return {
      favorite: (
      <TouchableOpacity
        style={{flex: 1}}>
        <Text>Danh sách ưu thích</Text>
      </TouchableOpacity>
      ),
      account: (
        <TouchableOpacity
          style={{flex: 1}}>
          <Text>Quản lý tài khoản</Text>
        </TouchableOpacity>
        ),
    }
  }

  get header () {
    return (
      <View>

      </View>
    )
  }

  get body () {
    return (
      <View style={{flex: 1}}>
        {this.lable.name}
        {this.lable.followers}
        {this.lable.star}
        {this.lable.email}
        {this.lable.phone}
        {this.lable.address}
        {this.button.favorite}
        {this.button.account}
      </View>
    )
  }

  get footer () {
    return (
      <View>

      </View>
    )
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