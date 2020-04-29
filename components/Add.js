import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

export default class Add extends Component {

    state = {
        on: ''
    };


    toggle = () => {this.setState({on:'x'})}

    render(){

        if (this.state.on === '')
        {
            console.log("XXXXXX")
        return (			<Button
            title="ADD FRIEND"
            style={styles.buttonText}
            onPress={this.toggle}
        />)
        }
        else 
        {
            console.log("YYYYYYYY")
            return ( <View><Text> H </Text></View>)
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