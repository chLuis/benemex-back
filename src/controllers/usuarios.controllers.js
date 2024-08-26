const serviciosUsuarios = require('../services/usuarios.services');
const { validationResult } = require('express-validator');

//  req => es la solicitud que se recibe del cliente
//  req => header, body, params, query Por aqui se puede enviar la información
//          => (header => token )
//          => (body => formulario )
//          => (params => por la ruta )
//          => (query => por la url pero que no la altera )
//  res - es la respuesta que se envía al cliente
//  res => status, json, send, render
//console.log(req.body);
//  res => status, json, send, render
//console.log(req.body);
//const usuario = req.body;

const crearUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const result = await serviciosUsuarios.nuevoUsuario(req.body)
  if(result.statusCode === 201) return res.status(201).json({message: result.message, status:result.statusCode});
  if(result.statusCode === 409) return res.status(409).json({message: result.message, status:result.statusCode});

  return res.status(500).json({message: result.message, error: result.error});
};

const iniciarSesion = async (req, res) => {
  const result = await serviciosUsuarios.inicioSesion(req.body);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, rol:result.rol, token: result.token, nombre:result.nombre, favoritos: result.favoritos, carrito:result.carrito});
  } else {
    res.status(400).json({message: result.message, status:result.statusCode});
  }
};

const traerTodosUsuarios = async (req, res) => {
  const result = await serviciosUsuarios.obtenerTodosUsuarios();
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, usuarios: result.usuarios, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message, status:result.statusCode});
  }
};

const traerUnUsuario = async (req, res) => {
  const result = await serviciosUsuarios.obtenerUsuario(req.body.idUsuario);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, usuario: result.usuario, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message, status:result.statusCode});
  }
};

const actualizarUnUsuario = async (req, res) => {
  const result = await serviciosUsuarios.actualizarUsuario(req.params.idUsuario, req.body);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, usuario: result.usuario, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message, status:result.statusCode});
  }
};

const eliminarUsuario = async (req, res) => {
  const result = await serviciosUsuarios.eliminarUsuario(req.params.idUsuario);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message, status:result.statusCode});
  }
};

const agregarRemoverProductoFavorito = async (req, res) => {
  const result = await serviciosUsuarios.agregarQuitarProductFav(req.params.idProducto, req.body.idUsuario);
  if(result.statusCode === 200 || result.statusCode === 201) {
    res.status(200).json({message: result.message, status:result.statusCode, favoritos:result.usuario.favoritos});
  } else {
    res.status(500).json({message: result.message, status:result.statusCode});
  }
}

const agregarProductoCarrito = async (req, res) => {
  const result = await serviciosUsuarios.agregarProductCart(req.params.idProducto, req.body.idUsuario);
  if(result.statusCode === 200 || result.statusCode === 409) {
    res.status(200).json({message: result.message, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message, status:result.statusCode});
  }
}

module.exports = {
  crearUsuario,
  iniciarSesion,
  traerTodosUsuarios,
  traerUnUsuario,
  actualizarUnUsuario,
  eliminarUsuario,
  agregarRemoverProductoFavorito,
  agregarProductoCarrito
}