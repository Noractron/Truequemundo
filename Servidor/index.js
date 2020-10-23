const {ultimoLogin} =  require('./config/libs');
const{ url,PORT } 	=  require("./conexion/server");
const BodyParser 		=  require("body-parser"),
		cors			= require("cors"),
		express    		=  require("express"),
		MongoClient		=  require("mongodb").MongoClient,
		session    		=  require("express-session"),
		http       		=  require("http"),
		events     		=  require("./routes/router"),
		path 	   		=  require("path");
		app 			=  express(),
		md5 			=  require('md5');


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../Cliente')));

app.use(session({
	secret: "truequemund@12345Sesi@n",
	resave: false,
	saveUninitialized: false
}));

app.use(cors());

//creo el servidor 
http.createServer(app);

app.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname, '../Cliente', 'index.html'));
	});

//eschucho el inicio de sesion 
app.post("/login", (req, res)=>{
	//almacenos los datos en variables
	let user = req.body.user.toLowerCase();
	let pass = req.body.pass;
	//* conecto a la base de datos 
	MongoClient.connect(url, { useNewUrlParser: true }, function (err, db){
		if (err)throw err; // gestiono el erro
		var base = db.db("truequeMundo");
		var coleccion = base.collection("usuarios");
		coleccion.findOne({email: user, password: md5(pass),estado:"activo"}, (error, user)=>{
			if (error) throw error;
			if (user){
				req.session.email_user = user.email;
				req.session.nombre = user.nombre;
				let datosFront ={
					'message':'Validado',
					'email':req.session.email_user,
					'nombre':req.session.nombre
				}
				res.send(JSON.stringify(datosFront));
				ultimoLogin(req.session.email_user);
			}else{
				res.send(JSON.stringify({'message': 'error'}));
			}
		});
		  db.close();
	});
}); 
app.use("/events", events);
app.listen(PORT, ()=>{
	console.log("El servidor de truequeMundo está corriendo por el servidor : " + PORT);
});









