var V = {
    crossProduct: function (v1, v2) {
        return Vector(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        );
    },
    dotProduct: function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    },
    scalarMultiplication: function (v, s) {
        return Vector(v.x * s, v.y * s, v.z * s);
    },
    add: function (v1, v2) {
        return Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    },
    subtract: function (v1, v2) {
        return Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    },
    reflect: function (v, normal) {
        var scalar;

        scalar = 2 * V.dotProduct(v, normal);
        return V.subtract(v, V.scalarMultiplication(normal, scalar));
    },
    copy: function (v) {
        return Vector(v.x, v.y, v.z);
    }
};

function Vector (x, y, z) {
    var that = {
        x: x,
        y: y,
        z: z
    };

    that.magnitude = function () {
        return Math.sqrt(that.x * that.x + that.y * that.y + that.z * that.z);
    };

    // cheaper than magnitude, sometimes useful for comparisons.
    that.magnitudeSquared = function() {
        return that.x * that.x + that.y * that.y + that.z * that.z;
    }

    that.normalised = function () {
        var m = that.magnitude();

        return Vector(that.x / m, that.y / m, that.z / m);
    }

    that.toString = function () {
        return '(' + that.x + ', ' + that.y + ', ' + that.z + ')';
    }

    that.copy = function () {
        return Vector(that.x, that.y, that.z);
    }

    return that;
}
