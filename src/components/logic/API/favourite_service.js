import {makeRequest, x_api_endpoint} from './API_service.js'; 

async function create_favourite(userId,expertId){

  let data = JSON.stringify({ 
        "userId": userId,
        "expertId": expertId
   });
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/favourites/create',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };
  // console.log(JSON.parse(await makeRequest(config)));  
  return JSON.parse(await makeRequest(config));  
}

async function remove_favourite(userId,expertId){

  let data = JSON.stringify({ 
     "userId": userId,
    "expertId": expertId
   });
  
   let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: x_api_endpoint+'/favourites/remove',
    headers: {  
      'Content-Type': 'application/json'
    },
    data : data
  };
  // console.log(JSON.parse(await makeRequest(config)));  
  return JSON.parse(await makeRequest(config));  
}

async function get_fav_by_user_id(userId){

    let data = JSON.stringify({ 
        "userId": userId
      });
     
      let config = {
       method: 'post',
       maxBodyLength: Infinity,
       url: x_api_endpoint+'/favourites/getByUser',
       headers: {  
         'Content-Type': 'application/json'
       },
       data : data
     };
     // console.log(JSON.parse(await makeRequest(config)));  
     return JSON.parse(await makeRequest(config));  

}

async function check_fav_by_userId_and_expertId(userId,expertId){

    let data = JSON.stringify({ 
        "userId": userId,
        "expertId": expertId
      });
 
      let config = {
       method: 'post',
       maxBodyLength: Infinity,
       url: x_api_endpoint+'/favourites/check',
       headers: {  
         'Content-Type': 'application/json'
       },
       data : data
     };
     // console.log(JSON.parse(await makeRequest(config)));  
     return JSON.parse(await makeRequest(config));  

}

 
export {create_favourite, remove_favourite,get_fav_by_user_id,check_fav_by_userId_and_expertId};