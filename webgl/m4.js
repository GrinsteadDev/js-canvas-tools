class m4 {
    constructor() {
        Object.assign(
            this,
            [
                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1
            ]
        );
    }
    get count() { return 16; }
    get length() { return this.count; }
    set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        this[0] = n11; this[4] = n12; this[8] = n13; this[12] = n14;
        this[1] = n21; this[5] = n22; this[9] = n23; this[13] = n24;
        this[2] = n31; this[6] = n32; this[10] = n33; this[14] = n34;
        this[3] = n41; this[7] = n42; this[11] = n43; this[15] = n44;
    }
    identity() {
        this.set(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        )
    }
    copy() {
        return new this.constructor().fromArray(this.toArray());
    }
    toArray(arr = [], offset = 0) {
        arr[offset] = this[0]; arr[offset + 4] = this[4]; arr[offset + 8] = this[8]; arr[offset + 12] = this[12];
        arr[offset + 1] = this[1]; arr[offset + 5] = this[5]; arr[offset + 9] = this[9]; arr[offset + 13] = this[13];
        arr[offset + 2] = this[2]; arr[offset + 6] = this[6]; arr[offset + 10] = this[10]; arr[offset + 14] = this[14];
        arr[offset + 3] = this[3]; arr[offset + 7] = this[7]; arr[offset + 11] = this[11]; arr[offset + 15] = this[15];

        return arr;
    }
    fromArray(arr, offset = 0) {
        this[0] = arr[offset]; this[4] = arr[offset + 4]; this[8] = arr[offset + 8]; this[12] = arr[offset + 12];
        this[1] = arr[offset + 1]; this[5] = arr[offset + 5]; this[9] = arr[offset + 9]; this[13] = arr[offset + 13];
        this[2] = arr[offset + 2]; this[6] = arr[offset + 6]; this[10] = arr[offset + 10]; this[14] = arr[offset + 14];
        this[3] = arr[offset + 3]; this[7] = arr[offset + 7]; this[11] = arr[offset + 11]; this[15] = arr[offset + 15];
    }
    equals(m) {
        for(let i = 0; i < 16; i+=4) {
            let tf = (this[i] === m[i]) && (this[i + 1] === m[i + 1]) && (this[i + 2] === m[i + 2]) && (this[i + 3] === m[i + 3]);
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
        yield this[10];
        yield this[11];
        yield this[12];
        yield this[13];
        yield this[14];
        yield this[15];
    }
}

export { m4 };
