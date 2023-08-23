
/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for the `users` table using raw SQL queries
    await queryInterface.sequelize.query(`
      INSERT INTO users (first_name, last_name, email, role, password)
      VALUES
        ('Michael', 'Johnson', 'admin@admin.com', 'admin', '$2a$10$FLJohaWINTixIla8OrHyEeG15iv3JwFxeOcslKJ.EbkItXP4frciK
        '),
        ('Emily', 'Brown', 'emily@user.com', 'user', '$10$WrK1ETh.oFRnNR5SIFA48.MapB.NFUPaQnIU92sF/NtQTcorfERdq
        '),
        ('David', 'Lee', 'david.lee@example.com', 'user', '$10$WrK1ETh.oFRnNR5SIFA48.MapB.NFUPaQnIU92sF/NtQTcorfERdq
        '),
        ('Sarah', 'Taylor', 'sarah.taylor@example.com', 'user', '$2b$10$MUvhwt/1mOHi1fLfxdKZce45o852G7Vuv9CF18QgD5Gr2.dZFAE3a'),
        ('Robert', 'Wilson', 'robert.wilson@example.com', 'user', '$2b$10$MUvhwt/1mOHi1fLfxdKZce45o852G7Vuv9CF18QgD5Gr2.dZFAE3a'),
        ('Ava', 'Martinez', 'ava.martinez@example.com', 'user', '$2b$10$MUvhwt/1mOHi1fLfxdKZce45o852G7Vuv9CF18QgD5Gr2.dZFAE3a'),
        ('Daniel', 'Garcia', 'daniel.garcia@example.com', 'user', '$2b$10$MUvhwt/1mOHi1fLfxdKZce45o852G7Vuv9CF18QgD5Gr2.dZFAE3a'),
        ('Sophia', 'Robinson', 'sophia.robinson@example.com', 'user', '$2b$10$MUvhwt/1mOHi1fLfxdKZce45o852G7Vuv9CF18QgD5Gr2.dZFAE3a');
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Truncate the `users` table to undo the seeding
    await queryInterface.sequelize.query('TRUNCATE TABLE users;');
  }
};

