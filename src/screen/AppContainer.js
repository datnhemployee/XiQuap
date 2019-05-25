import React, {Component} from 'react';
import {
  View, 
  ViewPagerAndroid,
  Modal,
  TouchableOpacity,
  Text,
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
import Stock from './stock/Stock';
import AddStock from './addStock/AddStock';

import { connect } from 'react-redux';
import socket from '../../Configuration';
import LocalStorage from '../storage/LocalStorage';
import MessageBox from '../components/MessageBox';

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
    this.navigateToStock = this.navigateToStock.bind(this);
    this.navigateToAddStock = this.navigateToAddStock.bind(this);

    this.onNavigateAtHome = this.onNavigateAtHome.bind(this);
  }

  componentDidMount () {
    socket.on('disconnect', (reason) => {
      LocalStorage.setToken('',() => {
        MessageBox(` Mất kết nối máy chủ. Đăng nhập lại.`);
        this.navigateToLogIn();
        socket.close();
        // socket.connect();
      });
    })
  }

  navigateToPost () {
    this.action.navigate(Navigation.post);
  }

  navigateToHome () {
    this.action.navigate(Navigation.home);
    !!this.refHomeScreen ? this.refHomeScreen.setPage(0):undefined;
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

  navigateToStock () {
    this.action.navigate(Navigation.stock);
    !!this.refHomeScreen ? this.refHomeScreen.setPage(1):undefined;
  }

  navigateToAddStock () {
    this.action.navigate(Navigation.addStock);
  }

  onNavigateAtHome (page) {
    let pageIndex = {
      0: () => this.navigateToHome(),
      1: () => this.navigateToStock(),
      default: () => this.navigateToHome(),
    }

    let navigateAction = pageIndex[page];
    return !navigateAction ? pageIndex.default():
      navigateAction();
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

  navigationIcon (
    visible,
    content,
    navigate = () => console.log(` Vừa bấm chuyển màn hình `)) {
    
    return (
      <TouchableOpacity 
        style={[
          AppContainerStyles,
          visible?{
            borderBottomColor: 'green',
            borderBottomWidth: 1,
          }:{}]}
          onPress={navigate}>
        <Text style={[
          AppContainerStyles,
          visible?{
            color: 'green',
          }:{}]}>{content}</Text>
      </TouchableOpacity>
    )
  }

  get navigationHomeIcon () {
    let {
      navigation,
    } = this.dependencies;

    let visible = navigation === Navigation.home;
    return this.navigationIcon(
      visible,
      ` Màn hình chính `,
      this.navigateToHome
    );
  } 

  get navigationStockIcon () {
    let {
      navigation,
    } = this.dependencies;

    let visible = navigation === Navigation.stock;
    return this.navigationIcon(
      visible,
      ` Quà tặng `,
      this.navigateToStock
    );
  } 
  
  get navigationBar () {
    return (
      <View 
      style={AppContainerStyles}>
        {this.navigationHomeIcon}
        {this.navigationStockIcon}
      </View>
    );
  }

  get homeForm () {
    return (
      <Home 
        // key = "ViewPagerAndroid_Home"
        style={AppContainerStyles}
        navigateToLogIn={this.navigateToLogIn}
        navigateToPost={this.navigateToPost}
        navigateToDetail={this.navigateToDetail}
        navigateToInfo={this.navigateToInfo}
        navigateToExchange = {this.navigateToExchange}
        />
    );
  }

  get stockForm () {
    return (
      <Stock 
        // key = "ViewPagerAndroid_Home"
        style={AppContainerStyles}
        navigateToLogIn={this.navigateToLogIn}
        navigateToInfo={this.navigateToInfo}
        navigateToAddStock = {this.navigateToAddStock}
        />);
  }

  get homeScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={(navigation === Navigation.home)
          || (navigation === Navigation.stock)}
        onRequestClose={()=>{}}>
        <View 
          style={AppContainerStyles}>
          {this.navigationBar}
          <ViewPagerAndroid 
            style={{flex: 8}}
            initialPage={0}
            ref = {(refHomeScreen) => this.refHomeScreen = refHomeScreen}
            onPageSelected = {(e) => {this.onNavigateAtHome(e.nativeEvent.position)}}>
              <View 
                key = "ViewPagerAndroid_Home"
                style={AppContainerStyles}>
                {this.homeForm}
              </View>
              <View 
                key = "ViewPagerAndroid_Stock"
                style={AppContainerStyles}>
                {this.stockForm}
              </View>
          </ViewPagerAndroid>
        </View>
      </Modal>
      
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

  get addStockScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <AddStock 
        style={AppContainerStyles}
        visible={navigation === Navigation.addStock}
        navigateToStock={this.navigateToStock}
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
        {this.addStockScreen}
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