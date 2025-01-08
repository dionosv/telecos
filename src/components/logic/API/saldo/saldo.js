import {makeRequest, x_api_endpoint} from '../API.js';


async function kurangi_saldo(userid,nominal){
    let data = JSON.stringify({
      "userId": userid,
      "amount":nominal
     });
    
     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/users/useWallet',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    return JSON.parse(await makeRequest(config));  
    // console.log(JSON.parse(await makeRequest(config)));  
  }


export {kurangi_saldo};