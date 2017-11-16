const _ = require('lodash')
const CadastroPaciente = require('./cadastroPaciente')
const ObjectId = require('mongoose').Types.ObjectId
 
  function getPacienteByMedicoId(req, res, next) {
    CadastroPaciente.find( 
        { medicoId : new ObjectId(req.params.medico) }, function(error, resp) {
        if(error) {
          res.status(500).json({errors: [error]})
        } else {
          res.json(resp)
        }
      })
  }

  module.exports =  { getPacienteByMedicoId }