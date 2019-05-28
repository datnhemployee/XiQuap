import React, {Component} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {
    ClearText,
} from '../../constant/Icon';
import Color from '../../constant/Color';
import styles from './MyTextInput.style';

const {
    width,
} = Dimensions.get('screen');

const _width = width *4/5;
export default class MyTextInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: '',
            isFocus: false,
        }
        this.clear = this.clear.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onBlur () {
        this.setState({isFocus: false});
    }

    onFocus () {
        this.setState({isFocus: true});
    }

    clear () {
        let {
            onClear,
        } = this.action;
        this.setState({text: ''})
        onClear();
    }

    onChangeText (text) {
        let {
            onChangeText,
        } = this.action;
        onChangeText(text);
        this.setState({text: text})
    }

    get action () {
        let {
            onChangeText = (text) => {},
            onClear = (text) => {},
        } = this.props;
        return {
            onChangeText,
            onClear,
        }
    }

    get dependencies () {
        let {
            placeholder = '',
            onTouchUnderlineColor = Color.Red,
            style = styles.textInput,
            keyboardType = 'default',
            multiline = false,
            // numberOfLines = 1,
        } = this.props;
        return {
            placeholder,
            onTouchUnderlineColor,
            style,
            keyboardType,
            multiline,
            // numberOfLines,
        }
    }

    get button () {
        let isDirty = !!this.state.text;
        return {
            clear: (<TouchableOpacity
                    style = {{
                        flex: 1,
                        // height: 50,
                        width: _width * 1 /10,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        // borderWidth: 1,
                    }}
                    onPress = {this.clear}>
                    <ClearText 
                        color={isDirty?Color.Red:Color.White}
                        />
                </TouchableOpacity>),
        }
    }

    get textInput () {
        let {
            placeholder,
            style,
            keyboardType,
            multiline,
            // numberOfLines,
        } = this.dependencies;

        return (
            <TextInput 
                style = {[{
                    // height: numberOfLines * 50,
                    // width: _width * 9 /10,
                    flex: 5
                },style]}
                onChangeText={this.onChangeText}
                placeholder = {placeholder}
                onFocus= {this.onFocus}
                onBlur = {this.onBlur}
                keyboardType = {keyboardType}
                value = {this.state.text}
                multiline = {multiline}
                // numberOfLines = {numberOfLines}
                />
        )
    }


    render() {
        let {
            onTouchUnderlineColor,
            // numberOfLines,
        } = this.dependencies;
        let isFocus = this.state.isFocus;

        return (
        <View style={{
            // height: numberOfLines * 50,
            flex: 1,
            // width: _width,
            flexDirection: 'row',
            borderBottomColor: isFocus?
            onTouchUnderlineColor
                :Color.Gray,
            borderBottomWidth: 1,
            // marginLeft: 10,
            // borderWidth: 1,
        }}>
            {this.textInput}
            {this.button.clear}
        </View>
        );
}
}

