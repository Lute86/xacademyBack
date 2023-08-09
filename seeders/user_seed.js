
/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for the `users` table using raw SQL queries
    await queryInterface.sequelize.query(`
      INSERT INTO users (first_name, last_name, email, role, password)
      VALUES
        ('Admin', 'Admin', 'michael.johnson@example.com', 'admin', 'hashed_password'),
        ('Emily', 'Brown', 'emily.brown@example.com', 'user', 'hashed_password'),
        ('David', 'Lee', 'david.lee@example.com', 'user', 'hashed_password'),
        ('Sarah', 'Taylor', 'sarah.taylor@example.com', 'user', 'hashed_password'),
        ('Robert', 'Wilson', 'robert.wilson@example.com', 'user', 'hashed_password'),
        ('Ava', 'Martinez', 'ava.martinez@example.com', 'user', 'hashed_password'),
        ('Daniel', 'Garcia', 'daniel.garcia@example.com', 'user', 'hashed_password'),
        ('Sophia', 'Robinson', 'sophia.robinson@example.com', 'user', 'hashed_password');
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Truncate the `users` table to undo the seeding
    await queryInterface.sequelize.query('TRUNCATE TABLE users;');
  }
};

