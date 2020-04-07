import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


class Chat extends Component {

	static navigationOptions = ( {navigation } ) => ({
		title: (navigation.state.params || {}).name || 'Chat!',
	});

	state = {
	 messages: [],
	};


	render () {
		return (
		<GiftedChat
		messages={this.state.messages}
		/>
		);
	}
}

const styles = StyleSheet.create({});

export default Chat;
