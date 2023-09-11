
/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for the `users` table using raw SQL queries
    //Pass123
    await queryInterface.sequelize.query(`
      INSERT INTO users (first_name, last_name, email, role, password)
      VALUES
        ('Michael', 'Johnson', 'admin@admin.com', 'admin', '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK'),
        ('Emily', 'Brown', 'emily@user.com', 'user', 
        '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK
        '),
        ('David', 'Lee', 'david.lee@example.com', 'user', 
        '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK
        '),
        ('Sarah', 'Taylor', 'sarah.taylor@example.com', 'user', '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK'),
        ('Robert', 'Wilson', 'robert.wilson@example.com', 'user', '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK'),
        ('Ava', 'Martinez', 'ava.martinez@example.com', 'user', '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK'),
        ('Daniel', 'Garcia', 'daniel.garcia@example.com', 'user', '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK'),
        ('Sophia', 'Robinson', 'sophia.robinson@example.com', 'user', '$2a$10$oYoQUZgYkc21EfWGbbFvwuc289T7SoiUvGsHFETY7swc.UIIZpDKK');
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Truncate the `users` table to undo the seeding
    await queryInterface.sequelize.query('TRUNCATE TABLE users;');
  }
};

