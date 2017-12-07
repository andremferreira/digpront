const mongoose = require('mongoose')
//localhost
// module.exports = mongoose.connect('mongodb://localhost/digprontdb')
//producao local
module.exports = mongoose.connect('mongodb://admandre:Hidden21@mongo_digprontdb:27017/digprontdb')
//producao externo
//module.exports = mongoose.connect('mongodb://admandre:Hidden21@tatooine.mongodb.umbler.com:40537/digprontdb')

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."
mongoose.Error.messages.String.unique = "'{VALUE}' já foi cadastrado em '{PATH}'."
