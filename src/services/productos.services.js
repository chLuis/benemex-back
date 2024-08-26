const ProductoModel = require("../models/producto.schema");
const UsuarioModel = require("../models/usuario.schema");
const cloudinary = require("../helpers/cloudinary");

const nuevoProducto = async (body) => {
  try {
    //productos.push({ id: crypto.randomUUID(), producto });
    const producto = new ProductoModel(body);
    // el await es en el guardado en la BD
    await producto.save();
    return {
      message: "Producto creado",
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};


const obtenerTodosProductos = async () => {
  try {
    const productos = await ProductoModel.find();
    return {
      message: "Productos obtenidos",
      statusCode: 200,
      productos,
    };
  } catch (error) {
    return {
      message: "Error al obtener los productos",
      statusCode: 500,
      error,
    };
  }
};

const obtenerProductoPorCategoria = async (req) => {
  try {
    let productos = await ProductoModel.find();
    productos = productos.filter((producto) => producto.categoria.toLocaleLowerCase() === req.toLocaleLowerCase());
    return {
      message: "Productos obtenidos",
      statusCode: 200,
      productos,
    };
  } catch (error) {
    return {
      message: "Error al obtener los productos",
      statusCode: 500,
      error,
    };
  }
};

const obtenerProducto = async (idProducto) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    if (!producto)
      return { message: "Producto no encontrado", statusCode: 500 };
    return {
      message: "Producto obtenido",
      statusCode: 200,
      producto,
    };
  } catch (error) {
    return {
      message: "Producto no encontrado",
      statusCode: 500,
    };
  }
};

const actualizarProducto = async (idProducto, body) => {
  try {
    //const productoActualizado = await ProductoModel.findByIdAndUpdate({_id: idProducto}, body, {new:true})
    //new: true --> es para cuando quiero que lo envíe al frontend
    await ProductoModel.findByIdAndUpdate(idProducto, body);
    return {
      message: "Producto Actualizado",
      statusCode: 200,
      //producto: productoActualizado,
    };
  } catch (error) {
    return {
      message: "Producto no encontrado",
      statusCode: 500,
    };
  }
};

const eliminarProducto = async (idProducto) => {
  try {
    await eliminarImagen(idProducto)
    const exist = await ProductoModel.findByIdAndDelete(idProducto);
    if (!exist) return { message: "Producto no encontrado", statusCode: 500};
    return {
      message: "Producto Eliminado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: "Producto no encontrado",
      statusCode: 500,
    };
  }
};

const agregarQuitarProductoFav = async (idProducto, idUsuario) => {

  try {
    const producto = await ProductoModel.findById(idProducto);
    const usuario = await UsuarioModel.findById(idUsuario);
    
    if (usuario.favoritos.includes(producto)) {
      usuario.favoritos = usuario.favoritos.filter(fav => fav !== producto);
      await usuario.save();
      return { message: "Producto eliminado de favoritos", statusCode: 200 };
    } else {
      usuario.favoritos.push(producto);
      await usuario.save();
      return { message: "Producto agregado a los favoritos", statusCode: 200 };
    }
  }
  catch (error) {
    console.log(error);
    return { message: "Error al agregar o quitar producto de favoritos", statusCode: 500 };
  }
}

const agregarProductoCarrito = async (idProducto, idUsuario) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    const usuario = await UsuarioModel.findById(idUsuario);
    if (usuario.carrito.includes(producto)) {
      return { message: "Producto ya se encuentra en el carrito", statusCode: 400 };
    } 
    usuario.carrito.push(producto);
    await usuario.save();
    return { message: "Producto agregado a los carrito", statusCode: 200 };
  } catch (error) {
    return { message: "Error al agregar o quitar producto de carrito", statusCode: 500 };
  }
}

const eliminarProductoCarrito = async (idProducto, idUsuario) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    const usuario = await UsuarioModel.findById(idUsuario);
    if (!usuario.carrito.includes(producto)) return { message: "Producto no se encuentra en el carrito", statusCode: 400 };
    usuario.carrito = usuario.carrito.filter(prod => prod !== producto);
    await usuario.save();
    return { message: "Producto eliminado del carrito", statusCode: 200 };
  } catch (error) {
    return { message: "Error al eliminar producto de carrito", statusCode: 500 };
  }
}
const agregarImagen = async (idProducto, image) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    if (!producto) return { message: "Producto no encontrado", statusCode: 500 };
    const imagen = await cloudinary.uploader.upload(image);
    producto.imagen = {
      url: imagen.secure_url,
      public_id: imagen.public_id
    };
    await producto.save();
    return {
      message: "Imagen agregada",
      statusCode: 200,
      producto,
    };
  } catch (error) {
    return {
      message: "Producto no encontrado",
      statusCode: 500,
    };
  }
};

const eliminarImagen = async (idProducto) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    if (!producto) return { message: "Producto no encontrado", statusCode: 500 };

    if (producto.imagen.url && producto.imagen.public_id) {
      // Eliminar la imagen de Cloudinary usando el public_id
      await cloudinary.uploader.destroy(producto.imagen.public_id);
      
      // Eliminar la referencia de la imagen en el producto
      producto.imagen = null;
      
      await producto.save();
      
      return {
        message: "Imagen eliminada",
        statusCode: 200,
        producto,
      };
    } else {
      return {
        message: "No hay imagen para eliminar",
        statusCode: 400,
      };
    }
  } catch (error) {
    return {
      message: "Error al eliminar la imagen",
      statusCode: 500,
    };
  }
};


module.exports = {
  nuevoProducto,
  agregarImagen,
  obtenerTodosProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
  agregarQuitarProductoFav,
  agregarProductoCarrito,
  eliminarProductoCarrito,
  obtenerProductoPorCategoria
  //productos
};