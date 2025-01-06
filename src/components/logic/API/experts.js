import {makeRequest, x_api_endpoint} from './API.js';
import Cookies from 'js-cookie'; 

async function get_all_experts() { 

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/experts/getAll',
    headers: {  
      'Content-Type': 'application/json'
    },
 
  }; 
  return JSON.parse(await makeRequest(config));  
}

async function get_experts_byID(expertId) { 

  let data = JSON.stringify({
     "expertId":expertId
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/experts/get',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));  

}
export {get_all_experts,get_experts_byID};