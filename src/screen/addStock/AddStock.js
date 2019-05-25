import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import StockAction from '../../actions/Stock/StockAction';
import StockActionType from '../../actions/Stock/StockActionType';
import { Codes } from '../../constant/Response';

class AddStock extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      typeName: '',
    }
    
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.onSendButtonClick = this.onSendButtonClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onTypeNameChange = this.onTypeNameChange.bind(this);
  }

  insert (
    success = (res) => {},
    failed = (res) => {},
  ) {
    let {
      insert,
      navigateToStock,
    } = this.action;

    let {
      token,
    } = this.dependencies;

    insert({
      name: this.state.name,
      description: this.state.description,
      typeName: this.state.typeName,
      token,
    },()=>{},
    (res)=>{
      if(res.code === Codes.Success){
        success(res);
      } else {
        failed(res);
      }
      this.renew();
      navigateToStock();
    })
  }

  renew () {
    this.setState({
      name: '',
      description: '',
      typeName: '',
    });
  }

  get action () {
    let {
      visible = false,
      insert = () => console.log(` Vừa gửi thông tin của vật phẩm lên máy chủ.`),
      navigateToStock = () => console.log(` Vừa nhấn chuyển sang màn hình kho vật phẩm.`),
    } = this.props;
    return {
      visible,
      insert,
      navigateToStock,
    };
  }

  get dependencies () {
    let {
      token = null,
      visible = false,
    } = this.props;
    return {
      visible,
      token,
    };
  }

  onBackButtonClick () {
    let {
      navigateToStock,
    } = this.action;

    navigateToStock();
  }

  onSendButtonClick () {
    

    this.insert(
      () => {},
      () => {}
    )
  }

  onTypeNameChange (text) {
    this.setState({typeName: text});
  }
  onNameChange (text) {
    this.setState({name: text});
  }
  onDescriptionChange (text) {
    this.setState({description: text});
  }

  get button () {
    return {
      back: (
      <TouchableOpacity 
        style={{flex: 1}}
        onPress={this.onBackButtonClick}>
        <Text > Trở lại </Text>
      </TouchableOpacity>
      ),
      send: (
        <TouchableOpacity 
          style={{flex: 1}}
          onPress={this.onSendButtonClick}>
          <Text > Gửi </Text>
        </TouchableOpacity>
      ),
    }
  }

  get textInput () {
    return {
      name: (
        <TextInput 
        style = {{flex: 1}}
         onChangeText={this.onNameChange}
         placeholder={'tên vật phẩm'}
         />
      ),
      description: (
        <TextInput 
        style = {{flex: 1}}
         onChangeText={this.onDescriptionChange}
         placeholder={'Mô tả'}
         />
      ),
      typeName: (
        <TextInput 
        style = {{flex: 1}}
         onChangeText={this.onTypeNameChange}
         placeholder={'Loại vật phẩm'}
         />
      )
    }
  }

  get header () {
    return(
      <View style={{flex: 1}}>
        {this.button.back}
      </View>
      )
  }
  get body () {
    return(
      <View style={{flex: 8}}>
        {this.textInput.name}
        {this.textInput.description}
        {this.textInput.typeName}
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
    console.log(`Stock visible ${visible}`);
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
    point: state.auth.point,
    stock: state.stock,
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStock);