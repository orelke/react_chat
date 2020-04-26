import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire.js'
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';


class Chat extends Component {

  
  static navigationOptions = ( {navigation } ) => ({
    title: 'Chat!',
  });


  
  state = {
   user : this.user,
   messages: [],
  };

  toggleUser = (new_name) => {this.setState({user: new_name});  }


  get user() {
    return {
      name: this.user_name,
      _id: Fire.uid,
    };
  }


  
  get user_name(){
    var users_db = Fire.storeRef
    var docRef = users_db.doc(Fire.uid);
    console.log(docRef)
    docRef.get().then(function(doc) {
    if (doc.exists) {
        //toggleUser(doc.data()["user_name"])
        console.log("Document data:", doc.data());
               return doc.data()["user_name"]
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }}).catch(function(error) {
    console.log("Error getting document:", error);
});

  }


  render () {
    return (
	    <GiftedChat
      messages={this.state.messages}
      user={{
      name:"nitsan",
      _id: Fire.uid,
    }}
	    onSend={Fire.send}
      renderUsernameOnMessage={true}
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
