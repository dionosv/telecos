import {makeRequest, x_api_endpoint} from '../API_service.js';


async function new_rating(userid, expertId, ratingScore, ratingContent){
    let data = JSON.stringify({
      "userId" : userid, 
      "expertId" : expertId, 
      "ratingScore" : ratingScore, 
      "ratingContent" : ratingContent
     });
    
     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/ratings/create',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    return JSON.parse(await makeRequest(config));
  }

  async function get_rating_by_expert_id(expertId){
    let data = JSON.stringify({ 
      "expertId" : expertId
     });
    
     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/ratings/getRatingByExpert',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    return JSON.parse(await makeRequest(config));
  }

export {new_rating, get_rating_by_expert_id};