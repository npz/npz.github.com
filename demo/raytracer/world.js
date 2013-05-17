var RT = RT || {};

RT.world = (function () {
    var ambient,
        index;

    index = 0;

    var that = {
        shapes: [],
        addShapes: function (shape) {
            that.shapes[index] = shape;
            shape.id = index;
            index += 1;
        },
        lights: [],
        addLight: function (light) {
            that.lights.push(light);
        },
        setAmbient: function (amb) {
            ambient = bounds(amb, 0, 1);
        },
        getAmbient: function () {
            return ambient;
        }
    };

    return that;
}());

RT.world.setAmbient(0.2);
RT.world.addShapes(Sphere(Vector(5, 1, 1.1), 1, 1.0, 0.2, 0.6, 0.8, 0.25, 0.5));
RT.world.addShapes(Sphere(Vector(5, 1.2, -1.7), 1.2, 0.7, 0.3, 0.0, 1.0, 0.25, 0.5));
RT.world.addShapes(Sphere(Vector(7, 0.9, 0), 0.9, 0.5, 0.2, 0.7, 1.0, 0.25, 0.5));
RT.world.addShapes(Sphere(Vector(3, 0.7, 0), 0.7, 0.9, 0.2, 0.0, 0.8, 0.25, 0.5));
RT.world.addShapes(Plane(Vector(0, 0, 0), Vector(0, 1, 0), 0, 0, 0, 1, 0.5, 0));
RT.world.addLight(Light(Vector(5, 8, 0), 1.1));
