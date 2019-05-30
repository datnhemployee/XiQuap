import React, {Component} from 'react';
import {
  Modal, 
  Text, 
  TouchableOpacity, 
  View, 
  Image,  
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './LogIn.styles'
import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
import { Codes } from '../../constant/Response';
import { connect } from 'react-redux';
import { 
  noBlankSpace, 
} from '../../helpers/StringHelper';
import socket from '../../../Configuration';
import MyTextInput from '../../components/myTextInput/MyTextInput';
import Typeface from '../../constant/Font';
import Color from '../../constant/Color';

const {
  height: _height,
} = Dimensions.get('screen');
class LogIn extends Component {
  constructor (props) {
    super(props);
    this.state = this.initialState;
    this.renew = this.renew.bind(this);
    this.onUsernameClear = this.onUsernameClear.bind(this);
    this.onPasswordClear = this.onPasswordClear.bind(this);
  }
  /**
   * Logic
   */
  get initialState () {
    return {
      username: ``,
      password: ``,
    };
  }

  onLogIn (
    success = () => {},
    failed = () => {},
  ) {
    let {
      onLogIn,
    } = this.action;
    onLogIn((res) => {
      if(res.code === Codes.Success) {
        this.renew();
        success();
      } else {
        failed();
      }
    });
  }

  emitLogIn (
    success = () => {},
    failed = () => {},
  ) {
    let {
      emitLogIn,
    } = this.action;
    emitLogIn({
      // username: this.state.username,
      // password: this.state.password,
      username: `admin123`,
      password: `admin123`,
    },() => {socket.connect()},
    (res) => {
      if(res.code === Codes.Success) {
        success();
      } else {
        failed();
      }
    });
  }

  get action () {
    let {
      navigateToHome = () => console.log(`Vừa nhấn qua màn hình chính`),
      onLogIn,
      emitLogIn,
      navigateToRegister = () => console.log(`Vừa nhấn qua màn hình đăng kí`),
    } = this.props;
    return {
      navigateToHome,
      onLogIn,
      emitLogIn,
      navigateToRegister,
    }
  }

  get validated () {
    return {
      username: !this.state.username ?
        `Vui lòng không bỏ trống`:
        !noBlankSpace(
          this.state.username,
          ) ? `Tài khoản không được tồn tại khoảng cách`:
          undefined,
      password: !this.state.password ?
        `Vui lòng không bỏ trống`:
        !noBlankSpace(
          this.state.password,
          ) ? `Mật khẩu không được tồn tại khoảng cách`:
          undefined,
    }
  }

  componentDidMount () {
    let {
      navigateToHome,
    } = this.action;
    this.onLogIn(()=>{
      navigateToHome();
    },()=>{});
  }

  /**
   * Design
   */

  renew () {
    this.setState(this.initialState);
  }

  get dependencies () {
    let {
      visible = false,
    } = this.props;
    return {
      visible,
    }
  }

  buttonLogIn_onClick() {
    this.emitLogIn();
  }

  buttonRegister_onClick() {
    let {
      navigateToRegister,
    } = this.action;

    navigateToRegister();
  }

  onUsernameChange (text) {
    this.setState({username: text});
  }

  onPasswordChange (text) {
    this.setState({password: text});
  }

  onPasswordClear (text) {
    this.setState({password: ''});
  }

  onUsernameClear (text) {
    this.setState({username: ''});
  }

  get notify () {
    let validatedUsername = this.validated.username;
    let validatedPassword = this.validated.password;
    const _style = styles.notify;
    return {
      username: (
          <Text style={[{color: !!validatedUsername?
              Color.Red
              :Color.White},
              _style.username]}>
            {validatedUsername}
          </Text>
      ),
      password: (
        <Text style={[{color: !!validatedPassword?
          Color.Red
          :Color.White},
          _style.password]}>
          {validatedPassword}
        </Text>
      ),
    }
  }

  get button () {
    const _style = styles.button;
    return {
      logIn: (
        <TouchableOpacity 
          style={_style.logIn}
          onPress={() => {this.buttonLogIn_onClick()}}>
          <Text 
            style={_style.logInText}>{
            Typeface.toCase(
              `Đăng nhập`,
              Typeface.type.button)} 
          </Text>
        </TouchableOpacity>
      ),
      register: (
        <TouchableOpacity 
          style={_style.register}
          onPress={() => {this.buttonRegister_onClick()}}>
          <Text style={_style.registerText}>{
            Typeface.toCase(
              `Đăng kí`,
              Typeface.type.button)}</Text>
        </TouchableOpacity>
      )
    }
  }

  get textInput () {
    const _style = styles.textInput;
    return {
      username: (
          <MyTextInput 
            style={_style.username}
            placeholder={'Tên tài khoản'}
          onClear = {this.onUsernameClear}
          onChangeText={(text) => {this.onUsernameChange(text)}}/>
      ),
      password: (
          <MyTextInput 
          style={_style.password}
          placeholder={'Mật khẩu'}
          secureTextEntry = {true}
          onClear = {this.onPasswordClear}
          onChangeText={(text) => {this.onPasswordChange(text)}}/>
      ),
    }
  }

  get label () {
    const _style = styles.img;
    return {
      appName: (<Image 
        style={_style.appName}
        resizeMode = {'contain'}
        source = {require('../../img/appName.png')}
        />)
    }
  }

  get footer () {
    return (
      <View style={styles.footer}>
        
      </View>
    )
  }

  get body () {
    return (
      <View style={styles.body}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          // borderWidth: 1,
          }}>
            <View style={{
              flex: 1/2,
              justifyContent: 'center',
              alignItems: 'flex-end',
              
              // borderWidth: 1,
              }}>
                {this.textInput.username}
                {this.notify.username}
            </View>
            <View style={{
              flex: 1/2,
              justifyContent: 'center',
              alignItems: 'flex-end',
              // borderWidth: 1,
              }}>
                {this.textInput.password}
                {this.notify.password}
            </View>
        </View>
        <View style={{
          flex: 2,
          justifyContent: "flex-start",
          alignItems: 'center',
          }}>
          {this.button.logIn}
          {this.button.register}
        </View>
      </View>
    )
  }

  get header () {
    return (
      <View style={styles.header}>
          {this.label.appName}
      </View>
    )
  }

  get form () {
    return (
      <ScrollView 
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        <View style={{height: _height}}>
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
        onShow = {this.renew}
        >
        {this.form}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(`state ${JSON.stringify(state)}`);
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
  emitLogIn: (
    data,
    pre = () => {},
    next = (res) => {}
    ) => dispatch(
      AuthAction.emit(
        AuthActionType.emitLogIn
      ).inject(
        data,
        pre,
        next,
      )
  ),
  onLogIn: (
    data,
    callback = (res) => {},
    ) => dispatch(
      AuthAction.on(
        AuthActionType.onLogIn
      ).inject(
        data,
        callback,
      )
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogIn);