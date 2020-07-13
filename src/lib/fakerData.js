const factory = require("../../__tests__/factories");

const faker = (() => {
    let i;
    for (i = 0; i < 10; i++) {
        factory.newEmployer();
        factory.newRestaurant();
    }
}) ()

module.exports = faker
