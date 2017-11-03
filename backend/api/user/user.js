const restful = require('node-restful')
const mongoose = restful.mongoose

let today = new Date()
let limite = today.add(10).day()

/*
    CAMPOS OBRIGATÓRIOS PARA CADASTRO INICIAL:
    nome, sobrenome, email, crm, celular, endereco, bairro, cidade, estado, cep, password
*/

const userSchema = new mongoose.Schema({
    
    nome: { type: String, required: true, uppercase: true },
    sobrenome: { type: String, required: false, uppercase: true , trim: true},
    email: { type: String, required: true , lowercase: true },
    crm: { type: String, required: false, min: 3, max: 6 },
    telefone: { type: String, required: false, min: 10, max: 15 },
    celular: { type: String, required: false, min: 10, max: 15 },
    genero: { type: Boolean, required: false },
    // TODO: Modificar o tipo para required true o endereço, telefone, sobrenome, cidade, estado, cpf, após testar o backend
    endereco: { type: String, required: false }, 
    /*
        Tipos de usuários:
                            1 - Admin
                            2 - Usuário comum
                            3 - Assistente
    */
    tipo: { type: Number, required: true, default: 2 },
    cep: { type: String, required: false },
    bairro: { type: String, required: false },
    cidade: { type: String, required: false }, 
    estado: { type: String, required: false },
    password: { type: String, min: 6, max: 12, required: true },
    // Assistem atrelado ao médico
    id_medico: { type: String, required: false },
    validade: { type: Date, default: limite, required: true },
})

module.exports = restful.model('User', userSchema)