var express 							=  require("express");
var router								=  express.Router();
var MongoClient							=  require("mongodb").MongoClient;
const { url } 							=  require("../conexion/server");
const {AutoIncremental}		    		=  require('../config/libs');
const fs 								= require('fs').promises

function saveProducto(req, res){
	if (req.body.email){
		MongoClient.connect(url, { useNewUrlParser: true },async(err, db)=>{
			if (err) throw err;
			var base = db.db("truequeMundo");
			var coleccion = base.collection("producto");
			var codigoProducto = await AutoIncremental("producto");
			var query=[];
			var cantidadFotos = Object.keys(req.files).length;
			for (var contador = 0; contador < cantidadFotos; contador++) {
				if (contador == cantidadFotos-1){
					query.push(`${req.files[contador].filename}`)

				}else{
					query.push(`${req.files[contador].filename}`)
				}
			};
			try {
				coleccion.save({
					codigo:codigoProducto, 
					nombreProducto:req.body.nombre,
					tipo: req.body.tipo,
					categoria: req.body.categoria,
					descripcion: req.body.descripcion,
					condicion: req.body.condicion,
					fk_usuario: req.body.email.toLowerCase(),
					fotos:query,
					estado: "disponible",
					visitas:0,
					creacionProducto:Date.now(),
					modificacionProducto:Date.now()
				});
			} catch (error) {
				console.log(error)
			}
			res.send("ok");
			db.close();
		});
	}else{
		res.send("noLOGIN");		
	}
}	

function updateProducto(req, res){
	if (req.body.email){
		MongoClient.connect(url, { useNewUrlParser: true },async(err, db)=>{
			if (err) throw err;
			var base = db.db("truequeMundo");
			var coleccion = base.collection("producto");
			var condicional = {codigo: parseInt(req.body.codigo) };
			var newValues = {$set:{
				nombreProducto:req.body.nombre,
				tipo: req.body.tipo,
				categoria: req.body.categoria,
				descripcion: req.body.descripcion,
				condicion: req.body.condicion,
				estado: req.body.estado,
				modificacionProducto:Date.now()   
				}
			}
			try {
				let resultado = await coleccion.findOneAndUpdate(condicional,newValues)
					var queryNewFotos=[];
					var queryRutaMongo=[];
					var cantidadFotosMongo = resultado.value.fotos.length;
					for (var contador = 0; contador < cantidadFotosMongo; contador++) {
						queryRutaMongo.push(`Cliente\\public\\uploads\\${resultado.value.fotos[contador]}`)
					};
	
					var cantidadNewFotos = Object.keys(req.files).length;
					for (var contador = 0; contador < cantidadNewFotos; contador++) {
						queryNewFotos.push(`${req.files[contador].filename}`)
					}; 
	
					Promise.all(queryRutaMongo.map(file =>fs.unlink(file)))
					.then(()=>{
						console.log('All Files removed')
					})
					.catch(err=>{
						console.error('Something wrong happened removing files', err)
					})
					coleccion.updateOne({codigo: parseInt(req.body.codigo)},{$set:{fotos:queryNewFotos}}, (err, resp) =>{
						if (err) throw err;
						resp.send("ok")
					});
			} catch(e){
				console.log(e);
			}
	
			res.send("ok")
			db.close();
		});
	}else{
		res.send("noLOGIN");		
	}
}

function updateEstado(req, res){
	if (req.body.email){
		MongoClient.connect(url, { useNewUrlParser: true },async(err, db)=>{
			if (err) throw err;
			var base = db.db("truequeMundo");
			var coleccion = base.collection("producto");
			var condicional = {codigo: parseInt(req.body.codigo) };
			var newValues = {$set:{
				estado: "truequeado",
				modificacionProducto:Date.now()   
				}
			}
			try {
				coleccion.updateOne(condicional,newValues,(error,evento)=>{
					res.send("ok");
				})
			} catch(e){
				console.log(e);
			}
			db.close();
		});
	}else{
		res.send("noLOGIN");		
	}
}

function contadorVistas(req,res){
	let codigo = parseInt(req.body.codigo);
	MongoClient.connect(url, { useNewUrlParser: true },(err, db)=>{
		if (err) throw err;
		var base = db.db("truequeMundo");
		var coleccion = base.collection("producto");
		try {
			let query = { codigo: codigo }
			var sort=[];
			var operador={$inc: {visitas: 1} };
			var options= {new:true};
			coleccion.findAndModify(query,sort, operador,options,(error,eventos)=>{
				res.send("ok");
			});
		} catch (error) {
			res.send(error);
		}
	});
}

function deleteProducto(req, res){
	if (req.body.email){
		MongoClient.connect(url, { useNewUrlParser: true },async(err, db)=>{
			if (err) throw err;
			var base = db.db("truequeMundo");
			var coleccion = base.collection("producto");
			let codigo = parseInt(req.body.codigo)
			try{
				let busqueda = await coleccion.findOne({codigo:codigo,fk_usuario:req.body.email});	
				var queryRutaMongo=[];
				var cantidadFotosMongo = busqueda.fotos.length;
				for (var contador = 0; contador < cantidadFotosMongo; contador++) {
					queryRutaMongo.push(`Cliente\\public\\uploads\\${busqueda.fotos[contador]}`)
				};
				Promise.all(queryRutaMongo.map(file =>fs.unlink(file)))
				.then(()=>{
					console.log('All Files removed')
				})
				.catch(err=>{
					console.error('Something wrong happened removing files', err)
				})
	
				coleccion.deleteOne({
					codigo: codigo,
					fk_usuario:req.body.email.toLowerCase()
				},(err,res)=>{if (err)throw err});
				res.send("ok");
			}catch (err){
				res.send(err);		
			}	
			db.close();
		});
	}else{
		res.send("noLOGIN");		
	}
	
}

