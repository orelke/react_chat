import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper'
import  firebase from 'firebase';

export default class Add extends Component {

    state = {
       isLoading: true,
       search: '',
       result_name: '',
       result_id: ''
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
        this.setState({result_name: doc.get("user_name")})
        this.setState({result_id:doc.id})
        }
    }
  });
});

    }

    render(){

        if (this.state.isLoading)
        {
            console.log("XXXXXX")
            return  ( 
            <View style={{flex:1, paddingTop:100}}>
                <Searchbar
                placeholder="Search"
                onChangeText={query => {this.setState({search:query})}}
                onSubmitEditing={()=> this.setState({isLoading:false})}
                value={this.state.search}

                /> 
            </View>
            ) 
        }
     
        else 
        {
        // look here to fix the bug https://stackoverflow.com/questions/37401635/react-js-wait-for-setstate-to-finish-before-triggering-a-function 
          this.find_name()
          if (this.state.result_name === '')
          {
            return( <Text> User does not found!</Text>)

         }
          else
          {
              console.log(this.state.result_name, "BLA BLA")
              return ( <View>
                   <Text> 
                    {this.state.result_name} is here! 
                   </Text>
                   <Button 
                   title="SEND FRIEND REQUEST"
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