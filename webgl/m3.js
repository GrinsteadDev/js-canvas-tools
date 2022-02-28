class m3 {
    constructor() {
        Object.assign(
            this,
            [
                1,0,0,
                0,1,0,
                0,0,1
            ]
        );
    }
    get count() { return 9; }
    get length() { return this.count; }
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        this[0] = n11; this[3] = n12; this[6] = n13;
        this[1] = n21; this[4] = n22; this[7] = n23;
        this[2] = n31; this[5] = n32; this[8] = n33;
    }
    identity() {
        this.set(
            1,0,0,
            0,1,0,
            0,0,1
        )
    }
    copy() {
        return new this.constructor().fromArray(this.toArray());
    }
    toArray(arr = [], offset = 0) {
        arr[offset] = this[0]; arr[offset + 3] = this[3]; arr[offset + 6] = this[6];
        arr[offset + 1] = this[1]; arr[offset + 4] = this[4]; arr[offset + 7] = this[7];
        arr[offset + 2] = this[2]; arr[offset + 5] = this[5]; arr[offset + 8] = this[8];

        return arr;
    }
    fromArray(arr, offset = 0) {
        this[0] = arr[offset]; this[3] = arr[offset + 3]; this[6] = arr[offset + 6];
        this[1] = arr[offset + 1]; this[4] = arr[offset + 4]; this[7] = arr[offset + 7];
        this[2] = arr[offset + 2]; this[5] = arr[offset + 5]; this[8] = arr[offset + 8];
    }
    equals(m) {
        for(let i = 0; i < 9; i+=3) {
            let tf = (this[i] === m[i]) && (this[i + 1] === m[i + 1]) && (this[i + 2] === m[i + 2]);
            if (!tf) { return false; }
        }
        return true;
    }
    *[Symbol.iterator]() {
        yield this[0];
        yield this[1];
        yield this[2];
        yield this[3];
        yield this[4];
        yield this[5];
        yield this[6];
        yield this[7];
        yield this[8];
        yield this[9];
    }
}

export { m3 };
