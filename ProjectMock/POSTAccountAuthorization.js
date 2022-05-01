import {username, password, url} from './CredentialsMock.js'
import axios from 'axios';

const usernameBasic = username;
const passwordBasic = password;

const endpoint = '/account-auth-requests';
const URI = url+endpoint;


function postAccountAuthorization(jsonBody) {
    return axios.post(URI, jsonBody, {
        auth: {
            username : usernameBasic,
            password : passwordBasic,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(rs => {
            const data = rs.data;
            data.retcode = rs.status;
            return  data;

        })
        .catch(err => err?.response?.data?.error || err)
}


let jsonBody = jsonBodyParser();
let data = await postAccountAuthorization(jsonBody);

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

//Body creator in Json
function jsonBodyParser() {

    const applicationUserId = 'scindopay';
    const callback = 'https://display-parameters/'
    let institutionId = 'fineco-sandbox';

    let accountIdBalance = 'account1234567';
    let accountIdTransaction = 'account1234567';

    let typeBalance = "IBAN";
    let typeTransaction = "IBAN";

    let identificationBalance = "IT77O0848283352871412938123";
    let identificationTransaction = "IT77O0848283352871412938123"

    return JSON.stringify({
        applicationUserId: applicationUserId,
        institutionId: institutionId,
        callback: callback,
        accountRequest: {
            accountIdentifiersForBalance: [
                {
                    accountId: accountIdBalance,
                    accountIdentification: {
                        type: typeBalance,
                        identification: identificationBalance
                    }
                }
            ],
            accountIdentifiersForTransaction: [
                {
                    accountId: accountIdTransaction,
                    accountIdentification: {
                        type: typeTransaction,
                        identification: identificationTransaction
                    }
                }
            ]
        }
    });
}