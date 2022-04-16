import {username, password, url} from './CredentialsLive.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

let endpoint = '/institutions';
let URI = url+endpoint;

function getInstitutions() {
        return axios.get(URI, {
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
    console.log(data.data); // Get all the first bank data
    console.log(data.data[1].id); // Get id of the first bank
}

//ERROR CALL
if(data.code){
    console.log(data);
    console.log(data.code);
    console.log(data.message);
}