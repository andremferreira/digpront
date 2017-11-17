const _ = require('lodash')
const CadastroPaciente = require('./cadastroPaciente')
const ObjectId = require('mongoose').Types.ObjectId

function getPacienteByMedicoId(req, res, next) {
  if ((!req.params.nome && !req.params.sobrenome) || 
  (req.params.nome === "undefined" && req.params.sobrenome === "undefined") ) {
    console.log('passei if 1')
    CadastroPaciente.aggregate(
      { $match: { medicoId: new ObjectId(req.params.medico) } },
      {
        $project: {
          _id: "$_id",
          nome: "$nome",
          sobrenome: "$sobrenome",
          dt_nascimento: "$dt_nascimento",
          idade: { $divide: [{ $subtract: [new Date(), "$dt_nascimento"] }, 31558464000] },
          endereco: "$endereco",
          bairro: "$bairro",
          cidade: "$cidade",
          estado: "$estado",
          profissao: "$profissao",
          email: "$email",
          telefone: "$telefone",
          indicacao: "$indicacao",
          medicoId: "$medicoId",
          consultas: "$consultas"
        }
      },
      {
        $project: {
          _id: "$_id",
          nome: "$nome",
          sobrenome: "$sobrenome",
          dt_nascimento: "$dt_nascimento",
          idade: { $subtract: ["$idade", { $mod: ["$idade", 1] }] },
          endereco: "$endereco",
          bairro: "$bairro",
          cidade: "$cidade",
          estado: "$estado",
          profissao: "$profissao",
          email: "$email",
          telefone: "$telefone",
          indicacao: "$indicacao",
          medicoId: "$medicoId",
          consultas: "$consultas"
        }
      }, function (error, resp) {
        if (error) {
          res.status(500).json({ errors: [error] })
        } else {
          res.json(resp)
        }
      })
  } else {
    var nome = req.params.nome
    var sobrenome = req.params.sobrenome

    if( req.params.sobrenome === "undefined"){
      var sobrenome = ""
    }else if( req.params.nome === "undefined"){
      var nome = ""
    }
    console.log(`nome: ${nome} sobrenome: ${sobrenome}`)
    CadastroPaciente.aggregate( 
      { $match: {   medicoId: new ObjectId(req.params.medico) , 
                    nome: new RegExp('^' + nome, "i") ,
                    sobrenome: new RegExp('^' + sobrenome, "i")
                } 
      },
      { $project: {
        _id: "$_id", 
        nome: "$nome",
        sobrenome: "$sobrenome",
        dt_nascimento: "$dt_nascimento",
        idade: {  $divide: [ {$subtract: [ new Date(), "$dt_nascimento"] }, 31558464000 ] },
        endereco: "$endereco",
        bairro: "$bairro",
        cidade: "$cidade",
        estado: "$estado",
        profissao: "$profissao",
        email: "$email",
        telefone: "$telefone",
        indicacao: "$indicacao",
        medicoId: "$medicoId",
        consultas: "$consultas"
      }
     },
     { $project: {
        _id: "$_id", 
        nome: "$nome",
        sobrenome: "$sobrenome",
        dt_nascimento: "$dt_nascimento",
        idade: { $subtract : [ "$idade" , { $mod: ["$idade", 1] } ] },
        endereco: "$endereco",
        bairro: "$bairro",
        cidade: "$cidade",
        estado: "$estado",
        profissao: "$profissao",
        email: "$email",
        telefone: "$telefone",
        indicacao: "$indicacao",
        medicoId: "$medicoId",
        consultas: "$consultas"
      }
     }, function(error, resp) {
        if(error) {
          res.status(500).json({errors: [error]})
        } else {
          res.json(resp)
        }
      })
  }
}

module.exports = { getPacienteByMedicoId }