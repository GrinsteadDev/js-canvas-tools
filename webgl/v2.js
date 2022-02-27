class v2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    get r() {
        return this.x;
    }
    set r(val) {
        this.x = val;
    }
    get g() {
        return this.y;
    }
    set g(val) {
        this.y = val;
    }
    get s() {
        return this.x;
    }
    set s(val) {
        this.x = val;
    }
    get t() {
        return this.y;
    }
    set t(val) {
        this.y = val;
    }
    get 0() {
        return this.x;
    }
    set 0(val) {
        this.x = val;
    }
    get 1() {
        return this.y;
    }
    set 1(val) {
        this.y = val;
    }
    get count() {
        return 2;
    }
    get length() {
        return this.count;
    }

    copy() {
        return new this.constructor(this.x, this.y);
    }
    toArray(arr = [], offset = 0) {
        arr[offset] = this.x;
        arr[offset + 1] = this.y;

        return arr;
    }
    fromArray(arr, offset = 0) {
        this.x = arr[offset];
        this.y = arr[offset + 1];
    }
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y));
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}

export { v2 };