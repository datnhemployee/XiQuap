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
import StockDetail from './stockDetail/StockDetail';
import MyShop from './myShop/MyShop';
import Waitting from './waitting/Waitting';
import MyStock from './myStock/MyStock';
import Bought from './bought/Bought';

import { connect } from 'react-redux';
import socket from '../../Configuration';
import LocalStorage from '../storage/LocalStorage';
import MessageBox from '../components/MessageBox';
import AuthAction from '../actions/Auth/AuthAction';
import AuthActionType from '../actions/Auth/AuthActionType';

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
    this.navigateToInfo = this.navigateToInfo.bind(this);
    this.navigateToDetail = this.navigateToDetail.bind(this);
    this.navigateToExchange = this.navigateToExchange.bind(this);
    this.navigateToMessenger = this.navigateToMessenger.bind(this);
    this.navigateToStock = this.navigateToStock.bind(this);
    this.navigateToAddStock = this.navigateToAddStock.bind(this);
    this.navigateToStockDetail = this.navigateToStockDetail.bind(this);
    this.navigateToWaitting = this.navigateToWaitting.bind(this);
    this.navigateToMyStock = this.navigateToMyStock.bind(this);
    this.navigateToBought = this.navigateToBought.bind(this);
    this.navigateToMyShop = this.navigateToMyShop.bind(this);

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
    let {
      getInfo,
    } = this.action;
    let {
      token,
    } = this.dependencies;
    this.action.navigate(Navigation.info);
    getInfo({token},()=>{},(res)=> {
      console.log(` Đang chờ dữ liệu người dùng`);
    });
    !!this.refHomeScreen ? this.refHomeScreen.setPage(2):undefined;
  }

  navigateToMessenger () {
    this.action.navigate(Navigation.messenger);
  }

  navigateToStockDetail () {
    this.action.navigate(Navigation.stockDetail);
  }

  navigateToStock () {
    this.action.navigate(Navigation.stock);
    !!this.refHomeScreen ? this.refHomeScreen.setPage(1):undefined;
  }

  navigateToAddStock () {
    this.action.navigate(Navigation.addStock);
  }

  navigateToMyStock () {
    this.action.navigate(Navigation.myStock);
  }

  navigateToWaitting () {
    this.action.navigate(Navigation.waitting);
  }

  navigateToMyShop () {
    this.action.navigate(Navigation.myShop);
  }

  navigateToBought () {
    this.action.navigate(Navigation.bought);
  }

  onNavigateAtHome (page) {
    let pageIndex = {
      0: () => this.navigateToHome(),
      1: () => this.navigateToStock(),
      2: () => this.navigateToInfo(),
      default: () => this.navigateToHome(),
    }

    let navigateAction = pageIndex[page];
    return !navigateAction ? pageIndex.default():
      navigateAction();
  }

  get action () {
    let {
      getInfo = () => console.log(` Lấy dữ liệu người dùng`),
      navigate,
    } = this.props;
    return {
      navigate,
      getInfo,
    }
  }

  get dependencies () {
    let {
      navigation = Navigation.logIn,
      user = null,
      token = null,
    } = this.props;
    return {
      navigation,
      user,
      token,
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

  get myShopScreen () {
    let {
      navigation, 
    } = this.dependencies;
    return (
      <MyShop 
        style={AppContainerStyles}
        visible={navigation === Navigation.myShop}
        navigateToHome={this.navigateToHome}
        navigateToDetail = {this.navigateToDetail}
        navigateToExchange = {this.navigateToExchange}
        navigateToPost = {this.navigateToPost}
        />
    );
  }

  get waittingScreen () {
    let {
      navigation, 
    } = this.dependencies;
    return (
      <Waitting 
        style={AppContainerStyles}
        visible={navigation === Navigation.waitting}
        navigateToHome={this.navigateToHome}
        navigateToDetail = {this.navigateToDetail}
        />
    );
  }

  get myStockScreen () {
    let {
      navigation, 
    } = this.dependencies;
    return (
      <MyStock 
        style={AppContainerStyles}
        visible={navigation === Navigation.myStock}
        navigateToStock={this.navigateToStock}
        navigateToStockDetail = {this.navigateToStockDetail}
        />
    );
  }

  get boughtScreen () {
    let {
      navigation, 
    } = this.dependencies;
    return (
      <Bought 
        style={AppContainerStyles}
        visible={navigation === Navigation.bought}
        navigateToStock={this.navigateToStock}
        navigateToStockDetail = {this.navigateToStockDetail}
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

  get navigationInfoIcon () {
    let {
      navigation,
    } = this.dependencies;

    let visible = navigation === Navigation.info;
    return this.navigationIcon(
      visible,
      ` Tôi `,
      this.navigateToInfo
    );
  } 
  
  get navigationBar () {
    return (
      <View 
      style={AppContainerStyles}>
        {this.navigationHomeIcon}
        {this.navigationStockIcon}
        {this.navigationInfoIcon}
      </View>
    );
  }

  get infoForm () {
    
    return (
      <Info 
        style={AppContainerStyles}
        />
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
        navigateToMyShop = {this.navigateToMyShop}
        navigateToWaitting = {this.navigateToWaitting}
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
        navigateToStockDetail = {this.navigateToStockDetail}
        navigateToMyStock = {this.navigateToMyStock}
        navigateToBought = {this.navigateToBought}
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
          || (navigation === Navigation.stock)
          || (navigation === Navigation.info)
        }
        
        onRequestClose={()=>{}}>
        <View 
          style={AppContainerStyles}>
          {this.navigationInfoBar}
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
              <View 
                key = "ViewPagerAndroid_Info"
                style={AppContainerStyles}>
                {this.infoForm}
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

  get stockDetailScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <StockDetail 
        style={AppContainerStyles}
        visible={navigation === Navigation.stockDetail}
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
        {this.stockDetailScreen}
        {this.infoScreen}
        {this.myShopScreen}
        {this.myStockScreen}
        {this.waittingScreen}
        {this.boughtScreen}
      </View>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    navigation: state.navigation.screen,
    user: state.user,
    token: state.auth.token,
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

  getInfo: (
    data,
    pre = () => {},
    next = (res) => {},
  ) => dispatch(
    AuthAction.emit(
        AuthActionType.emitGetInfo,
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
)(AppContainer);