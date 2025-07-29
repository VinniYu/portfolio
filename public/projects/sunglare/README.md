# Sun Glare Detection and Removal

This project implements a pipeline for detecting and removing sun glare from outdoor images using computer vision and texture synthesis techniques. The main objectives are to:

- Automatically detect the position of the sun in an image
- Extract radial glare artifacts using intensity and direction analysis
- Generate hard-edged binary masks compatible with image inpainting models like LaMa and MAT
- Remove glare from the image using a custom texture quilting method

## Features

### 1. Sun Position Detection

Automatically identifies the brightest region or inferred focal point of glare using intensity and gradient voting.

**Screenshot: Detected Sun Position Overlay**  
![sun-detection](/projects/sunglare/images/sun-detection.jpg)

---

### 2. Radial Ray Detection

Traces bright streaks (rays) from the sun position using radial sampling and brightness thresholds.

**Screenshot: Ray Mask Visualization**  
![ray-mask](/projects/sunglare/images/ray-mask.jpg)

---

### 3. Glare Mask Generation

Binary mask is constructed via thresholded contours and Gaussian smoothing for glare regions. Outputs:
- LaMa-compatible (glare = 0, rest = 255)
- MAT-compatible (standard inverted alpha mask)

---

### 4. Image Inpainting Techniques

Consider these two test images:

**Screenshot: Original Glare Images**  
![inpainted](/projects/sunglare/images/source.jpg)

## Image Quilting

Replaces the masked glare regions with patches from similar nearby textures using overlapping, patch scoring, and boundary-cut blending.

**Screenshot: Image Quilting Output**  
![inpainted](/projects/sunglare/images/quilting.jpg)

---

## Large Mask (LaMa) Inpainting

LaMa uses Fourier convolutions to fill large missing regions by capturing global image structure, producing realistic and coherent inpainting.

**Screenshot: LaMa Output**  
![inpainted](/projects/sunglare/images/LaMa.jpg)

## Masked Attention Transformer (MAT)

MAT uses transformers to model long-range dependencies and semantic context, making it effective for inpainting complex scenes and objects.

**Screenshot: MAT Output**  
![inpainted](/projects/sunglare/images/MAT.jpg)


### 5. Discussion 

I learned that it's extremely difficult to remove glare from images. I had initially underestimated how much pixel is actually corrupted when glare is present in images, and I now know that deep learning is not a cure-all solution to problems.

The results of this project's methods were still not great, and I believe that was mainly due to:

- The deep learning models expecting exclusively binary glare masks to find "holes". Unfortunately, glare isn't exactly binary as it washes out pixels, rather than completely covering them.

If I were to pursue this project in the future, I would consider incorporating "soft alpha masks" into MAT to see if that could improve results.

Single-exposure computational photography definitely has its fundamental limits, and I would like to explore multi-exposure techniques more.

