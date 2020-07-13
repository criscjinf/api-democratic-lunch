const { response } = require("express");

class ObjectBase {
    constructor (list, locked_props) {
        this.lockedProperties = ['id'];
        this.id = list.length +1;
        if (Array.isArray(locked_props)) {
            this.lockedProperties = this.lockedProperties.concat(locked_props);
        };
        list.push(this)
    }
    updateProps(patchObj) {
        if (typeof patchObj === "object") {
            for (let [key, value] of Object.entries(patchObj)) {
                if (this.hasOwnProperty(key) && (!(key in this.lockedProperties))) {
                    this[key] = value
                }
            }
        }
    }
    checkFilters(filters) {
        response = true
        if (typeof filters === "object") {
            for (let [key, value] of Object.entries(filters)) {
                response = this.hasOwnProperty(key) ? this[key] === value : false
                if (!response) {
                    break
                }
            }
        }
        return response
    }
}

module.exports = ObjectBase