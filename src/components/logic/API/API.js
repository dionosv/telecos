const x_api_endpoint = "http://telecos.live/telecos-be";
import axios from 'axios';

async function makeRequest(config) {
  
  let hasil ={}

  try {
    const response = await axios.request(config); 
    hasil = JSON.stringify(response.data); 
  }
  catch (error) { 
    hasil = JSON.stringify(error.response.data);
  };
  return hasil;
}
 
export {x_api_endpoint, makeRequest};