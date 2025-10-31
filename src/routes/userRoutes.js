/**
 * @api {post} /api/auth/register Registrar un usuario
 * @apiName RegistroUsuario
 * @apiGroup Autenticación
 *
 * @apiBody {String} name Nombre del usuario.
 * @apiBody {String} email Correo electrónico único.
 * @apiBody {String} password Contraseña.
 * @apiBody {String} [role] Rol del usuario (opcional, por defecto 'CLIENT').
 *
 * @apiSuccess {String} mensaje Confirmación de registro.
 * @apiSuccess {Object} user Información del usuario registrado.
 * @apiSuccess {Number} user.id ID del usuario.
 * @apiSuccess {String} user.name Nombre del usuario.
 * @apiSuccess {String} user.email Correo del usuario.
 * @apiSuccess {String} user.role Rol del usuario.
 *
 * @apiError {String} mensaje Descripción del error.
 */

/**
 * @api {post} /api/auth/login Iniciar sesión
 * @apiName LoginUsuario
 * @apiGroup Autenticación
 *
 * @apiBody {String} email Correo electrónico del usuario.
 * @apiBody {String} password Contraseña del usuario.
 *
 * @apiSuccess {String} mensaje Confirmación de login exitoso.
 * @apiSuccess {String} token Token JWT para acceder a rutas protegidas.
 * @apiSuccess {Object} usuario Información del usuario autenticado.
 * @apiSuccess {Number} usuario.id ID del usuario.
 * @apiSuccess {String} usuario.name Nombre del usuario.
 * @apiSuccess {String} usuario.email Correo del usuario.
 * @apiSuccess {String} usuario.role Rol del usuario.
 *
 * @apiError {String} mensaje Descripción del error.
 */

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

// Registro de usuario
router.post('/register', register);

// Login de usuario
router.post('/login', login);

module.exports = router;
