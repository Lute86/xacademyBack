'use strict';

/** @type {import('sequelize-cli').Migration} */
const queriesSeed = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    reason: 'Enrollment',
    description: 'Interested in the Python Programming course.',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    reason: 'Information',
    description: 'Looking for details about the History of Art course.',
  },
  {
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    reason: 'Payment',
    description: 'Issue with the payment for the Photography Basics course.',
  },
  {
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    reason: 'Refund',
    description: 'Requesting a refund for the Introduction to Psychology course.',
  },
  {
    name: 'David Lee',
    email: 'david.lee@example.com',
    reason: 'Other',
    description: 'General inquiry about the Financial Management course.',
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('queries', queriesSeed, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('queries', null, {});
  },
};
