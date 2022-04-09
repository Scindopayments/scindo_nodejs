import { username, password } from './credentials.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

function createUser() {
    try {
        return axios.post('https://api.yapily.com/users', {applicationUserId: 'APPLICATION_USER_ID9'}, {
            auth: {
                username : usernameBasic,
                password : passwordBasic
            }
        })
    }
    catch (err) {

    }
}
const data = (await createUser()).data;

console.log(data.error);
