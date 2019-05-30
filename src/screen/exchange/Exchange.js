import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import { connect } from 'react-redux';
import { Codes } from '../../constant/Response';
import { BackIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import MyTextInput from '../../components/myTextInput/MyTextInput';
import styles from './Exchange.styles';

const {
  height,
} = Dimensions.get('screen');
class Exchange extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: ``,
      description: ``,
      photoUrl: ``,
    }
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDescriptionClear = this.onDescriptionClear.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNameClear = this.onNameClear.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
  }

  submit () {
    let {
      item,
      token,
    } = this.dependencies;

    let {
      navigateToHome,
      exchange,
    } = this.action;
    
    if (!!item) {
      exchange({
        _id: item._id,
        token,
        name: this.state.name,
        description: this.state.description,
        photoUrl: this.state.photoUrl,
      });
    }
    navigateToHome();

  }

  renew () {
    this.setState({
      name: ``,
      description: ``,
    })
  }

  get action () {
    let {
      navigateToHome = () => console.log(` Vừa nhấn nút chuyển sang màn hình chính.`),
      onGetItem = () => console.log(` Vừa nhận kết quả lấy vật phẩm.`),
      onGiveLike = () => console.log(` Vừa nhận kết quả like.`),
      onExchange = () => console.log(` Vừa nhận kết quả trao đổi.`),
      exchange = () => {},
    } = this.props;
    return {
      navigateToHome,
      
      exchange,
      onGetItem,
      onGiveLike,
      onExchange,
    }
  }

  get dependencies () {
    let {
      visible = false,
      item = null,
      token,
      name,
    } = this.props;
    return {
      visible,
      item,
      token,
      name,
    };
  }

  componentDidMount () {
    let {
      onGiveLike,
      onGetItem,
      onExchange,
    } = this.action;

    onGiveLike((res) => {
      if(res.code === Codes.Success){
        this.refresh();
      }
    });

    onGetItem((res) => {
      if(res.code === Codes.Success){
        this.refresh();
      }
    });

    onExchange((res) => {
      if(res.code === Codes.Success){
        this.renew();
      }
    });
  }

  refresh () {
    this.setState({});
  }

  onSubmitButtonClick () {
    this.submit();
  }

  onNameChange (text) {
    this.setState({
      name: text,
    })
  }

  onDescriptionChange (text) {
    this.setState({
      description: text,
    })
  }

  onBackButtonClick () {
    let {
      navigateToHome
    } = this.action;
    navigateToHome();
  }

  onDescriptionClear () {
    this.setState({description: ''});
  }

  onNameClear () {
    this.setState({name: ''});
  }

  get label () {
    let {
      item, 
      name,
    } = this.dependencies;

    const _style = styles.label;
    if (!item._id) {
      return (<Text >Đang chờ thông tin từ máy chủ</Text>)
    }
    return {
      screen: (<Text style={_style.screen}>Trao đổi</Text>),
    }
  }

  get textInput () {
    const _style = styles.textInput;
    return {
      name: (<MyTextInput 
        style={_style.name}
          onClear = {this.onNameClear}
          placeholder={'Tên vật'}
          onChangeText={(text) => {this.onNameChange(text)}}/>
          ),
      description: (<MyTextInput 
          style={_style.description}
          onClear = {this.onDescriptionClear}
          multiline = {true}
          placeholder={'Mô tả'}
          onChangeText={(text) => {this.onDescriptionChange(text)}}/>
        ),
    }
  }

  get button () {
    const _style = styles.button;
    return {
      submit: (
        <TouchableOpacity 
        style={_style.submit.button}
        onPress={()=>{this.onSubmitButtonClick()}}
        ><Text style={_style.submit.text}>ĐĂNG</Text>
        </TouchableOpacity>
      ),
      back: (
        <TouchableOpacity 
          style = {_style.back}
          onPress = {this.onBackButtonClick}> 
          <BackIcon 
            color= {Color.Gray}/>
          {this.label.screen}
        </TouchableOpacity>),
    }
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
          `Chạm để chọn ảnh vật phẩm`
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

 

  get header () {
    return (
      <View style={styles.header}>
        {this.button.back}
      </View>
    )}
  get body () {
    return (
      <View style={styles.body}>
        {this.imagePicker}
        {this.textInput.name}
        {this.textInput.description}
      </View>
    )}
  get footer () {
    return (
    <View style={styles.footer}>
      {this.button.submit}
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
        >
        {this.form}
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
    name: state.auth.name,
    item: state.post,
  }
}

const mapDispatchToProps = (dispatch) => ({
  
  exchange: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitExchange,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  onExchange: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onExchange,
    ).inject(
      callback
    )
  ),

  onGetItem: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGetItem,
    ).inject(
      callback
    )
  ),

  
  onGiveLike: (
    callback = (res)=>{},
  ) => dispatch(
    ExchangeAction.on(
      ExchangeActionType.onGiveLike,
    ).inject(
      callback
    )
  ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Exchange);