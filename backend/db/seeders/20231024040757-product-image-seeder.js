'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Product Images'

module.exports = {
  async up(queryInterface, Sequelize) {
    // TO DO
    const validProducts = [
      {
        productId: 1,
        image: 'Blank',
      }
    ]

    await queryInterface.bulkInsert(options, validProducts, {})

  },

  async down(queryInterface, Sequelize) {
    // TO DO
    await queryInterface.bulkDelete(options, {}, {});
  }
};
