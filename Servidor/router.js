// var express 							=  require("express");
// var MongoClient							=  require("mongodb").MongoClient;
// const { url } 							=  require("./conexion/server");
// var router								=  express.Router();
// var path 								=  require("path");
// var multer  							=  require('multer');
// const validations 						=  require('./middleware/validations');
// const {AutoIncremental,upload} 			=  require('./config/controller');
// var md5 								=  require('md5');
// var rutaFoto;


// router.get("/principal", (req, res) =>{
// 	//conecto la base de datos
// 		res.sendFile(path.join(__dirname, '../Cliente', 'principal.html')); 
// });

// router.post('/uploads',upload.single('file'),(req,res)=>{
// 	console.log(`Storange location is ${req.hostname}/${req.file.path}`);
// 	rutaFoto= req.file.path;
// 	return res.send(req.file);
// });

// router.post("/all", (req, res) =>{
// 	//conecto la base de datos
// 	var ciudadPro=req.body.ciudad;
// 	var paisPro=req.body.pais;
// 	var catProducto=req.body.categoria;
// 	var nomProducto=req.body.nombreProducto;
// 	var tipoProducto=req.body.tipo;
// 	var condicionProducto=req.body.condicion;
// 	var usuarioProducto=req.body.fk_usuario;
// 	var estadoProducto=req.body.estado;
// 	var query= [{
// 		'$lookup': {
// 		  'from': 'usuarios', 
// 		  'localField': 'fk_usuario', 
// 		  'foreignField': 'email', 
// 		  'as': 'productoUsuario'
// 		}
// 	  }, {
// 		'$unwind': {
// 		  'path': '$productoUsuario', 
// 		  'includeArrayIndex': 'arrayIndex', 
// 		  'preserveNullAndEmptyArrays': true
// 		}
// 	  }, {
// 		'$lookup': {
// 		  'from': 'fotoProducto', 
// 		  'localField': 'codigo', 
// 		  'foreignField': 'fk_producto', 
// 		  'as': 'productoFoto'
// 		}
// 	  },{
// 		  '$match': {
// 			'productoUsuario.ciudad': new RegExp(ciudadPro), //Ciudad del usuario
// 			'productoUsuario.pais': new RegExp(paisPro), //Pais del Usuario
// 			'tipo':new RegExp(tipoProducto), //Producto o Servicio
// 			'categoria':new RegExp(catProducto), //Informatica,hogar,resposteria,estilista,electrodomestico,etc...	
// 			'nombreProducto': new RegExp(`^${nomProducto}`,'i'), //Nombre del producto busca con las primeras letras que ponga
// 			'condicion':new RegExp(condicionProducto), //la condicion si es un producto es decir estoy tomando como valores del 0 al 10..donde 10 es nuevo y 0 inutil
// 			'fk_usuario':new RegExp(usuarioProducto,'i'), //cada producto esta ligado a un usuario, yo podria buscar todos los productos de un mismo usuario por Correo elec.
// 			'estado':new RegExp(estadoProducto) //si esta disponible o Truequeado 
// 		  }
// 		},
// 		{ 
// 			'$project':{ 
// 			 'codigo' : 1, 
// 			 'nombreProducto' : 1, 
// 			 'tipo' : 1,
// 			 'categoria' : 1, 
// 			 'descripcion' : 1,
// 			 'condicion' : 1,
// 			 'fk_usuario':1,
// 			 'estado':1,
// 			 'email':"$productoUsuario.email",
// 			 'nombres':{"$concat":["$productoUsuario.nombre", " ","$productoUsuario.apellido"]},
// 			 'ciudad' : "$productoUsuario.ciudad", 
// 			 'pais' : "$productoUsuario.pais",
// 			 'foto':"$productoFoto.foto",
// 			 'telefono':"$productoUsuario.telefono",
// 			 'celular':"$productoUsuario.celular",
// 			 'direccion':"$productoUsuario.direccion",
// 			} 
// 		   },
// 		   {
// 		   '$sort':{"nombreProducto":1},
// 		   }
// 	  ]
// 	MongoClient.connect(url, (err, db) =>{ 
// 		var base = db.db("truequeMundo");
// 		var coleccion = base.collection("producto");
// 		coleccion.aggregate(query).toArray((error, eventos) =>{
// 			if (error) throw erro;				
// 			res.send(eventos);
// 		});
// 		db.close();	
// 	});
// });

