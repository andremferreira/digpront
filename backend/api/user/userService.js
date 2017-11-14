const _ = require('lodash')
const User = require('./user')
const bcrypt = require('bcrypt')
const ObjectId = require('mongoose').Types.ObjectId
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

User.methods(['get', 'post', 'put', 'delete'])
User.updateOptions({ new: true, runValidators: true })
User.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

User.before('put', updateUserPass)

User.route('count', function (req, res, next) {
  User.count(function (error, value) {
    if (error) {
      res.status(500).json({ errors: [error] })
    } else {
      res.json({ value })
    }
  })
})

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if (bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({ errors })
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

function updateUserPass(req, res, next) {
  const pass = req.body.pass || ''
  const confirmPass = req.body.conf_pass || ''

  if (!pass.match(passwordRegex)) {
    return res.status(400).send({
      errors: [
        "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."
      ]
    })
  }

  const salt = bcrypt.genSaltSync()
  const passwordHash = bcrypt.hashSync(pass, salt)
  if (!bcrypt.compareSync(confirmPass, passwordHash)) {
    return res.status(400).send({ errors: ['Senhas não conferem.'] })
  } else {
    req.body.password = passwordHash
  }

  next()
}

module.exports = User
