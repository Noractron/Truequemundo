const nodemailer = require('nodemailer');
const saludo = require('../lib/utils')
const mensajeUsuario = require('./message');
const smtpTransport = require("nodemailer-smtp-transport");

async function nodeEmail(USU_EMAIL, USU_PASSW, TipoMensaje) {
    let mensajeCuerpo = mensajeUsuario.mensajeTipoUsuario(TipoMensaje)
    let message = `Estimado ${saludo.mostrarSaludo()}, ${mensajeCuerpo.saludo}`;
    let footer = "Saludos Coordiales.";
    let contentHTML = mensajeUsuario.contenidoHTML(TipoMensaje, message, footer, USU_PASSW);
    let correo;


    correo = USU_EMAIL;

    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'truequemundo.xyz',
        port: 465,
        auth: {
            user: 'truequemundo21@truequemundo.xyz',
            pass: 'jonimon321jojo'
        },
        tls: {
            rejectUnauthorized: false
        }
    }));

    // console.log(transporter);
    let info = await transporter.sendMail({
        from: `"TruequeMundo Server" <truequemundo21@truequemundo.xyz>`, // sender address,
        to: correo,
        subject: 'Website Contact Form',
        // text: 'Hello World'
        html: contentHTML.html
    });
    // console.log(info);
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = { nodeEmail }

