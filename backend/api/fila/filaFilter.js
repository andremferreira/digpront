const _ = require('lodash')
const Fila = require('./fila')
const ObjectId = require('mongoose').Types.ObjectId
const NumberInt = require('mongoose').Types.NumberInt

function getFila(req, res, next) {
    // console.log(req.params.periodo, req.params.medico)

    if (req.params.periodo && !req.params.periodo === "undefined") {

        var dt = new Date(req.params.periodo)
        // console.log('perido 1:', dt)
        var d = parseInt(dt.getUTCDate())
        var m = parseInt(dt.getUTCMonth() + 1)
        var y = dt.getFullYear()

    } else if (req.params.periodo === "undefined") {
        var dt2 = new Date()
        // console.log('perido 2:', dt2)
        var d = parseInt(dt2.getUTCDate())
        var m = parseInt(dt2.getUTCMonth() + 1)
        var y = parseInt(dt2.getFullYear())
    }

    // console.log('Dia:',d,' Mes:', m, 'Ano:',y)

    Fila.aggregate(
        { $match: { medicoId: new ObjectId(req.params.medico) } },
        {
            $project: {
                ano: { $year: "$dataFila" },
                mes: { $month: "$dataFila" },
                dia: { $dayOfMonth: "$dataFila" },
                medicoId: "$medicoId",
                pacienteId: "$pacienteId",
                nome: { $concat: ["$nome", " ", "$sobrenome"] },
                atendido: "$atendido",
                perm: {
                    $switch: {
                        branches: [
                            { case: { $eq: [true, "$atendido"] }, then: "Atendido" },
                            { case: { $eq: [false, "$atendido"] }, then: "Aguardando" }
                        ], default: "Aguardando"
                    }
                }
            }
        },
        { $match: { ano: y, mes: m, dia: d } }
        , function (error, resp) {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json(resp)
            }
        })
}

module.exports = { getFila }