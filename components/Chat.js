import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire.js'

type Props = {
  name?: string,
};

class Chat extends Component {

  static navigationOptions = ( {navigation } ) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
   messages: [],
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.uid,
    };
  }

  render () {
    return (
	    <GiftedChat
	    messages={this.state.messages}
	    onSend={Fire.send}
	    user={this.user}
	    />
    );
  } 


  componentDidMount() {
    Fire.on(message => 
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    Fire.off();
  }
}





const styles = StyleSheet.create({});

export default Chat;
