importScripts(
    'util.js',
    'vector.js',
    'ray.js',
    'shape.js',
    'sphere.js',
    'plane.js',
    'light.js',
    'intersection.js',
    'world.js',
    'camera.js',
    'trace.js',
    'render.js'
);

self.addEventListener('message', function(e) {
    var obj,
        camera,
        world;

    obj = JSON.parse(e.data);
    obj.world.blurg = 'hej';

    camera = Camera();
    camera.fromCopy(obj.camera);

    RT.world.addLight(Light(camera.pos.copy(), 0.75));
    render(obj.pixelsPerRay, camera, null, function (matrix) {
        self.postMessage(JSON.stringify(matrix));
    });

}, false);
