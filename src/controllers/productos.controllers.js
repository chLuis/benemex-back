const serviciosProductos = require('../services/productos.services')
//const productos = []
//const serviciosDeProductos = require

const crearProducto = async (req, res) => {
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
  //const producto = req.body;
  const result = await serviciosProductos.nuevoProducto(req.body)
  if(result.statusCode === 201) {
    res.status(201).json({message: result.message , status:result.statusCode});
  } 
  else{
    res.status(500).json({message: result.message, status:result.statusCode});
  }
}

const agregarImagen = async (req, res) => {
  const result = await serviciosProductos.agregarImagen(req.params.idProducto, req.file.path);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, status:result.statusCode});
  } 
  else{
    res.status(500).json({message: result.message, status:result.statusCode});
  }
}

const traerTodosProductos = async (req, res) => {
  const result = await serviciosProductos.obtenerTodosProductos();
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, productos: result.productos});
  } else {
    res.status(500).json({message: result.message});
  }
}

const traerProductosPorCategoria = async (req, res) => {
  const result = await serviciosProductos.obtenerProductoPorCategoria(req.params.categoria);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, productos: result.productos});
  } else {
    res.status(500).json({message: result.message});
  }
}

const traerUnProducto = async (req, res) => {
  const result = await serviciosProductos.obtenerProducto(req.params.idProducto);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, producto: result.producto});
  } else {
    res.status(500).json({message: result.message});
  }
}

const actualizarUnProducto = async (req, res) => {
  const result = await serviciosProductos.actualizarProducto(req.params.idProducto, req.body);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, status:result.statusCode, producto: result.producto});
  } else {
    res.status(500).json({message: result.message, status:result.statusCode });
  }
}

const eliminarProducto = async (req, res) => {
  const result = await serviciosProductos.eliminarProducto(req.params.idProducto);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message});
  }
}

const agregarQuitarProductoFavorito = async (req, res) => {
  const result = await serviciosProductos.agregarQuitarProductoFav(req.params.idProducto, req.idUsuario);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message});
  }
}

const agregarProductoCarrito = async (req, res) => {
  console.log(req.params.idProducto, req.idUsuario);
  const result = await serviciosProductos.agregarProductoCarrito(req.params.idProducto, req.idUsuario);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message});
  }
}

const eliminarProductoCarrito = async (req, res) => {
  const result = await serviciosProductos.eliminarProductoCarrito(req.params.idProducto, req.idUsuario);
  if(result.statusCode === 200) {
    res.status(200).json({message: result.message, status:result.statusCode});
  } else {
    res.status(500).json({message: result.message});
  }
}

module.exports = {
  crearProducto,
  agregarImagen,
  traerTodosProductos,
  traerUnProducto,
  actualizarUnProducto,
  eliminarProducto,
  agregarQuitarProductoFavorito,
  agregarProductoCarrito,
  eliminarProductoCarrito,
  traerProductosPorCategoria
}