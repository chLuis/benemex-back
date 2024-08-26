const transporter = require('./nodemailers')

const registroUsuario = async (email) => {
  await transporter.sendMail({
    from: `"Tienda Fácil" <${process.env.NODEMAILER_GMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Registro exitoso ✔", // Subject line
    //text: "Hello world?", // plain text body
    html: "<b>Te damos la bienvenida a nuestra pagina!</b>", // html body
  });
}

module.exports = {
  registroUsuario
}