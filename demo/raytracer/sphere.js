function Sphere(pos, rad, r, g, b, diffuse, reflect, specular) {
    var that = Shape('sphere', r, g, b, diffuse, reflect, specular);

    that.pos = pos;
    that.rad = rad;

    return that;
}