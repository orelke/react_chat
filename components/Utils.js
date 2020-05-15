import Fire from '../Fire.js'
import  firebase from 'firebase';

class Utils {

   find = async (str_to_find, att_type, collection, failed_callback) => {
    var store_ref = firebase.firestore().collection(collection).get().then(snapshot => {
    snapshot.forEach(doc => {
        if (doc && doc.exists) {
            console.log(doc.id, ' => ', doc.get(att_type));
            var item = doc.get(att_type)
            if (item === str_to_find){
                return item;
            }
        }
    });
    return null;
   });

}
}

Utils = new Utils();
export default Utils;
