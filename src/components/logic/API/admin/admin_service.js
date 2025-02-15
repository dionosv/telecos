import {makeRequest, x_api_endpoint} from '../API_service.js';
import Cookies from 'js-cookie'; 

function session_expirate(max_date=30) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + max_date); 
  return currentDate.toISOString();
}


async function login_admin(name, password) {
  let xdata = JSON.stringify({
    "name": name,
    "password": password
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/admins/login',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : xdata
  };

  return JSON.parse(await makeRequest(config)); 
}

async function get_admin_detail(adminId) {
  let xdata = JSON.stringify({
    "adminId" : adminId
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/admins/get',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : xdata
  };

  return JSON.parse(await makeRequest(config)); 
}


export {login_admin, get_admin_detail, session_expirate};