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
      const rect = canvas.getBoundingClientRect();
      const realWidth = rect.width;
      const realHeight = rect.height;

      const baseWidth = 1000;
      const baseHeight = 666.67;

      canvas.width = baseWidth;
      canvas.height = baseHeight;

      ctx.setTransform(realWidth / baseWidth, 0, 0, realHeight / baseHeight, 0, 0);
    };


    resizeCanvas();
    const debouncedResize = debounce(resizeCanvas, 100);
		window.addEventListener("resize", debouncedResize);

		// draw the animations
    let frame = 0;
		let frameId;
		let animationId;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const realWidth = rect.width;
      const realHeight = rect.height;

      const baseWidth = 1000; // Logical width
      const baseHeight = 666.67; // Logical height (3:2)

      const scaleX = realWidth / baseWidth;
      const scaleY = realHeight / baseHeight;
      ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // CRT display parameters
			const rectX = 42  ;    // in logical units
      const rectY = 55;
      const rectWidth = 250;
      const rectHeight = 190;

			// draw CRT rectangle fill BEFORE the wave
			ctx.fillStyle = "#4e8780";
			drawCRTRectangle(ctx, rectX, rectY, rectWidth, rectHeight, 20, 5);
			ctx.save();

			// define the clipping path
			ctx.beginPath();
			drawCRTRectangle(ctx, rectX, rectY, rectWidth, rectHeight, 20, 10);
			ctx.clip(); // now all future drawing is clipped to this shape

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
			const sampleCount = 400; // resolution of waveform
      const paddingX = 50;

      for (let i = 0; i < sampleCount; i++) {
        const normX = i / (sampleCount - 1);
        const x = rectX - paddingX + normX * (rectWidth + 2 * paddingX); // scaled to the CRT area

        let y;
        switch (waveType) {
          case "sine":
            y = rectY + rectHeight / 2 + Math.sin((i + frame) * 0.08) * (rectHeight / 2.5);
            ctx.lineWidth = 4;
            break;
          case "square":
            y = rectY + rectHeight / 2 + (Math.sin((i + frame) * 0.08) > 0 ? 1 : -1) * (rectHeight / 2.5);
            ctx.lineWidth = 4;
            break;
          case "sawtooth":
            const sawPeriod = 120; // smaller = higher frequency
            const normalizedSaw = ((i + frame) % sawPeriod) / sawPeriod; // 0 → 1
            y = rectY + rectHeight / 2 + (normalizedSaw - 0.5) * (rectHeight / 2); // 0.5x amplitude
            ctx.lineWidth = 4;
            break;
          case "sumsine":
            y = rectY + rectHeight / 2 
                + Math.sin((i + frame) * 0.08) * (rectHeight / 3) 
                + Math.sin((i + frame) * 0.04) * (rectHeight / 10)
                + Math.sin((i + frame) * 0.02) * (rectHeight / 10);
            ctx.lineWidth = 4;
            break;
          default:
            y = rectY + rectHeight / 2;
        }

        if (i === 0) {
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
		className="relative w-full max-w-[550px] aspect-[3/2] mx-auto"
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
        className="absolute inset-0 pointer-events-none"
      />

			{/* cycle waveforms button */}
      <div
        className="absolute"
        style={{
          left: `${(630 / 1000) * 100}%`,     // 205 is x, 1000 is logical width
          top: `${(103 / 666.67) * 100}%`,    // 120 is y, 666.67 is logical height
          width: `${(145 / 1000) * 100}%`,    // button width
          height: `${(145 / 666.67) * 100}%`,  // button height
        }}
      >
        <button
          onClick={handleCycle}
          className="w-full h-full z-250 rounded-full cursor-pointer"
          aria-label="Cycle waveform"
          title="Click to cycle waveform"
        />
      </div>

      {/* add noise button */}
      <div
        className="absolute"
        style={{
          left: `${(642 / 1000) * 100}%`,     // 205 is x, 1000 is logical width
          top: `${(285 / 666.67) * 100}%`,    // 120 is y, 666.67 is logical height
          width: `${(125 / 1000) * 100}%`,    // button width
          height: `${(125 / 666.67) * 100}%`,  // button height
        }}
      >
        <button
          onClick={handleCycle}
          className="w-full h-full z-250 rounded-full cursor-pointer"
          aria-label="Add noise"
          title="Click to add noise"
        />
      </div>

      {/* power button */}
      <div
        className="absolute"
        style={{
          left: `${(665 / 1000) * 100}%`,     // 205 is x, 1000 is logical width
          top: `${(470 / 666.67) * 100}%`,    // 120 is y, 666.67 is logical height
          width: `${(80 / 1000) * 100}%`,    // button width
          height: `${(80 / 666.67) * 100}%`,  // button height
        }}
      >
        <button
          onClick={handleCycle}
          className="w-full h-full z-250 rounded-full cursor-pointer"
          aria-label="Power"
          title="Click to toggle power"
        />
      </div>

    </div>
  );
}
