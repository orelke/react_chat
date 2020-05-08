import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper'
import  firebase from 'firebase';

export default class Add extends Component {

    state = {
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



    render(){

        if (this.state.loading_search)
        {
            console.log("XXXXXX")
            return  ( 
            <View style={{flex:1, paddingTop:100}}>
                <Searchbar
                placeholder="Search"
                onChangeText={query => {this.setState({search:query}, this.find_name)}}
                onSubmitEditing={()=> this.setState({loading_search:false})}
                value={this.state.search}

                /> 
            </View>
            ) 
        }
     
        else 
        {
          if (this.state.reciver_name === '')
          {
            return( <Text> User does not found!</Text>)

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