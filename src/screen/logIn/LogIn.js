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
import LinearGradient from 'react-native-linear-gradient';
import SalmonGradientButton from '../../constant/SalmonGradientButton';
import GrayGradientButton from '../../constant/GrayGradientButton';
import {Fonts} from '../../utils/Fonts';
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

  componentWillMount () {
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
        <SalmonGradientButton
          
          onPress={() => {this.buttonLogIn_onClick()}}
          Name= {'Đăng Nhập'}>
        </SalmonGradientButton>
      ),
      
      register: (

        <GrayGradientButton 
        onPress={() => {this.buttonRegister_onClick()}}
        Name={'Đăng Kí'}
        ></GrayGradientButton>                                                        
      )
    }
  }

  get textInput () {
    return {
      username: (
        <TextInput 
          style={styles.textinput}
          placeholder={'Tên tài khoản'}
          onChangeText={(text) => {this.onUsernameChange(text)}}/>
      ),
      password: (
        <TextInput 
          style={styles.textinput}
          placeholder={'Mật khẩu'}
          secureTextEntry={true}
          onChangeText={(text) => {this.onPasswordChange(text)}}/>
      ),
    }
  }

  get footer () {
    return (
      <View style={styles.footer.container}>
      <View style={{flex: 1, flexDirection: 'row', backgroundColor:'#92D6D9'}}>
        <View style={{flex :2}}></View>
        <View style={{flex:1, flexDirection: 'row'}}
        >
          <TouchableOpacity style = {{
            alignSelf:'center',
            
            }}>
            <Text style ={{ 
              color :'#0E6F73',
              fontSize: 10,
              marginRight:10,
              borderBottomColor:"#0E6F73",
              borderBottomWidth:1,
            }}>Term of Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {{alignSelf:'center'}}>
            <Text style ={{alignSelf:'center',
              color :'#0E6F73',
              borderBottomColor:"#0E6F73",
              borderBottomWidth:1,
              fontSize: 10
              }}>Credit</Text>
          </TouchableOpacity>

        </View>
        
      </View>
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
        {this.button.logIn}
        {this.button.register}
      </View>
    )
  }

  get header () {
    return (
      <View style={[styles.header.container]}>  
          <Text style={{ 
          flex:1,
          textAlign: "center",  
          fontSize:40,
          textAlignVertical:"center",
          fontFamily: Fonts.Dancing,
          color:'#FFAEAB'}}>
          XiQuap
          </Text>       
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