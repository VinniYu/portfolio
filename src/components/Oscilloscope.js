"use client";
import { useRef, useEffect, useState } from "react";


function drawCRTRectangle(ctx, x, y, width, height, radius = 20, bend = 10) {
  ctx.beginPath();
  // Top left corner
  ctx.moveTo(x + radius, y);
  // Top edge (bow outward)
  ctx.quadraticCurveTo(x + width / 2, y - bend, x + width - radius, y);
  // Top-right corner
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  // Right edge (bow outward)
  ctx.quadraticCurveTo(x + width + bend, y + height / 2, x + width, y + height - radius);
  // Bottom-right corner
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  // Bottom edge (bow outward)
  ctx.quadraticCurveTo(x + width / 2, y + height + bend, x + radius, y + height);
  // Bottom-left corner
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  // Left edge (bow outward)
  ctx.quadraticCurveTo(x - bend, y + height / 2, x, y + radius);
  // Top-left corner again
  ctx.quadraticCurveTo(x, y, x + radius, y);

  ctx.closePath();
  ctx.fill();
}

export default function Oscilloscope() {
  const canvasRef = useRef(null);
	const clickSoundRef = useRef(null);

	const [waveTypeIndex, setWaveTypeIndex] = useState(0);
	const waveTypes = ["sine", "square", "sawtooth", "sumsine"];
	const waveType = waveTypes[waveTypeIndex];
	
	useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/click.wav");
    clickSoundRef.current.volume = 0.4;
  }, []);

	const handleCycle = () => {
		if (clickSoundRef.current) {
			clickSoundRef.current.currentTime = 0;
			clickSoundRef.current.play();
		}

		setWaveTypeIndex((prevIndex) => (prevIndex + 1) % waveTypes.length);
	};

	function debounce(func, delay) {
		let timeoutId;
		return (...args) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		};
	}


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale context
    };

    resizeCanvas();
    const debouncedResize = debounce(resizeCanvas, 100);
		window.addEventListener("resize", debouncedResize);

		// draw the animations
    let frame = 0;
		let frameId;
		let animationId;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // CRT display parameters
			const rectWidth = 260;
			const rectHeight = 210;
			const rectX = (width - rectWidth) / 2;
			const rectY = (height - rectHeight) / 2;

			// draw CRT rectangle fill BEFORE the wave
			ctx.fillStyle = "#4e8780";
			drawCRTRectangle(ctx, rectX, rectY, rectWidth, rectHeight, 20, 10);
			ctx.save();

			// define the clipping path
			ctx.beginPath();
			drawCRTRectangle(ctx, rectX, rectY, rectWidth, rectHeight, 20, 10);
			ctx.clip(); // ✅ now all future drawing is clipped to this shape

			// horizontal guide line
			ctx.beginPath();
			ctx.moveTo(rectX - 10, rectY + rectHeight / 2); // Start a bit inside the left edge
			ctx.lineTo(rectX + rectWidth + 10, rectY + rectHeight / 2); // End a bit before right edge
			ctx.strokeStyle = "#97c0a2";
			ctx.lineWidth = 3;
			ctx.stroke();

			// inner shadow
			const shadowGradient = ctx.createRadialGradient(
				rectX + rectWidth / 2,
				rectY + rectHeight / 2,
				0,
				rectX + rectWidth / 2,
				rectY + rectHeight / 2,
				rectWidth / 1.5
			);

			shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
			shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");

			ctx.fillStyle = shadowGradient;
			ctx.fillRect(rectX - 15, rectY - 15, rectWidth + 30, rectHeight + 30);

			// draw sine wave — clipped to CRT shape
			ctx.beginPath();
			let firstY;
			for (let x = 0; x < width; x++) {
				let y;
				switch (waveType) {
					case "sine":
						y = height / 2 + Math.sin((x + frame) * 0.08) * (height / 4);
						ctx.lineWidth = 5;
						break;
					case "square":
						y = height / 2 + (Math.sin((x + frame) * 0.08) > 0 ? 1 : -1) * (height / 4);
						ctx.lineWidth = 4;
						break;
					case "sawtooth":
						y = height / 2 + ((x + frame) % 100) / 100 * (height / 2) - (height / 4);
						ctx.lineWidth = 5;
						break;
					case "sumsine":
						y = height / 2 + Math.sin((x + frame) * 0.08) * (height / 4) 
								+ Math.sin((x + frame) * 0.04) * (height / 10)
								+ Math.sin((x + frame) * 0.02) * (height / 10);
						ctx.lineWidth = 5;
						break;
					default:
						y = height / 2;
				}

				if (x === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}


			ctx.strokeStyle = "#e5f3a5";
			ctx.stroke();

			// restore canvas state — remove clip
			ctx.restore();			

			frame += 0.25;
			animationId = requestAnimationFrame(draw);
		};

    draw();

    return () => {
      window.removeEventListener("resize", debouncedResize);
			cancelAnimationFrame(animationId);
    };
  }, [waveType]);

	

  return (
    <div 
		onContextMenu={(e) => e.preventDefault()}
		className="relative w-full max-w-[600px] aspect-[3/2] mx-auto"
		>
      {/* Oscilloscope background image */}
			<img
        src="/images/oscilloscope.png"
        alt="Oscilloscope"
				draggable="false"
        className="w-full h-full object-contain"
      />

			{/* CRT background display animation */}
      <canvas
        ref={canvasRef}
        className="absolute top-[13.5%] left-[7.5%] w-[51%] h-[60%] pointer-events-none"
      />

			{/* invisible buttons for interactivity */}
      <button
        onClick={handleCycle}
        className="absolute top-[15%] left-[63%] w-[15%] h-[22%] z-250 rounded-full cursor-pointer"
        aria-label="Cycle waveform"
        title="Click to cycle waveform"
      />
    </div>
  );
}
