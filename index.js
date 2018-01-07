class DataBuilder {
    constructor() {
        this.obj = {};
    }

    build() {
        return copy(this.obj);
    }

    with(key, value) {
        if(arrays(this.obj[key], value)) {
            this.obj[key] = this.obj[key].concat(value);
        } else if(plainObjects(this.obj[key], value)) {
            this.obj[key] = copy(value, this.obj[key]);
        } else if(value instanceof Object) {
            this.obj[key] = copy(value);
        } else {
            this.obj[key] = value;
        }

        return this;
    }
}

function copy(obj, target = obj instanceof Array ? [] : {}) {
    for(let prop in obj) {
        if(obj[prop] instanceof Object) {
            target[prop] = copy(obj[prop]);
        } else {
            target[prop] = obj[prop];
        }
    }

    return target;
}

function arrays(obj1, obj2) {
    return obj1 instanceof Array && obj2 instanceof Array;
}

function plainObjects(obj1, obj2) {
    return obj1 instanceof Object && obj2 instanceof Object && obj1.constructor === obj2.constructor;
}

module.exports = DataBuilder;