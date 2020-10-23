var express = require("express");
var MongoClient = require("mongodb").MongoClient;
const { url } = require("../conexion/server");
var router = express.Router();
const { AutoIncremental } = require('../config/libs');
var md5 = require('md5');
const generator = require('generate-password');
// const client = require('twilio')();

function saveUser(req, res) {
	MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
		if (err) throw err;
		var base = db.db("truequeMundo");
		var coleccion = base.collection("usuarios");
		try {
			coleccion.insertOne({
				codigo: await AutoIncremental("usuarios"),
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				email: req.body.email.toLowerCase(),
				password: md5(req.body.password),
				telefono: req.body.telefono,
				celular: req.body.celular,
				foto: req.body.foto,
				fechaNacimiento: req.body.fechaNacimiento,
				sexo: req.body.sexo,
				pais: req.body.pais,
				ciudad: req.body.ciudad,
				direccion: req.body.direccion,
				estado: "activo",
				creacionUsuario: Date.now()
			}, (error, respuesta) => {
				if (error) throw error;
				res.send("ok");
			}
			);
		} catch (error) {
			console.log(error)
		}
		db.close();
	});
}


function updateUser(req, res) {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;
		var base = db.db("truequeMundo");
		var coleccion = base.collection("usuarios");
		var condicional = { codigo: parseInt(req.body.codigo) };
		var newValues = {
			$set: {
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				telefono: req.body.telefono,
				celular: req.body.celular,
				foto: req.body.foto,
				fechaNacimiento: req.body.fechaNacimiento,
				pais: req.body.pais,
				ciudad: req.body.ciudad,
				direccion: req.body.direccion
			}
		}
		try {
			coleccion.updateOne(condicional, newValues, (err, respuesta) => {
				if (err) throw err;
				res.send("ok");
			});
		} catch (e) {
			console.log(e);
		}
		db.close();
	});
}

function desactivateUser(req, res) {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;
		var base = db.db("truequeMundo");
		var coleccion = base.collection("usuarios");
		var condicional = { codigo: parseInt(req.body.codigo) };
		var newValues = { $set: { estado: "inactivo" } }
		try {
			coleccion.updateOne(condicional, newValues, (err, resuesta) => {
				if (err) throw err;
				res.send("ok");
			});
		} catch (e) {
			console.log(e);
		}
		db.close();
	});
}

function recuperarContrasena(req, res) {
	MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
		if (err) throw err;
		var base = db.db("truequeMundo");
		var coleccion = base.collection("usuarios");
		var condicional = { email: req.body.email };
		let busqueda = await coleccion.findOne(condicional)
		if (busqueda) {
			let newPassword = generator.generate({
				length: 8,
				numbers: true,
				uppercase: true,
				lowercase: true,
				symbols:true
			});
			let password = newPassword;
			var condicional = { codigo: parseInt(busqueda.codigo) };
			var newValues = { $set: { password: md5(newPassword) } };
			await coleccion.updateOne(condicional, newValues);
			res.send(JSON.stringify({ newPassword: password, celular: busqueda.celular }));
			// client.messages.create({
			// 	from:`whatsapp:+51957368262`,
			// 	to:`whatsapp:+51940202780`,
			// 	body:'Hola'
			// }).then(message => console.log(message.sid));
		} else {
			res.status(400).send("Sin Resultados");
		}
		db.close();
	});
}

function cambiarPassword(req, res) {
	MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
		if (err) throw err;
		var base = db.db("truequeMundo");
		var coleccion = base.collection("usuarios");
		var condicional = { codigo: parseInt(req.body.codigo), password: md5(req.body.password) };
		let busqueda = await coleccion.findOne(condicional)
		if (busqueda) {
			let passwordNuevo = req.body.newPassword;
			var newValues = { $set: { password: md5(req.body.newPassword) } };
			await coleccion.updateOne(condicional, newValues);
			res.send(JSON.stringify({newPassword:passwordNuevo}));
		} else {
			res.status(400).send("Sin Resultados");
		}

		db.close();
	});
}

function buscarUsuarios(req, res) {
	//conecto la base de datos
	if (req.body.email) {

		MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
			var base = db.db("truequeMundo");
			var coleccion = base.collection("usuarios");
			coleccion.findOne({ email: req.body.email.toLowerCase() }, (error, eventos) => {
				if (error) throw error;
				// res.send({email: req.session.email_user})			
				res.send(JSON.stringify(eventos));

			});
			db.close();
		});
	} else {
		res.send("noLOGIN");
	}
}


function variablesSesion(req, res) {
	var variables = [req.session.email_user];
	res.send(variables);
}


router.use((error, req, res, next) => {
	res.status(400).json({
		status: 'error',
		message: error.message,
	});
});

module.exports = {
	saveUser,
	updateUser,
	desactivateUser,
	buscarUsuarios,
	variablesSesion,
	recuperarContrasena,
	cambiarPassword
}
