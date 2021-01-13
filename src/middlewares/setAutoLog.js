//----------* REQUIRE'S *----------//
const db = require('../db/models');


//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    if (req.cookies.user_Id && !req.session.user) {
        db.User.findOne({
            where: {
                id: req.cookies.user_Id
            },
            include: ['role']
        })
        .then(userFound => {
            req.session.user = userFound;
        })

        .catch(e => console.log(e));
        console.log("USUARIO" + req.session.user)
    }
    return next();
}