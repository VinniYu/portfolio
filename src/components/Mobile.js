import React, { useState } from "react";

export default function MobilePage() {
  const [activeSection, setActiveSection] = useState(null);

  if (activeSection === "about") {
    return (
      <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-2 translate-x-1 crosshatch-bg">
        <button onClick={() => setActiveSection(null)} className="mb-4 underline">Back</button>
        
				<img src="images/mobile/about_inside.png"/>
      </main>
    );
  }

  if (activeSection === "resume") {
    return (
      <main className="min-h-screen p-6 font-hillstown crosshatch-bg">
        <button onClick={() => setActiveSection(null)} className="mb-4 underline">← Back</button>
        <h1 className="text-3xl mb-2">Resume</h1>
        <p>This is the Resume section content.</p>
      </main>
    );
  }

  if (activeSection === "projects") {
    return (
      <main className="min-h-screen p-6 font-hillstown crosshatch-bg">
        <button onClick={() => setActiveSection(null)} className="mb-4 underline">← Back</button>
        <h1 className="text-3xl mb-2">Projects</h1>
        <p>This is the Projects section content.</p>
      </main>
    );
  }

  if (activeSection === "contact") {
    return (
      <main className="relative min-h-screen overflow-hidden flex flex-col items-center z-0 justify-center crosshatch-bg">
        <button onClick={() => setActiveSection(null)} className="mb-4 underline">Back</button>
        
				<div className="w-[110%] z-10">
					<img src="images/mobile/contact_inside.png"/>
				</div>

				
      </main>
    );
  }

  // Default homepage grid
  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center crosshatch-bg z-0 font-hillstown">
      {/* monitor image */}
      <div className="relative px-3">
        <div className="absolute inset-0 z-10 " />
        <img src="images/mobile/monitor.png" className="relative z-10" />
      </div>

      {/* connecting rods */}
      <div className="fixed w-screen h-screen flex justify-center items-center z-5">
        <div className="w-[25px] h-[200px] bg-[#4e7464] flex-shrink-0 mr-50" />
        <div className="w-[25px] h-[200px] bg-[#4e7464] flex-shrink-0" />
      </div>

      {/* navigation panel */}
      <div className="relative px-2 mt-2 w-fit h-fit">
        <img src="images/mobile/panel.png" className="relative z-10" />

        <div className="absolute top-0 left-0 w-full h-full z-20 grid grid-cols-2 grid-rows-2 gap-0 p-7">
          <div className="flex justify-center items-center" onClick={() => setActiveSection("about")}>
            <div className="absolute w-[40%] h-[30%] translate-y-6 bg-[#a47e3c] rounded-md z-0"
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
