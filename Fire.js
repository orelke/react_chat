import  firebase from 'firebase';

//import { firebase } from '@firebase/app';
class Fire {
  constructor() {
    var firebase = require('firebase');
    require('firebase/auth');
    require('firebase/database');
    require('firebase/storage');
    var config ={
    apiKey: "AIzaSyDCEEGqkT3ZlGDFimXshK8_43M2zOQQSPc",
    authDomain: "my-expo-chat.firebaseapp.com",
    databaseURL: "https://my-expo-chat.firebaseio.com",
    projectId: "my-expo-chat",
    storageBucket: "my-expo-chat.appspot.com",
    messagingSenderId: "105188356120",
    appId: "1:105188356120:web:1a55a09f542f56a3ae536d"
    };	  
    firebase.initializeApp(config);  
    this.observeAuth();
 }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
 
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({message}) {
        alert(message);
      }
    }
  }; 
  get uid() {
    return ( firebase.auth().currentUser || {} ).uid;
  } 
  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val(); //destructuring
    const { key: _id } = snapshot;
    
    const timestamp = new Date(numberStamp);
    
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>  //whats going in this method?
    this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));
  
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;

}



  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      console.log("ddd");
      const message = {
        text,
        user,  
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);


  off() {
    this.ref.off();
  }
}


Fire.shared = new Fire();
export default Fire;
