/**
 * Multiplies two 4x4 matrixes
 * @param {m4} ma 
 * @param {m4} mb 
 * @returns {Array}
 */
function multiplyMx4(ma, mb) {
    var out = new Array(16);

    let a00 = ma[0], a01 = ma[1], a02 = ma[2], a03 = ma[3];
    let a10 = ma[4], a11 = ma[5], a12 = ma[6], a13 = ma[7];
    let a20 = ma[8], a21 = ma[9], a22 = ma[10], a23 = ma[11];
    let a30 = ma[12], a31 = ma[13], a32 = ma[14], a33 = ma[15];

    let b00 = mb[0], b01 = mb[1], b02 = mb[2], b03 = mb[3];
    let b10 = mb[4], b11 = mb[5], b12 = mb[6], b13 = mb[7];
    let b20 = mb[8], b21 = mb[9], b22 = mb[10], b23 = mb[11];
    let b30 = mb[12], b31 = mb[13], b32 = mb[14], b33 = mb[15];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    out[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    out[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    out[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    out[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    out[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    out[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    out[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    out[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    out[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    out[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    out[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    out[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    out[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

    return out;
}
/**
 * Multiplies two 3x3 matrixes
 * @param {m3} ma 
 * @param {m3} mb 
 * @returns {Array}
 */
function multiplyMx3(ma, mb) {
    var out = new Array(9);

    let a00 = ma[0], a01 = ma[1], a02 = ma[2];
    let a10 = ma[3], a11 = ma[4], a12 = ma[5];
    let a20 = ma[6], a21 = ma[7], a22 = ma[8];

    let b00 = mb[0], b01 = mb[1], b02 = mb[2];
    let b10 = mb[3], b11 = mb[4], b12 = mb[5];
    let b20 = mb[6], b21 = mb[7], b22 = mb[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;

    return out;
}
/**
 * Multiplies two 2x2 matrixes
 * @param {m2} ma 
 * @param {m2} mb 
 * @returns {Array}
 */
function multiplyMx2(ma, mb) {
    var out = Array(4);

    let a00 = ma[0], a01 = ma[1];
    let a10 = ma[2], a11 = ma[3];

    let b00 = mb[0], b01 = mb[1];
    let b10 = mb[2], b11 = mb[3];

    out[0] = b00 * a00 + b01 * a10;
    out[1] = b00 * a01 + b01 * a11;
    out[2] = b10 * a00 + b11 * a10;
    out[3] = b10 * a01 + b11 * a11;

    return out;
}
/**
 * 
 * @param {m4} m 
 * @returns {Array}
 */
function inverseMx4(m) {
    var out = new Array(16);

    let m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
    let m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
    let m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
    let m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];

    /* based on https://stackoverflow.com/questions/1148309/inverting-a-4x4-matrix */
    let A2323 =  m22 *  m33 -  m23 *  m32;
    let A1323 =  m21 *  m33 -  m23 *  m31;
    let A1223 =  m21 *  m32 -  m22 *  m31;
    let A0323 =  m20 *  m33 -  m23 *  m30;
    let A0223 =  m20 *  m32 -  m22 *  m30;
    let A0123 =  m20 *  m31 -  m21 *  m30;
    let A2313 =  m12 *  m33 -  m13 *  m32;
    let A1313 =  m11 *  m33 -  m13 *  m31;
    let A1213 =  m11 *  m32 -  m12 *  m31;
    let A2312 =  m12 *  m23 -  m13 *  m22;
    let A1312 =  m11 *  m23 -  m13 *  m21;
    let A1212 =  m11 *  m22 -  m12 *  m21;
    let A0313 =  m10 *  m33 -  m13 *  m30;
    let A0213 =  m10 *  m32 -  m12 *  m30;
    let A0312 =  m10 *  m23 -  m13 *  m20;
    let A0212 =  m10 *  m22 -  m12 *  m20;
    let A0113 =  m10 *  m31 -  m11 *  m30;
    let A0112 =  m10 *  m21 -  m11 *  m20;

    let det =  m00 * (m11 * A2323 -  m12 * A1323 +  m13 * A1223) 
            -  m01 * (m10 * A2323 -  m12 * A0323 +  m13 * A0223) 
            +  m02 * (m10 * A1323 -  m11 * A0323 +  m13 * A0123) 
            -  m03 * (m10 * A1223 -  m11 * A0223 +  m12 * A0123);

    out[0] = (m11 * A2323 -  m12 * A1323 +  m13 * A1223) / det;
    out[1] = -(m01 * A2323 -  m02 * A1323 +  m03 * A1223) / det;
    out[2] = (m01 * A2313 -  m02 * A1313 +  m03 * A1213) / det;
    out[3] = -(m01 * A2312 -  m02 * A1312 +  m03 * A1212) / det;
    out[4] = -(m10 * A2323 -  m12 * A0323 +  m13 * A0223) / det;
    out[5] = (m00 * A2323 -  m02 * A0323 +  m03 * A0223) / det;
    out[6] = -(m00 * A2313 -  m02 * A0313 +  m03 * A0213) / det;
    out[7] = (m00 * A2312 -  m02 * A0312 +  m03 * A0212) / det;
    out[8] = (m10 * A1323 -  m11 * A0323 +  m13 * A0123) / det;
    out[9] = -(m00 * A1323 -  m01 * A0323 +  m03 * A0123) / det;
    out[10] = (m00 * A1313 -  m01 * A0313 +  m03 * A0113) / det;
    out[11] = -(m00 * A1312 -  m01 * A0312 +  m03 * A0112) / det;
    out[12] = -(m10 * A1223 -  m11 * A0223 +  m12 * A0123) / det;
    out[13] = (m00 * A1223 -  m01 * A0223 +  m02 * A0123) / det;
    out[14] = -(m00 * A1213 -  m01 * A0213 +  m02 * A0113) / det;
    out[15] = (m00 * A1212 -  m01 * A0212 +  m02 * A0112) / det;

    return out;
}
/**
 * 
 * @param {m3} m 
 * @returns {Array}
 */
function inverseMx3(m) {
    var out = Array(9);

    let m00 = m[0], m01 = m[1], m02 = m[2];
    let m10 = m[3], m11 = m[4], m12 = m[5];
    let m20 = m[6], m21 = m[7], m22 = m[8];

    let det = m00 * m11 * m22 + m01 * m12 * m20 + m02 * m10 * m21 - m00 * m12 * m21 - m01 * m10 * m22 - m02 * m11 * m20;

    out[0] = (m11 * m22 - m12 * m21) / det;
    out[1] = (m02 * m21 - m01 * m22) / det;
    out[2] = (m01 * m12 - m02 * m11) / det;
    out[3] = (m12 * m20 - m10 * m22) / det;
    out[4] = (m00 * m22 - m02 * m20) / det;
    out[5] = (m02 * m10 - m00 * m12) / det;
    out[6] = (m10 * m21 - m11 * m20) / det;
    out[7] = (m01 * m20 - m00 * m21) / det;
    out[8] = (m00 * m11 - m01 * m10) / det;

    return out;
}
/**
 * 
 * @param {m2} m 
 * @returns {Array}
 */
 function inverseMx2(m) {
    var out = Array(4);

    let m00 = m[0], m01 = m[1];
    let m10 = m[2], m11 = m[3];

    let det = m00 * m11 - m01 * m10;

    out[0] = m11 / det;
    out[1] = -m01 / det;
    out[2] = -m10 / det;
    out[3] = m00 / det;

    return out;
}

export { multiplyMx4, multiplyMx3, multiplyMx2, inverseMx4, inverseMx3, inverseMx2 };
