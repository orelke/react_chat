import Fire from '../Fire.js'
import  firebase from 'firebase';

class Consts {
    users_db = "Users";
    user_name_db_field = "user_name";
    sent_request_db_field = "sent_requests";
    recieved_request_db_field = "recived_requests";



}

Consts = new Consts();
export default Consts;
