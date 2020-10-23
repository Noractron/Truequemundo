var express 							=  require("express");
var router								=  express.Router();
var path 								=  require("path");

function principal(req, res){
	//conecto la base de datos
		res.sendFile(path.join(__dirname, '../Cliente', 'principal.html')); 
}

function logout(req,res){
	req.session.email_user= false;
	req.session.destroy((err) =>{
  			res.send("adios");
	})
}

router.use((error, req, res, next) => {
    res.status(400).json({
        status: 'error',
        message: error.message,
    });
});

module.exports = {
	principal,
	logout
  }
  