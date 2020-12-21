//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    if (req.session.user.category != "admin") {
        res.redirect('/');
    }
    return next();
}