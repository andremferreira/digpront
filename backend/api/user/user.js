const restful = require('node-restful')
const mongoose = restful.mongoose

const limite = new Date() + 10

/*
    CAMPOS OBRIGATÓRIOS PARA CADASTRO INICIAL:
    nome, sobrenome, email, crm, celular, cep, password
*/

const assistenteSchema = new mongoose.Schema({
    nome: { type: String, required: true, uppercase: true },
    sobrenome: { type: String, required: false, uppercase: true , trim: true},
    email: { type: String, required: true , lowercase: true },
    password: { type: String, min: 6, max: 12, required: true }
  })

const userSchema = new mongoose.Schema({
    
    nome: { type: String, required: true, uppercase: true },
    sobrenome: { type: String, required: false, uppercase: true , trim: true},
    email: { type: String, required: true , lowercase: true, unique: true },
    crm: { type: String, required: true, min: 3, max: 6 },
    telefone: { type: String, required: false, min: 10, max: 15 },
    celular: { type: String, required: true, min: 10, max: 15 },
    genero: { type: Boolean, required: false },
    // TODO: Modificar o tipo para required true o endereço, telefone, sobrenome, cidade, estado, cpf, após testar o backend
    endereco: { type: String, required: false }, 
    /*
        Tipos de usuários:
                            1 - Admin
                            2 - Usuário comum
    */
    tipo: { type: Number, required: true, default: 2 },
    cep: { type: String, required: true },
    bairro: { type: String, required: false },
    cidade: { type: String, required: false }, 
    estado: { type: String, required: false },
    password: { type: String, min: 6, max: 12, required: true },
    // Assistem atrelado ao médico
    medicoId: { type: mongoose.Schema.Types.ObjectId, auto: true, requered:true,  index:true, unique:true },
    // default: seq.getNextSequenceByName("medicoid")
    validade: { type: Date, default: limite, required: true },
    assistente: [ assistenteSchema ],
})

userSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
  };

module.exports = restful.model('User', userSchema)