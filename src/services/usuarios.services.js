const UsuarioModel = require("../models/usuario.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registroUsuario } = require("../helpers/messages");
const ProductoModel = require("../models/producto.schema");

const nuevoUsuario = async (body) => {
  //console.log(body);
  try {
    const usuarioExiste = await UsuarioModel.findOne({ email: body.email });
    if (usuarioExiste)
      return { message: "El usuario ya existe", statusCode: 409 };
    if (body.password.length < 6)
      return {
        message: "La contraseña debe tener al menos 6 caracteres",
        statusCode: 400,
      };

    // Crear un nuevo usuario
    const usuario = new UsuarioModel(body);

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(body.password, salt);

    registroUsuario(body.email);
    await usuario.save();
    return {
      message: "Usuario creado",
      statusCode: 201,
    };
  } catch (error) {
    return {
      message: "Error al crear el usuario",
      statusCode: 500,
      error,
    };
  }
};

const inicioSesion = async (body) => {
  try {
    const usuarioExiste = await UsuarioModel.findOne({ email: body.email });
    const validPassword = bcrypt.compareSync(
      body.password,
      usuarioExiste.password
    );
    if (!validPassword || !usuarioExiste)
      return { message: "Usuario o Contraseña incorrecta", statusCode: 500 };

    const payload = {
      id: usuarioExiste._id,
      email: usuarioExiste.email,
      rol: usuarioExiste.rol,
      nombre: usuarioExiste.nombre,
      apellido: usuarioExiste.apellido,
      //favoritos: usuarioExiste.favoritos
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    return {
      message: "Inicio de sesión exitoso",
      statusCode: 200,
      rol: usuarioExiste.rol,
      token,
      favoritos: usuarioExiste.favoritos,
      carrito: usuarioExiste.carrito,
      nombre: usuarioExiste.nombre,
      //usuario,
    };
  } catch (error) {
    return {
      message: "Error al iniciar sesión",
      statusCode: 400,
    };
  }
};

const obtenerTodosUsuarios = async () => {
  try {
    const usuarios = await UsuarioModel.find();
    //console.log(usuarios);
    return {
      message: "Usuarios obtenidos",
      statusCode: 200,
      usuarios,
    };
  } catch (error) {
    return {
      message: "Error al obtener los usuarios",
      statusCode: 500,
      error,
    };
  }
};

const obtenerUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    if (!usuario) return { message: "Usuario no encontrado", statusCode: 500 };
    return {
      message: "Usuario obtenido",
      statusCode: 200,
      usuario,
    };
  } catch (error) {
    return {
      message: "Usuario no encontrado",
      statusCode: 500,
    };
  }
};

const actualizarUsuario = async (idUsuario, body) => {
  try {
    await UsuarioModel.findByIdAndUpdate(idUsuario, body);
    return {
      message: "Usuario Actualizado",
      statusCode: 200,
      usuario: usuarioActualizado,
    };
  } catch (error) {
    return {
      message: "Usuario no encontrado",
      statusCode: 500,
    };
  }
};

const eliminarUsuario = async (idUsuario) => {
  try {
    const exist = await UsuarioModel.findByIdAndDelete(idUsuario);
    if (!exist) return { message: "Usuario no encontrado", statusCode: 500 };
    return {
      message: "Usuario Eliminado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: "Usuario no encontrado",
      statusCode: 500,
    };
  }
};

const agregarQuitarProductFav = async (idProducto, idUsuario) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    const usuario = await UsuarioModel.findById(idUsuario);
    const existProductIndex = usuario.favoritos.findIndex(
      (prod) => prod._id.toString() === idProducto.toString()
    );

    if (existProductIndex !== -1) {
      // Si el producto existe, lo eliminamos
      usuario.favoritos.splice(existProductIndex, 1);
      await usuario.save();
      return {
        message: "Producto eliminado de favoritos",
        statusCode: 200,
        usuario,
      };
    } else {
      usuario.favoritos.push(producto);
      await usuario.save();
      return {
        message: "Producto agregado a favoritos",
        statusCode: 201,
        usuario,
      };
    }
  } catch (error) {
    return {
      message: "Error al agregar producto a favoritos",
      statusCode: 500,
      error,
    };
  }
};

const agregarProductCart = async (idProducto, idUsuario) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    const usuario = await UsuarioModel.findById(idUsuario);

    const existProduct = usuario.carrito.find(
      (prod) => prod._id.toString() === idProducto.toString()
    );

    if (existProduct)
      return { message: "Producto ya esta en carrito", statusCode: 409 };
    usuario.carrito.push(producto);
    await usuario.save();
    return {
      message: "Producto agregado al carrito",
      statusCode: 200,
      usuario,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error al agregar producto al carrito",
      statusCode: 500,
      error,
    };
  }
};

module.exports = {
  nuevoUsuario,
  inicioSesion,
  obtenerTodosUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  agregarQuitarProductFav,
  agregarProductCart,
  //Usuarios
};
