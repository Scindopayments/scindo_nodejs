import {username, password, url} from './CredentialsLive.js'
import axios from 'axios';

const usernameBasic = username;
const passwordBasic = password;

const endpoint = '/payments';
const endpoint2 = '/details';
const paymentId = '/66475bf1-c016-418a-87ac-a8a8529defd2'
const URI = url+endpoint+paymentId+endpoint2;

const consent = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJJTlNUSVRVVElPTiI6ImZpbmVjby1zYW5kYm94IiwiQ09OU0VOVCI6IjNiMmVmZjAxLTVkNGMtNDc2ZC04M2NmLWRkNDU4MGYwODBjMSIsIkFQUExJQ0FUSU9OX1VTRVJfSUQiOiJzY2luZG9wYXkiLCJVU0VSIjoiNTRmNzViMDYtZjAwYS00NmU3LTg3M2QtMWJiNWQ1MjhmM2QwIn0.0601ZchJu3S6H2cnVyVFawmT-QBUWNPsnXBCgZ0W__DFhN-YLWPegsP5yuYKhAAsptuIcsu5YOIiscKnA1NhMg';

function getInstitutions() {
        return axios.get(URI, {
            auth: {
                username : usernameBasic,
                password : passwordBasic
            },
            headers:{
                'Consent' : consent
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
    console.log(data.data); // Get all the first bank datan
}

//ERROR CALL
if(data.code){
    console.log(data);
    console.log(data.code);
    console.log(data.message);
}