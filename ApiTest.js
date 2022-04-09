import https from 'https'
import { username, password } from './credentials.js'

let auth = 'Basic ' + Buffer.from(username+':'+password, 'utf-8').toString('base64');

let options  = {
    host : 'api.yapily.com',
    port : 443,
    path : '/users',
    method : 'GET',
    headers: {
        Authorization: auth,
        'content-type': 'application/json'
    }
};

let req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.end();

req.on('error', function(e) {
    console.error(e);
});