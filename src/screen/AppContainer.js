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
import styles from './AppContainer.styles';
import Color from '../constant/Color';
import { ExchangeIcon, InfoIcon, PointIcon } from '../constant/Icon';
import { Codes } from '../constant/Response';
import Other from './other/Other';

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
    this.navigateToOther = this.navigateToOther.bind(this);

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
    // let {
    //   getInfo,
    // } = this.action;
    // let {
    //   token,
    // } = this.dependencies;
    this.action.navigate(Navigation.info);
    // getInfo({token},()=>{},(res)=> {
    //   console.log(` Đang chờ dữ liệu người dùng`);
    // });
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

  navigateToOther () {
    this.action.navigate(Navigation.other);
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
      // onGetInfo = () => console.log(` Đã lấy dữ liệu người dùng`),
      navigate,
    } = this.props;
    return {
      navigate,
      // onGetInfo,
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
        style={styles.container}
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
        style={styles.container}
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
        style={styles.container}
        visible={navigation === Navigation.waitting}
        navigateToHome={this.navigateToHome}
        navigateToDetail = {this.navigateToDetail}
        navigateToOther = {this.navigateToOther}
        />
    );
  }

  get myStockScreen () {
    let {
      navigation, 
    } = this.dependencies;
    return (
      <MyStock 
        style={styles.container}
        visible={navigation === Navigation.myStock}
        navigateToHome={this.navigateToHome}
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
        style={styles.container}
        visible={navigation === Navigation.bought}
        navigateToHome={this.navigateToHome}
        navigateToStockDetail = {this.navigateToStockDetail}
        />
    );
  }

  navigationIcon (
    visible,
    content,
    icon,
    navigate = () => console.log(` Vừa bấm chuyển màn hình `)) {
    const _style = styles.navigation;
    return (
      <TouchableOpacity 
        style={_style.button}
          onPress={navigate}>
        {icon}
        <Text style={[
          _style.icon,
          visible?{
            color: Color.Red,
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
      ` Đổi đồ `,
      (<ExchangeIcon 
        color = {visible?Color.Red:Color.Gray}/>),
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
      ` Đổi điểm `,
      (<PointIcon 
        color = {visible?Color.Red:Color.Gray}/>),
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
      (<InfoIcon 
        color = {visible?Color.Red:Color.Gray}/>),
      this.navigateToInfo
    );
  } 
  
  get navigationBar () {
    const _style = styles.navigation;
    return (
      <View 
      style={_style.bar}>
        {this.navigationHomeIcon}
        {this.navigationStockIcon}
        {this.navigationInfoIcon}
      </View>
    );
  }

  get infoForm () {
    
    return (
      <Info 
        style={styles.container}
        />
    );
  }

  get homeForm () {
    return (
      <Home 
        // key = "ViewPagerAndroid_Home"
        style={styles.container}
        navigateToLogIn={this.navigateToLogIn}
        navigateToPost={this.navigateToPost}
        navigateToDetail={this.navigateToDetail}
        navigateToInfo={this.navigateToInfo}
        navigateToExchange = {this.navigateToExchange}
        navigateToMyShop = {this.navigateToMyShop}
        navigateToWaitting = {this.navigateToWaitting}
        navigateToOther = {this.navigateToOther}
        />
    );
  }

  get stockForm () {
    return (
      <Stock 
        // key = "ViewPagerAndroid_Home"
        style={styles.container}
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
          style={styles.container}>
          <ViewPagerAndroid 
            style={{flex: 8}}
            initialPage={0}
            ref = {(refHomeScreen) => this.refHomeScreen = refHomeScreen}
            onPageSelected = {(e) => {this.onNavigateAtHome(e.nativeEvent.position)}}>
              <View 
                key = "ViewPagerAndroid_Home"
                style={styles.container}>
                {this.homeForm}
              </View>
              <View 
                key = "ViewPagerAndroid_Stock"
                style={styles.container}>
                {this.stockForm}
              </View>
              <View 
                key = "ViewPagerAndroid_Info"
                style={styles.container}>
                {this.infoForm}
              </View>
          </ViewPagerAndroid>
          {this.navigationBar}
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
        style={styles.container}
        visible={navigation === Navigation.post}
        navigateToHome={this.navigateToHome}
        />
    );
  }

  get otherScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <Other 
        style={styles.container}
        visible={navigation === Navigation.other}
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
        style={styles.container}
        visible={navigation === Navigation.addStock}
        navigateToHome={this.navigateToHome}
        />
    );
  }

  get stockDetailScreen () {
    let {
      navigation,
    } = this.dependencies;
    return (
      <StockDetail 
        style={styles.container}
        visible={navigation === Navigation.stockDetail}
        navigateToHome={this.navigateToHome}
        navigateToOther = {this.navigateToOther}
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
        style={styles.container}
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
        style={styles.container}
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
        style={styles.container}
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
        style={styles.container}
        visible={navigation === Navigation.detail}
        navigateToHome={this.navigateToHome}
        navigateToInfo={this.navigateToInfo}
        navigateToDetail={this.navigateToDetail}
        navigateToChatBox={this.navigateToChatBox}
        navigateToExchange={this.navigateToExchange}
        navigateToOther = {this.navigateToOther}
        />
    );
  }

  render() {
    let {
    } = this.dependencies;

    return (
      <View style={styles.container}>
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
        {this.otherScreen}
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

  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);