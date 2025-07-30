"use client";

export default function MusicPlayer({ theme }) {
  return (
    <>
      <div
        className="fixed right-[144px] bottom-[79px] w-[230px] h-[56.8px] bg-black/30 rounded-sm -skew-x-50"
        style={{ zIndex: 499 }}
      />

      <div className="fixed right-[150px] bottom-[50px]">
        {/* Music player base */}
        <div className="relative w-[300px] h-auto">
          {/* Light version */}
          <img
            src="/images/music_player.png"
            alt="Music Player Light"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-500 ${
              theme === "light" ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
          {/* Dark version */}
          <img
            src="/images/music_player_dark.png"
            alt="Music Player Dark"
            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-500 ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
        </div>

        {/* Music disk */}
        <div className="absolute top-[7px] left-[10px] w-[215px] h-auto">
          <img
            src="/images/music_disk.png"
            alt="Disk Light"
            className={`absolute top-0 left-0 w-full h-auto pointer-events-none transition-opacity duration-500 ${
              theme === "light" ? "opacity-100" : "opacity-0"
            }`}
            style={{ animation: "spin 8s linear infinite" }}
            draggable="false"
          />
          <img
            src="/images/music_disk_dark.png"
            alt="Disk Dark"
            className={`absolute top-0 left-0 w-full h-auto pointer-events-none transition-opacity duration-500 ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            }`}
            style={{ animation: "spin 8s linear infinite" }}
            draggable="false"
          />
        </div>

        {/* Spindle */}
        <div className="absolute top-[15px] right-[32px] w-[110px] h-auto">
          <img
            src="/images/spindle.png"
            alt="Spindle Light"
            className={`absolute top-0 left-0 w-full h-auto pointer-events-none transition-opacity duration-500 ${
              theme === "light" ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
          <img
            src="/images/spindle_dark.png"
            alt="Spindle Dark"
            className={`absolute top-0 left-0 w-full h-auto pointer-events-none transition-opacity duration-500 ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
        </div>

        {/* Music info text */}
        <p
          style={{ animation: "blink 2s steps(2, start) infinite" }}
          className="absolute bottom-[38px] left-[35px] text-white text-[15px] font-hillstown leading-tight font-semibold z-50"
        >
          Now Playing:<br />
          Love - Kendrick Lamar
        </p>

        <style jsx>{`
          @keyframes blink {
            to {
              visibility: hidden;
            }
          }

          @keyframes spin {
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </>
  );
}
