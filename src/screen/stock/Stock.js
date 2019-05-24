import React, {Component} from 'react';
import {
  View, 
  Text,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';

class Stock extends Component {
  constructor (props) {
    super(props);
    
  }

  get dependencies () {
    let {
      visible = false,
      stock = [],
    } = this.props;
    return {
      visible,
      stock,
    };
  }


  
  get header () {<View/>}
  get body () {
    <View 
      style={{flex: 1}}>

    </View>
  }
  get footer () {<View/>}

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
    return this.form;
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

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stock);