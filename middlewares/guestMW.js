//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.category != 'admin') {
        res.redirect('/usuario/perfil');
    }
    return next();
}