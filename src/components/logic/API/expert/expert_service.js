import {makeRequest, x_api_endpoint} from '../API_service.js';
import Cookies from 'js-cookie'; 
async function logout() { 

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/experts/logout',
    headers: {  
      'Content-Type': 'application/json'
    },
 
  };

  await makeRequest(config);
}



async function login(email, password) {
  let xdata = JSON.stringify({
    "email": email,
    "password": password
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/experts/login',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : xdata
  };

  return JSON.parse(await makeRequest(config)); 
}


async function register(name,email,telpon,gender,dob,password,jenis_ahli,firstJob,noSTR,workspace,almamater) {
  let data = JSON.stringify({
    "name": name,
    "email": email,
    "password": password,
    "description": jenis_ahli,
    "phoneNum": telpon,
    "gender": gender,
    "dateOfBirth": dob,
    "firstJob": firstJob,
    "strNum": noSTR,
    "currentWorkspace": workspace,
    "almamater":almamater
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/experts/register',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));  
} 

async function get_user_data(user_id=""){
  let data = JSON.stringify({
    "expertId": user_id
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
  // console.log(JSON.parse(await makeRequest(config)));  
  return JSON.parse(await makeRequest(config));  
} 
 
function session_expirate(max_date=30) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + max_date); 
  return currentDate.toISOString();
}

function set_otp_count(email,otp_send,otp_try){
  Cookies.set('otp_telecos_expert', JSON.stringify({
    email: email, //kalo phase 1 user udah login
    otp_send : otp_send,
    otp_try : otp_try ,
    user_role: "user", 
    exp : session_expirate(1)
  }), { expires: new Date(session_expirate(1)), secure: true , sameSite: 'None'});
}

function get_otp_count() {
  const otp_telecos_expert = JSON.parse(Cookies.get('otp_telecos_expert')); 
  if (otp_telecos_expert) {  
      return {
        email: otp_telecos_expert.email,
        otp_send: otp_telecos_expert.otp_send,
        otp_try: otp_telecos_expert.otp_try, 
      };
    }  
  else {
    return false;
  }
}

function clear_otp_count() {
  Cookies.remove('otp_telecos_expert');
}


async function send_otp(email){
  let data = JSON.stringify({
    "email": email
   });
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/otp/send',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));  
  // console.log(JSON.parse(await makeRequest(config)));  
} 

async function verify_otp(email,code){
  let data = JSON.stringify({
    "email": email,
    "inputOTP":code
   });
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/otp/verify',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));  
  // console.log(JSON.parse(await makeRequest(config)));  
} 

async function forget_password_otp(email){
  let data = JSON.stringify({
    "email": email
   });
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/otp/sendUser',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));    
} 

async function reset_password(email){
  let data = JSON.stringify({
    "email": email
   });
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/otp/forgetUser',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));   
} 

async function change_user_profile(expertId,name,description,phoneNum,gender,dateOfBirth, first_job, strNum, currentWorkspace, almamater){
  let data = JSON.stringify({ 
    "expertId":expertId,
    "name":name,
    "description":description, 
    "phoneNum": phoneNum,
    "gender": gender,
    "dateOfBirth": dateOfBirth,
    "firstJob": first_job,
    "strNum": strNum,
    "currentWorkspace": currentWorkspace,
    "almamater":almamater 
   }); 
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/experts/update',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));    
} 


async function change_user_password(userId,currentPassword,newPassword){
  let data = JSON.stringify({
    "expertId":userId,
    "currentPassword":currentPassword,
    "password":newPassword
   }); 
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/experts/updatePassword',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };  

  return JSON.parse(await makeRequest(config));    
} 
 

export {login, register, logout, set_otp_count, get_user_data, reset_password ,get_otp_count, change_user_profile, change_user_password, clear_otp_count, session_expirate, send_otp,forget_password_otp, verify_otp};