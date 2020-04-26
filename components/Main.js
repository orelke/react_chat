import React, { Component } from 'react';
import { View, StyleSheet,Text, TextInput, TouchableOpacity, Button } from 'react-native';
import Fire from '../Fire.js'
class Main extends Component {

	state = { name: '' ,
              email: ''}

  static navigationOptions = ( {navigation } ) => ({
	title: 'Chat!',
  });


  createGroup = async () => {
	const response = Fire.login(
		user,
		this.loginSuccess,
		this.loginFailed
	);
};

addFriend = async () => {
	const response = Fire.login(
		user,
		this.loginSuccess,
		this.loginFailed
	);
};
//TODO: press a button to a specific group
	render() {
		return(
			<View>
			<Text style={styles.title}> Hi {this.props.navigation.state.params.email} </Text>
			<Text style={styles.data}> groups {this.props.navigation.state.params.email} </Text>
			<Button
					title="Add Friend"
					style={styles.buttonText}
					onPress={this.addFriend}
				/>
			<Button
					title="Create Group"
					style={styles.buttonText}
					onPress={this.createGroup}
				/>
			</View>
		);
	}
}

const offset = 20

const styles = StyleSheet.create({
  title: {
   marginTop: offset,
   marginLeft: offset,
   fontSize: offset,
  },
  data: {
   marginLeft: offset,
   fontSize: offset,
  },
  buttonText: {
	marginLeft: 16,
	fontSize: 42
}

});

export default Main;
