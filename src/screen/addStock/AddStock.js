import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Picker,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import StockAction from '../../actions/Stock/StockAction';
import StockActionType from '../../actions/Stock/StockActionType';
import { Codes } from '../../constant/Response';
import { BackIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import styles from './AddStock.styles';
import MyTextInput from '../../components/myTextInput/MyTextInput';
import { openLibrary } from '../../actions/PhotoAction';
import TypeItemAction from '../../actions/Type/TypeItemAction';
import TypeItemActionType from '../../actions/Type/TypeItemActionType';

class AddStock extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      typeName: 'Sách vở',
      mainPicture: ``,
      type: [],
    }
    
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.onSendButtonClick = this.onSendButtonClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onNameClear = this.onNameClear.bind(this);
    this.onDescriptionClear = this.onNameChange.bind(this);
  }

  insert (
    success = (res) => {},
    failed = (res) => {},
  ) {
    let {
      insert,
      navigateToHome,
    } = this.action;

    let {
      token,
    } = this.dependencies;
    console.log(`đang đăng: `,JSON.stringify(this.state))
    insert({
      name: this.state.name,
      description: this.state.description,
      typeName: this.state.typeName,
      mainPicture: this.state.mainPicture,
      token,
    },()=>{},
    (res)=>{
      if(res.code === Codes.Success){
        success(res);
      } else {
        failed(res);
      }
      this.renew();
      navigateToHome();
    })
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
      this.setState({mainPicture: res});},
    );
  }

  renew () {
    this.setState({
      name: '',
      description: '',
      typeName: 'Sách vở',
      mainPicture: ``,
    });
  }

  get action () {
    let {
      visible = false,
      insert = () => console.log(` Vừa gửi thông tin của vật phẩm lên máy chủ.`),
      navigateToHome = () => console.log(` Vừa nhấn chuyển sang màn hình chính.`),
      onInsertStock = () => console.log(` Vừa nhận được thông tin quà tặng.`),
      onGetAllType = () => console.log(` Chờ lấy toàn bộ loại vật phẩm từ hệ thống`),
      openLibrary = () => console.log(` Đang mở thư viện.`),
    } = this.props;
    return {
      visible,
      insert,
      navigateToHome,
      onInsertStock,
      onGetAllType,
      openLibrary,
    };
  }

  componentDidMount () {
    let {
      onInsertStock,
      navigateToHome,
      onGetAllType,
    } = this.action;

    onGetAllType(
      (res) => {
        this.setState({type: res.content.list})
      }
    )
    onInsertStock(
        (res) => {
          // console.log(`Vừa đăng: ${JSON.stringify(res)}`);
          navigateToHome();
      }
    )
  }

  get dependencies () {
    let {
      token = null,
      visible = false,
      mainPicture = ``,
    } = this.props;
    return {
      visible,
      token,
      mainPicture,
    };
  }

  onBackButtonClick () {
    let {
      navigateToHome,
    } = this.action;

    navigateToHome();
  }

  onSendButtonClick () {
    this.insert();
  }

  onNameChange (text) {
    this.setState({name: text});
  }

  onDescriptionChange (text) {
    this.setState({description: text});
  }

  get button () {
    const _style = styles.button;
    return {
      back: (
      <TouchableOpacity 
        style={{flex: 1}}
        onPress={this.onBackButtonClick}>
        <BackIcon 
          color={ Color.Gray}/>
      </TouchableOpacity>
      ),
      send: (
        <TouchableOpacity 
          style={_style.submit.button}
          onPress={this.onSendButtonClick}>
          <Text style={_style.submit.text}>GỬI</Text>
        </TouchableOpacity>
      ),
      image: (
        <TouchableOpacity 
        style={{height: 300}}
        onPress={()=>{this.sendImage()}}
        >
          <Text style={_style.image.text}>CHẠM ĐỂ CHỌN HÌNH</Text>
          {this.image}
        </TouchableOpacity>
      ),
    }
  }

  get image () {
    let photo = this.state.mainPicture;
    // console.log(`url photo là: ${JSON.stringify(photo)}`)

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
  get label () {
    const _style = styles.label;
    return {
      screen: (<Text style={_style.screen}> Tặng phẩm </Text>)
    }
  }

  get textInput () {
    const _style = styles.textInput;
    return {
      name: (
        <MyTextInput 
          style={_style.name}
          onClear = {this.onNameClear}
          onChangeText={this.onNameChange}
          placeholder={'tên vật phẩm'}
        />
      ),
      description: (
        <MyTextInput 
          style={_style.description}
          onClear = {this.onDescriptionClear}
          multiline = {true}
          onChangeText={this.onDescriptionChange}
          placeholder={'Mô tả'}
        />
      ),
    }
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

  get header () {
    return(
    <View
      style={{flex: 1, flexDirection: `row`}}>
        {this.button.back}
        {this.label.screen}
    </View>) 
  }
  get body () {
    return(
      <View style={{flex: 8}}>
        {this.button.image}
        {this.picker}
        {this.textInput.name}
        {this.textInput.description}
      </View>
      )
  }
  get footer () {
    return(
      <View style={{flex: 1}}>
        {this.button.send}
      </View>
      )
  }
  
  get form () {
    return (
      <ScrollView style={{flex: 1, padding: 10}}>
        {this.header}
        {this.body}
        {this.footer}
      </ScrollView>
    )
  }

  render() {
    let {
      visible,
    } = this.dependencies;
    console.log(`Stock visible ${visible}`);
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
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
    point: state.auth.point,
    stock: state.stock,
    mainPicture: state.photo,
  }
}

const mapDispatchToProps = (dispatch) => ({
  insert: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    StockAction.emit(
        StockActionType.emitInsert,
      ).inject(
        data,
        pre,
        next
      ),
  ),
  openLibrary: (
    success = (res) => {},
    failed = (err) => {}) => dispatch(
      openLibrary(
        success,
        failed,
      )),
  
  onInsertStock: (
    data,
    callback = (res) => {},
    ) => dispatch(
      StockAction.on(
        StockActionType.onInsert
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
        TypeItemActionType.onGetAll
      ).inject(
        data,
        callback,
      )
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStock);