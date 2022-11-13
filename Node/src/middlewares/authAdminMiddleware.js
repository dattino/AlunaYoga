function authAdminMiddleware(req, res, next) {

    if (!req.session.userLogged) {
        return res.redirect('/users/login')
    }

    if (req.session.userLogged) {
        if (!res.locals.userLogged.isAdmin) {
            return res.redirect(`/users/profile/${req.session.userLogged.id}`);
        }
    }

    next();
}

module.exports = authAdminMiddleware;