import { username, password } from './credentials.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

let userID = 'APPLICATION_USER_ID17'

function createUser() {
    return axios.post('https://api.yapily.com/users', {applicationUserId: userID}, {
        auth: {
            username : usernameBasic,
            password : passwordBasic
        }
    })
        .then(rs => {
            const data = rs.data;
            data.retcode = rs.status;
            return  data;
        })
        .catch(err => err?.response?.data?.error || err)
}
const data = await createUser();

//OK CALL
if(data.retcode) {
    console.log(data);
    console.log(data.retcode);
}

//ERROR CALL
if(data.code){
    console.log(data);
    console.log(data.code);
    console.log(data.message);
}

