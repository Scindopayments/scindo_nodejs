import { username, password } from './CredentialsLive.js'
import axios from 'axios';

let usernameBasic = username;
let passwordBasic = password;


const applicationUserId = 'single-payment-tutorial';
const callback = 'https://scindopayments/callback1'



let institutionId = 'bpm-sandbox';

//paymentRequest
let paymentRequest_type = 'DOMESTIC_PAYMENT';
let paymentRequest_reference = 'Bills Coffee Shop';
let paymentRequest_paymentIdempotencyId = '1' //ID;
//Amount
let amount_amount = 9.00;
let amount_currency = "EUR";
//paymentRequestPayee
let payee_name = 'BILLS COFFEE LTD';
//accountIdentifications
let accountIdentifications_type_account = 'ACCOUNT_NUMBER';
let identification_account = '1'; //account number identificaiton
let accountIdentifications_type_sort = 'SORT_CODE';
let identification_sort = '1'; //sortcode identificaiton
//address
let country = 'IT';

let body = JSON.stringify({
    applicationUserId: applicationUserId,
    institutionId: institutionId,
    callback : callback,
    paymentRequest : {
        type : paymentRequest_type,
        reference : paymentRequest_reference,
        paymentIdempotencyId : paymentRequest_paymentIdempotencyId,
        amount : {
            amount : amount_amount,
            currency :amount_currency
        },
        payee : {
            name : payee_name,
            accountIdentifications : [{
                    type : accountIdentifications_type_account,
                    identification : identification_account
                },
                {
                    type : accountIdentifications_type_sort,
                    identification : identification_sort
                }
            ],
            address : {
                country : country
            }
        }
    }
});

function postPaymentAuthorization() {
    return axios.post('https://api.yapily.com/payment-auth-requests', body, {
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
const data = await postPaymentAuthorization();

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