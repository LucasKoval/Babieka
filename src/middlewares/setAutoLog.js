//----------* REQUIRE'S *----------//
const db = require('../db/models');


//----------* MIDDLEWARE *----------//
module.exports = async (req, res, next) => {
    if (req.cookies.user_Id && !req.session.user) {
        const users = await db.User.findAll({
            include: ['role']
        });
        const userFound = users.find(user => user.id == req.cookies.user_Id);
        req.session.user = userFound;
    }
    return next();
}

/* module.exports = (req, res, next) => {
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
    }
    return next();
} */