const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')
const User = require('./user')
//Filro por usuário cadastrado
let usuario = toString(user._id)

// Mais uma função middleware
function getSummary(req, res) {
  BillingCycle.aggregate(db.billingcycles.aggregate( 
    { $project: { medico: "$medico_id",    credito: {$sum: "$credits.value"} ,  debito: { $sum: "$debts.value"}  }  },
    { $project: { _id: 0, medico:1, credito:1, debito:1 }},
    { $match: { medico: { $eq: usuario } } },
    { $group: { _id: null,  credit: {$sum: "$credito"}, debt: {$sum: "$debito"}}},
    { $project: { _id: 0, credit: 1, debt: 1}}
    ), function(error, result) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json(_.defaults(result[0], {credit: 0, debt: 0}))
    }
  })
}

module.exports = { getSummary }
