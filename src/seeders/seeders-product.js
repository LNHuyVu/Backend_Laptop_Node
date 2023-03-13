'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Products', [{
      name:'SP1',
      slug: 'sp1',
      catid:'99',
      typeid:'88',
      img:'sp1.jpg',
      cpu:'Core I9100H',
      ram:'16GB',
      hdrive:'512GB',
      card:'GTX 3080',
      screen:'15,6 inch',
      system:'Hệ điều hành Windown 11 Pro',
      detail:'detail',
      number:10,
      sold:10,
      price:555,
      pricesale:444,
      statussale:0,
      status:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
