import psql from "sequelize";
import DB from "../nucleo/DB.mjs";

const DataTypes = psql.Sequelize;
const sequelize = DB.connection();

class Mensaje extends psql.Model {
  static associate() {
  }
}

Mensaje.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaEnviado: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha _enviado",
    },
    fechaLeido: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha_leido",
    },
    idCliente: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "cliente",
        key: "id",
      },
      field: "id_cliente",
    },
    idOperador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'operador',
        key: 'id'
      },
      field: 'id_operador'
    }
  },
  {
    sequelize,
    tableName: "mensaje",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "mensaje_pk",
        unique: true,
        fields: [{ name: "id" }],
      },
    ],
  }
);

export default Mensaje;
