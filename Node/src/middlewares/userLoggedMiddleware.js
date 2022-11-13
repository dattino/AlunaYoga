const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize")

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    try {
        if (req.cookies.userEmail && !req.session.userLogged) {
            const userToCookie = await db.Users.findOne({
                where: {
                    email: req.cookies.userEmail,
                }
            });
            res.locals.isLogged = true;
            req.session.userLogged = userToCookie;
            res.locals.userLogged = req.session.userLogged;
        };
        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        };
        next();

    } catch (error) {
        console.log('ERROR in middleware!!!')
        console.log(error)
        next();
    }
}

module.exports = userLoggedMiddleware;


