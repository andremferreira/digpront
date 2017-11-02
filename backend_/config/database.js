const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/dig_pront_db')

mongoose.Error.messages.general.require = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo."
mongoose.Error.messages.String.enum = "'{VALUE}' não é uma informação válida para o atributo '{PATH}'."
