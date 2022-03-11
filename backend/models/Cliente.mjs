import psql from "sequelize";
import DB from "../nucleo/DB.mjs";
import Mensaje from "./Mensaje.mjs";

const DataTypes = psql.Sequelize;
const sequelize = DB.connection();

class Cliente extends psql.Model {
  static associate() {
    this.hasMany(Mensaje, { as: "mensajes", foreignKey: "id_cliente" });
  }
}

Cliente.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "cliente",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "cliente_pk",
        unique: true,
        fields: [{ name: "id" }],
      },
    ],
  }
);

export default Cliente;
