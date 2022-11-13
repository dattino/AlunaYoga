function guestMiddleware (req, res, next){
    if(req.session.userLogged && !res.locals.userLogged.isAdmin){
        return res.redirect(`/users/profile/${res.locals.userLogged.id}`);
    }
    next();
}

module.exports= guestMiddleware;