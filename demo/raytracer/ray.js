function Ray(pos, dir) {
    var that = {
        pos: pos,
        dir: dir.normalised()
    };

    return that;
}