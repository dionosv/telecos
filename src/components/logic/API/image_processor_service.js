// const { x_api_endpoint } = require("./API");
import {x_api_endpoint} from './API_service.js';


function expert_profile_picture(imagePath){
    const hasil = x_api_endpoint+'/image-rs/expert/' +imagePath
    return hasil
}

function article_card_image(imagePath){
    const hasil = x_api_endpoint+'/image-rs/article/' +imagePath
    console.log(hasil)
    return hasil
}

export { expert_profile_picture, article_card_image }