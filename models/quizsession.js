'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuizSession.init({
    batchId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    datas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuizSession',
  });
  return QuizSession;
};