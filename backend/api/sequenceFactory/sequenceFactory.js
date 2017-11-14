const _ = require('lodash')
const restful = require('node-restful')
const mongoose = restful.mongoose

const sequenceFactorySchema = new mongoose.Schema({
  _id: { type: String, required: true, index: true, unique: true },
  seq: { type: Number, required: true, default: 0 }
})

sequenceFactorySchema.statics.findAndModify = function (query, sort, doc, options, callback, res, req) {
    return this.collection.findAndModify(query, sort, doc, options, callback, res, req)
}
// sequenceFactorySchema.statics.findOne = function (query, sort, doc, options, callback, res, req) {
//       return this.collection.findOne(query, sort, doc, options, callback, res, req)
// }



// module.exports = restful.model('SequenceFactory', sequenceFactorySchema)

// const sequencias = new mongoose.Schema(sequenceFactorySchema)
// var data = { _id: "medicoid" , seq : { $inc: { seq: 1 } } }
// var Model = mongoose.model('sequence', sequencias)
// var seq = new Model(data)

// // console.log(seq)

// var sequencia = seq.save(function (err, data){
//   if(err) return console.log('Erro: ', err)
//   console.log('Retornou dados:', data)
// })