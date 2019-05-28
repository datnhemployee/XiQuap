import React, {Component} from 'react';
import styles from './GradientButton.styles';
import { 
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class extends Component {
  constructor (props) {
    super(props);
  }
  
  render () 
  {
    return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#BE1B16', '#FE605C']} style={styles.gradient}>
      <TouchableOpacity
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.Name}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
    );
  }
}