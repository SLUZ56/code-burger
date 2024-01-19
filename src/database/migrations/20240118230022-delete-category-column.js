'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'category');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createColumn('products', {
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
};
