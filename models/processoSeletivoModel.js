const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const Projeto = require('./projetoModel');

const sequelize = new Sequelize(config.development);

const ProcessoSeletivo = sequelize.define(
  'processo_seletivo',
  {
    tipoProcesso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pontuacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requisitos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aprovado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    projeto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projetos',
        key: 'id',
      },
    },
  },
  {
    tableName: 'processo_seletivo',
    timestamps: false,
  }
);

ProcessoSeletivo.sync({ force: true })
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
  });

module.exports = ProcessoSeletivo;
