"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Oscilloscope from "@/components/Oscilloscope";
import ContactForm from "@/components/ContactForm";
import MusicPlayer from "@/components/MusicPlayer";
import ProjectCarousel from "@/components/ProjectCarousel";


export default function Home() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the "#"
      setActiveSection(hash || "home");
    };

    // Run on first load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange); // <-- handles back/forward

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const shadowStyle = (link) => ({
    textShadow:
      hoveredLink === link
        ? "1px 2px 0px rgba(212, 84, 86, 0.6)" // hover color
        : "1px 2px 0px rgba(248, 243, 232, 0.6)", // default shadow
  });

  return (
    <main className="min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <Link href="#home" scroll={false}>
        <img
          src="/images/face_icon.png"
          alt="Site Icon"
          className="fixed top-10 left-10 w-15 h-22.5 z-500 cursor-pointer"
          onClick={() => setActiveSection("home")} // force re-render
        />
      </Link>

      <img
        src="/images/light_toggle.png"
        alt="theme_switcher"
        className="fixed top-10 right-10 w-20 h-20 z-500 cursor-pointer"
      />
      
      <nav className="fixed top-0 left-0 w-full flex justify-center text-[25px] gap-8 px-10 py-15 font-hillstown z-50">
        {["about", "resume", "projects", "contact"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onMouseEnter={() => setHoveredLink(section)}
            onMouseLeave={() => setHoveredLink(null)}
            className="transition-colors duration-200 text-[#f8f3e8] hover:text-[#d45456]"
          >
            <span style={shadowStyle(section)}>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
          </a>
        ))}
      </nav>

      {activeSection === "home" && (
        <>
          <h1 className="m-0 text-[200px] leading-none font-dalton tracking-normal big-text-shadow">
            VINNI YU
          </h1>
          <p className="mb-80 text-[35px] font-hillstown small-text-shadow">
            Software · Embedded · Graphics
          </p>
          
          <div className="absolute bottom-[70px] w-full flex justify-center z-250">
            <Oscilloscope />
          </div>
        </>
      )}

      {activeSection === "about" && (
        <>     
          <div className="max-w-[1100px] ml-[-250px] px-10 pr-[100px]">   
            <h1 className="text-[120px] leading-none font-dalton tracking-normal big-text-shadow">
              ABOUT ME
            </h1>

            <div className="text-[#f8f3e8] text-[27px] font-hillstown text-justify small-text-shadow">
              I'm Vinni Yu, a developer studying Computer Science and Electrical Engineering at Yale. 
              I focus on low-level systems, computer graphics, and AI 
              — building projects like GPU-based simulations, trading engines, 
              and neural tools that prioritize clarity, performance, and thoughtful design.
            </div>
          </div>

          <img
            src="/images/iced_americano.png"
            alt="Americano"
            className="fixed bottom-[49px] right-[35px] w-[350px] h-auto z-500"
          />
        </>
      )}

      {activeSection === "resume" && (
        <div className="text-[#f8f3e8] text-[30px] font-hillstown mt-40">Resume section here</div>
      )}

      {activeSection === "projects" && (
        <div className="w-full mt-20">
          <ProjectCarousel />

          <div className="fixed right-[10px] bottom-[113px] z-100">
            {/* file cabinet image */}
            <img
                src="/images/file_cabinet.png"
                alt="Music Player"
                className="w-[320px] h-auto"
                draggable="false"
            />
          </div>
        </div>
      )}

      {activeSection === "contact" && (
        <>
          <div className="flex flex-col justify-center items-center">
            <ContactForm />
            
            <p className="mt-[4px] text-[#256662] font-hillstown align-center">
              Email: vinni0526@gmail.com <br />
              Phone: +1 (551) 252-2805
            </p>
          </div>

          <MusicPlayer />
        </>
      )}

      <footer className="fixed bottom-0 w-full bg-[#ffeda9] text-[#3f6565] py-17 px-6 text-center font-hillstown z-50">

      </footer>
    </main>
  );
}
