import React, {Component} from 'react';
import {
  View, 
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import AuthActionType from '../../actions/Auth/AuthActionType';
import AuthAction from '../../actions/Auth/AuthAction';
import { connect } from 'react-redux';
import { Codes } from '../../constant/Response';
import socket from '../../../Configuration';
import MyTextInput from '../../components/myTextInput/MyTextInput';
import styles from './Register.styles';
import { noBlankSpace } from '../../helpers/StringHelper';
import Color from '../../constant/Color';
import Typeface from '../../constant/Font';
import { openLibrary } from '../../actions/PhotoAction';

class Register extends Component {
  constructor (props) {
    super(props);
    this.state = this.initialState;
    this.renew = this.renew.bind(this);
    this.onPasswordClear = this.onPasswordClear.bind(this);
    this.onUsernameClear = this.onUsernameClear.bind(this);
    this.onEmailClear = this.onEmailClear.bind(this);
    this.onIntroClear = this.onIntroClear.bind(this);
    this.onAddressClear = this.onAddressClear.bind(this);
    this.onNameClear = this.onNameClear.bind(this);
    this.onPhoneClear = this.onPhoneClear.bind(this);
    this.onImagePickerClick = this.onImagePickerClick.bind(this);
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
      avatar: ``,
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
      // name: this.state.name,
      // email: this.state.email,
      // phone: this.state.phone,
      // intro: this.state.intro,
      avatar: this.state.avatar,

      username: `admin123`,
      password: `admin123`,
      name: `datnguyen`,
      email: `oodatnhoemployeeoo@gmail.com`,
      phone: `0939083581`,
      intro: `uit`,
    },() => {socket.connect()},
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
        success(res.content);
      } else {
        failed(res.content);
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

  sendImage () {
    let {
      openLibrary,
    } = this.action;

    openLibrary(
      (res) => {
      this.setState({avatar: res});
    },
    );
  }

  get action () {
    let {
      navigateToHome = () => {console.log(`Bạn vừa nhấn đăng kí.`)},
      navigateToLogIn = () => {console.log(`Bạn vừa nhấn quay lại.`)},
      openLibrary = () => console.log(` Vừa chọn mở thư viện hình ảnh.`),
      onRegister,
      emitRegister,
    } = this.props;
    return {
      navigateToHome,
      navigateToLogIn,
      openLibrary,
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

  componentDidMount () {
    let {
      navigateToHome,
      navigateToLogIn,
    } = this.action;

    this.onRegister(
      () => {navigateToHome();},
      (err) => {
        Alert.alert(
          `Cảnh báo`,
          err,
          [
            {text: `Tắt`,onPress: () => {}}
          ],
          {
            cancelable: false,
          })
      }
    )
    
  }

  buttonRegister_onClick () {
    let constrainst = !!this.validated.username? this.validated.username
      : !!this.validated.password? this.validated.password
      : !!this.validated.name? this.validated.name
      : !!this.validated.email? this.validated.email
      : !!this.validated.phone? this.validated.phone
      : undefined;
    // console.log(`Nhận thấy: `,constrainst)
    // if(!!constrainst) {
    //   Alert.alert(
    //     `Cảnh báo`,
    //     constrainst,
    //     [
    //       {text: `Tắt`}
    //     ],
    //     {
    //       cancelable: false,
    //     })
    // } else {
      this.emitRegister();
    // }
  }
  onImagePickerClick () {
    this.sendImage ();
  }

  onPasswordClear (text) {
    this.setState({password: ''});
  }

  onUsernameClear (text) {
    this.setState({username: ''});
  }

  onNameClear (text) {
    this.setState({name: ''});
  }

  onAddressClear (text) {
    this.setState({address: ''});
  }

  onEmailClear (text) {
    this.setState({email: ''});
  }

  onIntroClear (text) {
    this.setState({intro: ''});
  }

  onPhoneClear (text) {
    this.setState({phone: ''});
  }

  buttonBack_onClick () {
    let {
      navigateToLogIn,
    } = this.action;

    navigateToLogIn();
  }

  renew () {
    this.setState(this.initialState);
  }

  get imagePicker () {
    // const avatar = !?
    //       `Chạm để chọn ảnh đại diện`
    //       :avatar;

    const _style= styles.imagePicker;
    return (
      <TouchableOpacity 
        style={_style.button}
        onPress = {this.onImagePickerClick}>
        {this.image}
        <Text 
          style={_style.text}
          >{!this.state.avatar ?
          `Chạm để chọn ảnh đại diện`
          :this.state.avatar}
        </Text>
      </TouchableOpacity>
    )
  }

  get image () {
    const avatar = this.state.avatar;
    return (
      <Image 
        style = {{
          flex: 2,
          height: `100%`,
          width: `100%`,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }} 
        resizeMode = {'stretch'}
        source = {!!avatar?{uri: avatar}:require(`../../img/default.png`)}
      />
    )
  }
  
  get button () {
    const _style= styles.button;
    return {
      register: (
        <TouchableOpacity 
          style={_style.register}
          onPress={() => {this.buttonRegister_onClick()}}>
          <Text 
          style={_style.registerText}
          >ĐĂNG KÍ </Text>
        </TouchableOpacity>
      ),
      back: (
        <TouchableOpacity 
          style={_style.back}
          onPress={() => {this.buttonBack_onClick()}}>
          <Text 
          style={_style.backText}
          >HỦY </Text>
        </TouchableOpacity>
      ),
    }
  }

  get validated () {
    return {
      username: !this.state.username ?
        `Vui lòng không bỏ trống tên tài khoản`:
        !noBlankSpace(
          this.state.username,
          ) ? `Tài khoản không được tồn tại khoảng cách.`:
          undefined,
      password: !this.state.password ?
        `Vui lòng không bỏ trống mật khẩu.`:
        !noBlankSpace(
          this.state.password,
          ) ? `Mật khẩu không được tồn tại khoảng cách.`:
          undefined,
      name:  !this.state.name ?
        `Vui lòng không bỏ trống tên.`:
        undefined,
      phone:  !this.state.phone ?
        `Vui lòng không bỏ trống điện thoại.`:
        undefined,
      address:  undefined,
      email:  !this.state.email ?
        `Vui lòng không bỏ trống email.`:
        undefined,
      intro: undefined,
    }
  }

  get notify () {
    let validatedUsername = this.validated.username;
    let validatedPassword = this.validated.password;
    let validatedName = this.validated.name;
    let validatedPhone = this.validated.phone;
    let validatedAddress = this.validated.address;
    let validatedEmail = this.validated.email;
    let validatedIntro = this.validated.intro;
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
      name: (
        <Text style={[{color: !!validatedName?
          Color.Red
          :Color.White},
          _style.name]}>
          {validatedName}
        </Text>
      ),
      phone: (
        <Text style={[{color: !!validatedPhone?
          Color.Red
          :Color.White},
          _style.phone]}>
          {validatedPhone}
        </Text>
      ),
      email: (
        <Text style={[{color: !!validatedEmail?
          Color.Red
          :Color.White},
          _style.email]}>
          {validatedEmail}
        </Text>
      ),
      address: (
        <Text style={[{color: !!validatedAddress?
          Color.Red
          :Color.White},
          _style.address]}>
          {validatedAddress}
        </Text>
      ),
      intro: (
        <Text style={[{color: !!validatedIntro?
          Color.Red
          :Color.White},
          _style.intro]}>
          {validatedIntro}
        </Text>
      ),
    }
  }

  get textInput () {
    const _style = styles.textInput;
    return {
      username: (
        <MyTextInput 
          style={_style.username}
          onClear = {this.onUsernameClear}
          placeholder={'Tên tài khoản'}
          onChangeText={(text) => {this.onUsernameChange(text)}}/>
      ),
      password: (
        <MyTextInput 
          style={_style.password}
          onClear = {this.onPasswordClear}
          secureTextEntry = {true}
          placeholder={'Mật khẩu'}
          onChangeText={(text) => {this.onPasswordChange(text)}}/>
      ),
      name: (
        <MyTextInput 
          style={_style.name}
          onClear = {this.onNameClear}
          placeholder={'Tên của tôi '}
          onChangeText={(text) => {this.onNameChange(text)}}/>
      ),
      email: (
        <MyTextInput 
          style={_style.email}
          placeholder={'Email'}
          onClear = {this.onEmailClear}
          keyboardType = {'email-address'}
          onChangeText={(text) => {this.onEmailChange(text)}}/>
      ),
      phone: (
        <MyTextInput 
          style={_style.phone}
          onClear = {this.onPhoneClear}
          keyboardType={'phone-pad'}
          placeholder={'Số điện thoại'}
          keyboardType = {'phone-pad'}
          onChangeText={(text) => {this.onPhoneChange(text)}}/>
      ),
      intro: (
        <MyTextInput 
          style={_style.intro}
          onClear = {this.onIntroClear}
          placeholder={'Giới thiệu'}
          multiline = {true}
          onChangeText={(text) => {this.onIntroChange(text)}}/>
      ),
    }
  }

  get label () {
    return {
      policy: (
        <Text style={{
          // height: 50,
          flex: 1,
          flexWrap: 'wrap',
          ...Typeface.subtitle[1],
          // borderWidth: 1,
          }}> 
        {`Bằng cách nhấn vào nút \"Đăng kí\", tôi đồng ý với các Điều khoản khi sử dụng phần mềm.`}
        </Text>
      )
    }
  }

  get header () {
    return (
      <View style={styles.header}>
        {this.imagePicker}
      </View>
    )
  }
  get body () {
    return (
      <View style={styles.body}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            // borderWidth: 1,
            }}>
              {this.textInput.username}
              {this.notify.username}
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            // borderWidth: 1,
            }}>
              {this.textInput.password}
              {this.notify.password}
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            // borderWidth: 1,
            }}>
              {this.textInput.name}
              {this.notify.name}
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            // borderWidth: 1,
            }}>
              {this.textInput.email}
              {this.notify.email}
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            // borderWidth: 1,
            }}>
              {this.textInput.phone}
              {this.notify.phone}
          </View>
          <View style={{
            // height: 100,
            flex: 1.5,
            justifyContent: 'center',
            alignItems: 'flex-end',
            // borderWidth: 1,
            }}>
              {this.textInput.intro}
              {this.notify.intro}
          </View>
      </View>
    )
  }
  get footer () {
    const _style = styles.footer;
    return (
      <View style={_style}>
        {this.label.policy}
        {this.button.register}
        {this.button.back}
      </View>
    )
  }
  get form () {
    return (
      <ScrollView 
      style={{flex: 1}}
      showsHorizontalScrollIndicator = {false}>
        <View style={styles.container}>
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
        onShow = {() => this.renew()}
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
  openLibrary: (
    success = (res) => {},
    failed = (err) => {}) => dispatch(
      openLibrary(
        success,
        failed,
      )),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);