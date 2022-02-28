class m2 {
    constructor() {
        Object.assign(
            this,
            [
                1,0,
                0,1
            ]
        );
    }
    get count() { return 4; }
    get length() { return this.count; }
    set(n11, n12, n21, n22) {
        this[0] = n11; this[2] = n12;
        this[1] = n21; this[3] = n22;
    }
    identity() {
        this.fromArray([
            1,0,
            0,1
        ]);
    }
    copy() {
        return new this.constructor().fromArray(this.toArray());
    }
    toArray(arr = [], offset = 0) {
        arr[offset] = this[0]; arr[offset + 2] = this[2];
        arr[offset + 1] = this[1]; arr[offset + 3] = this[3];

        return arr;
    }
    fromArray(arr, offset = 0) {
        this[0] = arr[offset]; this[2] = arr[offset + 2];
        this[1] = arr[offset + 1]; this[3] = arr[offset + 3];
    }
    equals(m) {
        for(let i = 0; i < 9; i+=2) {
            let tf = (this[i] === m[i]) && (this[i + 1] === m[i + 1]);
            if (!tf) { return false; }
        }
        return true;
    }
    *[Symbol.iterator]() {
        yield this[0];
        yield this[1];
        yield this[2];
        yield this[3];
    }
}

export { m2 };
