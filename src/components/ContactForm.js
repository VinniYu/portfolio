"use client";

import { useState } from "react";

export default function ContactForm( {theme} ) {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="relative w-[850px] h-auto text-[#f8f3e8] text-[30px] font-hillstown z-600">
      <div className="relative mb-170 w-full h-auto">
        <img
          src="/images/email_form.png"
          alt="Email form light"
          className={`absolute top-0 left-0 w-full h-auto object-contain transition-opacity duration-500 ${
            theme === "light" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: 'opacity 0.5s ease, filter 0.5s ease',
            filter: theme === 'dark' ? 'blur(1px)' : 'blur(0px)',
          }}
          draggable="false"
        />
        <img
          src="/images/email_form_dark.png"
          alt="Email form dark"
          className={`absolute top-0 left-0 w-full h-auto object-contain transition-opacity duration-500 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: 'opacity 0.5s ease, filter 0.5s ease',
            filter: theme === 'dark' ? 'blur(0px)' : 'blur(1px)',
          }}
          draggable="false"
        />
      </div>


      {/* Instagram stamp link */}
      <a
        href="https://www.instagram.com/vinni.yu/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-[30px] right-[32px] w-[90px] h-[95px] z-10 group"
      > 
        <div className="w-full h-full relative corner-border">
          <span className="corner top-left"></span>
          <span className="corner top-right"></span>
          <span className="corner bottom-left"></span>
          <span className="corner bottom-right"></span>
        </div>
      </a>

      {/* Github stamp link */}
      <a
        href="https://github.com/VinniYu"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-[47px] right-[138px] w-[90px] h-[95px] z-10 group"
      > 
        <div className="w-full h-full relative corner-border">
          <span className="corner top-left"></span>
          <span className="corner top-right"></span>
          <span className="corner bottom-left"></span>
          <span className="corner bottom-right"></span>
        </div>
      </a>

      {/* LinkedIn stamp link */}
      <a
        href="https://www.linkedin.com/in/vinniyu/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-[135px] right-[40px] w-[90px] h-[95px] z-10 group"
      > 
        <div className="w-full h-full relative corner-border">
          <span className="corner top-left"></span>
          <span className="corner top-right"></span>
          <span className="corner bottom-left"></span>
          <span className="corner bottom-right"></span>
        </div>
      </a>

      {/* Email form */}
      <form
        onSubmit={handleSubmit}
        className="absolute top-[160px] left-[35px] flex flex-col gap-4 w-[550px] text-black"
      >
        <input
          name="name" type="text" placeholder="Your name"
          className="w-[350px] bg-[var(--form-color)] p-2 text-[20px] rounded transition-colors duration-500"
          required
        />
        <input
          name="email" type="email" placeholder="Your email"
          className="w-[350px] bg-[var(--form-color)] p-2 text-[20px] rounded transition-colors duration-500"
          required
        />
        <textarea
          name="message" placeholder="Your message"
          className="w-[350px] h-[145px] bg-[var(--form-color)] p-2 text-[20px] rounded transition-colors duration-500"
          required
        />
        <button className="w-[350px] group relative inline-flex h-14 items-center justify-center overflow-hidden
                           rounded-md  bg-[#d45456] 
                           px-6 font-medium text-white transition-all 
                           [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] 
                           active:shadow-none cursor-pointer"
                           >
          Send
        </button>
      </form>

      {status === "success" && (
        <p className="absolute bottom-[-40px] left-0 text-green-500 text-[18px]">
          Message sent!
        </p>
      )}
      {status === "error" && (
        <p className="absolute bottom-[-40px] left-0 text-red-500 text-[18px]">
          Something went wrong.
        </p>
      )}
    </div>
  );
}
