'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      batchId: {
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      timeAllocated: {
        type: Sequelize.INTEGER
      },
      isLastQuestion: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};