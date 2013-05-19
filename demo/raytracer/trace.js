function shade(intersection, reflections) {
    var colour,
        i,
        intensity,
        j,
        light,
        lightVec,
        lightReflection,
        reflectionColour,
        reflectionDir,
        reflectionRay,
        shadowed,
        shadowRay,
        shape;

    // ambient lighting
    colour = intersection.colour.scalarMultiplication(RT.world.getAmbient());

    for (i = 0; i < RT.world.lights.length; i += 1) {
        light = RT.world.lights[i];
        lightVec = V.subtract(light.pos, intersection.pos).normalised();

        // determine if light source is blocked or not.
        shadowed = false;
        for (j = 0; j < RT.world.shapes.length && !shadowed; j += 1) {
            if (j !== intersection.id) {

                shape = RT.world.shapes[j];

                shadowRay = Ray(intersection.pos, lightVec);

                if (shape.type === 'sphere') {
                    if (RT.intersection.sphereBool(shadowRay, shape)) {
                        shadowed = true;
                    }
                } else if (shape.type === 'plane') {
                    if (RT.intersection.plane(shadowRay, shape)) {
                        shadowed = true;
                    }
                }
            }
        }

        if (!shadowed) {
            // diffuse lighting.
            if (intersection.material.diffuse) {
                intensity = V.dotProduct(lightVec, intersection.normal);
                if (intensity > 0) {
                    intensity *= intersection.material.diffuse;
                    intensity *= light.intensity;
                    colour = colour.add(
                        intersection.colour.scalarMultiplication(intensity));
                }
            }

            // specular lighting.
            if (intersection.material.specular) {
                lightReflection = V.reflect(lightVec, intersection.normal);
                intensity = V.dotProduct(intersection.ray.dir,
                    lightReflection);

                if (intensity > 0) {
                    intensity = Math.pow(intensity, 40);
                    intensity *= intersection.material.specular *
                        light.intensity;

                    colour = colour.add(
                        intersection.colour.scalarMultiplication(intensity));
                }
            }
        }

        // reflective lighting.
        if (intersection.material.reflect && reflections > 0) {
            reflectionDir = V.reflect(intersection.ray.dir,
                intersection.normal);
            reflectionRay = Ray(intersection.pos, reflectionDir);

            reflectionColour = trace(reflectionRay,
                reflections - 1,
                intersection.id);

            colour = colour.add(reflectionColour.scalarMultiplication(
                intersection.material.reflect));
        }

    }

    return colour;
}

function trace(ray, reflections, ignore) {
    var closestDistance,
        closestIntersection,
        i,
        intersection,
        shape;

    closestDistance = Infinity;

    for (i = 0; i < RT.world.shapes.length; i++) {
        shape = RT.world.shapes[i];

        if (ignore === undefined || shape.id !== ignore) {
            if (shape.type === 'sphere') {
                intersection = RT.intersection.sphere(ray, shape);
            } else if (shape.type === 'plane') {
                intersection = RT.intersection.plane(ray, shape);
            }

            if (intersection) {
                if (intersection.distance < closestDistance) {
                    closestDistance = intersection.distance;
                    closestIntersection = intersection;
                }
            }
        }
    }

    if (closestIntersection) {
        return shade(closestIntersection, reflections);
    } else {
        return Colour(0, 0, 0);
    }
}