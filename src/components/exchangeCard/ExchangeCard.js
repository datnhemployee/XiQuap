import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {ImageSize} from '../../constant/Image';
import ExchangeActionType from '../../actions/Exchange/ExchangeActionType';
import ExchangeAction from '../../actions/Exchange/ExchangeAction';
import styles from './ExchangeCard.styles';

import { connect } from 'react-redux';
import Typeface from '../../constant/Font';
import { ExchangeIcon, SwapIcon } from '../../constant/Icon';
import Color from '../../constant/Color';
import AuthAction from '../../actions/Auth/AuthAction';
import AuthActionType from '../../actions/Auth/AuthActionType';
import { Codes } from '../../constant/Response';
import MessageBox from '../MessageBox';

class ExchangeCard extends Component {
  constructor (props) {
    super(props);
    
    this.getOther = this.getOther.bind(this);
  }

  // logic

  getOther () {
    let {
      vendeeId,
      token,
    } = this.dependencies;

    let {
      getOther,
    } = this.action;

    getOther({
      _id: vendeeId,
      token,
    })
  }

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
      navigateToOther = () => {console.log(`Vừa bấm chuyển sang màn hình thành viên khác`)},

      getOther = () => {console.log(`Lấy thông tin thành viên khác`)},
      onGetOther = () => {console.log(`Lấy thông tin thành viên khác`)},

    } = this.props;
    return {
      approve,
      navigateToHome,
      navigateToOther,

      getOther,
      onGetOther,
    }
  }

  componentDidMount () {
    let {
      onGetOther,
      navigateToOther,
    } = this.action;

    onGetOther(
      (res) => {
        if(res.code === Codes.Success) {
          navigateToOther();
        } else {
          MessageBox(res.content);
        }
    })
  }

  get dependencies () {
    let {
      height = 150,

      name = '',
      id = '',
      description = '',
      photoUrl = '',
      vendeeName = '',
      vendeeId = '',
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
      vendeeId,
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
    const _style = styles.label;
    return {
      name: (<Text style={_style.name}>{name}</Text>),
      description: (<ScrollView style={{flex: 1}}><Text style={_style.description}>{description}</Text></ScrollView> ),
      vendeeName: (<Text style={_style.vendeeName}>{Typeface.toCase( vendeeName,Typeface.type.overline)}</Text>),
    }
  }

  get image () {
    let {
      height, 

      photoUrl,
    } = this.dependencies; 

    return {
      item: (
        <View 
        style = {{
          flex: 1,
          borderRadius: 20, 
          overflow: 'hidden',
          padding: 10,
          }}>
        <Image 
          style = {{
            flex: 1,
            height: `100%`,
            width: `100%`,
          }} 
          resizeMode = {'stretch'}
          source={
            !!photoUrl?
            {uri: photoUrl}
            :require('../../img/default.png')}/>
        </View>

        ),
    }
  }

  get button () {
    return {
      vendee: (
        <TouchableOpacity 
          style={{flex: 1,
            // borderWidth: 1
          }}
          onPress={this.getOther}
          >
          {this.label.vendeeName}
        </TouchableOpacity>
      ),
      approve: (
        <TouchableOpacity 
          style={{
            flex: 1,
            // borderWidth: 1,
            flexDirection: 'row',
          }}
          onPress={()=>{this.approve()}}
          >
          <SwapIcon 
            color = {Color.Gray}/>
          <Text style={{flex: 3,...Typeface.button,textAlign: 'left',textAlignVertical: 'center'}}>TRAO ĐỔI</Text>
        </TouchableOpacity>
      ),
    }
  }

  get header () {
    return (<View/>)
  }

  get body () {
    return (
    <View style={{
      flex: 1,
      // borderWidth: 1
      flexDirection: 'row',
      }}>
      <View style={{
          flex: 1,
          // borderWidth: 1
        }}>
        {this.image.item}
      </View>
      <View style={{
          flex: 1,
          // borderWidth: 1
        }}>
        {this.button.vendee}
        {this.label.name}
        {this.label.description}
        {this.button.approve}
      </View>
    </View>);
  }

  get footer () {
    return (<View/>)
  }
  get form () {
    return (
      <View style={{
        flex: 1,
        // borderWidth: 1,
        }}>
        {this.header}
        {this.body}
        {this.footer}
      </View>
    )
  }

  render() {
    let {
      height,
      description,
    } = this.dependencies;
    const _height = height + (description.length % 100);
    return (
      <View style={{height: _height, padding: 10}}>
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

  getOther: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    AuthAction.emit(
        AuthActionType.emitGetOther,
      ).inject(
        data,
        pre,
        next
      ),
  ),

  onGetOther: (
    callback = (res)=>{},
  ) => dispatch(
    AuthAction.on(
      AuthActionType.onGetOther,
    ).inject(
      callback
    )
  ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeCard);