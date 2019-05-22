import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Alert} from 'react-native';

export default class extends Component {
    constructor () {
        this.state = {
            modalVisible: false,
        };
    }

    naivgateToChat() {
        
    }

    chatIcon () {
        let {
            navigation
        } = this.props;
        return (
            <View style={styles.header.main}>
                <TouchableOpacity
                    style={styles.header}
                    onPress={()=>{navigation.navigate('Chat')}}
                >
                </TouchableOpacity>
            </View>
        )
    }
    
    header () {
        return (
            <View style={styles.header}>
                
            </View>
        )
    }

    body () {
        return (
          <View style={styles.body}>
              
          </View>
        )
    }

    render() {
        let {
            } = this.props;
        return (
        // <View style={{marginTop: 22}}>
        <View style={styles.container}>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
})