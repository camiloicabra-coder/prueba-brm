/**
 * @file authController.js
 * @description Controlador para la autenticación de usuarios (registro y login).
 * @requires bcryptjs
 * @requires jsonwebtoken
 * @requires ../models
 */

/**
 * @api {post} /api/auth/register Registrar un nuevo usuario
 * @apiName RegisterUser
 * @apiGroup Autenticación
 * @apiVersion 1.0.0
 * 
 * @apiDescription Crea un nuevo usuario en el sistema. Valida que el correo no esté registrado
 * y cifra la contraseña antes de guardarla en la base de datos.
 * 
 * @apiBody {String} name Nombre del usuario.
 * @apiBody {String} email Correo electrónico único del usuario.
 * @apiBody {String} password Contraseña del usuario.
 * @apiBody {String} [role=CLIENT] Rol del usuario (por defecto "CLIENT").
 * 
 * @apiSuccess (201 Created) {String} mensaje Mensaje de confirmación.
 * @apiSuccess (201 Created) {Object} user Datos del usuario creado.
 * 
 * @apiSuccessExample {json} Respuesta exitosa:
 * HTTP/1.1 201 Created
 * {
 *   "mensaje": "Usuario registrado exitosamente",
 *   "user": {
 *     "id": 1,
 *     "name": "Juan Pérez",
 *     "email": "juan@example.com",
 *     "role": "CLIENT"
 *   }
 * }
 * 
 * @apiError (400) CamposObligatorios Todos los campos son obligatorios.
 * @apiError (400) CorreoExistente El correo ya está registrado.
 * @apiError (500) ErrorServidor Error interno al registrar usuario.
 * 
 * @apiErrorExample {json} Error - Correo ya registrado:
 * HTTP/1.1 400 Bad Request
 * {
 *   "mensaje": "El correo ya está registrado"
 * }
 */

/**
 * @api {post} /api/auth/login Iniciar sesión de usuario
 * @apiName LoginUser
 * @apiGroup Autenticación
 * @apiVersion 1.0.0
 * 
 * @apiDescription Valida las credenciales del usuario, genera un token JWT y lo devuelve junto
 * con los datos del usuario autenticado.
 * 
 * @apiBody {String} email Correo electrónico del usuario.
 * @apiBody {String} password Contraseña del usuario.
 * 
 * @apiSuccess (200 OK) {String} mensaje Mensaje de éxito.
 * @apiSuccess (200 OK) {String} token Token JWT válido para autenticación.
 * @apiSuccess (200 OK) {Object} usuario Datos del usuario autenticado.
 * 
 * @apiSuccessExample {json} Respuesta exitosa:
 * HTTP/1.1 200 OK
 * {
 *   "mensaje": "Login exitoso",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "usuario": {
 *     "id": 1,
 *     "name": "Juan Pérez",
 *     "email": "juan@example.com",
 *     "role": "CLIENT"
 *   }
 * }
 * 
 * @apiError (404) UsuarioNoEncontrado No existe un usuario con el correo indicado.
 * @apiError (401) ContraseñaIncorrecta La contraseña ingresada no es válida.
 * @apiError (500) ErrorServidor Error interno al iniciar sesión.
 * 
 * @apiErrorExample {json} Error - Usuario no encontrado:
 * HTTP/1.1 404 Not Found
 * {
 *   "mensaje": "Usuario no encontrado"
 * }
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Controladores
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'CLIENT'
    });

    return res.status(201).json({ mensaje: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
