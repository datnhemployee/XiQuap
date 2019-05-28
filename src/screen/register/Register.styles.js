import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    header: {
        flex: 1,
        
        backgroundColor: '#7BB115',
    },
    body: {
        flex:11,
        justifyContent: 'center',
        alignSelf:'stretch',
        paddingLeft: 60,
        paddingRight: 60,
    },
    textinput: {
        alignSelf:'stretch',
        height: 40,
        marginBottom: 10,
        color: '#0E6F73',
        borderBottomColor: '#9ED632',
        borderBottomWidth: 1,
        
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FF5733',
        marginTop:20,
    },
    buttoncancel: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FF6C4D',
        marginTop:10,
    },
})