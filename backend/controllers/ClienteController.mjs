import { Cliente, Mensaje } from "../models/index.mjs";

export default class ClienteController {
  static async findById(req, res) {
    const { id } = req.params;
    const cliente = await Cliente.findOne({
      where: { id },
      include: [{ model: Mensaje, as: "mensajes" }],
    });

    res.json(cliente);
  }

  static async findAll(req, res) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  }
}
