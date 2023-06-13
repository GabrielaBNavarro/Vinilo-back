const { response, request } = require("express");
const Usuarios = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { user, password } = req.body;

  try {
    const usuario = await Usuarios.findOne({ user });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }

    const token = await generarJWT(usuario._id);

    res.json({
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Hablar con el admin",
    });
  }
};

module.exports = {
  login,
};
