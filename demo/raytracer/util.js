function getY(i, width) {
    return Math.floor(i / width);
}

function getX(i, width) {
    return i % width;
}

function min(a, b) {
    return a < b ? a : b;
}

function max(a, b) {
    return a > b ? a : b;
}

function bounds(a, mn, mx) {
    return max(mn, min(mx, a));
}