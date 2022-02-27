class v3 {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
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
    get b() {
        return this.z;
    }
    set b(val) {
        this.z = val;
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
    get p() {
        return this.z;
    }
    set p(val) {
        this.z = val;
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
    get 2() {
        return this.z;
    }
    set 2(val) {
        this.z = val;
    }
    get count() {
        return 3;
    }
    get length() {
        return this.count;
    }

    copy() {
        return new this.constructor(this.x, this.y, this.z);
    }
    toArray(arr = [], offset = 0) {
        arr[offset] = this.x;
        arr[offset + 1] = this.y;
        arr[offset + 2] = this.z;

        return arr;
    }
    fromArray(arr, offset = 0) {
        this.x = arr[offset];
        this.y = arr[offset + 1];
        this.z = arr[offset + 2];
    }
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}

export { v3 };