import {makeRequest, x_api_endpoint} from '../API.js';

async function set_schedule_id(expertId, dateStart, dateEnd, rate) {

    let data = JSON.stringify({
        "expertId": expertId,
        "dateStart": dateStart,
        "dateEnd": dateEnd,
        "rate": rate
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/schedules/createNew',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
}


async function get_schedule_by_expert_id(expertId) {

    let data = JSON.stringify({
        "expertId": expertId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/schedules/getByExpertId',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
} 


async function delete_by_schedule_id(scheduleId) {

    let data = JSON.stringify({
        "scheduleId": scheduleId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/schedules/delete',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return JSON.parse(await makeRequest(config));
} 


export { set_schedule_id , get_schedule_by_expert_id,delete_by_schedule_id};