//Consulta para obtener los productos de un usuario especifico  /events/all_producto
function buscarProductoUsuario(req, res){
	//conecto la base de datos
	if (req.body.email){
		var catProducto=req.body.categoria;
		var nomProducto=req.body.nombreProducto;
		var tipoProducto=req.body.tipo;
		var estadoProducto=req.body.estado;
		MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{ 
			var base = db.db("truequeMundo");
			var coleccion = base.collection("producto");
			var query = {
				fk_usuario: req.body.email.toLowerCase(),
				tipo:new RegExp(tipoProducto),
				categoria:new RegExp(catProducto),
				nombreProducto: new RegExp(`^${nomProducto}`,'i'),
				estado:new RegExp(estadoProducto)
			};
			coleccion.find(query).toArray((error, eventos)=> {
				if (err) throw error;
				res.send(JSON.stringify(eventos));
			});
		  db.close();	
		});
	}else{
		res.send("noLOGIN");
	}
}

function buscarProductoCodigo(req, res){
	//conecto la base de datos
	if (req.body.email){
		var codigo=parseInt(req.body.codigo);
		MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{ 
			var base = db.db("truequeMundo");
			var coleccion = base.collection("producto");
			var query = {
				fk_usuario: req.body.email.toLowerCase(),
				codigo : codigo
			};
			coleccion.find(query).toArray((error, eventos)=> {
				if (err) throw error;
				res.send(JSON.stringify(eventos));
			});
		  db.close();	
		});
	}else{
		res.send("noLOGIN");
	}
}

function allProductos(req, res){
	//conecto la base de datos
	var ciudadPro=req.body.ciudad;
	var paisPro=req.body.pais;
	var catProducto=req.body.categoria;
	var nomProducto=req.body.nombreProducto;
	var tipoProducto=req.body.tipo;
	var condicionProducto=req.body.condicion;
	var usuarioProducto=req.body.fk_usuario;
	var estadoProducto=req.body.estado;
	var query= [{
		'$lookup': {
		  'from': 'usuarios', 
		  'localField': 'fk_usuario', 
		  'foreignField': 'email', 
		  'as': 'productoUsuario'
		}
	  }, {
		'$unwind': {
		  'path': '$productoUsuario', 
		  'includeArrayIndex': 'arrayIndex', 
		  'preserveNullAndEmptyArrays': true
		}
	  },{
		  '$match': {
			'productoUsuario.ciudad': new RegExp(ciudadPro,'i'), //Ciudad del usuario
			'productoUsuario.pais': new RegExp(paisPro,'i'), //Pais del Usuario
			'tipo':new RegExp(tipoProducto), //Producto o Servicio
			'categoria':new RegExp(catProducto), //Informatica,hogar,resposteria,estilista,electrodomestico,etc...	
			'nombreProducto': new RegExp(`^${nomProducto}`,'i'), //Nombre del producto busca con las primeras letras que ponga
			'condicion':new RegExp(condicionProducto), //la condicion si es un producto es decir estoy tomando como valores del 0 al 10..donde 10 es nuevo y 0 inutil
			'fk_usuario':new RegExp(usuarioProducto,'i'), //cada producto esta ligado a un usuario, yo podria buscar todos los productos de un mismo usuario por Correo elec.
			'estado':new RegExp(estadoProducto) //si esta disponible o Truequeado 
		  }
		},
		{ 
			'$project':{ 
			 'codigo' : 1, 
			 'nombreProducto' : 1, 
			 'tipo' : 1,
			 'categoria' : 1, 
			 'descripcion' : 1,
			 'condicion' : 1,
			 'fk_usuario':1,
			 'estado':1,
			 'email':"$productoUsuario.email",
			 'nombres':{"$concat":["$productoUsuario.nombre", " ","$productoUsuario.apellido"]},
			 'ciudad' : "$productoUsuario.ciudad", 
			 'pais' : "$productoUsuario.pais",
			 'fotos':1,
			 'telefono':"$productoUsuario.telefono",
			 'celular':"$productoUsuario.celular",
			 'direccion':"$productoUsuario.direccion",
			 'visitas':1
			} 
		   },
		   {
		   '$sort':{"nombreProducto":1},
		   }
	  ]
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{ 
		var base = db.db("truequemundo");
		var coleccion = base.collection("producto");
		coleccion.aggregate(query).toArray((error, eventos) =>{
			if (error) throw error;				
			res.send(JSON.stringify(eventos));
		});
		db.close();	
	});
}

router.use((error, req, res, next) => {
    res.status(400).json({
        status: 'error',
		message: error.message,
	});
});


module.exports = {
    saveProducto,
    updateProducto,
	deleteProducto,
	buscarProductoUsuario,
	allProductos,
	buscarProductoCodigo,
	contadorVistas,
	updateEstado
  }