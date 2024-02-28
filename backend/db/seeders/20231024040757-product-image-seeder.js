'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // TO DO


    await queryInterface.bulkInsert(options, validProducts, {})

  },

  async down(queryInterface, Sequelize) {
    // TO DO
    await queryInterface.bulkDelete(options, {}, {});
  }
};
