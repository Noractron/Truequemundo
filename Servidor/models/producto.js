// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// //producto Schema
// const productoSchema =new Schema({
//     codigo:{
//         type:Number,
//         trim:true,
//         required:true
//     },
//     nombreProducto:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     tipo:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     categoria:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     descripcion:{
//         type:String,
//         trim:true,
//         required:true,
//         lowercase:true
//     },
//     condicion:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     fk_usuario:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     estado:{
//         type:String,
//         trim:true
//     },
//     creacionProducto:{
//         type:Date,
//         trim:true,
//         default:Date.now()
//     }

// })

// module.exports = mongoose.model('producto',productoSchema)