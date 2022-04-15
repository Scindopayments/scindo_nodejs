import { username, password } from './CredentialsLive.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

function getAccounts() {
        return axios.get('https://api.yapily.com/accounts', {
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

const data = await getAccounts();

//OK CALL
if(data.retcode) {
    console.log(data); //GET the entire response
}

//ERROR CALL
if(data.code){
    console.log(data);
    console.log(data.code);
    console.log(data.message);
}