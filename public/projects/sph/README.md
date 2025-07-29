
# Real-Time 2D and 3D PCISPH Simulation


> Developed by [Vinni Yu](mailto:vinni.yu@yale.edu) for the course: CPSC 510 – Yale University


This project implements the **Predictive-Corrective Incompressible Smoothed Particle Hydrodynamics (PCISPH)** algorithm for real-time 2D and 3D fluid simulation using C++ and OpenGL compute shaders.

Inspired by the work of Solenthaler and Pajarola ([SIGGRAPH 2009](https://dl.acm.org/doi/10.1145/1576246.1531386)) and the visual presentation style of [Sebastian Lague](https://www.youtube.com/c/SebastianLague), the goal of this project is to simulate visually plausible incompressible fluids interactively.

## Visual Goals

- Preserve fine-scale detail: wave formation, vorticity
- Simulate interaction between separate fluid bodies (e.g., falling droplet)
- Achieve **real-time performance** using GPU acceleration

## Methods & Technologies

- **Language:** C++
- **GPU Acceleration:** OpenGL Compute Shaders (GLSL)
- **Libraries:** GLEW, GLUT, GLM
- **Rendering:** OpenGL

## Simulations

### 2D PCISPH

- Real-time simulation of **10,000+ particles**
- Velocity-based color visualization
- Interactive forces via mouse input
- Demonstrated:
  - Wave crest formation
  - Droplet separation due to surface tension

[2D Simulation Demo Video](https://youtu.be/zWA2uFg8j7A)

[2D Simulation with Obstacle Video](https://youtu.be/4w7wNmXhhXE)

### 3D PCISPH

- Real-time simulation of **50,000 particles**
- Demonstrated:
  - Wave crests in 3D space
  - Volumetric droplet formation
  - Interaction with moving obstacles

[3D Simulation Demo Video](https://youtu.be/1cPcrhKmVzg)

[3D Simulation with Obstacle Video](https://youtu.be/oFU8CH1kP5M)

## Biggest Roadblock

The original paper omitted the **viscosity term**, which led to unstable, erratic particle behavior. Adding viscosity significantly improved fluid coherence and stability.

📺 [Demo Video without Viscosity](https://youtu.be/mQjOX1eMD2E)

## Future Work

- Implement **neighborhood search** to reduce time complexity (currently O(n²))
- Improve **boundary conditions**
- Explore **ray-marched rendering** and surface effects (foam/spray)
- Enhance **scene geometry** and environment interactions
- Add **thermal and material properties** (e.g., lava cooling effects)

## References

1. **Solenthaler & Pajarola.** _Predictive-Corrective Incompressible SPH_, SIGGRAPH 2009
2. **Sebastian Lague.** _Simulating Fluids_ – [YouTube Channel](https://www.youtube.com/c/SebastianLague)
3. **Bridson.** _Smoothed Particle Hydrodynamics (SPH)_, SIGGRAPH Course Notes, 2015

---

_This project was developed as the final assignment for CPSC 510. I had a lot of fun building it and look forward to extending it further._
