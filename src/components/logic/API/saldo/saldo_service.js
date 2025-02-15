import {makeRequest, x_api_endpoint} from '../API_service.js';


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


  async function kurangi_saldo_expert(userid,nominal){
    let data = JSON.stringify({
      "expertId": userid,
      "amount":nominal
     });
    
     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/experts/withdraw',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    return JSON.parse(await makeRequest(config));  
    // console.log(JSON.parse(await makeRequest(config)));  
  }

  const biaya_admin = 5000;

  async function tambah_saldo_selesai_konsultasi_expert(userid,nominal){ 
    let data = JSON.stringify({
      "expertId": userid,
      "amount":nominal - biaya_admin
     });
    
     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/experts/topUp',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    return JSON.parse(await makeRequest(config));  
    // console.log(JSON.parse(await makeRequest(config)));  
  }

  async function tambah_saldo_user(userid,nominal){ 
    let data = JSON.stringify({
      "userId": userid,
      "amount":nominal
     });
    
     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/users/topUp',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : data
    };

    return JSON.parse(await makeRequest(config));   
  }





export {kurangi_saldo, kurangi_saldo_expert, tambah_saldo_selesai_konsultasi_expert, tambah_saldo_user};