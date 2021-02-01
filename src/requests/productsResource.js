//----------* REQUIRE'S *----------//
const axios = require('axios');
const defaults = require('./default');


//----------* VARIABLES *----------//
const url = 'producto/';


//----------* PRODUCTS RESOURCES *----------//
const productsResource = {
    list: function () {
        return axios ({
            ...defaults,
            method: 'GET',
            url: url
        });
    },
    detail: function (id) {
        return axios ({
            ...defaults,
            method: 'GET',
            url: `${url}/${id}`
        });
    }
};


//----------* EXPORTS RESOURCE *----------//
module.exports = productsResource;