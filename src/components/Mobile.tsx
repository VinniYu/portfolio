import React, { useState, useEffect } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function MobilePage() {
  const [activeSection, setActiveSection] = useState(null);

	useEffect(() => {
    const enableScroll = activeSection === "resume" || activeSection === "projects";

    if (enableScroll) {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    } 
    else {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeSection]);

  if (activeSection === "about") {
    return (
      <main className="min-h-screen overflow-hidden flex flex-col items-center p-2 mt-4 crosshatch-bg">
        <div className="w-full mb-3">
          <button
            onClick={() => setActiveSection(null)}
            className="bg-[#d96050] text-[#fcefc7] text-sm font-bold ml-3 px-3 py-2 rounded-md shadow-md cursor-pointer"
          >
            Back
          </button>
        </div>
        
				<img src="images/mobile/about_inside.png" className="translate-x-1" />

        <div className="relative w-[250%] h-screen bg-[var(--footer-color)] mt-2 z-1 text-[#e4cc82] footer-halftone -skew-x-30" />
          

      </main>
    );
  }

  if (activeSection === "resume") {
    return (
      <main className="min-h-screen p-6 font-roboto crosshatch-bg">
        <div className="w-full mb-1">
          <button
            onClick={() => setActiveSection(null)}
            className="bg-[#d96050] text-[#fcefc7] text-sm font-bold ml-1 px-3 py-2 rounded-md shadow-md cursor-pointer"
          >
            Back
          </button>
        </div>
        
        <div className="relative w-full max-w-[650px] mx-auto mt-3 px-2">
          {/* vertical line */}
          <div className="absolute left-2 top-3 w-1 h-full bg-[#3b645d]"></div>

          {/* Timeline Item */}
          <div className="relative flex items-start mb-5 font-hillstown">
            {/* Icon */}
            <div className="absolute -left-5 top-3 w-11 h-11 rounded-full bg-[#cfb982] flex items-center justify-center text-white z-10" />

            {/* Content box */}
            <div className="bg-[#fcefc7] text-white rounded-md shadow-md p-4 w-full relative ml-10">
              <h4 className="text-md font-bold bg-[#cfb982] inline-block px-2 py-1 rounded">Security Developer @ OpsNow</h4>
              <p className="text-sm italic mt-2 text-[#856d47] opacity-50">JULY 2025 - PRESENT</p>
            
              <p className="text-sm opacity-80 mt-2 text-[#2a514a]">
                Optimized a CIEM log pipeline (from 12+ hours to ~3), improved Kubernetes orchestration, and explored ML-driven filtering with Scikit-learn.
              </p>

              {/* Arrow */}
              <div className="absolute left-[-10px] top-6 w-5 h-5 bg-[#fcefc7] rotate-45 z-0"></div>
            </div>
          </div>

          {/* Timeline Item */}
          <div className="relative flex items-start mb-5 font-hillstown">
            {/* Icon */}
            <div className="absolute -left-5 top-3 w-11 h-11 rounded-full bg-[#cfb982] flex items-center justify-center text-white z-10" />

            {/* Content box */}
            <div className="bg-[#fcefc7] text-white rounded-md shadow-md p-4 w-full relative ml-10">
              <h4 className="text-md font-bold bg-[#cfb982] inline-block px-2 py-1 rounded">Software Engineer @ Yale</h4>
              <p className="text-sm italic mt-2 text-[#856d47] opacity-50">Sep 2023 – May 2025</p>
            
              <p className="text-sm opacity-80 mt-2 text-[#2a514a]">
                Developed Bash/Python autograder suite, taught C/C++ & MATLAB, and ran weekly tutoring for multivariable calculus and ENAS130 courses.
              </p>

              {/* Arrow */}
              <div className="absolute left-[-10px] top-6 w-5 h-5 bg-[#fcefc7] rotate-45 z-0"></div>
            </div>
          </div>

          {/* Timeline Item */}
          <div className="relative flex items-start mb-5 font-hillstown">
            {/* Icon */}
            <div className="absolute -left-5 top-3 w-11 h-11 rounded-full bg-[#cfb982] flex items-center justify-center text-white z-10" />

            {/* Content box */}
            <div className="bg-[#fcefc7] text-white rounded-md shadow-md p-4 w-full relative ml-10">
              <h4 className="text-md font-bold bg-[#cfb982] inline-block px-2 py-1 rounded">Full-Stack @ Yale Internal Med</h4>
              <p className="text-sm italic mt-2 text-[#856d47] opacity-50">Sep 2024 - Sep 2025</p>
            
              <p className="text-sm opacity-80 mt-2 text-[#2a514a]">
                Co-authored a peer-reviewed COVID-19 web calculator, containerized apps with Docker/AWS, and secured HIPAA-compliant data integrations.
              </p>

              {/* Arrow */}
              <div className="absolute left-[-10px] top-6 w-5 h-5 bg-[#fcefc7] rotate-45 z-0"></div>
            </div>
          </div>
          
          {/* Timeline Item */}
          <div className="relative flex items-start mb-5 font-hillstown">
            {/* Icon */}
            <div className="absolute -left-5 top-3 w-11 h-11 rounded-full bg-[#cfb982] flex items-center justify-center text-white z-10" />

            {/* Content box */}
            <div className="bg-[#fcefc7] text-white rounded-md shadow-md p-4 w-full relative ml-10">
              <h4 className="text-md font-bold bg-[#cfb982] inline-block px-2 py-1 rounded">Software Engineer @ SparkLabs</h4>
              <p className="text-sm italic mt-2 text-[#856d47] opacity-50">JULY 2024 - Aug 2024</p>
            
              <p className="text-sm opacity-80 mt-2 text-[#2a514a]">
                Built a financial report generator with Python, templated outputs using Openpyxl & Pillow, and sped up data processing for VC portfolio analysis.
              </p>

              {/* Arrow */}
              <div className="absolute left-[-10px] top-6 w-5 h-5 bg-[#fcefc7] rotate-45 z-0"></div>
            </div>
          </div>

          {/* Timeline Item */}
          <div className="relative flex items-start mb-5 font-hillstown">
            {/* Icon */}
            <div className="absolute -left-5 top-3 w-11 h-11 rounded-full bg-[#cfb982] flex items-center justify-center text-white z-10" />

            {/* Content box */}
            <div className="bg-[#fcefc7] text-white rounded-md shadow-md p-4 w-full relative ml-10">
              <h4 className="text-md font-bold bg-[#cfb982] inline-block px-2 py-1 rounded">Software Engineer @ Mune Corp</h4>
              <p className="text-sm italic mt-2 text-[#856d47] opacity-50">Jun 2023 – Aug 2023</p>
            
              <p className="text-sm opacity-80 mt-2 text-[#2a514a]">
                Built Python scrapers and NLP tools for biomedical data, prototyped embedded systems with SolidWorks & Arduino, and navigated FDA compliance.
              </p>

              {/* Arrow */}
              <div className="absolute left-[-10px] top-6 w-5 h-5 bg-[#fcefc7] rotate-45 z-0"></div>
            </div>
          </div>

          {/* Timeline Item */}
          <div className="relative flex items-start mb-5 font-hillstown">
            {/* Icon */}
            <div className="absolute -left-5 top-3 w-11 h-11 rounded-full bg-[#cfb982] flex items-center justify-center text-white z-10" />

            {/* Content box */}
            <div className="bg-[#fcefc7] text-white rounded-md shadow-md p-4 w-full relative ml-10">
              <h4 className="text-md font-bold bg-[#cfb982] inline-block px-2 py-1 rounded">Student @ Yale University</h4>
              <p className="text-sm italic mt-2 text-[#856d47] opacity-50">Sep 2022 – May 2026</p>
            
              <p className="text-sm opacity-80 mt-2 text-[#2a514a]">
                Began 4-year program at Yale University. Pursuing a double major in Computer Science and in Electrical Engineering.
              </p>

              {/* Arrow */}
              <div className="absolute left-[-10px] top-6 w-5 h-5 bg-[#fcefc7] rotate-45 z-0"></div>
            </div>
          </div>
          

        </div>


      </main>
    );
  }

  if (activeSection === "projects") {
    const projects = [
      {
        title: "PCI-SPH Fluid Simulation",
        subtitle: "C++ · OpenGL · GLSL Compute",
        desc: "Real-time 2D and 3D fluid simulation engine using the Predictive-Corrective Incompressible SPH method in C++ and OpenGL compute shaders, achieving visually plausible interactions with up to 50,000 particles",
        image: "images/mobile/projects_inside.png",
        preview: "projects/sph/preview.png",
        href: "#",
        tags: ["Graphics", "GPU", "Numerical Methods"],
      },
      {
        title: "Ray Tracer Engine",
        subtitle: "C++ · Graphics",
        desc: "Custom physically-based ray tracer in C++ for CPSC 478/578, implementing intersections, Phong shading, shadows, reflections, refractions, and procedural Mandelbrot texturing.",
        image: "images/mobile/projects_inside.png",
        preview: "projects/raytracer/preview.png",
        href: "#",
        tags: ["C++", "Rendering", "Graphics"],
      },
      {
        title: "EfficientNet Chess Engine",
        subtitle: "Python · Deep Learning · Computer Vision",
        desc: "Built a real-time chessboard recognition and move recommendation system using EfficientNet-B0 for square classification and Stockfish for optimal move prediction.",
        image: "images/mobile/projects_inside.png",
        preview: "projects/chess/preview.png",
        href: "#",
        tags: ["Python", "EfficientNet", "Stockfish", "Computer Vision", "Deep Learning"],
      },
      {
        title: "Sun Glare Removal",
        subtitle: "Python · Computer Vision",
        desc: "Built a computer vision pipeline to detect and remove sun glare from outdoor images using mask generation, texture quilting, and deep learning inpainting models.",
        image: "images/mobile/projects_inside.png",
        preview: "projects/sunglare/preview.png",
        href: "#",
        tags: ["Python", "Computer Vision", "Image Processing", "Deep Learning"],
      },



      ];

    // One shared overlay position for all cards (percentages relative to the PNG)
    const OVERLAY = {
      top: 12,   // % from top of image
      left: 16,  // % from left of image
      width: 72, // % of image width for the text block
    };

    return (
      <main className="relative min-h-screen flex flex-col items-center z-0 mt-4 crosshatch-bg">
        <div className="w-full mb-3">
          <button
            onClick={() => setActiveSection(null)}
            className="bg-[#d96050] text-[#fcefc7] text-sm font-bold ml-5 px-3 py-2 rounded-md shadow-md cursor-pointer"
          >
            Back
          </button>
        </div>

        {/* Page width: image takes a percentage of screen width */}
        <div className="w-[85%] space-y-6">
          {projects.map((p, i) => (
            <a key={i} href={p.href} className="block">
              <div className="relative w-full">
                {/* Responsive image */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-auto block"
                  draggable="false"
                />

                {/* Plain text overlay */}
                <div
                  className="absolute text-center"
                  style={{
                    top: `${OVERLAY.top}%`,
                    left: `${OVERLAY.left}%`,
                    width: `${OVERLAY.width}%`,
                  }}
                >
                  <h3 className="font-bold "
                      style={{ fontSize: 'clamp(18px, 4vw, 18px)', color: '#fcefc7' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 'clamp(14px, 3.2vw, 14px)', color: '#fce2c2', opacity: 0.85 }}>
                    {p.subtitle}
                  </p>
                  <p
                    className="mt-4"
                    style={{
                      fontSize: 'clamp(13px, 3vw, 13px)',
                      color: '#fcefc7',
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                    }}
                  >
                    {p.desc}
                  </p>

                  {p.preview && (
                    <img
                      src={p.preview}
                      alt={`${p.title} preview`}
                      className="mt-3 w-auto h-[90px] mx-auto rounded-md"
                      draggable="false"
                    />
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    );
  }




  if (activeSection === "contact") {
    return (
      <main className="relative min-h-screen overflow-hidden flex flex-col items-center z-0 mt-4 crosshatch-bg">
        <div className="w-full mb-3">
          <button
            onClick={() => setActiveSection(null)}
            className="bg-[#d96050] text-[#fcefc7] text-sm font-bold ml-5 px-3 py-2 rounded-md shadow-md cursor-pointer"
          >
            Back
          </button>
        </div>
        
				<div className="w-[110%] z-10">
					<img src="images/mobile/contact_inside.png"/>
				</div>
        
        <div className="relative w-[250%] h-screen bg-[var(--footer-color)]  z-1 text-[#e4cc82] footer-halftone -skew-x-30" />
				
      </main>
    );
  }

  // Default homepage grid
  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center crosshatch-bg font-hillstown">
      {/* monitor image */}
      <div className="w-[80%] flex justify-center pt-4 x-translate-2">
        <div className="absolute z-10 " />
        <img src="images/mobile/monitor.png" className="relative z-10" />
      </div>

      {/* connecting rods */}
      <div className="fixed w-screen h-screen flex justify-center translate-y-40 z-5">
        <div className="w-[25px] h-[400px] bg-[#4e7464] flex-shrink-0 mr-50" />
        <div className="w-[25px] h-[400px] bg-[#4e7464] flex-shrink-0" />
      </div>

      {/* navigation panel */}
      <div className="relative px-2 mt-2 w-[90%] h-fit x-translate-5">
        <img src="images/mobile/panel.png" className="relative z-10" />

        <div className="absolute top-0 left-0 w-full h-full z-20 grid grid-cols-2 grid-rows-2 gap-0 p-7">
          <div className="flex justify-center items-center" onClick={() => setActiveSection("about")}>
            <div className="absolute w-[38%] h-[30%] translate-y-4 bg-[#a47e3c] rounded-md z-0"
              style={{ boxShadow: "inset 4px 4px 0 rgba(0, 0, 0, 0.15)" }} />
            <img src="/images/mobile/about.png"
              className="w-[80%] h-auto object-contain z-10 cursor-pointer" />
          </div>

          <div className="flex justify-center items-center" onClick={() => setActiveSection("resume")}>
            <img src="/images/mobile/resume.png"
              className="w-[80%] h-auto object-contain cursor-pointer" />
          </div>

          <div className="flex justify-center items-center" onClick={() => setActiveSection("projects")}>
            <img src="/images/mobile/projects.png"
              className="w-[80%] h-auto object-contain cursor-pointer" />
          </div>

          <div className="flex justify-center items-center" onClick={() => setActiveSection("contact")}>
            <div className="absolute w-[40%] h-[35%] bg-[#a47e3c] rounded-md z-0"
              style={{ boxShadow: "inset 5px 5px 0 rgba(0, 0, 0, 0.15)" }} />
            <img src="/images/mobile/contact.png"
              className="w-[80%] h-auto object-contain z-10 cursor-pointer" />
          </div>
        </div>
      </div>
    </main>
  );
}