// //Consulta para obtener los productos de un usuario especifico  /events/all_producto
// router.post("/buscar_productoUsuario", (req, res) =>{
// 	//conecto la base de datos
// 	if (req.session.email_user){
// 		var catProducto=req.body.categoria;
// 		var nomProducto=req.body.nombreProducto;
// 		var tipoProducto=req.body.tipo;
// 		var estadoProducto=req.body.estado;
// 		MongoClient.connect(url, (err, db) =>{ 
			
// 			var coleccion = base.collection("producto");
// 			coleccion.find({
// 				fk_usuario: req.session.email_user,
// 				tipo:new RegExp(tipoProducto),
// 				categoria:new RegExp(catProducto),
// 				nombreProducto: new RegExp(`^${nomProducto}`,'i'),
// 				estado:new RegExp(estadoProducto)
// 			}).toArray(
// 				(error, eventos) =>{
// 				if (error) throw erro;				
// 				res.send(eventos);
// 			});
// 		  db.close();	
// 		});
// 	}else{
// 		res.send("noLOGIN");
// 	}
// });

// router.get("/buscar_usuario", (req, res) =>{
// 	//conecto la base de datos
// 	if (req.session.email_user){
// 		MongoClient.connect(url, (err, db) =>{ 
// 			var base = db.db("truequeMundo");
// 			var coleccion = base.collection("usuarios");
// 			coleccion.find({email: req.session.email_user}).toArray((error, eventos) =>{
// 				if (error) throw erro;				
// 				res.send(eventos);
// 			});
// 		  db.close();	
// 		});
// 	}else{
// 		res.send("noLOGIN");
// 	}
// });

// router.post("/buscar_foto", (req, res) =>{
// 	//conecto la base de datos
// 	var codProducto=req.body.fk_producto;
// 	if (req.session.email_user){
// 		MongoClient.connect(url, (err, db) =>{ 
// 			var base = db.db("truequeMundo");
// 			var coleccion = base.collection("fotoProducto");
// 			coleccion.find({fk_producto: codProducto}).toArray((error, eventos) =>{
// 				if (error) throw erro;				
// 				res.send(eventos);
// 			});
// 		  db.close();	
// 		});
// 	}else{
// 		res.send("noLOGIN");
// 	}
// });



// router.post("/new_usuario",validations.validate(validations.createUsersValidation), (req, res)=>{
// 	MongoClient.connect(url,async(err, db)=>{
// 		if (err) throw err;
// 		var base = db.db("truequeMundo");
// 		var coleccion = base.collection("usuarios");
// 		coleccion.insertOne({
// 			codigo:await AutoIncremental("usuarios"),
// 			nombre:req.body.nombre,
// 			apellido: req.body.apellido,
// 			email: req.body.email,
// 			password: md5(req.body.password), 
// 			telefono: req.body.telefono,
// 			celular: req.body.celular,
// 			foto: req.body.foto,
// 			fechaNacimiento: req.body.fechaNacimiento,
// 			sexo: req.body.sexo,
// 			pais: req.body.pais,
// 			ciudad: req.body.ciudad,
// 			direccion: req.body.direccion,
// 			estado:"activo",
// 			creacionUsuario:Date.now()
// 		},(error,respuesta)=>{
// 			if(error){
// 				console.log('Error',error);
// 			}else{
// 				console.log('Registro Insertado')
// 			}
// 		});
// 		db.close();
// 	});	
// });
// 	// });
// // });

// router.post("/update_usuario", (req, res)=>{
// 	MongoClient.connect(url,(err, db)=>{
// 		if (err) throw err;
// 		var base = db.db("truequeMundo");
// 		var coleccion = base.collection("usuarios");
// 		var condicional = {codigo: parseInt(req.body.codigo) };
// 		var newValues = {$set:{
// 			nombre:req.body.nombre,
// 			apellido: req.body.apellido,
// 			telefono: req.body.telefono,
// 			celular: req.body.celular,
// 			foto: req.body.foto,
// 			fechaNacimiento: req.body.fechaNacimiento,
// 			pais: req.body.pais,
// 			ciudad: req.body.ciudad,
// 			direccion: req.body.direccion,
// 			estado:req.body.estado    
// 			}
// 		}
// 		try {
// 			coleccion.updateOne(condicional, newValues, function(err, res) {
// 				if (err) throw err;
// 				console.log("Documento actualizado");
// 				});
// 		} catch(e){
// 			console.log(e);
// 		}
// 		db.close();
// 	});
// });

