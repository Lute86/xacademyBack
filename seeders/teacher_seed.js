/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for the `teachers` table using raw SQL queries
    await queryInterface.sequelize.query(`
      INSERT INTO teachers (first_name, last_name)
      VALUES
        ('Jane', 'Smith'),
        ('John', 'Doe'),
        ('Michael', 'Johnson'),
        ('Emily', 'Brown'),
        ('David', 'Lee'),
        ('Robert', 'Wilson'),
        ('Ava', 'Martinez'),
        ('Daniel', 'Garcia');
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Truncate the `teachers` table to undo the seeding
    await queryInterface.sequelize.query('TRUNCATE TABLE teachers;');
  }
};
