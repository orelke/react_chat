import  firebase from 'firebase';

//import { firebase } from '@firebase/app';
class Fire {
     constructor() {
    
      if (!firebase.apps.length) {
        //avoid re-initializing
        firebase.initializeApp({
         apiKey: "AIzaSyDCEEGqkT3ZlGDFimXshK8_43M2zOQQSPc",
         authDomain: "my-expo-chat.firebaseapp.com",
         databaseURL: "https://my-expo-chat.firebaseio.com",
         projectId: "my-expo-chat",
         storageBucket: "my-expo-chat.appspot.com",
         messagingSenderId: "105188356120",
         appId: "1:105188356120:web:1a55a09f542f56a3ae536d"
        });
      }
    };
    login = async (user, success_callback, failed_callback) => {
      await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(success_callback, failed_callback);
    };
  createAccount = async user => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(
          function() {
            console.log(
              'created user successfully. User email:' +
                user.email +
                ' name:' +
                user.name
            );
            var userf = firebase.auth().currentUser;
            var user_id = firebase.auth().currentUser.uid;

            var store_ref = firebase.firestore().collection('Users').doc(user_id).set({user_name : user.name}).then(function() {
            console.log("Document successfully written!");
            })
            .catch(function(error) {
            console.error("Error writing document: ", error);
            });
            
            userf.updateProfile({ displayName: user.name }).then(
              function(){
                console.log('Updated displayName successfully. name:' + user.name);
                alert('User ' + user.name + ' was created successfully. Please login.');
              },
              function(error) {
                console.warn('Error update displayName.');
              }
            );
          },
          function(error) {
            console.error('got error:' + typeof error + ' string:' + error.message);
            alert('Create account failed. Error: ' + error.message);
          }
        );

    };
    
    uploadImage = async uri => {
      console.log('got image to upload. uri:' + uri);
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref('avatar')
          .child(uuid.v4());
        const task = ref.put(blob);
    
        return new Promise((resolve, reject) => {
          task.on(
            'state_changed',
            () => {
            },
            reject,
            () => resolve(task.snapshot.downloadURL)
          );
        });
      } catch (err) {
        console.log('uploadImage try/catch error: ' + err.message);
      }
    };
    
    updateAvatar = url => {
    
      var userf = firebase.auth().currentUser;
      if (userf != null) {
        userf.updateProfile({ avatar: url }).then(
          function() {
            console.log('Updated avatar successfully. url:' + url);
            alert('Avatar image is saved successfully.');
          },
          function(error) {
            console.warn('Error update avatar.');
            alert('Error update avatar. Error:' + error.message);
          }
        );
      } else {
        console.log("can't update avatar, user is not login.");
        alert('Unable to update avatar. You must login first.');
      }
    };
  get uid() {
    return ( firebase.auth().currentUser || {} ).uid;
  } 
  get ref() {
    return firebase.database().ref('messages');
  }

  get storeRef() {
    return firebase.firestore().collection('Users');
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
      const message = {
        text,
        user,                        //dont recognize this var: user it is undifined 
        timestamp: this.timestamp,
      };
      console.log(message)
      this.append(message);
    }
  };

  append = message => this.ref.push(message);


  off() {
    this.ref.off();
  }
}


Fire = new Fire();
export default Fire;
