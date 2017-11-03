const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

const nomeRegex = /({3,30})/
const enderecoRegex = /(((?=.*\d)).{6,70})/
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/


const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({email}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            const { nome, email, _id } = user
            res.json({ nome, email, _id, token })
        } else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']})
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
}

const signup = (req, res, next) => {
    // Campos obrigatórios: nome, sobrenome, email, crm, celular, endereco, bairro, cidade, estado, cep, password
    const nome = req.body.nome || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''
    const sobrenome = req.body.sobrenome || ''
    const crm = req.body.crm || ''
    const celular = req.body.celular || ''
    const endereco = req.body.endereco || ''
    const bairro = req.body.bairro || ''
    const cidade = req.body.cidade || ''
    const estado = req.body.estado || ''
    const cep = req.body.cep || ''

    if(!email.match(emailRegex)) {
        return res.status(400).send({errors: ['O e-mail informado está inválido']})
    }

    if(!password.match(passwordRegex)) {
        return res.status(400).send({errors: [
            "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."
        ]})
    }

    if(!nome.match(nomeRegex)) {
        return res.status(400).send({errors: [
            'O "Nome" deve conter no mínimo 3 e no máximo 30 caracteres.'
        ]})
    }

    if(!endereco.match(nomeRegex)) {
        return res.status(400).send({errors: [
            'O "Endereço" deve conter no mínimo 6 e no máximo 70 caracteres e o número da residência.'
        ]})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({errors: ['Senhas não conferem.']})
    }

    User.findOne({email}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({errors: ['Usuário já cadastrado.']})
        } else {
            const newUser = new User({ nome, email, password: passwordHash })
            newUser.save(err => {
                if(err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    login(req, res, next)
                }
            })
        }        
    })
}

module.exports = { login, signup, validateToken }