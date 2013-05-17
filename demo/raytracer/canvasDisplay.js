function displayOnCanvas(matrix, width, res) {
    var canvas,
        context,
        i;

    canvas = document.getElementById('screen');
    context = canvas.getContext('2d');

    function drawDot(x, y, res, colour) {
        var drawX,
            drawY,
            r,
            g,
            b;

        drawX = x * res;
        drawY = y * res;
        r = Math.round(colour.r * 255);
        g = Math.round(colour.g * 255);
        b = Math.round(colour.b * 255);

        context.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        context.fillRect(drawX, drawY, res, res);
    }

    for (i = 0; i < matrix.length; i++) {
        drawDot(getX(i, width), getY(i, width), res, matrix[i]);
    }
}

var testMatrix = [
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1],
    [0, 1, 1, 0, 0, 0, 0, 0]
];
