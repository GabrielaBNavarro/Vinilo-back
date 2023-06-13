const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  user: {
    type: String,
    required: [true, "El usuario es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { password, __v, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuarios", UsuarioSchema);