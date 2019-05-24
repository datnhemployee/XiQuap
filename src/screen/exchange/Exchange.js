import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import { connect } from 'react-redux';
import { Codes } from '../../constant/Response';

class Exchange extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: ``,
      description: ``,
    }
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
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
        photoUrl: ``,
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

  get label () {
    let {
      item, 
      name,
    } = this.dependencies;

    let isNull = !item._id;
    return {
      nameOfOwner: (<Text >{isNull?` Lỗi `:item.owner.name}</Text>),
      name: (<Text >{isNull?` Lỗi `:item.name}</Text>),
      description: (<Text >{isNull?` Lỗi `:item.description}</Text>),
      totalLike: (<Text >{isNull?` Lỗi `:item.totalLike}</Text>),
      nameOfVendee: (<Text >{name}</Text>),
    }
  }

  get textInput () {
    return {
      name: (<TextInput 
        placeholder={` Tên của vật trao đổi `}
        onChangeText={(text)=>{this.onNameChange(text)}}
        />),
      description: (<TextInput 
        placeholder={` Nội dung trao đổi `}
        onChangeText={(text)=>{this.onDescriptionChange(text)}}
        />),
    }
  }

  get button () {

    return {
      submit: (
      <TouchableOpacity 
        onPress = {this.onSubmitButtonClick}> 
        <Text>Gửi</Text>
      </TouchableOpacity>),
    }
  }

  get imagePicker () {
    return {
      mainPhoto: (<View />)
    }
  }

 

  get header () {
    return (
      <View style={{flex: 1}}>
        {this.label.nameOfOwner}
        {this.label.name}
        {this.label.description}
        {this.label.totalLike}
      </View>
    )}
  get body () {
    return (
      <View style={{flex: 1}}>
        {this.label.nameOfVendee}
        {this.imagePicker.mainPhoto}
        {this.textInput.name}
        {this.textInput.description}
      </View>
    )}
  get footer () {
    return (
    <View style={{flex: 1}}>
      {this.button.submit}
    </View>
    )
  }
  
  get form () {
    return (
      <View style={{flex: 1}}>
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