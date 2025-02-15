import {makeRequest, x_api_endpoint} from '../API_service.js';


async function create_new_session(expertId, userId, sessionName, rate, dateStart, dateEnd) {

    let data = JSON.stringify({
        "expertId": expertId,
        "userId": userId,
        "sessionName": sessionName,
        "rate": rate,
        "date": dateStart,
        "endDate": dateEnd 
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/sessions/create',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}

async function get_session_by_user_Id(userId) {

    let data = JSON.stringify({ 
        "userId": userId, 
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/sessions/getSessionByUser',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
} 

async function get_session_by_expert_Id(expertId) {

    let data = JSON.stringify({ 
        "expertId": expertId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/sessions/getSessionByExpert',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
} 

async function get_session_by_session_Id(sessionId) {

    let data = JSON.stringify({ 
        "sessionId": sessionId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/sessions/getSession',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
} 

async function change_session_id_status(sessionId, status) {

    let data = JSON.stringify({ 
        "sessionId": sessionId,
        "status": status
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/sessions/changeStatus',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
} 


export {create_new_session, get_session_by_user_Id, get_session_by_expert_Id, get_session_by_session_Id, change_session_id_status};