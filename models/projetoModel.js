const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const Projeto = sequelize.define(
  'projetos',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sobre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoProjeto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    premiacoes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disponivel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Projeto;
