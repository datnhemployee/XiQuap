import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Color from './Color';
 
const StandardSize = {
    smallest: 10,
    small: 20,
    intermediate: 25,
    large: 40,
    huge: 50,
}

const Size = {
    default: StandardSize.small,
    ...StandardSize,
}
const NameList = {
    default: 'message1',
    clear_textInput: `closecircle`,
    message: 'message1',
    exchange: 'home',
    point: 'gift',
    info: 'user',
    waitting: `shoppingcart`,
    selling: `isv`,
    add: `plus`,
    swap: `retweet`,
    heart: `hearto`,
    back: `left`,
    star_outer: `staro`,
    star: `star`,
}


class MyAntDesign extends Component {
    render (iconName = NameList.default) {
        const {
            size = Size.intermediate,
            color = Color.White,
            // style = {flex: 1},
        } = this.props;
        return (<AntDesign 
            style = {{
                flex: 1,
                // borderWidth: 1, 
                textAlign: 'center', 
                textAlignVertical: 'center',
            }}
            name={iconName} 
            size= {size} 
            color={color}
        />)
    }
}

class ClearText extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.clear_textInput)}
}
class ExchangeIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.exchange)}
}
class InfoIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.info)}
}
class PointIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.point)}
}
class SellingIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.selling)}
}
class WaittingIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.waitting)}
}
class AddIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.add)}
}
class SwapIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.swap)}
}
class HeartIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.heart)}
}
class BackIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.back)}
}
class StarOuterIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.star_outer)}
}   
class StarIcon extends MyAntDesign {
    constructor (props) {super(props);}
    render() { return super.render(NameList.star)}
}      
    
    
export {
    ClearText,
    ExchangeIcon,
    PointIcon,
    InfoIcon,
    SellingIcon,
    WaittingIcon,
    AddIcon,
    SwapIcon,
    HeartIcon,
    BackIcon,
    StarIcon,
    StarOuterIcon,
}

export {
    Size,
}