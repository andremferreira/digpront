const express = require('express')
module.exports = function (server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // Rotas API
    const cadastroPacienteService = require('../api/cadastroPaciente/cadastroPacienteService')
    cadastroPacienteService.register(router, '/cadastroPacientes')

}