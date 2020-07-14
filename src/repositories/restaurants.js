const ObjectBase = require('../classes/objectBase');
const ObjectList = require('../classes/objectList');

const restaurants = new ObjectList();
class Restaurant extends ObjectBase {
    constructor (name, address, phone) {
        super(restaurants, [
            'locked',
            'howManyTimeHaveWeBeen',
            'lastDayHaveWeBeen',
            'lockedProperties'
        ]);
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.locked = false;
        this.howManyTimeHaveWeBeen = 0;
        this.lastDayHaveWeBeen = null;
    }
    setElect() {
        this.locked = true;
        this.howManyTimeHaveWeBeen += 1;
        this.lastDayHaveWeBeen =  new Date().toLocaleDateString();
    }
}

module.exports = { restaurants, Restaurant }