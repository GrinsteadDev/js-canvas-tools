class v4 {
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || -1;
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
    get a() {
        return this.w;
    }
    set a(val) {
        this.w = val;
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
    get q() {
        return this.w;
    }
    set q(val) {
        this.w = val;
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
    get 3() {
        return this.w;
    }
    set 3(val) {
        this.w = val;
    }
    get count() {
        return 4;
    }
    get length() {
        return this.count;
    }

    copy() {
        return new this.constructor(this.x, this.y, this.z, this.w);
    }
    toArray(arr = [], offset = 0) {
        arr[offset] = this.x;
        arr[offset + 1] = this.y;
        arr[offset + 2] = this.z;
        arr[offset + 3] = this.w;

        return arr;
    }
    fromArray(arr, offset = 0) {
        this.x = arr[offset];
        this.y = arr[offset + 1];
        this.z = arr[offset + 2];
        this.w = arr[offset + 3];
    }
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w = this.w));
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}

export { v4 };