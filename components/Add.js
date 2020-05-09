import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper'
import  firebase from 'firebase';

export default class Add extends Component {
    constructor(props){
      super(props)
      this.already_request_sent = this.already_request_sent.bind(this)
      this.already_friend = this.already_friend.bind(this)

    }

    state = {
      already_friend : false,
      already_sent_request : false,
      loading_search: true,
      search: '',
      reciver_name: '',
      reciver_id: '',
      loading_add: true,
    };

   
    find_name =  async () =>
    {
        var store_ref = firebase.firestore().collection('Users').get().then(snapshot => {
        snapshot.forEach(doc => {
        console.log(this.state.search)
        if (doc && doc.exists) {
        console.log(doc.id, ' => ', doc.get("user_name"));
        if (doc.get("user_name") === this.state.search){
        console.log(doc.id, ' => ', doc.get("user_name"), "MATCH!");
        this.setState({reciver_name: doc.get("user_name")})
        this.setState({reciver_id:doc.id})
        }
    }
  });
});

    }


    send_request = () =>
    {
        var reciver_id = this.state.reciver_id
        var user_id = firebase.auth().currentUser.uid;
        var sender_doc_ref = firebase.firestore().collection('Users').doc(user_id)
        sender_doc_ref.set({"sent_requests":{[reciver_id]: "TODO: add more info about request"}}, { merge: true })
        
        var reciver_doc_ref = firebase.firestore().collection('Users').doc(reciver_id)
        reciver_doc_ref.set({"recived_requests":{[user_id]: "TODO: add more info about request"}}, { merge: true })

    }

    cancel_request = () =>
    {
       var user_id = firebase.auth().currentUser.uid;
       var reciver_id = this.state.reciver_id
       var sender_doc_ref = firebase.firestore().collection('Users').doc(user_id)
       sender_doc_ref.set({ "sent_requests" : {[reciver_id]: firebase.firestore.FieldValue.delete()}}, { merge: true });
       
       var reciver_doc_ref = firebase.firestore().collection('Users').doc(reciver_id)
       reciver_doc_ref.set({ "recived_requests" : {[user_id]: firebase.firestore.FieldValue.delete()}}, { merge: true });

    }

    cancel_friendship = () => 
    {
      var user_id = firebase.auth().currentUser.uid;
      var reciver_id = this.state.reciver_id
      var sender_doc_ref = firebase.firestore().collection('Users').doc(user_id)
      sender_doc_ref.set({ "friends_list" : {[reciver_id]: firebase.firestore.FieldValue.delete()}}, { merge: true });
      
      var reciver_doc_ref = firebase.firestore().collection('Users').doc(reciver_id)
      reciver_doc_ref.set({ "friends_list" : {[user_id]: firebase.firestore.FieldValue.delete()}}, { merge: true });

    }


    already_request_sent = () => 
    {
      var user_id = firebase.auth().currentUser.uid
      var reciver_id =  this.state.reciver_id
      var sender_doc = firebase.firestore().collection('Users').doc(user_id)
      var result = false

    sender_doc.get().then(function(doc) {
    if (doc.exists) {
        var doc_data = doc.data()
        console.log(reciver_id, "rid")
        console.log("IS sent!",reciver_id in doc_data.sent_requests)
        result = reciver_id in doc_data.sent_requests  
        console.log("result value", result)
      
        

    } else {
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });
    
    return result

    }



    already_friend = () => 
    {
      var result = false
      var user_id = firebase.auth().currentUser.uid
      var reciver_id =  this.state.reciver_id
      var sender_doc = firebase.firestore().collection('Users').doc(user_id)

    sender_doc.get().then(function(doc) {
    if (doc.exists) {
        var doc_data = doc.data()
        result = reciver_id in doc_data.sent_requests


    } else {
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });
      return result

    }



    render(){
       

       
        if (this.state.loading_search)
        {
            console.log("XXXXXX")
            return  ( 
            <View style={{flex:1, paddingTop:100}}>
                <Searchbar
                placeholder="Search"
                onChangeText={query => {this.setState({search:query}, this.find_name)}}
                onSubmitEditing={()=> {this.setState({loading_search:false}, this.check_status)}}
                value={this.state.search}

                /> 
            </View>
            ) 
        }

        if (this.state.reciver_name === '')
        {
            return( <Text> User does not found!</Text>)

        }
        console.log("already state", this.already_request_sent())
        if(this.already_request_sent())
        { return ( <View>
                   <Text> 
                    {this.state.reciver_name} is here! 
                   </Text>
                   <Button 
                   title="CANCEL FRIEND REQUEST"
                   onPress={query => {this.setState({already_sent_request:true} ,this.cancel_request)}}
                   />
                   </View>)
            
        }

        if(this.already_friend())
        
        { return ( <View>
                   <Text> 
                    {this.state.reciver_name} is here! 
                   </Text>
                   <Button 
                   title="CANCEL FRIENDSHIP"
                   onPress={query => {this.setState({already_friend:false} ,this.cancel_friendship)}}
                   />
                   </View>)
            
        }
        else 
        {
        if (this.state.loading_add)
        {
          console.log(this.state.loading_add)
          console.log(this.state.reciver_name, "BLA BLA")
          return ( <View>
                   <Text> 
                    {this.state.reciver_name} is here! 
                   </Text>
                   <Button 
                   title="SEND FRIEND REQUEST"
                   onPress={query => {this.setState({loading_add:false} ,this.send_request)}}
                   />
                   </View>)
          }

        else
          { return ( <View>
                   <Text> 
                    {this.state.reciver_name} is here! 
                   </Text>
                   <Button 
                   title="CANCEL FRIEND REQUEST"
                   onPress={query => {this.setState({loading_add:true} ,this.cancel_request)}}
                   />
                   </View>)
          }

  

          }
        }          
    }



    




const offset = 20;
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