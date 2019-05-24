import React, {Component} from 'react';
import {
  View, 
} from 'react-native';
import LogIn from './logIn/LogIn';
import Home from './home/Home';
import AppContainerStyles from './AppContainer.styles';
import Navigation from '../constant/Navigation';
import NavigationAction from '../actions/NavigationAction';
import Register from './register/Register';
import Post from './post/Post';
import Exchange from './exchange/Exchange';
import Info from './info/Info';
import ChatBox from './chatBox/ChatBox';
import Detail from './detail/Detail';

import { connect } from 'react-redux';

class AppContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    this.navigateToHome = this.navigateToHome.bind(this);
    this.navigateToLogIn = this.navigateToLogIn.bind(this);
    this.navigateToRegister = this.navigateToRegister.bind(this);
    this.navigateToPost = this.navigateToPost.bind(this);
    this.navigateToChatBox = this.navigateToChatBox.bind(this);
    this.navigateToInfo = this.navigateToPost.bind(this);
    this.navigateToDetail = this.navigateToDetail.bind(this);
    this.navigateToExchange = this.navigateToExchange.bind(this);
    this.navigateToMessenger = this.navigateToMessenger.bind(this);
  }

  componentDidMount () {
  }

  navigateToPost () {
    this.action.navigate(Navigation.post);
  }

  navigateToHome () {
    this.action.navigate(Navigation.home);
  }

  navigateToLogIn () {
    this.action.navigate(Navigation.logIn);
  }

  navigateToRegister () {
    this.action.navigate(Navigation.register);
  }

  navigateToChatBox () {
    this.action.navigate(Navigation.chatBox);
  }

  navigateToExchange () {
    
    this.action.navigate(Navigation.exchange);
  }

  navigateToDetail () {
    this.action.navigate(Navigation.detail);
  }

  navigateToInfo () {
    this.action.navigate(Navigation.info);
  }

  navigateToMessenger () {
    this.action.navigate(Navigation.messenger);
  }

  get action () {
    let {
      navigate,
    } = this.props;
    return {
      navigate,
    }
  }

  get dependencies () {
    let {
      navigation = Navigation.logIn,
    } = this.props;
    return {
      navigation,
    }
  }

  get navigation () {
    return this.dependencies.navigation;
  }

  get logInScreen () {
    let {
      navigation, 
    } = this.dependencies;
    return (
      <LogIn 
        style={AppContainerStyles}
        visible={navigation === Navigation.logIn}
        navigateToHome={this.navigateToHome}
        navigateToRegister={this.navigateToRegister}
        />
    );
  }

  get homeScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <Home 
        style={AppContainerStyles}
        visible={navigation === Navigation.home}
        navigateToLogIn={this.navigateToLogIn}
        navigateToPost={this.navigateToPost}
        navigateToDetail={this.navigateToDetail}
        navigateToInfo={this.navigateToInfo}
        navigateToExchange = {this.navigateToExchange}
        />
    );
  }

  get postScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <Post 
        style={AppContainerStyles}
        visible={navigation === Navigation.post}
        navigateToHome={this.navigateToHome}
        />
    );
  }

  get registerScreen () {
    let {
      navigation,
    } = this.dependencies;
    console.log(`state: ${JSON.stringify(navigation)}`);
    return (
      
      <Register 
        style={AppContainerStyles}
        visible={navigation === Navigation.register}
        navigateToLogIn={this.navigateToLogIn}
        navigateToHome={this.navigateToHome}
        />
    );
  }

  get exchangeScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <Exchange 
        style={AppContainerStyles}
        visible={navigation === Navigation.exchange}
        navigateToHome={this.navigateToHome}
        navigateToInfo={this.navigateToInfo}
        />
    );
  }

  get infoScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <Info 
        style={AppContainerStyles}
        visible={navigation === Navigation.register}
        navigateToHome={this.navigateToHome}
        navigateToChatBox={this.navigateToChatBox}
        navigateToPost={this.navigateToPost}
        />
    );
  }

  get chatBoxScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <ChatBox 
        style={AppContainerStyles}
        visible={navigation === Navigation.register}
        navigateToHome={this.navigateToHome}
        navigateToInfo={this.navigateToInfo}
        />
    );
  }

  get detailScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      
      <Detail 
        style={AppContainerStyles}
        visible={navigation === Navigation.detail}
        navigateToHome={this.navigateToHome}
        navigateToInfo={this.navigateToInfo}
        navigateToDetail={this.navigateToDetail}
        navigateToChatBox={this.navigateToChatBox}
        navigateToExchange={this.navigateToExchange}
        />
    );
  }

  render() {
    let {
    } = this.dependencies;

    return (
      <View style={AppContainerStyles}>
        {this.logInScreen}
        {this.homeScreen} 
        {this.registerScreen}
        {this.postScreen}
        {this.exchangeScreen}
        {this.detailScreen}
      </View>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    navigation: state.navigation.screen,
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (
    navigation
    ) => dispatch(
      NavigationAction.navigate(
        navigation
      )
    ),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);