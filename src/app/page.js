"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Oscilloscope from "@/components/Oscilloscope";
import ContactForm from "@/components/ContactForm";
import MusicPlayer from "@/components/MusicPlayer";
import ProjectCarousel from "@/components/ProjectCarousel";
import MobilePage from "@/components/Mobile";


const preloadImages = [
  "/images/email_form.png",
  "/images/email_form_dark.png",
  "/images/face_icon.png",
  "/images/file_cabinet.png",
  "/images/file_cabinet_dark.png",
  "/images/folder.png",
  "/images/folder_dark.png",
  "/images/iced_americano.png",
  "/images/music_disk.png",
  "/images/music_disk_dark.png",
  "/images/music_player.png",
  "/images/music_player_dark.png",
  "/images/oscilloscope.png",
  "/images/oscilloscope_dark.png",
  "/images/spindle.png",
  "/images/spindle_dark.png",
  "/images/toggle.png",
  "/images/toggle_dark.png",
];

export default function Home() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showSection, setShowSection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // loading useEffect
  useEffect(() => {
    let loaded = 0;
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === preloadImages.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/resume.pdf", { signal: controller.signal })
      .then((res) => res.blob())
      .catch(() => {});

    return () => controller.abort();
  }, []);

  

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice || window.innerWidth <= 768);
    };

    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // theme useEffect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // navbar useEffect
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setShowSection(false); // Start fade-out
      setTimeout(() => {
        setActiveSection(hash || "home");
        setShowSection(true); // Start fade-in
      }, 100); // Wait before switching
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const shadowStyle = (link) => ({
    textShadow:
      hoveredLink === link
        ? "1px 2px 0px rgba(212, 84, 86, 0.6)" // hover color always red
        : "1px 2px 0px var(--small-text-shadow)", 
  });

  if (isMobile) {
    return (
      <MobilePage />
    );
  }

  if (!imagesLoaded) {
    return (
      <main className="w-screen h-screen flex items-center justify-center bg-[var(--background-color)] text-[var(--text-color)] font-hillstown text-[30px]">
        Loading assets...
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center crosshatch-bg">
      <Link href="#home" scroll={false}>
        <img
          src="/images/face_icon.png"
          alt="Site Icon"
          className="fixed top-10 left-10 w-15 h-22.5 z-500 cursor-pointer"
          draggable="false"
          onClick={() => setActiveSection("home")} // force re-render
        />
      </Link>

      {/* theme toggler */}
      <div className="relative w-[80px] h-[80px]">
        <img
          src="/images/toggle.png"
          alt="theme toggler"
          className={`fixed top-10 right-10 w-20 h-20 z-500 cursor-pointer transition-opacity duration-500 ${
            theme === "light" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: 'opacity 0.5s ease, filter 0.5s ease',
            filter: theme === 'dark' ? 'blur(1px)' : 'blur(0px)',
          }}
          draggable="false"
          onClick={toggleTheme}
        />
        <img
          src="/images/toggle_dark.png"
          alt="theme toggler dark"
          className={`fixed top-10 right-10 w-20 h-20 z-500 cursor-pointer transition-opacity duration-500 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: 'opacity 0.5s ease, filter 0.5s ease',
            filter: theme === 'dark' ? 'blur(0px)' : 'blur(1px)',
          }}
          draggable="false"
          onClick={toggleTheme}
        />
      </div>
      
      <nav className="fixed top-0 left-0 w-full flex justify-center text-[25px] small-text-shadow gap-8 px-10 py-15 font-hillstown z-50">
        {["about", "resume", "projects", "contact"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={() => setActiveSection(section)} // <-- ADD THIS
            onMouseEnter={() => setHoveredLink(section)}
            onMouseLeave={() => setHoveredLink(null)}
            className={`transition-colors duration-200 text-[25px] font-hillstown ${
              section === activeSection ? "text-[#d45456]" : "hover:text-[#d45456]"
            }`}
          >
            <span style={shadowStyle(section)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
          </a>
        ))}
      </nav>

      {activeSection === "home" && (
        <>
          <div className={`fade-section ${showSection ? "show" : ""}`}>
            <h1 className="m-0 text-[200px] leading-none font-dalton tracking-normal big-text-shadow">
              VINNI YU
            </h1>
            <p className="mb-80 text-[35px] font-hillstown small-text-shadow">
              Software · Embedded · Graphics
            </p>
          </div>

          <div className="absolute bottom-[23px] w-full flex justify-center z-250">
            <Oscilloscope theme={theme} />
          </div>
        </>
      )}

      {activeSection === "about" && (
        <>
          <div className={`fade-section ${showSection ? "show" : ""}`}>
            <div className="max-w-[1100px] mb-35 ml-[-250px] px-10 pr-[100px]">
              <h1 className="text-[120px] leading-none font-dalton tracking-normal big-text-shadow">
                ABOUT ME
              </h1>

              <div className="text-[var(--text-color)] text-[27px] font-hillstown text-justify small-text-shadow">
                I&lsquo;m Vinni Yu, a developer studying Computer Science and Electrical Engineering at Yale. 
                I focus on low-level systems, computer graphics, and AI 
                — building projects like GPU-based simulations, trading engines, 
                and neural tools that prioritize clarity, performance, and thoughtful design.
              </div>
            </div>
          </div>

          <img
            src="/images/iced_americano.png"
            alt="Americano"
            className="fixed bottom-[8px] right-[35px] w-[350px] h-auto z-500"
            draggable="false"
          />  
        </>
      )}

      {activeSection === "resume" && (
        <div className={`fade-section ${showSection ? "show" : ""} fixed inset-0 flex flex-col items-center justify-center px-4 z-1`}>
          <div className="w-[720px] h-[480px] mb-30 border-4 border-[#f8f3e8] shadow-2xl overflow-hidden rounded-lg">
            <iframe
              src="/resume.pdf"
              title="Resume PDF"
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {activeSection === "projects" && (
        <>
          <div className={`fade-section ${showSection ? "show" : ""} fixed inset-0 z-1000`}>
            <ProjectCarousel theme={theme} /> 
          </div>

          <div className="fixed right-[10px] bottom-[347px] z-100 w-[320px] h-auto">
            <div className="relative w-full h-full">
              <img
                src="/images/file_cabinet.png"
                alt="File cabinet light"
                className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-500 ${
                  theme === "light" ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transition: 'opacity 0.5s ease, filter 0.5s ease',
                  filter: theme === 'dark' ? 'blur(1px)' : 'blur(0px)',
                }}
                draggable="false"
              />
              <img
                src="/images/file_cabinet_dark.png"
                alt="File cabinet dark"
                className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-500 ${
                  theme === "dark" ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transition: 'opacity 0.5s ease, filter 0.5s ease',
                  filter: theme === 'dark' ? 'blur(0px)' : 'blur(1px)',
                }}
                draggable="false"
              />
            </div>
          </div>
        </>
      )}

      {activeSection === "contact" && (
        <div className={`fade-section ${showSection ? "show" : ""} fixed inset-0 mt-30 flex items-center justify-center z-10`}>
          <ContactForm theme={theme} />
          {/* <MusicPlayer theme={theme} /> */}
        </div>
      )}


      <div className="fixed bottom-0 w-[120%] bg-[var(--footer-color)] py-12 shadow-inner text-[#e4cc82] footer-halftone transition z-0 -skew-x-30" />
    </main>
  );
}
