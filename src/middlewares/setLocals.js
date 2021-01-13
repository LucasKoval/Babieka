//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    res.locals.loggedUser = false;
    if (req.session.user) {
        console.log('SESSION', req.session.user);
        res.locals.loggedUser = req.session.user;
        console.log('LOCALS', res.locals.loggedUser);
    }
    return next();
}