import {username, password, url} from './CredentialsMock.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;

let endpoint = '/payments';
let URI = url+endpoint;

const consent = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJJTlNUSVRVVElPTiI6ImZpbmVjby1zYW5kYm94IiwiQ09OU0VOVCI6IjNiMmVmZjAxLTVkNGMtNDc2ZC04M2NmLWRkNDU4MGYwODBjMSIsIkFQUExJQ0FUSU9OX1VTRVJfSUQiOiJzY2luZG9wYXkiLCJVU0VSIjoiNTRmNzViMDYtZjAwYS00NmU3LTg3M2QtMWJiNWQ1MjhmM2QwIn0.0601ZchJu3S6H2cnVyVFawmT-QBUWNPsnXBCgZ0W__DFhN-YLWPegsP5yuYKhAAsptuIcsu5YOIiscKnA1NhMg';

function postPayments(jsonBody) {
    return axios.post(URI, jsonBody, {
        auth: {
            username : usernameBasic,
            password : passwordBasic,
        },
        headers: {
            'Content-Type': 'application/json',
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


let jsonBody = jsonBodyParser();
let data = await postPayments(jsonBody);

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

    //paymentRequest
    let paymentRequest_type = 'DOMESTIC_PAYMENT';
    let paymentRequest_reference = 'Bills Coffee Shop';
    let paymentRequest_paymentIdempotencyId = '2' //ID;
    //Amount
    let amount_amount = 9.00;
    let amount_currency = "EUR";
    //paymentRequestPayee
    let payee_name = 'BILLS COFFEE LTD';
    //address
    let country = 'IT';

    return JSON.stringify({
        type: paymentRequest_type,
        reference: paymentRequest_reference,
        paymentIdempotencyId: paymentRequest_paymentIdempotencyId,
        amount: {
            amount: amount_amount,
            currency: amount_currency
        },
        payee: {
            name: payee_name,
            accountIdentifications: [
                {
                    type: 'ACCOUNT_NUMBER',
                    identification: '{accountNumber}'
                },
                {
                    type: 'SORT_CODE',
                    identification: '{sortCode}'
                }
            ],
            address: {
                country: country
            }
        }
    });
}