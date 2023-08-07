"use strict";

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for the `courses` table using raw SQL queries
    await queryInterface.sequelize.query(`
      INSERT INTO courses (course_name, description, modality, duration, price)
      VALUES
        ('Mathematics', 'A course about numbers and equations.', 'Online', '3 months', 200),
        ('English Language', 'A course to learn English.', 'In-Person', '6 months', 300),
        ('History of Art', 'Discover the evolution of art through the ages.', 'Hybrid', '4 months', 250),
        ('Python Programming', 'Learn the fundamentals of Python programming language.', 'Online', '2 months', 150),
        ('Photography Basics', 'Explore the art and techniques of photography.', 'In-Person', '3 months', 280),
        ('Introduction to Psychology', 'Gain insights into the human mind and behavior.', 'Online', '5 months', 180),
        ('Financial Management', 'Learn principles of finance and money management.', 'Hybrid', '6 months', 320);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Truncate the `courses` table to undo the seeding
    await queryInterface.sequelize.query('TRUNCATE TABLE courses;');
  }
};
