'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    batchId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    options: DataTypes.STRING,
    section: DataTypes.STRING,
    answer: DataTypes.INTEGER,
    timeAllocated: DataTypes.INTEGER,
    isLastQuestion: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};