'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Batch.init({
    adminId: DataTypes.INTEGER,
    batchName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Batch',
  });
  return Batch;
};