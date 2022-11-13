//Requerir Express-Validator
const { validationResult } = require('express-validator');
const User = require('../../models/User.js');
const bcryptjs = require('bcryptjs');


const controlador = {
    vistaUser: (req, res) => {
        res.render('users/user');
    },

    vistaLista: (req, res) => {
        let users = User.findAll();
        res.render('users/userList', { users })
    },

    vistaDetalle: (req, res) => {
        let user = User.findByPk(req.params.id);
        res.render('users/userDetail', { user })
    },

    vistaInstructors: (req, res) => {
        res.render('users/userInstructors');
    },

    vistaRegister: (req, res) => {
        res.render('users/userRegister');
    },

    registro: (req, res) => {

        //Validar nuevo usuario
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/userRegister', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        //buscar usuario por email en db
        let userDb = User.findByField('email', req.body.email);

        //Validar usuario existente
        if (userDb) {
            return res.render('users/userRegister', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            })
        };

        //crear nuevo usuario
        let userToCreate = {
            email: req.body.email,
            nombre: req.body.nombre,
            fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            password: bcryptjs.hashSync(req.body.password, 10),
            cart: [{}],
        }

        //comparar contraseñas 
        let comparePass = bcryptjs.compareSync(req.body.comfirmPassword, userToCreate.password);

        if (!comparePass) {
            return res.render('users/userRegister', {
                errors: {
                    comfirmPassword: {
                        msg: 'Las contraseñas no coinciden'
                    }
                },
                oldData: req.body
            })
        }else{
            //agregar imagen o imagen default
            let imagen = User.addAvatar(req.file);
            userToCreate.avatar = imagen;
            let userCreate = User.create(userToCreate);
            res.redirect("/users/login");
        };


    },

    vistaLogin: (req, res) => {
        res.render('users/userLogin');
    },

    login: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let passCompared = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passCompared) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                res.redirect('/');
            }
            return res.render('users/userLogin', {
                errors: {
                    email: {
                        msg: 'las credenciales son inválidas'
                    }
                }
            });
        }

        if (req.body.recordar) {
            res.cookie(
                'userEmail', 
                req.body.email, 
                { maxAge: (1000 * 60 * 60) }
                )
            }  
        
        return res.render('users/userLogin', {
            errors: {
                email: {
                    msg: 'Email no registrado'
                }
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },

    vistaProfile: (req, res) => {
        let id ="";
        if (req.session.userLogged){
            id = req.session.userLogged.id
        }else{
            id= req.params.id
        };

        //buscar usuario en db
        let userDb = User.findByPk(id);
        let user = userDb;

        res.render('users/userProfile', { user });
    },

    edit: (req, res) => {

        let id = req.params.id;
        //buscar usuario por ID en db
        let userDb = User.findByPk(id);
        
        // //Validar datos usuario
        // const resultValidation = validationResult(req);
        // if (resultValidation.errors.length > 0) {
        //     return res.render('users/userProfile', { user },{
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     })
        // };
        
        //agregar imagen
        let imagen = userDb.imagenUsuario;

        if(req.file){
            imagen = req.file.filename
        }

        //editar usuario
        let userToEdit = {
            id: userDb.id,
            imagenUsuario: imagen,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: userDb.email,
            fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            password: userDb.password,
            cart: userDb.cart,
        }

        let userEdit = User.edit(userToEdit);
        req.session.userLogged = userEdit

        res.redirect(`/`);

    },

    search: function (req, res) {
        let busquedaUsuario = req.query.search;
        let usersResults = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].nombre_y_apellido.includes(busquedaUsuario)) {
                usersResults.push(users[i]);
            }
        }
        res.render('users/userResults', { users: usersResults })
    }
};

module.exports = controlador;