"use client";

export default function MusicPlayer() {
  return (
    <>
        <div
            className="fixed right-[144px] bottom-[79px] z-500 w-[230px] h-[56.8px] bg-black/30 rounded-sm -skew-x-50  z-501"
            style={{ zIndex: 499 }}
        />
        
        <div className="fixed right-[150px] bottom-[80px] z-500">
            {/* Music player image */}
            <img
                src="/images/music_player.png"
                alt="Music Player"
                className="w-[300px] h-auto"
                draggable="false"
            />

            {/* Disk image positioned on top */}
            <img
                src="/images/music_disk.png"
                alt="Music Disk"
                style={{ animation: "spin 8s linear infinite" }}
                className="absolute top-[7px] left-[10px] w-[215px] h-auto pointer-events-none "
                draggable="false"
            />

            {/* Spindle image */}
            <img
                src="/images/spindle.png"
                alt="Music Disk"
                className="absolute top-[15px] right-[32px] w-[110px] h-auto pointer-events-none"
                draggable="false"
            />

            {/* Music info text */}
            <p 
                style={{ animation: "blink 2s steps(2, start) infinite" }}
                className="absolute bottom-[38px] left-[35px] text-white text-[15px] font-hillstown leading-tight font-semibold animate-blink z-50">
                    Now Playing:<br />
                    Love - Kendrick Lamar
            </p>

            <style jsx>{`
                @keyframes blink {
                    to {
                    visibility: hidden;
                    }
                }
            `}</style>
        </div>
    </>
  );
}
