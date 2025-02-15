import { makeRequest, x_api_endpoint } from '../API_service.js';

async function create_new_artikel(author_type="expert",author_id,judul, kategori, payload) {
    let xdata = JSON.stringify({
        "authorType": author_type,
        "authorId": author_id,
        "title": judul,
        "category": kategori,
        "content": JSON.stringify(payload)
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/articles/create',
        headers: {
            'Content-Type': 'application/json'
        },
        data: xdata
    };

    return JSON.parse(await makeRequest(config));
}

async function edit_artikel(articleId, title, category, content) {
    let xdata = JSON.stringify({
        "articleId": articleId,
        "title": title, 
        "category": category,
        "content": JSON.stringify(content)
    });
 

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/articles/edit',
        headers: {
            'Content-Type': 'application/json'
        },
        data: xdata
    };

    return JSON.parse(await makeRequest(config));
}


async function delete_artikel(articleId) {
    let xdata = JSON.stringify({
        "articleId": articleId
    });
 

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/articles/delete',
        headers: {
            'Content-Type': 'application/json'
        },
        data: xdata
    };

    return JSON.parse(await makeRequest(config));
}

async function get_article_by_id(article_id) {
    let xdata = JSON.stringify({
        "articleId": article_id
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/articles/getArticle',
        headers: {
            'Content-Type': 'application/json'
        },
        data: xdata
    };
    return JSON.parse(await makeRequest(config));
}

async function get_article_by_expert_id(expert_id) {
    let xdata = JSON.stringify({
        "expertId": expert_id
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/articles/getArticleByExpert',
        headers: {
            'Content-Type': 'application/json'
        },
        data: xdata
    };
    return JSON.parse(await makeRequest(config));
}

async function get_article_all() {
    let xdata = JSON.stringify({ 

    });
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: x_api_endpoint + '/articles/getAll',
        headers: {
            'Content-Type': 'application/json'
        },
        data: xdata
    };
    return JSON.parse(await makeRequest(config));
}



export { create_new_artikel , get_article_by_id , delete_artikel, get_article_all, edit_artikel, get_article_by_expert_id};