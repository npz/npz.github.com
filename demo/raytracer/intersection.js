var RT = RT || {};

function Intersection(pos, distance, ray, normal, colour, material, id) {
    return {
        pos: pos,
        distance: distance,
        ray: ray,
        normal: normal,
        colour: colour,
        material: material,
        id: id
    };
}

RT.intersection = {

    sphereBool: function (ray, sphere) {
    /*
     * Geometrical intersection used as faster way of determining if, but not
     * where a hit occurs. used for shadowing.
     *
     * p = origin of ray
     * d = direction of ray
     * c = center of sphere
     * v = vector from p to c
     * ddv = dot product of d and v
     * pvd = projection of v on d
     */

    var p,
        d,
        c,
        v,
        ddv,
        pvd,
        pc,
        dst2;

    p = ray.pos;
    d = ray.dir;
    c = sphere.pos;
    v = V.subtract(c, p);

    ddv = V.dotProduct(d, v);
    if (ddv < 0) {
        return false;
    }

    // project v onto d. d is a unit vector, so no division is needed.
    pvd = V.scalarMultiplication(d, ddv);
    pc = V.add(p, pvd);
    dst2 = V.subtract(c, pc).magnitudeSquared();

    if (dst2 > sphere.rad * sphere.rad) {
        return false;
    }
    return true

    // compute position of hit.
/*
    pos = RT.V.add(ray.pos, RT.V.scalarMultiplication(ray.dir, t));
    normal = RT.V.subtract(sphere.pos, pos).normalised();
    return Intersection(pos, normal, sphere.colour, sphere.material, sphere.id);
*/
    },

    sphere: function (ray, sphere) {
        /*
         * Analytical intersection
         *
         */

        var a,
            b,
            c,
            discriminant,
            discSqrt,
            normal,
            pos,
            q,
            t,
            t0,
            t1,
            temp,
            tPos;

        tPos = V.subtract(ray.pos, sphere.pos);
        a = V.dotProduct(ray.dir, ray.dir);
        b = 2 * V.dotProduct(ray.dir, tPos);
        c = V.dotProduct(tPos, tPos) - sphere.rad * sphere.rad;

        discriminant = b * b - 4 * a * c;

        if (discriminant < 0) {
            return false;
        }

        discSqrt = Math.sqrt(discriminant);
        q = b < 0 ?
            (-b - discSqrt) / 2 :
            (-b + discSqrt);

        t0 = q / a;
        t1 = c / q;

        if (t0 > t1) {
            temp = t1;
            t1 = t0;
            t0 = temp;
        }

        if (t1 < 0) {
            return false;
        }

        t = t0 > 0 ? t0 : t1;

        pos = V.add(ray.pos, V.scalarMultiplication(ray.dir, t));
        normal = V.subtract(pos, sphere.pos).normalised();
        return Intersection(pos, t, ray, normal, sphere.colour, sphere.material, sphere.id);
    },

    plane: function (ray, plane) {
        var d,
            normal,
            pos,
            t,
            col;

        d = V.dotProduct(ray.dir, plane.normal);
        if (d === 0) {
            return false;
        }
        t = V.dotProduct(V.subtract(plane.point, ray.pos), plane.normal) / d;
        if (t < 0) {
            return false;
        }
        pos = V.add(ray.pos, V.scalarMultiplication(ray.dir, t));
        normal = d < 0 ?
            plane.normal :
            V.scalarMultiplication(plane.normal, -1);


        // horrible chess hack goes here:
        col = chessHack(pos.x, pos.z);

        return Intersection(pos, t, ray, normal, col, plane.material, plane.id);
    }
}