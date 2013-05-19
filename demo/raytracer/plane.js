function chessHack(x, z) {
    x = Math.round(x);
    z = Math.round(z);

    if ((x + z) % 2 === 0) {
        return Colour(0.3, 0.3, 0.3);
    } else {
        return Colour(0, 0, 0);
    }
}

function Plane(point, normal, r, g, b, diffuse, reflect, specular) {
    var that = Shape('plane', r, g, b, diffuse, reflect, specular);

    that.point = point;
    that.normal = normal;

    return that;
}