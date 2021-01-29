const axios = require('axios');
const defaults = require('./default');

const url = "users/";

let userResource = {
    list: ()=>{
        return axios({
            ...defaults,
            method: "GET",
            url: url + "usuario/",
        })
    }

};

module.exports = userResource;