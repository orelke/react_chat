import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, Alert} from 'react-native';
import {ListItem} from "react-native-elements" 
import axios from "axios"
import  firebase from 'firebase';

export default class Req extends Component 
{
  state = {
    list:[],
    friend_req:[]
  }

  keyExtractor = (item, index) => index.toString();
  
  renderItem = ({item}) => (
    <ListItem
        title={item.user_name}
        //subtitle={"Status:"+ item.status} //todo : dynamic status
        //leftAvatar= {{source: {uri: item.image}}}
        bottomDivider= {true}
        onPress= {() => 
       {
          console.log("handle requrest for ", item.uid)
       }  }
    />

  );

componentDidMount(){
  axios.get("https://rickandmortyapi.com/api/character").then(response => {
    console.log(response.data.results, "@@@@@@@@@")
    this.setState({list: response.data.results})
  });

  this.get_req_list();

}

get_req_list = () =>{
  var user_id = firebase.auth().currentUser.uid;
  var sender_doc_ref = firebase.firestore().collection('Users').doc(user_id)
  var req;
  sender_doc_ref.get().then((doc) => {
   
    if (doc.exists) {
        console.log("Document data:", doc.get("recived_requests"));
        var friend_req = doc.get("recived_requests");
        
        for(var req_user_name in friend_req)
        {
          console.log("iterate over friend requests")
          if (friend_req.hasOwnProperty(req_user_name)) {           
          console.log("FRIEND:",req_user_name, friend_req[req_user_name]);
          var user_name = req_user_name;
          var req_user_id = friend_req[req_user_name];
              req = {
                "user_id": req_user_id,
                "user_name": user_name,
                "id" : 0,
              }
              console.log("User name:", user_name)
              console.log("uid",user_id)
              console.log("req", req)

              console.log("push req")
              this.state.friend_req.push(req)
              console.log("list:", this.state.friend_req)

      }
      


        }

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
 console.log(this.state.friend_req)
}

  render()
  {
    console.log("rik",this.state.list);
    console.log("chat", this.state.friend_req);
    return (
    <SafeAreaView style={styles.container}>
      <FlatList
      keyExtractor= {this.keyExtractor}
      data={this.state.friend_req}
      renderItem = {this.renderItem}
      />

    </SafeAreaView>)
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    backgroundColor:"#F5FCFF",

  },
  welcome: {
    fontSize:20,
    textAlign: "center",
    margin: 10
  },
  instructions:{
    textAlign:"center",
    color: "#333333",
    marginBottom: 5
  }
})