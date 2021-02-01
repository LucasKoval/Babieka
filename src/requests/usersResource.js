//----------* REQUIRE'S *----------//
const axios = require('axios');
const defaults = require('./default');


//----------* VARIABLES *----------//
const url = 'usuario/';


//----------* USERS RESOURCES *----------//
const usersResource = {
    list: function () {
        return axios ({
            ...defaults,
            method: 'GET',
            url: `${url}listado`
        });
    }
};


//----------* EXPORTS RESOURCE *----------//
module.exports = usersResource;