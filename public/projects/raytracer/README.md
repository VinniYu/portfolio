
# CPSC 478/578 Ray Tracer – Custom Renderer

This project is a custom ray tracer built from scratch for CPSC 478/578 at Yale University. It features key components of a physically-based rendering system, including ray-sphere intersection, Phong lighting, shadows, reflections, refractions, triangle intersection, and Mandelbrot set texturing.

Unfortunately, because this code was written for a class assignment, I cannot make it open source.

## Features

This renderer supports the following:

- Eye ray generation and debug visualization
- Ray-sphere and ray-triangle intersection
- Diffuse and specular shading (Phong)
- Shadow casting from multiple light sources
- Reflections and refractions with recursive ray tracing
- Fresnel blending for reflective/refractive materials
- Texturing with a procedurally generated Mandelbrot set

---

## Eye Ray Generation

Implemented by computing normalized direction vectors from the camera origin to the near plane. Used debug images to visualize the x and y components.

**Screenshot: Eye Ray – X Component**
![1x.jpg](/projects/raytracer/images/1x.jpg)

**Screenshot: Eye Ray – Y Component**
![1y.jpg](/projects/raytracer/images/1y.jpg)

---

## Ray-Sphere Intersection

Ray-sphere intersection is implemented using the quadratic formula, solving for roots to determine valid hit points.

**Screenshot: Scene Intersection (Ray-Sphere)**
![2.jpg](/projects/raytracer/images/2.jpg)

---

## Phong Shading

Implemented diffuse and specular shading using the Phong model. Also supports multiple light sources with additive lighting.

**Screenshot: Diffuse Shading**
![3.jpg](/projects/raytracer/images/3.jpg)

**Screenshot: Multiple Light Sources**
![4.jpg](/projects/raytracer/images/4.jpg)

**Screenshot: Specular Highlights**
![5.jpg](/projects/raytracer/images/5.jpg)

---

## Shadows

Used secondary rays to check if surfaces are occluded from the light source. Implemented shadow acne fix using a small ray origin offset.

**Screenshot: Shadows**
![6.jpg](/projects/raytracer/images/6.jpg)

---

## Reflection and Refraction

Added recursive ray tracing for mirror-like reflections and refraction through transparent materials. Handles total internal reflection and material IOR.

**Screenshot: Reflection**
![7.jpg](/projects/raytracer/images/7.jpg)

**Screenshot: Refraction**
![8.jpg](/projects/raytracer/images/8.jpg)

**Screenshot: Fresnel Effects**
![9.jpg](/projects/raytracer/images/9.jpg)

---

## Triangle Intersection

Supports ray-triangle intersection using Möller-Trumbore algorithm. Allows for reflective planar geometry.

**Screenshot: Triangle Intersection**
![10.jpg](/projects/raytracer/images/10.jpg)

**Screenshot: Reflection on Triangle**
![11.jpg](/projects/raytracer/images/11.jpg)

---

## Mandelbrot Set Texturing

Procedurally generates a Mandelbrot fractal and maps it to a quad surface via barycentric interpolation.

**Screenshot: Mandelbrot Texturing**
![12.jpg](/projects/raytracer/images/12.jpg)

---


