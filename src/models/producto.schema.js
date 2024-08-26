const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    min: [5, "Minimo permitido de 5 caracteres"],
    max: [50, "Máximo permitido de 50 caracteres"],
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    min: [5, "Minimo permitido de 5 caracteres"],
    max: [600, "Máximo permitido de 600 caracteres"],
  },
  precio: { 
    type: Number,
    required: true,
  },
  imagen: {
    url: {
      type: String,
      default: '',
    },
    public_id: {
      type: String,
      default: '',
    }
  },
  categoria: {
    type: String,
    enum: ["Indumentaria", "Accesorios", "Figuras", "Peluches"],
    required: true
  },
  temporada:{
    type: String,
    enum: ['Primavera', 'Verano', 'Otoño', 'Invierno']
  },
  talle: {
    type: Object
  },
  stock:{
    type: Number,
    default: 0
  }
});

const ProductoModel = model('producto', ProductoSchema);

module.exports = ProductoModel;