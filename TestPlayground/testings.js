import { username, password } from '../Examples/credentials.js'
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

    }
}
const data = (await getUsers()).data;
console.log(data);
console.log(data[0]);
console.log(data[0].uuid);



function createUser() {
    axios.post('https://api.yapily.com/users', {applicationUserId: 'APPLICATION_USER_ID7'}, {
        auth: {username, password}
    })
        .then((r) => console.log(r.data))
        .catch(err => console.log(err))
}

createUser();

