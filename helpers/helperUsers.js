//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const usersFilePath = path.join(__dirname, '../data/users.json');


//----------* FUNCTIONS *----------//
const helperUsers = {
    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));      
    },
    getNewId: () => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));  
	    return users.pop().id++ + 1;     
    },
    writeUsers: (user) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));  
        const usersToSave = [...users,user]
        const usersJson = JSON.stringify(usersToSave, null, " ");
	    fs.writeFileSync(usersFilePath, usersJson); 
    },
}

//----------* EXPORTS CONTROLLER *----------//
module.exports = helperUsers;