import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MessageBox from '../../components/MessageBox';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import { connect } from 'react-redux';
import Axios from 'axios';
import createFormData from '../../helpers/FormData';

class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      typeName: '',
      image: null,
    }

    this.sendImage = this.sendImage.bind(this);
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
      emitInsertItem,
      onInsertItem,
    } = this.props;
    return {
      navigateToHome,
      emitInsertItem,
      onInsertItem,
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
    } = this.props;
    return {
      visible,
      ownerName,
      token,
    };
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
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, res => {
    // console.log(`uri ${JSON.stringify(!!res)}`);

      if(!!res) {
        this.setState({image: res},async () => {
          try {
            let response = await Axios.post('http://192.168.1.36:3000/',
            createFormData(this.state.image, {}));
            console.log(`Kết quả là: `,JSON.stringify(response))
          } catch (sendErr) {
            console.log(`Lỗi ở đây ${sendErr}`)
          } 
        });
      }
    })

    
  }

  get button () {
    return {
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
    return (
      <Image source={{uri: !!this.state.image?this.state.image.uri:''}}/>
    )
  }

  get header () {return <View/>}
  get body () {
    return (
      <View 
        style={{flex: 1}}>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);