const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')

    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

	protectedApi.use(auth)

    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(protectedApi, '/billingCycles')

    const userService = require('../api/user/userService')
    userService.register(protectedApi, '/users')

    const userFilter = require('../api/user/userFilter')
    protectedApi.route('/user/:id').get(userFilter.getUserById)

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')

    protectedApi.route('/billingSummary/:medico').get(billingSummaryService.getSummary)

    const billingFilter = require('../api/billingCycle/billingCycleFilter')

    protectedApi.route('/billingFilter/count/:medico').get(billingFilter.getCountByMedic)
    protectedApi.route('/billingFilter/medico/:medico').get(billingFilter.getListByMedic)

    // Cadastro de Pacientes e Consultas
    const cadastroPacienteService = require('../api/cadastroPaciente/cadastroPacienteService')
    cadastroPacienteService.register(protectedApi, '/pacientes')

    // Fila de atendimento
    const filaService = require('../api/fila/filaService')
    filaService.register(protectedApi, '/fila')




}
