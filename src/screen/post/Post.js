import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Picker,
  Dimensions,
  ScrollView,
} from 'react-native';
import MyTextInput from '../../components/myTextInput/MyTextInput';

import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import { openLibrary } from '../../actions/PhotoAction';
import { connect } from 'react-redux';
import { BackIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import styles from './Post.styles';
import TypeItemAction from '../../actions/Type/TypeItemAction';

const {
  height,
} = Dimensions.get('screen');

class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      typeName: 'Sách vở',
      photo: '',
      type: [],
    }

    this.sendImage = this.sendImage.bind(this);
    this.renew = this.renew.bind(this);
    this.onNameClear = this.onNameClear.bind(this);
    this.onDescriptionClear = this.onDescriptionClear.bind(this);
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
      name: this.state.name,
      description: this.state.description,
      typeName: this.state.typeName,
      mainPicture: this.state.photo,
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
      onGetAllType = () => console.log(` Chờ lấy toàn bộ loại vật phẩm từ hệ thống`),
    } = this.props;
    return {
      navigateToHome,
      emitInsertItem,
      onInsertItem,
      openLibrary,
      onGetAllType,
    };
  }

  componentDidMount () {
    let {
      onInsertItem,
      navigateToHome,
      onGetAllType,
    } = this.action;
        console.log(`Vừa đăng: ${JSON.stringify(navigateToHome)}`);

      onGetAllType(
        (res) => {
          this.setState({type: res.content.list});
        }
      )
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
      type = null,
    } = this.props;
    return {
      visible,
      ownerName,
      token,
      photo,
      type,
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

  onNameClear () {
    this.setState({name: ''});
  }

  onDescriptionClear () {
    this.setState({description: ''});
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

  get picker () {
    const type = this.state.type;
    if (!type || type.length === 0) return (<View />);

    const _style = styles.picker;
    return (
        <Picker 
          style = {_style.container}
          onValueChange={(val) => {this.setState({typeName: val})}}
          selectedValue = {this.state.typeName}
          itemStyle= {_style.item}>
          {type.map(val => <Picker.Item 
              key = {`Picker_${val.name}`}
              value = {val.name}
              label = {val.name}
            />)}
        </Picker>
      )
  }

  get label () {
    const _style = styles.label;
    return {
      screen: (<Text style={_style.screen}> Bài viết </Text>)
    }
  }

  get button () {
    const _style = styles.button;
    return {
      back: (
        <TouchableOpacity 
        style={{flex: 1}}
        onPress={()=>{this.backButton_onClick()}}
        ><BackIcon 
          color={ Color.Gray}/>
        </TouchableOpacity>
      ),
      submit: (
        <TouchableOpacity 
        style={_style.submit.button}
        onPress={()=>{this.submitButton_onClick()}}
        ><Text style={_style.submit.text}>ĐĂNG</Text>
        </TouchableOpacity>
      ),
      image: (
        <TouchableOpacity 
        style={{height: 200}}
        onPress={()=>{this.sendImage()}}
        >
          <Text style={_style.image.text}>CHẠM ĐỂ CHỌN HÌNH</Text>
          {this.image}
        </TouchableOpacity>
      ),
    }
  }

  get textInput () {
    const _style = styles.textInput;
    return {
      name: (
        <MyTextInput 
          style={_style.name}
          onClear = {this.onNameClear}
          placeholder={'Tên vật trao đổi'}
          onChangeText={(text) => {this.onNameChange(text)}}/>
      ),
      description: (
        <MyTextInput 
          style={_style.description}
          onClear = {this.onDescriptionClear}
          multiline = {true}
          placeholder={'Nội dung trao đổi '}
          onChangeText={(text) => {this.onDescriptionChange(text)}}/>
        ),
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

  get header () {
    return (
    <View
      style={{flex: 1, flexDirection: `row`}}>
        {this.button.back}
        {this.label.screen}
    </View>) }
  get body () {
    return (
      <View 
        style={{flex: 8}}>
        {this.textInput.name}
        {this.textInput.typeName}
        {this.textInput.description}
        {this.picker}
        {this.button.image}
        {this.button.submit}
      </View>
    )
  }
  get footer () {return <View/>}
  
  get form () {
    return (

      <ScrollView style={{flex: 1, padding: 10}}>
        {this.header}
        {this.body}
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
    type: state.type,
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
  onGetAllType: (
    data,
    callback = (res) => {},
    ) => dispatch(
      TypeItemAction.on(
        TypeItemAction.onGetAll
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