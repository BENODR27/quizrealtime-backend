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
    currentQuestionId: DataTypes.INTEGER,
    nextQuestionId: DataTypes.INTEGER,
    isNextQuestionAllowed: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'QuizSession',
  });
  return QuizSession;
};