var express 							=  require("express");
var router								=  express.Router();

// router.post('/uploads',upload.single('file'),(req,res)=>{
// 	console.log(`Storange location is ${req.hostname}/${req.file.path}`);
// 	rutaFoto= req.file.path;
// 	return res.send(req.file);
// });

function uploadFoto(req,res){
    console.log(`${req.hostname}/${req.file.path}`);
	rutaFoto= req.file.path;
	return res.send(req.file);
}

router.use((error, req, res, next) => {
    res.status(400).json({
        status: 'error',
        message: error.message,
    });
});

module.exports = {
    uploadFoto
  }