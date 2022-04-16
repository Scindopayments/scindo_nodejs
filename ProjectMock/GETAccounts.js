import { username, password } from './CredentialsLive.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

let consent = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJJTlNUSVRVVElPTiI6ImZpbmVjby1zYW5kYm94IiwiQ09OU0VOVCI6IjNiMmVmZjAxLTVkNGMtNDc2ZC04M2NmLWRkNDU4MGYwODBjMSIsIkFQUExJQ0FUSU9OX1VTRVJfSUQiOiJzY2luZG9wYXkiLCJVU0VSIjoiNTRmNzViMDYtZjAwYS00NmU3LTg3M2QtMWJiNWQ1MjhmM2QwIn0.0601ZchJu3S6H2cnVyVFawmT-QBUWNPsnXBCgZ0W__DFhN-YLWPegsP5yuYKhAAsptuIcsu5YOIiscKnA1NhMg';


function getAccounts() {
        return axios.get('https://api.yapily.com/accounts', {
            auth: {
                username : usernameBasic,
                password : passwordBasic
            },
            headers: {
                Consent : consent
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
    console.log(data.data[1].id)
}

//ERROR CALL
if(data.code){
    console.log(data);
    console.log(data.code);
    console.log(data.message);
}