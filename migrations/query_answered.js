'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Queries', 'answered', {
      type: Sequelize.STRING,
      defaultValue: 'no',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Queries', 'answered');
  }
};
