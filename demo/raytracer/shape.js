var RT = RT || {};

function Colour(r, g, b) {
    var that = {
        r: bounds(r, 0, 1),
        g: bounds(g, 0, 1),
        b: bounds(b, 0, 1)
    };

    that.add = function (col) {
        return Colour(that.r + col.r, that.g + col.g, that.b + col.b);
    };

    that.scalarMultiplication = function (s) {
        return Colour(that.r * s, that.g * s, that.b * s);
    };

    return that;
}

function Material(diffuse, reflect, specular) {
    return {
        diffuse: bounds(diffuse, 0, 1),
        reflect: bounds(reflect, 0, 1),
        specular: bounds(specular, 0, 1)
    }
}

function Shape(type, r, g, b, diffuse, reflect, specular) {
    return {
        id: -1,
        type: type,
        colour: Colour(r, g, b),
        material: Material(diffuse, reflect, specular)
    };
}