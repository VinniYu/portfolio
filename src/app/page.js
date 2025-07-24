"use client";

import { useState } from "react";
import Link from "next/link";
import Oscilloscope from "@/components/Oscilloscope";

export default function Home() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const shadowStyle = (link) => ({
    textShadow:
      hoveredLink === link
        ? "1px 2px 0px rgba(212, 84, 86, 0.6)" // hover color
        : "1px 2px 0px rgba(248, 243, 232, 0.6)", // default shadow
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Link href="/">
        <img
          src="/images/face_icon.png"
          alt="Site Icon"
          className="fixed top-10 left-10 w-15 h-22.5 z-500 cursor-pointer"
        />
      </Link>
      
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

      <h1 className="m-0 text-[200px] leading-none font-dalton tracking-normal big-text-shadow">
        VINNI YU
      </h1>
      <p className="mb-80 text-[35px] font-hillstown small-text-shadow">
        Software · Embedded · Graphics
      </p>

      <div className="absolute bottom-[30px] w-full flex justify-center z-250">
        <Oscilloscope />
      </div>

      <footer className="fixed bottom-0 w-full bg-[#ffeda9] text-[#3f6565] py-10 px-6 text-center font-hillstown z-50">
        <p>
          {/* Made with ☕ and solder · vinniyu.dev */}
        </p>
      </footer>
    </main>
  );
}
