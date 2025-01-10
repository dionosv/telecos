import {makeRequest, x_api_endpoint} from '../API.js';


async function create_new_transaction(
    sessionId,
    receiverType,
    receiverId,
    senderType,
    senderId,
    transactionType,
    amount,
    status,
) {

    let data = JSON.stringify({
    "sessionId": sessionId,
    "receiverType" : receiverType,
    "receiverId" : receiverId,
    "senderType" : senderType,
    "senderId" : senderId,
    "transactionType" : transactionType,
    "amount" : amount,
    "status" : status
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/transactions/create',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}

async function change_transaction_status(
    transactionId, status
) {

    let data = JSON.stringify({
    "transactionId" : transactionId,
    "status" : status
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/transactions/changeStatus',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}
 
async function get_all_transaction(
    transactionId, status
) {

    let data = JSON.stringify({
    "transactionId" : transactionId,
    "status" : status
    });

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/transactions/getAll',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}

async function get_transaction_by_user_id( 
    userType, userId
) {

    let data = JSON.stringify({
        "userType": userType,
        "userId" : userId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/transactions/getByUser',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}

async function get_transaction_by_session_id( 
    sessionId
) {

    let data = JSON.stringify({
        "sessionId": userType
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/transactions/getBySession',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}
  
async function get_transaction_by_transaction_id( 
    transactionId
) {

    let data = JSON.stringify({
        "transactionId": transactionId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/transactions/get',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}

export{ 
    create_new_transaction,
    change_transaction_status,
    get_all_transaction,
    get_transaction_by_user_id,
    get_transaction_by_session_id,
    get_transaction_by_transaction_id
}