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
}


class ClearText extends Component {
    render () {
        const {
            size = Size.intermediate,
            color = Color.White,
            // style = {flex: 1},
        } = this.props;
        return (<AntDesign 
            // style = {style}
            name={NameList.clear_textInput} 
            size= {size} 
            color={color}
        />)
    }
}
    
    
    
export {
    ClearText,
}

export {
    Size,
}