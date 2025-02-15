import {makeRequest, x_api_endpoint} from '../API_service.js';


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

async function new_transaction_top_up(
    sessionId,
    receiverType,
    receiverId,
    // senderType, 
    senderId, //topup bank / topup bca va atau apapun itu
    // transactionType,
    amount,
    // status
){
    return await create_new_transaction(sessionId,
        receiverType,
        receiverId,
        "Top Up",
        senderId,
        "Top Up",
        amount,
        "1");
}

async function new_transaction_user_konsultasi_mulai(
    sessionId,
    // receiverType,
    // receiverId,
    // senderType, 
    senderId,
    // transactionType,
    amount, 
){
    return await create_new_transaction(
        sessionId,
        "Telecos",
        "Telecos",
        "User",
        senderId,
        "Konsultasi Ahli",
        amount,
        "1");
}

async function new_transaction_user_konsultasi_selesai(
    sessionId,
    // receiverType,
    receiverId,
    // senderType, 
    // senderId,
    // transactionType,
    amount 
){
    return await create_new_transaction(
        sessionId,
        "Ahli",
        receiverId,
        "Telecos",
        "Telecos",
        "Konsultasi Ahli Selesai",
        amount-5000,
        "1");
}

async function new_transaction_expert_withdrawal(
    sessionId,
    // receiverType,
    receiverId,
    // senderType, 
    // senderId, //topup bank / topup bca va atau apapun itu
    // transactionType,
    amount,
    // status
){
    return await create_new_transaction(sessionId,
        "Ahli",
        receiverId,
        "Telecos",
        "Telecos",
        "Expert Withdrawal",
        amount,
        "1");
}

async function new_transaction_refund_user(
    sessionId,
    // receiverType,
    receiverId,
    // senderType, 
    // senderId, //topup bank / topup bca va atau apapun itu
    // transactionType,
    amount,
    // status
){
    return await create_new_transaction(
        sessionId,
        "User",
        receiverId,
        "Telecos",
        "Telecos",
        "User get refund",
        amount,
        "1");
}

async function new_transaction_refund_expert(
    sessionId,
    // receiverType,
    // receiverId,
    // senderType, 
    senderId, //topup bank / topup bca va atau apapun itu
    // transactionType,
    amount,
    // status
){
    return await create_new_transaction(
        sessionId,
        "Telecos",
        "Telecos",
        "Ahli",
        senderId,
        "Expert send refund",
        amount,
        "1");
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
) {

    let data = JSON.stringify({ 
    });

    let config = {
        method: 'post',
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
    new_transaction_top_up,
    new_transaction_user_konsultasi_mulai,
    new_transaction_user_konsultasi_selesai,
    new_transaction_expert_withdrawal,
    new_transaction_refund_user,
    new_transaction_refund_expert,
    change_transaction_status,
    get_all_transaction,
    get_transaction_by_user_id,
    get_transaction_by_session_id,
    get_transaction_by_transaction_id
}