// router.post("/update_desactivar_usuario", (req, res)=>{
// 	MongoClient.connect(url,(err, db)=>{
// 		if (err) throw err;
// 		var base = db.db("truequeMundo");
// 		var coleccion = base.collection("usuarios");
// 		var condicional = {codigo: parseInt(req.body.codigo) };
// 		var newValues = {$set:{
// 			estado:"inactivo"    
// 			}
// 		}
// 		try {
// 			coleccion.updateOne(condicional, newValues, function(err, res) {
// 				if (err) throw err;
// 				console.log("Documento actualizado");
// 				});
// 		} catch(e){
// 			console.log(e);
// 		}
// 		db.close();
// 	});
// });

// router.post("/new_producto",validations.validate(validations.createProductValidation), (req, res)=>{
// 	if (req.session.email_user){
// 		MongoClient.connect(url,async(err, db)=>{
// 			if (err) throw err;
// 			var base = db.db("truequeMundo");
// 			var coleccion = base.collection("producto");
// 			coleccion.save({
// 				codigo:await AutoIncremental("producto"), 
// 				nombreProducto:req.body.nombre,
// 				tipo: req.body.tipo,
// 				categoria: req.body.categoria,
// 				descripcion: req.body.descripcion,
// 				condicion: req.body.condicion,
// 				fk_usuario: req.session.fk_usuario,
// 				estado: req.body.estado
// 			});
// 			res.send("El evento a sido creado con exito!");
// 			db.close();
// 		});
// 	}else{
// 		res.send("noLOGIN");		
// 	}
// });
	
	
// router.post("/update_producto", (req, res)=>{
// 	MongoClient.connect(url,(err, db)=>{
// 		if (err) throw err;
// 		var base = db.db("truequeMundo");
// 		var coleccion = base.collection("producto");
// 		var condicional = {codigo: parseInt(req.body.codigo) };
// 		var newValues = {$set:{
// 			nombreProducto:req.body.nombre,
// 			tipo: req.body.tipo,
// 			categoria: req.body.categoria,
// 			descripcion: req.body.descripcion,
// 			condicion: req.body.condicion,
// 			estado: req.body.estado    
// 			}
// 		}
// 		try {
// 			coleccion.updateOne(condicional,newValues, function(err, res) {
// 				if (err) throw err;
// 				console.log("Documento actualizado");
// 				});
// 		} catch(e){
// 			console.log(e);
// 		}


// 		db.close();
// 	});
// });

// router.post("/delete_producto", (req, res)=>{

// 	MongoClient.connect(url, (err, db)=>{
// 		if (err) throw err;
// 		var base = db.db("truequeMundo");
// 		var coleccion = base.collection("producto");
		
// 		try{
// 		coleccion.remove({
// 			codigo: parseInt(req.body.codigo), 
// 			fk_usuario: req.session.email_user
// 		});
// 		res.send("Evento borrado con exito!");
// 		}catch (err){
// 			res.send(err);		
// 		}	
// 		db.close();
// 	});
// });
	
// router.post("/new_fotoProducto", (req, res)=>{
// 	if (req.session.email_user){
// 		MongoClient.connect(url,async(err, db)=>{
// 			if (err) throw err;
// 			var base = db.db("truequeMundo");
// 			var coleccion = base.collection("fotoProducto");
// 			coleccion.save({
// 				codigo:await AutoIncremental("producto"),
// 				foto:rutaFoto,
// 				fk_producto:req.body.fk_producto
// 			});
// 			res.send("El evento a sido creado con exito!");
// 			db.close();
// 			});
// 	}else{
// 		res.send("noLOGIN");
// 	}
// });
	
// router.post("/delete_fotoProducto", (req, res)=>{

// 	MongoClient.connect(url, (err, db)=>{
// 		if (err) throw err;
// 		var base = db.db("truequeMundo");
// 		var coleccion = base.collection("fotoProducto");
		
// 		try{
// 		coleccion.remove({
// 			codigo: parseInt(req.body.codigo)
// 		});
// 		res.send("Evento borrado con exito!");
// 		}catch (err){
// 			res.send(err);		
// 		}	
// 		db.close();
// 	});
// });

// router.use((error, req, res, next) => {
//     res.status(400).json({
//         status: 'error',
//         message: error.message,
//     });
// });

router.get("/logout", (req,res)=>{
	req.session.email_user= false;
	req.session.destroy((err) =>{
  			res.send("adios");
	})
});


module.exports = router;