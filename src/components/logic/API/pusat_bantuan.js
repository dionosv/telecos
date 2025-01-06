import {makeRequest, x_api_endpoint} from './API.js';

async function create_ticket_telecos_care(userid, judul_tiket, isi_tiket) {
    let xdata = JSON.stringify({
        userId:userid,
        ticketHeader:judul_tiket,
        ticketContent:isi_tiket
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/tickets/create',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : xdata
    };
  
    return JSON.parse(await makeRequest(config)); 
  }

  async function get_laporan_by_userid(x_userId) {
    let xdata = JSON.stringify({
        userId:x_userId, 
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/tickets/getByUser',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : xdata
    }; 
  
    return JSON.parse(await makeRequest(config)); 
  }
   
  async function get_laporan_by_ticket_id(ticketId) {
    let xdata = JSON.stringify({
        ticketId:ticketId, 
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/tickets/getTicket',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : xdata
    }; 
  
    return JSON.parse(await makeRequest(config)); 
  }

  async function get_laporan_all() {
    let xdata = JSON.stringify({
        
    });
  
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: x_api_endpoint+'/tickets/getAll',
      headers: {  
        'Content-Type': 'application/json'
      },
      data : xdata
    };
  
    return JSON.parse(await makeRequest(config)); 
  }

  


  export { create_ticket_telecos_care , get_laporan_by_userid, get_laporan_all , get_laporan_by_ticket_id}