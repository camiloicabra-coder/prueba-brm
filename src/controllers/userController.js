
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // verificar si el usuario ya existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // crear usuario
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

    // comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // generar token JWT
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
