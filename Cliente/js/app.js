class EventManager {
    constructor() {
        this.obtenerConsultaGeneral()
        this.obtenerConsultaUsuarios()
        this.obtenerConsultaProductos()
        this.obtenerConsultaFotos()
        this.guardarUsuario()
        this.modificarUsuario()
        // this.saveFotoProducto()
    }


obtenerConsultaProductos() {
    var categoria = $('#categoria')
    var nombreProducto = $('#nombreProducto')
    var tipo = $('#tipo')
    var estado = $('#estado')
    $('.productosButton').on('click', function(event) {
        let url = "/events/buscar_productoUsuario"
        $.post(url,{
            categoria: categoria.val(), 
            nombreProducto: nombreProducto.val(),
            tipo: tipo.val(), 
            estado: estado.val()},
            (response) => {
                alert(JSON.stringify(response));
                console.log (response)
            })
        
    })
}

obtenerConsultaFotos() {
    var fk_producto = $('#fk_producto')
    $('.fotoButton').on('click', function(event) {
        let url = "/events/buscar_foto"
        $.post(url,{
            fk_producto: fk_producto.val(),
        },
            (response) => {
                alert(JSON.stringify(response));
                console.log (response)
            })
        
    })
}

obtenerConsultaGeneral() {
    var ciudad = $('#usuarioCiudad')
    var pais = $('#usuarioPais')
    var categoria = $('#categoria')
    var nombreProducto = $('#nombreProducto')
    var tipo = $('#tipo')
    var condicion = $('#condicion')
    var fk_usuario = $('#fk_usuario')
    var estado = $('#estado')
    $('.filtroButton').on('click', function(event) {
        let url = "/events/all"
        $.post(url,{
            ciudad:ciudad.val(),
            pais:pais.val(),
            categoria: categoria.val(), 
            nombreProducto: nombreProducto.val(),   
            tipo: tipo.val(), 
            condicion: condicion.val(),
            fk_usuario: fk_usuario.val(),
            estado: estado.val(),
        },
            (response) => {
                alert(JSON.stringify(response));
                console.log (response)
            })
        
    })
}


obtenerConsultaUsuarios() {
    let url = "/events/buscar_usuario"
    $('.usuarioButton').on('click', function(event) {
        $.get(url, (response) => {
            alert(JSON.stringify(response));
            console.log (response)
        })
    })
}

saveFotoProducto(){
    $('.grabarImagenes').on('click', (ev) => {
        ev.preventDefault()
        let url = "/events/new_usuario"
            $.post(url, (response) => {
                alert(response)
            })
       
    })
}


    guardarUsuario() {
        $('.usuarioGuardar').on('click', (ev) => {
            ev.preventDefault()
            var nombre = $('#nombre').val()
            var apellido = $('#apellido').val()
            var email = $('#email').val()
            var password = $('#password').val()
            var telefono = $('#telefono').val()
            var celular = $('#celular').val()
            var foto = $('#foto').val()
            var fechaNacimiento = $('#fechaNacimiento').val()
            var sexo = $('#sexo').val()
            var pais = $('#pais').val()
            var ciudad = $('#ciudad').val()
            var direccion = $('#direccion').val()

            let url = "/events/new_usuario"
            if (nombre != "" && apellido != ""&& email != ""&& password != "") {
                let ev = {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    password: password,
                    telefono: telefono,
                    celular: celular,
                    foto: foto,
                    fechaNacimiento: fechaNacimiento,
                    sexo: sexo,
                    pais: pais,
                    ciudad: ciudad,
                    direccion: direccion
                }
                $.post(url, ev, (response) => {
                    alert(response)
                })
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    modificarUsuario() {
        $('.usuarioModificar').on('click', (event) => {
            var codigo = $('#codigo').val()
            var nombre = $('#nombre').val()
            var apellido = $('#apellido').val()
            var telefono = $('#telefono').val()
            var celular = $('#celular').val()
            var foto = $('#foto').val()
            var fechaNacimiento = $('#fechaNacimiento').val()
            var pais = $('#pais').val()
            var ciudad = $('#ciudad').val()
            var direccion = $('#direccion').val()

            let url = "/events/update_usuario"
            let ev = {
                codigo:codigo,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                celular: celular,
                foto: foto,
                fechaNacimiento: fechaNacimiento,
                pais: pais,
                ciudad: ciudad,
                direccion: direccion
            }
            $.post(url, ev, (response) => {
                console.log(ev)
                alert(response)
            }) 
        })
    }
}
const Manager = new EventManager()