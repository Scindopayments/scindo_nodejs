import { username, password } from './CredentialsLive.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

function getInstitutions() {
        return axios.get('https://api.yapily.com/institutions', {
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

const data = await getInstitutions();

//OK CALL
if(data.retcode) {
    console.log(data.data[0]); // Get all the first bank data
    console.log(data.data[0].id); // Get id of the first bank
}

//ERROR CALL
if(data.code){
    console.log(data);
    console.log(data.code);
    console.log(data.message);
}