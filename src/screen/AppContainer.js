import React, {Component} from 'react';
import {
  View, 
} from 'react-native';
import LogIn from './logIn/LogIn';
import Home from './home/Home';
import AppContainerStyles from './AppContainer.styles';
import Navigation from '../constant/Navigation';
import NavigationAction from '../actions/NavigationAction';
import { connect } from 'react-redux';
import Register from './register/Register';
import Post from './post/Post';


class AppContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    this.navigateToHome = this.navigateToHome.bind(this);
    this.navigateToLogIn = this.navigateToLogIn.bind(this);
    this.navigateToRegister = this.navigateToRegister.bind(this);
    this.navigateToPost = this.navigateToPost.bind(this);
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

  get register () {
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

  render() {
    let {
    } = this.dependencies;

    return (
      <View style={AppContainerStyles}>
        {this.logInScreen}
        {this.homeScreen} 
        {this.register}
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