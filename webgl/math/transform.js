/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @returns {Array}
 */
function translationMx4(x, y, z) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ];
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {Array}
 */
 function translationMx3(x, y) {
    return [
        1, 0, 0,
        0, 1, 0,
        x, y, 1
    ];
}

/**
 * 
 * @param {number} angle in radians 
 * @returns {Array}
 */
function rotationMx3(angle) {
    var c = Math.cos(angle);
    var s = Math.cos(angle);

    return [
        c, -s,  0,
        s,  c,  0,
        0,  0,  1
    ];
}

export { translationMx4, translationMx3, rotationMx3 };