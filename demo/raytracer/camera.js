var RT = RT || {};

function Camera() {
    var that,
        direction,
        xAxis,
        yAxis;

    that = {
        pos: null,
        lookAt: null,
        sky: null,
        width: null,
        height: null,
        angle: null
    };

    that.castRayStraight = function(x, y, maxX, maxY) {
        var rayPos,
            xScalar,
            yScalar;

        rayPos = that.pos.copy();

        xScalar = (1 - 2 * (x / (maxX))) * that.width;
        yScalar = (1 - 2 * (y / (maxY))) * that.height;

        rayPos = V.add(rayPos, V.scalarMultiplication(xAxis, xScalar));
        rayPos = V.add(rayPos, V.scalarMultiplication(yAxis, yScalar));

        return Ray(rayPos, direction.copy());
    }

    that.castRayCone = function(x, y, maxX, maxY) {
        var rayDir,
            xScalar,
            yScalar,
            tan;

        tan = Math.tan(that.angle / 2);

        xScalar = tan * (1 - 2 * (x / (maxX)));
        yScalar = tan * (1 - 2 * (y / (maxY)));

        rayDir = direction.copy();

        rayDir = V.add(rayDir, V.scalarMultiplication(xAxis, xScalar));
        rayDir = V.add(rayDir, V.scalarMultiplication(yAxis, yScalar));

        return Ray(V.copy(that.pos), rayDir.normalised());
    }

    that.update = function() {
        direction = V.subtract(that.lookAt, that.pos).normalised();

        xAxis = V.crossProduct(that.sky, direction).normalised();
        yAxis = V.crossProduct(direction, xAxis).normalised();
    }

    that.fromCopy = function(camCopy) {
        that.pos = V.copy(camCopy.pos);
        that.lookAt = V.copy(camCopy.lookAt);
        that.sky = V.copy(camCopy.sky);
        that.width = camCopy.width;
        that.height = camCopy.height;
        that.angle = camCopy.angle;

        that.update();
    }

    return that;
};

RT.camera = Camera();