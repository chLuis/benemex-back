const express = require("express");
const {
  crearProducto,
  agregarImagen,
  traerTodosProductos,
  traerUnProducto,
  actualizarUnProducto,
  eliminarProducto,
  //agregarQuitarProductoFavorito,
  eliminarProductoCarrito,
  traerProductosPorCategoria
} = require("../controllers/productos.controllers");
const multer = require("../middlewares/multer");
const { agregarProductoCarrito, agregarRemoverProductoFavorito } = require("../controllers/usuarios.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

//router.post("/", crearProducto);
router.post("/agregarImagen/:idProducto", multer.single('imagen'),agregarImagen);
router.delete("/:idProducto", eliminarProducto);
router.post("/", auth('admin'), crearProducto);
//router.post("/agregarImagen/:idProducto", auth('admin'), multer.single('imagen'),agregarImagen);
//router.delete("/:idProducto", auth('admin'), eliminarProducto);
router.get("/", traerTodosProductos);
router.get("/categoria/:categoria", traerProductosPorCategoria);
router.get("/:idProducto", traerUnProducto);
router.put("/:idProducto", auth('admin'), actualizarUnProducto);

// router.post("/favorito/:idProducto", agregarQuitarProductoFavorito)
// router.post("/carrito/:idProducto", agregarProductoCarrito)
// router.delete("/carrito/:idProducto", eliminarProductoCarrito)
router.post("/favoritos/:idProducto", auth('admin'), agregarRemoverProductoFavorito)
router.post("/carrito/:idProducto", auth('admin'), agregarProductoCarrito)
router.delete("/carrito/:idProducto", auth('admin'), eliminarProductoCarrito)

module.exports = router;
