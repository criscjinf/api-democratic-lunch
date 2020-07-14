const { response } = require("express");

class ObjectList {
    constructor () {
        this.list = [];
    }
    push(object) {
        this.list.push(object);
    }
    find(func) {
        return this.list.find(func);
    }
    clear() {
        this.list.length = 0;
    }
    filter(filters) {
        return this.list.filter(el => el.checkFilters(filters));
    }
    remove(id) {
        this.list = this.list.filter(el => el.id !== id);
    }
    get length () {
        return this.list.length
    }
    forEach(func) {
        this.list.forEach(func);
    };
}

module.exports = ObjectList