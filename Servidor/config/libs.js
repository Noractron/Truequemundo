const MongoClient		    =  require("mongodb").MongoClient;
const express 				=  require("express");
const { url,PORT } 		    =  require("../conexion/server");
const path 					=  require("path");
const multer  				=  require('multer');
const multerS3              =  require('multer-s3');
const s3                    =  require('./config-s3');


async function AutoIncremental(coleccion) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("truequeMundo");
        let collection = db.collection(coleccion);
        let query = { codigo: "tid" }
        let sort=[];
        let operador={$inc: {sequence_value: 1} };
        let options= {new:true};
        let res = await collection.findAndModify(query,sort, operador,options);
        return await res.value.sequence_value;
    } catch (err) {
        console.log(err);
    } 
    finally {
        client.close();
    }
}

function ultimoLogin(correo) {
    MongoClient.connect(url, { useNewUrlParser: true },(err, db)=>{
        if (err) throw err;
        let base = db.db("truequeMundo");
		let coleccion = base.collection("usuarios");
		let condicional = {email: correo};
		let newValues = {$set:{
			ultimoLogin:Date.now()  
            }
        }
        try {
            coleccion.updateOne(condicional, newValues, (err, res)=> {
                if (err) throw err;
            });
        } catch(e){
            console.log(e);
        }
        db.close();
    });
}


// const storage =multer.diskStorage({
// 	destination:(req,file,cb) =>{
// 		cb(null,`${PORT}/Cliente/public/uploads`)
// 	},
// 	filename:(req,file,cb)=>{
// 		cb(null,file.fieldname + '-' + req.session.email_user + Date.now() + path.extname(file.originalname));
//     }
// });	
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../Cliente/public/uploads'),
    
    filename:  (req, file, cb) => {
        cb(null,file.fieldname + '-' + req.session.email_user + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 1000000}
})

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'bucket-name',
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null,file.fieldname + '-' + req.session.email_user + Date.now() + path.extname(file.originalname));
//         }
//     }),
//     limits:{fileSize:1000000},  
//     fileFilter:(req,file,cb)=>{
//         var filetypes=/jpeg|jpg|png|gif/;
//         const mimetype=filetypes.test(file.mimetype);
//         var extname = filetypes.test(path.extname(file.originalname));
//         if(extname && mimetype){
//             return cb(null,true)
//         }
//         cb("Error:Archibo debe ser una imagen Valida");

//     }
// });


module.exports ={AutoIncremental,ultimoLogin,upload};