import React, {Component} from 'react';
import {
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AuthActionType from '../../actions/Auth/AuthActionType';
import AuthAction from '../../actions/Auth/AuthAction';
import { connect } from 'react-redux';
import { Codes } from '../../constant/Response';
import socket from '../../../Configuration';
import styles from './Register.styles'
import SalmonGradientButton from '../../constant/SalmonGradientButton';
import GrayGradientButton from '../../constant/GrayGradientButton';
import {Font, Fonts} from '../../utils/Fonts';


class Register extends Component {
  constructor (props) {
    super(props);
    this.state = this.initialState;
  }

  // Logic

  get initialState () {
    return {
      username: ``,
      password: ``,
      name: ``,
      email: ``,
      phone: ``,
      intro: ``,
    };
  }

  emitRegister (
    success = () => {},
    failed = () => {},
  ) {
    let {
      emitRegister,
    } = this.action;
    emitRegister({
      // username: this.state.username,
      // password: this.state.password,
      // email: this.state.email,
      // phone: this.state.phone,
      // intro: this.state.intro,

      username: `admin123`,
      password: `admin123`,
      name: `datnguyen`,
      email: `oodatnhoemployeeoo@gmail.com`,
      phone: `0939083581`,
      intro: `uit`,
    },() => {},
    (res) => {
      if(res.code === Codes.Success) {
        success();
      } else {
        failed();
      }
    });
  }

  onRegister (
    success = () => {},
    failed = () => {},
  ) {
    let {
      onRegister,
    } = this.action;
    onRegister((res) => {
      if(res.code === Codes.Success) {
        // this.refresh();
        success();
      } else {
        failed();
      }
    });
  }

  onUsernameChange (text) {
    this.setState({username: text});
  }
  onPasswordChange (text) {
    this.setState({password: text});
  }
  onNameChange (text) {
    this.setState({name: text});
  }
  onEmailChange (text) {
    this.setState({email: text});
  }
  onPhoneChange (text) {
    this.setState({phone: text});
  }
  onIntroChange (text) {
    this.setState({intro: text});
  }

  get action () {
    let {
      navigateToHome = () => {console.log(`Bạn vừa nhấn đăng kí.`)},
      navigateToLogIn = () => {console.log(`Bạn vừa nhấn quay lại.`)},
      onRegister,
      emitRegister,
    } = this.props;
    return {
      navigateToHome,
      navigateToLogIn,
      onRegister,
      emitRegister,
    }
  }

  get dependencies () {
    let {
      visible = false,
    } = this.props;
    return {
      visible,
    };
  }

  // Design

  componentWillMount () {
    let {
      navigateToHome,
      navigateToLogIn,
    } = this.action;

    this.onRegister(
      () => {navigateToHome();},
      () => {navigateToLogIn();}
    )
    
  }

  buttonRegister_onClick () {
    this.emitRegister();
  }

  buttonBack_onClick () {
    let {
      navigateToLogIn,
    } = this.action;

    navigateToLogIn();
  }


  get button () {
    return {
      register: (
        <SalmonGradientButton
          onPress={() => {this.buttonRegister_onClick()}}
          Name = {"Đăng Ký"}>
        </SalmonGradientButton>

      ),
      back: (
        <GrayGradientButton         
          onPress={() => {this.buttonBack_onClick()}}
          Name = {"Hủy Bỏ"}>
        </GrayGradientButton>
      ),
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
      name: (
        <TextInput 
          style={styles.textinput}
          placeholder={'Tên '}
          onChangeText={(text) => {this.onNameChange(text)}}/>
      ),
      email: (
        <TextInput 
          style={styles.textinput}
          placeholder={'Email'}
          onChangeText={(text) => {this.onEmailChange(text)}}/>
      ),
      phone: (
        <TextInput 
          style={styles.textinput}
          keyboardType={'phone-pad'}
          placeholder={'Số điện thoại'}
          onChangeText={(text) => {this.onPhoneChange(text)}}/>
      ),
      intro: (
        <TextInput 
          style={styles.textinput}
          placeholder={'Giới thiệu'}
          onChangeText={(text) => {this.onIntroChange(text)}}/>
      ),
    }
  }

  get header () {
    return <View style={styles.header}>
      <Text style = {{
        flex:1,
        textAlign: 'center', 
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#B8EC56',
        fontFamily: Fonts.Dancing,
    }}>
      Đăng Kí
      </Text>
    </View>
  }
  get body () {
    return (
      <View style={styles.body}>
        {this.textInput.username}
        {this.textInput.password}
        {this.textInput.name}
        {this.textInput.email}
        {this.textInput.phone}
        {this.textInput.intro}
        {this.button.register}
        {this.button.back}
      </View>
    )
  }
  get footer () {
    return (
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
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
  onRegister: (
    callback = (res) => {}
    ) => dispatch(
      AuthAction.on(
        AuthActionType.onRegister
      ).inject(
        callback,
      )
  ),
  emitRegister: (
    data,
    pre = () => {},
    next = (res) => {}
    ) => dispatch(
      AuthAction.emit(
        AuthActionType.emitRegister
      ).inject(
        data,
        pre,
        next,
      )
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);