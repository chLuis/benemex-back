const express = require("express");
const {
  crearUsuario,
  traerTodosUsuarios,
  traerUnUsuario,
  actualizarUnUsuario,
  eliminarUsuario,
  iniciarSesion
} = require("../controllers/usuarios.controllers");
const auth = require('../middlewares/auth');
const { check } = require("express-validator");
const router = express.Router();

router.post("/", [
  check('nombre', 'campo nombre vacio').not().isEmpty(),
  check('nombre', 'Minimo de 1 caracter').isLength({min:1}),
  check('password', 'Contraseña vacia').not().isEmpty(),
  check('password', 'Minimo de 6 caracteres y maximo de 16').isLength({min:6, max:16}),
  check('email', 'Email vacio').not().isEmpty(),
  check('email', 'Email invalido').isEmail(),
],crearUsuario);
router.post("/login", iniciarSesion);
router.get("/", auth('admin'), traerTodosUsuarios);
router.get("/oneUser", auth('admin'), traerUnUsuario);
router.put("/:idUsuario", actualizarUnUsuario);
router.delete("/:idUsuario", eliminarUsuario);

module.exports = router;