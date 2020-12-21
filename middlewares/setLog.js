//----------* REQUIRE'S *----------//
const helper = require('../helpers/helper');

//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    if (req.cookies.user_Id && !req.session.user) {
        const users = helper.getAllUsers();
        const userFound = users.find(user => user.id == req.cookies.user_Id);
        req.session.user = userFound;
    }
    return next();
}