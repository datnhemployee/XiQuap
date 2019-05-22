import React, {Component} from 'react';
import {
  Modal, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput,
} from 'react-native';
import styles from './LogIn.styles'
import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
import { Codes } from '../../constant/Response';
import { connect } from 'react-redux';
import { 
  noBlankSpace, 
} from '../../helpers/StringHelper';

class LogIn extends Component {
  constructor (props) {
    super(props);
    this.state = this.initialState;
    
  }
  /**
   * ==================================================================
   * Logic
   * ==================================================================
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
        this.refresh();
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
    },() => {},
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
        `Tên tài khoản đang để trống`:
        !noBlankSpace(
          this.state.username,
          ) ? `Tài khoản không được tồn tại khoảng cách`:
          undefined,
      password: !this.state.password ?
        `Mật khẩu đang để trống`:
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
   * ==================================================================
   * Design
   * ==================================================================
   */

  refresh () {
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

  get notify () {
    let validatedUsername = this.validated.username;
    let validatedPassword = this.validated.password;
    return {
      username: (
          <Text style={{color: !!validatedUsername?`red`:`white`}}>
            {validatedUsername}
          </Text>
      ),
      password: (
        <Text style={{color: !!validatedPassword?`red`:`white`}}>
          {validatedPassword}
        </Text>
      ),
    }
  }

  get button () {
    return {
      logIn: (
        <TouchableOpacity 
          style={{flex:1}}
          onPress={() => {this.buttonLogIn_onClick()}}>
          <Text >Đăng nhập </Text>
        </TouchableOpacity>
      ),
      register: (
        <TouchableOpacity 
          style={{flex:1}}
          onPress={() => {this.buttonRegister_onClick()}}>
          <Text >Đăng kí </Text>
        </TouchableOpacity>
      )
    }
  }

  get textInput () {
    return {
      username: (
        <TextInput 
          style={{flex: 1}}
          placeholder={'Tên tài khoản'}
          onChangeText={(text) => {this.onUsernameChange(text)}}/>
      ),
      password: (
        <TextInput 
          style={{flex: 1}}
          placeholder={'Mật khẩu'}
          onChangeText={(text) => {this.onPasswordChange(text)}}/>
      ),
    }
  }

  get footer () {
    return (
      <View style={styles.footer.container}>
        {this.button.logIn}
        {this.button.register}
      </View>
    )
  }

  get body () {
    return (
      <View style={styles.body.container}>
        {this.notify.username}
        {this.textInput.username}
        {this.notify.password}
        {this.textInput.password}
      </View>
    )
  }

  get header () {
    return (
      <View style={[styles.header.container,{borderWidth: 2}]}>

      </View>
    )
  }

  get form () {
    return (
      <View style={styles.container}>
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
  console.log(`state ${JSON.stringify(state)}`);
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