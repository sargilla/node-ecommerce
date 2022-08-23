const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const databaseJson = require('../database/databaseJson')

const databaseFilename = '../database/users.json';

const controller = {
    showLogin: function(req, res) {
        return res.render('auth/login')
    },
    login: function(req, res) {
        //validar los datos
        let errores = validationResult(req)

        //si hay errores, retornarlos a la vista
        if (!errores.isEmpty()) {
            let errors = errores.mapped()
            console.log(errors)
            return res.render('auth/login', {errors: errors, olds: req.body})
        }
 
        //leo el json
        const users = databaseJson.readJson(databaseFilename)

            console.log(req.body)
        //buscar al usuario
        let user = users.find(u => u.email.toLowerCase() == req.body.email.toLowerCase())
        if (!user) {
            return res.send('usuario o clave invalido')
        }

        //comparar las passwords
        if (!bcryptjs.compareSync(req.body.password, user.password)) {
            return res.send('usuario o clave invalido')
        }

        //guardar en session, sacar el password por seguridad
        req.session.user = user

        //guardo en la session la fecha en formato numero para luego comparar y validar que no pasen mas de
            // X minutos de inactividad
        req.session.lastActitity = Date.now()

        //si está el recuerdame, le guardo una cookie
        if (req.body.rememberMe) {
            res.cookie('remember-me', user.email, {maxAge: 1000*60*60*24*30})
        }

        //redirigir al perfil
        return res.redirect('/profile')
    },
    showRegister: function(req, res) {
        return res.render('auth/register')
    },
    register: function(req, res) {
        //validar los datos
        let errores = validationResult(req)

        //si hay errores, retornarlos a la vista
        if (!errores.isEmpty()) {
            let errors = errores.mapped()
            console.log(errors)
            return res.render('auth/register', {errors: errors, olds: req.body})
        }


        //si esta bien registro al usuario
        //leo el json
        const users = databaseJson.readJson(databaseFilename) 

        const idCalculated = databaseJson.lastElementId(users) + 1

        //si hay imagen
        let image = '';
        if (req.file) {
            //le saco la palabra public para que sea a partir
            image = req.file.filename;
        }

        //para mayor seguridad guardo el password de manera encriptada
        // spoiler alert bcryptjs
        const pass = bcryptjs.hashSync(req.body.password, 10)

        //guardo el nuevo usuario con la estructura
        users.push({ id: idCalculated, email: req.body.email, password: pass, img: image })

        //reescribo el json
        databaseJson.writeJson(users, databaseFilename)

        //hago algo más? <--------
        //luego a donde redirijo? <-----------
        return res.redirect('/login')
    },
    logout: function(req, res) {
        //eliminar la session

        //si tengo el rememberme, eliminar la cookie
        //res.clearCookie('key')
        return res.send('deslogeando')
    },
    profile: function(req, res){
        console.log(req.session.user)
        return res.send('datos del usuario')
    },
    confirmUser: function(req, res) {

        return res.send('confirmando al usuaro')
    }
}


module.exports = controller