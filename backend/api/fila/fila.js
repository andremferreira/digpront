const restful = require('node-restful')
const mongoose = restful.mongoose
const ObjectId = mongoose.Schema.Types.ObjectId

const filaSchema = new mongoose.Schema({
    pacienteId: {type: ObjectId, ref:'CadastroPaciente', requered:true,  index:true },
    nome: { type: String, uppercase: true, require: [true, 'Informe o nome do paciente!'] , uppercase: true },
    sobrenome: { type: String, require: [true, 'Informe o sobrenome do paciente!'], uppercase: true },
    dataFila: { type: Date, default: Date.now },
    posicao: { type: Number, require:[true, 'Informe a posição do paciente na fila de chegada!']},
    atendido: { type: Boolean, default: false },
    medicoId: {type: ObjectId, ref:'User', requered:true,  index:true },
  })

  module.exports = restful.model('Fila', filaSchema)
