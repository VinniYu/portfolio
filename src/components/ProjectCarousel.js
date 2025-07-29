"use client";
import { useRef, useState, useEffect } from "react";
import { projects } from "@/lib/projectData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function ProjectCarousel() {
  const scrollContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const cardWidth = 500 + 32; // card width + gap
  const cardsPerPage = 2;
  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const scrollProjects = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction * cardWidth * cardsPerPage;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Detect scroll position and update page
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const newPage = Math.round(container.scrollLeft / (cardWidth * cardsPerPage));
      setCurrentPage(newPage);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Load markdown for selected project
  useEffect(() => {
    if (selectedIndex === null) return;

    const mdPath = projects[selectedIndex].markdown;
    fetch(mdPath)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
      .catch(() => setMarkdown("⚠️ Failed to load markdown."));
  }, [selectedIndex]);

  

  return (
    <div className="relative flex flex-col items-center justify-center z-1000">
      {/* Top: Carousel */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => scrollProjects(-1)}
          className="z-10 mr-2 inline-flex h-12 w-12 items-center justify-center rounded-md 
                    border border-[#f8f3e8] bg-transparent transition-colors 
                    hover:bg-[#f8f3e8]"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
            className="h-5 w-5 text-[#3f6565] -scale-x-100">
            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 
                     7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 
                     11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 
                     7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 
                     8.14645 3.14645Z"
              fill="currentColor" />
          </svg>
        </button>

        <div className="relative w-[1064px]">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-[16px]"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="w-[500px] flex-shrink-0 relative flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                {/* folder background */}
                <img src="/images/folder.png" alt="Folder" className="w-full h-auto" draggable="false" />

                {/*  */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute top-[80px] left-[20px] w-[460px] h-[300px]  rounded-lg shadow-md"
                  draggable="false"
                />
                
                <p className="mt-3 text-center text-[#f8f3e8] font-hillstown text-xl">
                  {project.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollProjects(1)}
          className="z-10 ml-2 inline-flex h-12 w-12 items-center justify-center rounded-md 
                    border border-[#f8f3e8] bg-transparent transition-colors 
                    hover:bg-[#f8f3e8]"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
            className="h-5 w-5 text-[#3f6565]">
            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 
                     7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 
                     11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 
                     7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 
                     8.14645 3.14645Z"
              fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Bottom: Page Indicators */}
      <div className="mt-1 flex gap-2 bg-[#3f6565] px-4 py-1 rounded-lg">
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            className={`text-lg font-hillstown ${
              i === currentPage ? "text-[#d45456]" : "text-[#f8f3e8]"
            }`}
          >
            {i + 1}
          </span>
        ))}
      </div>

      {/* Markdown Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center">
          {/* Sticky close button OUTSIDE scroll area */}
          <button
            onClick={() => {
              setSelectedIndex(null);
              setMarkdown("");
            }}
            className="fixed top-6 left-6 z-[10000] text-6xl font-bold text-white hover:text-red-500"
          >
            ×
          </button>

          {/* Scrollable document */}
          <div className="relative w-[90%] max-w-[900px] max-h-[90%] bg-white text-black p-8 rounded-lg shadow-xl overflow-y-auto">
            <div className="prose prose-lg prose-neutral mx-auto markdown"
                 style={{ lineHeight: "1.3", marginBottom: "0.3rem" }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-[#0000EE] underline hover:text-[#b33434]"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
