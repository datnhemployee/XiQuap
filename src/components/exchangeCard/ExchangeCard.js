import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ImageSize} from '../../constant/Image';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';

import { connect } from 'react-redux';

class ExchangeCard extends Component {
  constructor (props) {
    super(props);
    
  }

  // logic

  approve () {
    let {
      approve,
      navigateToHome,
    } = this.action;

    let {
      id,
      token,
      idItem,
    } = this.dependencies;
    approve({
      _idApproved: id, // Id của mục trao đổi
      token,
      _id: idItem, // Id của bài viết
    },()=>{},
    (res)=>{navigateToHome()});
  }

  get action () {
    let {
      approve = () => {console.log(`Vừa bấm đồng ý trao đổi`)},
      navigateToHome = () => {console.log(`Vừa bấm chuyển sang màn hình Home`)},
    } = this.props;
    return {
      approve,
      navigateToHome,
    }
  }

  get dependencies () {
    let {
      height = 700,

      name = '',
      id = '',
      description = '',
      photoUrl = '',
      vendeeName = '',
      idItem = '',

      token = '',
    } = this.props;
    return {
      height,

      id,
      name,
      description,
      photoUrl,
      vendeeName,
      idItem,

      token,
    };
  }

  // Design

  approveButton_onClick () {
    this.approve();
  }



  contactButton_onClick () {
    let {
      navigateToChatBox,
    } = this.action;
    navigateToChatBox();
  }

  
  get label () {
    let {
  
      name,
      description,
      vendeeName,
    } = this.dependencies;
    // console.log(`ExchangeCard label: ${JSON.stringify(this.dependencies)}`)

    return {
      name: (<Text style={{flex: 1,borderWidth: 1}}>{name}</Text>),
      description: (<Text style={{flex: 1,borderWidth: 1}}>{description}</Text>),
      vendeeName: (<Text style={{flex: 1,borderWidth: 1}}>@{vendeeName}</Text>),
    }
  }

  get image () {
    let {
      height, 

      photoUrl,
    } = this.dependencies; 

    return {
      ownerAvatar: (<Image style={ImageSize.huge} source={{uri: photoUrl}}/>),
    }
  }

  get button () {
    return {
      vendee: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{}}
          >
          {this.label.vendeeName}
        </TouchableOpacity>
      ),
      approve: (
        <TouchableOpacity 
          style={{flex: 1,borderWidth: 1}}
          onPress={()=>{this.approve()}}
          >
          <Text>Đồng ý</Text>
        </TouchableOpacity>
      ),
    }
  }

  get header () {
    return (<View/>)
  }

  get body () {
    return (
    <View style={{flex: 1,borderWidth: 1}}>
      {this.button.vendee}
      {this.label.name}
      {this.label.description}
      {this.button.approve}
    </View>)
  }

  get footer () {
    return (<View/>)
  }
  get form () {
    return (
      <View style={{flex: 1,borderWidth: 1}}>
        {this.header}
        {this.body}
        {this.footer}
      </View>
    )
  }

  render() {
    let {
      height,
    } = this.dependencies;

    return (
      <View style={{height: height}}>
        {this.form}
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(`state chỗ Home ${JSON.stringify(state.post.list)}`)

  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => ({
  
  approve: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    ExchangeAction.emit(
        ExchangeActionType.emitApproveItem,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  // Chỉ có thể emit ở component
  // on sẽ ở screen

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeCard);