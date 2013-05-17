function Plane(point, normal, r, g, b, diffuse, reflect, specular) {
    var that = Shape('plane', r, g, b, diffuse, reflect, specular);

    that.point = point;
    that.normal = normal;

    return that;
}