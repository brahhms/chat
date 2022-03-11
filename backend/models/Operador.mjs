import psql from "sequelize";
import DB from "../nucleo/DB.mjs";
import Mensaje from "./Mensaje.mjs";

const DataTypes = psql.Sequelize;
const sequelize = DB.connection();

class Operador extends psql.Model {
  static associate() {
    this.hasMany(Mensaje, { as: "mensajes", foreignKey: "id_operador" });
  }
}

Operador.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'operador',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "operador_pk",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});

export default Operador;
