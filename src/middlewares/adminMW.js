//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    if (req.session.user.role.name != "admin") {
        res.redirect('/');
    }
    return next();
}