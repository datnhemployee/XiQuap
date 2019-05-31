import React, {Component} from 'react';
import {
  View, 
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
import styles from './Other.styles';

import { connect } from 'react-redux';
import { BackIcon } from '../../constant/Icon';
import Color from '../../constant/Color';

class Other extends Component {
  constructor (props) {
    super(props);
    
  }

  get action () {
    let {
      onGetOther = () => console.log(` Đang chờ dợi thông tin cá nhân của người dùng.`),
      navigateToHome = () => console.log(`Chuyển sang màn hình chính.`),
    } = this.props;
    return {
      onGetOther,
      navigateToHome,
    }
  }

  get dependencies () {
    let {
      visible = false,
      other= null,
    } = this.props;
    return {
      visible,
      other,
    };
  }

  componentDidMount () {
    let {
      onGetOther,
    } = this.action;

    onGetOther ((res) => {
      this.renew();
    })
  }

  renew () {
    this.setState({});
  }

  get errorView () {
    return (<Text>Lỗi hiển thị</Text>);
  }

  get label () {
    let {
      other,
    } = this.dependencies;

    const screen = (<Text style={styles.label.screen}>Người dùng</Text>)

    const _style = styles.label;
    return !other? {
      name: errorView,
      followers: errorView,
      star: errorView,
      email: errorView,
      phone: errorView,
      address: errorView,
      screen: screen,
    } : {
      name: (<Text style={_style.name}>{other.name}</Text>),
      followers: (<Text style={_style.followers}>{other.totalFollowers} người theo dõi</Text>),
      star: (<Text style={_style.star}>{other.totalStar} sao</Text>),
      email: (<Text style={_style.email}>email: {other.email}</Text>),
      phone: (<Text style={_style.phone}>Điện thoại: {other.phone}</Text>),
      address: (<Text style={_style.address}>Địa chỉ: {other.address}</Text>),
      screen: screen,
    }
  }

  get image () {
    let {
      avatar,
    } = this.dependencies.other;
    return {
      avatar: (
      <View style={{
        flex: 3,
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
    const {
      navigateToHome,
    } = this.action;
    const _style = styles.button;
    return {
      back: (
      <TouchableOpacity
        onPress = {() => navigateToHome()}
        style={_style.back}>
        <BackIcon 
          color={Color.Gray}/>
        
      </TouchableOpacity>
      ),
      
    }
  }

  get header () {
    return (
      <View style={{flex: 4}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.button.back}
          {this.label.screen}
        </View>
        {this.image.avatar}
      </View>
    )
  }

  get body () {
    return (
      <View style={{flex: 5}}>
        {this.label.star}
        {this.label.name}
        {this.label.followers}
        {this.label.email}
        {this.label.phone}
        {this.label.address}
      </View>
    )
  }

  get footer () {
    return (
      <View />
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
    let {
      visible,
    } = this.dependencies;
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={()=>{}}
        onShow = {() => {this.renew()}}
        >
        {this.form}
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(`state chỗ Info ${JSON.stringify(state)}`)

  return {
    token: state.auth.token,
    other: state.other,
  }
}

const mapDispatchToProps = (dispatch) => ({
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
)(Other);