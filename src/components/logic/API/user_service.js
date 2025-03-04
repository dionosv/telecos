import {makeRequest, x_api_endpoint} from './API_service.js';
import Cookies from 'js-cookie'; 
async function logout() { 

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/users/logout',
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
    url: x_api_endpoint+'/users/login',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : xdata
  };

  return JSON.parse(await makeRequest(config)); 
}


async function register(name,email,telpon,gender,dob,password){
  let data = JSON.stringify({
    "name":name,
    "email": email,
    "password": password,
    "phoneNum": telpon,
    "gender": gender,
    "dateOfBirth": dob
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/users/register',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));  
} 

async function get_user_data(user_id=""){
  let data = JSON.stringify({
    "userId": user_id
   });
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/users/get',
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
  Cookies.set('otp_telecos', JSON.stringify({
    email: email, //kalo phase 1 user udah login
    otp_send : otp_send,
    otp_try : otp_try ,
    user_role: "user", 
    exp : session_expirate(1)
  }), { expires: new Date(session_expirate(1)), secure: true , sameSite: 'None'});
}

function get_otp_count() {
  const otp_telecos = JSON.parse(Cookies.get('otp_telecos')); 
  if (otp_telecos) {  
      return {
        email: otp_telecos.email,
        otp_send: otp_telecos.otp_send,
        otp_try: otp_telecos.otp_try, 
      };
    }  
  else {
    return false;
  }
}

function clear_otp_count() {
  Cookies.remove('otp_telecos');
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
  // console.log(JSON.parse(await makeRequest(config)));  
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
  // console.log(JSON.parse(await makeRequest(config)));  
} 

async function get_all_user(){
  let data = JSON.stringify({ 

   });
  
   let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/users/getAll',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));  
  // console.log(JSON.parse(await makeRequest(config)));  
} 

async function change_user_profile(userId,name,phoneNum,gender,dateOfBirth){
  let data = JSON.stringify({
    "userId":userId,
    "name":name,
    "phoneNum":phoneNum,
    "gender":gender,
    "dateOfBirth" :dateOfBirth
   }); 
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/users/update',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };

  return JSON.parse(await makeRequest(config));    
} 


async function change_user_password(userId,currentPassword,newPassword){
  let data = JSON.stringify({
    "userId":userId,
    "currentPassword":currentPassword,
    "password":newPassword
   }); 
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/users/updatePassword',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };  

  return JSON.parse(await makeRequest(config));    
} 

export {login, register, logout, set_otp_count, get_user_data, reset_password ,get_otp_count, change_user_profile, change_user_password, clear_otp_count, session_expirate, send_otp,forget_password_otp, verify_otp, get_all_user};