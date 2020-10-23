// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// //Usuario Schema
// const usuarioSchema =new Schema({
//     codigo:{
//         type:Number,
//         trim:true,
//         required:true
//     },
//     nombre:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     apellido:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     email:{
//         type:String,
//         trim:true,
//         required:true,
//         unique:false,
//         lowercase:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     telefono:{
//         type:String,
//         trim:true
//     },
//     celular:{
//         type:String,
//         trim:true
//     },
//     foto:{
//         type:String,
//         trim:true
//     },
//     fechaNacimiento:{
//         type:String,
//         trim:true
//     },
//     sexo:{
//         type:String,
//         trim:true
//     },
//     pais:{
//         type:String,
//         trim:true
//     },
//     ciudad:{
//         type:String,
//         trim:true
//     },
//     direccion:{
//         type:String,
//         trim:true
//     },
//     estado:{
//         type:String,
//         trim:true
//     },
//     creacionUsuario:{
//         type:Date,
//         trim:true,
//         default:Date.now()
//     }


// })

// module.exports = mongoose.model('usuarios',usuarioSchema)