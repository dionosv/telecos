// const { x_api_endpoint } = require("./API");
import {x_api_endpoint} from './API.js';


function expert_profile_picture(imagePath){
    const hasil = x_api_endpoint+'/image-rs/expert/' +imagePath
    return hasil
}

export { expert_profile_picture }