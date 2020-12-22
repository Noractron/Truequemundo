const mensajeTipoUsuario = (TipoMensaje) => {
    let mensaje;
    switch (TipoMensaje) {
        case "ClienteCambioPassword":
            mensaje = {
                saludo: "El sistema Web WoWVelaS de INCOLVELAS ROLY S.A.S le informa que su contraseña fue cambiada con éxito."
            }
            break;
        case "ClienteResetPassword":
            mensaje = {
                saludo: "El sistema Web TRUEQUEMUNDO les informa que su contraseña ha sido restrablecida con éxito."
            }
            break;
    }
    return mensaje;
}

const contenidoHTML = (TipoMensaje, cuerpo, piePagina, password) => {
    let mensajeHtml;
    switch (TipoMensaje) {
        case "ClienteCambioPassword":
            mensajeHtml = {
                html: `
                <h1>User Information From TruequeMundo</h1>
                <p>${cuerpo}</p>
                <h1>Su Nuevo Password es: </h1>
                <h2><b>${password}</b></h2>
                <footer>${piePagina}</footer>
            `
            }
            break;
        case "ClienteResetPassword":
            mensajeHtml = {
                html: `
                    <h1>User Information From TruequeMundo</h1>
                    <p>${cuerpo}</p>
                    <h1>Su Nuevo Password es: </h1>
                    <h2><b>${password}</b></h2>
                    <footer>${piePagina}</footer>
                `
            }
            break;
    }

    return mensajeHtml;
}
module.exports = { mensajeTipoUsuario, contenidoHTML };

