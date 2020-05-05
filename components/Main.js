import React, { Component } from 'react';
import { View, StyleSheet,Text, TextInput, TouchableOpacity, Button } from 'react-native';
import Fire from '../Fire.js'
import Add from './Add.js';

class Main extends Component {

	state = { name: '' ,
			  email: '',
			  value: ''};
	
  static navigationOptions = ( {navigation } ) => ({
	title: 'Chat!',
  });


addFriend = () =>     (<TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={this.state.value}
    />);

//TODO: press a button to a specific group
	render() {
		return(
			<View>
			<Text style={styles.title}> Hi {this.props.navigation.state.params.email} </Text>
			<Text style={styles.data}> groups {this.props.navigation.state.params.email} </Text>
            <Button
					title="ADD FRIEND"
					style={styles.buttonText}
					onPress={() => this.props.navigation.navigate('ADD')}

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
