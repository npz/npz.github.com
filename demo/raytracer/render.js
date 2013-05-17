function render(pixelsPerRay, camera, controller, success, abort) {
    var width,
        height,
        matrix,
        canvasSize,
        i;

    canvasSize = 512;
    width = canvasSize / pixelsPerRay;
    height = canvasSize / pixelsPerRay;

    matrix = [];
    for (i = 0; i < width * height && !(controller && controller.abort); i++) {
        matrix[i] = trace(camera.castRayCone(
            getX(i, width), getY(i, width), width - 1, height - 1), 1);
    }
    if (!(controller && controller.abort)) {
        success(matrix, width, pixelsPerRay);
    } else {
        abort();
    }
}

function incRender(camera, pixelsPerRay, minPPR, controller, done) {
    if (pixelsPerRay >= minPPR) {

        renderWithWorker(camera, pixelsPerRay, controller, function (pixels) {
            displayOnCanvas(pixels, 512 / pixelsPerRay, pixelsPerRay);

            pixelsPerRay = Math.floor(pixelsPerRay / 2);
            incRender(camera, pixelsPerRay, minPPR, controller, done);
        });
    } else {
        done();
    }
}

function renderWithWorker(camera, pixelsPerRay, controller, done) {
    var data,
        worker;

    worker = new Worker('worker.js');

    worker.addEventListener('message', function (e) {
        var pixels = JSON.parse(e.data);
        displayOnCanvas(pixels, 512 / pixelsPerRay, pixelsPerRay);

        if (!(controller && controller.abort)) {
            displayOnCanvas(pixels, 512 / pixelsPerRay, pixelsPerRay);
            done(pixels);
        }
    });

    data = {
        camera: camera,
        world: RT.world,
        pixelsPerRay: pixelsPerRay
    }

    worker.postMessage(JSON.stringify(data));
}