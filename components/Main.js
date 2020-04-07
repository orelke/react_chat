import React, { Component } from 'react';
import { View, StyleSheet,Text, TextInput, TouchableOpacity} from 'react-native';

class Main extends Component {
	state = { name: '' }
	onPress = () => { this.props.navigation.navigate('Chat', { name: this.state.name} ); }
	onChangeText = name => this.setState({name});

	render() {

		return(
			<View>
			<Text style={styles.title}> Enter your name: </Text>

			<TextInput
			onChangeText = {this.onChangeText}
			style = {styles.nameInput}
			palceHolder = "John Cena"
			value = {this.state.name}
			/>

			<TouchableOpacity onPress={this.onPress}>
			<Text style={styles.buttonText}> Next</Text>
			</TouchableOpacity>
			</View>
		);
	}
}

const offset = 20

const styles = StyleSheet.create({
  nameInput: { // 3. <- Add a style for the input
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  title: {
   marginTop: offset,
   marginLeft: offset,
   fontSize: offset,
  },
  buttonText: {
   marginLeft: offset,
   fontSize: offset,
  },

});

export default Main;
