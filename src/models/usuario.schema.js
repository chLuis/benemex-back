const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    min: [1, "Minimo permitido de 1 caracteres"],
    max: [50, "Máximo permitido de 50 caracteres"],
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
    min: [1, "Minimo permitido de 1 caracteres"],
    max: [50, "Máximo permitido de 50 caracteres"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: [6, "Minimo permitido de 6 caracteres"],
    max: [16, "Máximo permitido de 16 caracteres"],
  },
  rol:{
    type: String,
    enum: ['admin', 'user', 'vendedor'],
    default: 'user'
  },
  active:{
    type: Boolean,
    default: true
  },
  carrito:[],
  favoritos:[]
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
}

const UsuarioModel = model('usuario', UsuarioSchema);
module.exports = UsuarioModel;