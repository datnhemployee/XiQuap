import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import { openLibrary } from '../../actions/PhotoAction';
import { connect } from 'react-redux';


class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      typeName: '',
      photo: '',
    }

    this.sendImage = this.sendImage.bind(this);
    this.renew = this.renew.bind(this);
  }

  submit () {
    let {
      emitInsertItem,
    } = this.action;

    let {
      ownerName,
      token,
    } =  this.dependencies;
    emitInsertItem({
      // name: this.state.name,
      // description: this.state.description,
      // typeName: this.state.typeName,

      name: `Iphone9X`,
      description: `Mắc quá`,
      typeName: `khác`,
      ownerName: ownerName,
      token: token,
    });
    
  }

  get action () {
    let {
      navigateToHome = () => {console.log(`Vừa nhấn quay trở lại màn hình Home`)},
      openLibrary = () => {console.log(`Vừa nhấn đăng hình`)},
      emitInsertItem,
      onInsertItem,
    } = this.props;
    return {
      navigateToHome,
      emitInsertItem,
      onInsertItem,
      openLibrary,
    };
  }

  componentDidMount () {
    let {
      onInsertItem,
      navigateToHome,
    } = this.action;
        console.log(`Vừa đăng: ${JSON.stringify(navigateToHome)}`);
      onInsertItem(
        (res) => {
          console.log(`Vừa đăng: ${JSON.stringify(res)}`);
          navigateToHome();
      }
    )
  }

  get dependencies () {
    let {
      visible = false,
      ownerName,
      token,
      photo = '',
    } = this.props;
    return {
      visible,
      ownerName,
      token,
      photo,
    };
  }

  renew () {
    this.setState({
      name: '',
      description: '',
      typeName: '',
      photo: '',
    })
  }
  backButton_onClick () {
    let {
      navigateToHome,
    } =this.props;
    navigateToHome();
  }

  onNameChange (text) {
    this.setState({name: text});
  }

  onDescriptionChange (text) {
    this.setState({description: text});
  }

  onTypeNameChange (text) {
    this.setState({typeName: text});
  }

  submitButton_onClick () {
    this.submit();
  }

  sendImage () {
    let {
      openLibrary,
    } = this.action;

    openLibrary(
      (res) => {

      this.setState({photo: res});},
    );
  }

  get button () {
    return {
      back: (
        <TouchableOpacity 
        style={{flex: 1}}
        onPress={()=>{this.backButton_onClick()}}
        ><Text> trở lại</Text>
        </TouchableOpacity>
      ),
      submit: (
        <TouchableOpacity 
        style={{flex: 1}}
        onPress={()=>{this.submitButton_onClick()}}
        ><Text>Đăng</Text>
        </TouchableOpacity>
      ),
      image: (
        <TouchableOpacity 
        style={{flex: 1}}
        onPress={()=>{this.sendImage()}}
        ><Text>Gửi hình</Text>
        </TouchableOpacity>
      ),
    }
  }

  get textInput () {
    return {
      name: (
      <TextInput 
        style={{flex: 1}}
        placeholder={'Tên vật trao đổi'}
        onChangeText={(text)=>{this.onNameChange(text)}}
      />),
      description: (
        <TextInput 
          style={{flex: 1}}
          placeholder={'Mô tả'}
        onChangeText={(text)=>{this.onDescriptionChange(text)}}
        />),
      typeName: (
        <TextInput 
          style={{flex: 1}}
          placeholder={'Loại vật trao đổi'}
        onChangeText={(text)=>{this.onTypeNameChange(text)}}
        />),
    }
  }

  get image () {
    let photo = this.state.photo;
    console.log(`url photo là: ${JSON.stringify(photo)}`)

    return (
      <Image
        style = {{
          flex: 2,
          height: `100%`,
          width: `100%`,
        }} 
        resizeMode = {'stretch'}
        source={!!photo?{uri: photo}:require('../../img/default.png')}/>
    )
  }

  get header () {return <View/>}
  get body () {
    return (
      <View 
        style={{flex: 1}}>
        {this.button.back}
        {this.textInput.name}
        {this.textInput.typeName}
        {this.textInput.description}
        {this.image}
        {this.button.image}
        {this.button.submit}
      </View>
    )
  }
  get footer () {return <View/>}
  
  get form () {
    return (
      <View style={{flex: 1}}>
        {this.body}
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
        onShow={()=> {this.renew()}}
        >
        {this.form}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    ownerName: state.auth.name,
    token: state.auth.token,
    photo: state.photo,
  }
}

const mapDispatchToProps = (dispatch) => ({
  emitInsertItem: (
    data,
    pre = () => {},
    next = (res) => {}
    ) => dispatch(
      ExchangeAction.emit(
        ExchangeActionType.emitInsertItem
      ).inject(
        data,
        pre,
        next,
      )
  ),
  onInsertItem: (
    data,
    callback = (res) => {},
    ) => dispatch(
      ExchangeAction.on(
        ExchangeActionType.onInsertItem
      ).inject(
        data,
        callback,
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
)(Post);