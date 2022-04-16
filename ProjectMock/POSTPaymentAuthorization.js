import { username, password } from './CredentialsLive.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;



//Body creator in Json
function jsonBodyParser() {

    const applicationUserId = 'scindopay';
    const callback = 'https://display-parameters/'
    let institutionId = 'fineco-sandbox';

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
        applicationUserId: applicationUserId,
        institutionId: institutionId,
        callback: callback,
        paymentRequest: {
            type: paymentRequest_type,
            reference: paymentRequest_reference,
            paymentIdempotencyId: paymentRequest_paymentIdempotencyId,
            amount: {
                amount: amount_amount,
                currency: amount_currency
            },
            payer: {
                name: 'gigi',
                accountIdentifications: [
                    {
                        type: "IBAN",
                        identification: "DE12345678901234567890"
                    }
                ]
            },
            payee: {
                name: payee_name,
                accountIdentifications: [
                    {
                        type: "IBAN",
                        identification: "BE12345678901234"
                    }
                ],
                address: {
                    country: country
                }
            }
        }
    });
}

function postPaymentAuthorization(jsonBody) {
    return axios.post('https://api.yapily.com/payment-auth-requests', jsonBody, {
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
console.log(jsonBody)
let data = await postPaymentAuthorization(jsonBody);

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