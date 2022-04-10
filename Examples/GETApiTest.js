import { username, password } from './credentials.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

function getUsers() {
        return axios.get('https://api.yapily.com/users', {
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

const data = await getUsers();

//OK CALL
if(data.retcode) {
    console.log(data); //GET the entire response
    console.log(data[0]); //GET the first object
    console.log(data[0].uuid); //GET the uuid of the first object
}

//ERROR CALL
if(data.code){
    console.log(data);
    console.log(data.code);
    console.log(data.message);
}

