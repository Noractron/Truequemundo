const express = require('express')
const arranqueCtrl = require('../controller/arranque')
const userCtrl = require('../controller/usuario')
const productoCtrl = require('../controller/producto')
// const uploadFotoCtrl = require('../controller/uploadFoto')
const validations 	=  require('../middleware/validations');
const router = express.Router()
const {upload} 	=  require('../config/libs');


router.post("/new_usuario",validations.validate(validations.createUsersValidation), userCtrl.saveUser)
router.post("/update_usuario", userCtrl.updateUser)
router.post("/update_desactivar_usuario", userCtrl.desactivateUser)
router.post("/buscar_usuario", userCtrl.buscarUsuarios)
router.get("/variables", userCtrl.variablesSesion)
router.post("/recuperarContrasena",userCtrl.recuperarContrasena)
router.post("/cambiarPassword",userCtrl.cambiarPassword)


router.post("/new_producto",upload.array('file',5), productoCtrl.saveProducto)
// router.post("/new_producto", productoCtrl.saveProducto)
router.post("/update_producto",upload.array('file',5), productoCtrl.updateProducto)
router.post("/update_estado", productoCtrl.updateEstado)
router.post("/delete_producto", productoCtrl.deleteProducto)
router.post("/buscar_productoUsuario", productoCtrl.buscarProductoUsuario)
router.post("/buscar_productoCodigo", productoCtrl.buscarProductoCodigo)
router.post("/contador_visitas", productoCtrl.contadorVistas)

router.post("/all", productoCtrl.allProductos)


router.get("/principal", arranqueCtrl.principal)
router.get("/logout", arranqueCtrl.logout)

// router.post("/uploads",upload.array('file',12), uploadFotoCtrl.uploadFoto)


module.exports = router