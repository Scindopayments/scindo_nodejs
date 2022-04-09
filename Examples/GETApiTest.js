import { username, password } from './credentials.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

function getUsers() {
    try {
        return axios.get('https://api.yapily.com/users', {
            auth: {
                username : usernameBasic,
                password : passwordBasic
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}
const data = (await getUsers()).data;
console.log(data);
console.log(data[0]);
console.log(data[0].uuid);
