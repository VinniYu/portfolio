"use client";

import { useState } from "react";

export default function ContactForm() {
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
    <div className="relative w-[700px] h-auto text-[#f8f3e8] text-[30px] font-hillstown">
      <img
        src="/images/email_form.png"
        alt="Email Form Background"
        className="w-full h-auto"
        draggable="false"
      />

      {/* Instagram stamp link */}
      <a
        href="https://www.instagram.com/vinni.yu/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-[26px] right-[27px] w-[72px] h-[78px] z-10 group"
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
        className="absolute top-[38px] right-[114px] w-[72px] h-[78px] z-10 group"
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
        className="absolute top-[111px] right-[34px] w-[72px] h-[78px] z-10 group"
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
        className="absolute top-[140px] left-[35px] flex flex-col gap-4 w-[550px] text-black"
      >
        <input
          name="name" type="text" placeholder="Your name"
          className="w-[280px] bg-[#decfb6] p-2 text-[20px] rounded"
          required
        />
        <input
          name="email" type="email" placeholder="Your email"
          className="w-[280px] bg-[#decfb6] p-2 text-[20px] rounded"
          required
        />
        <textarea
          name="message" placeholder="Your message"
          className="w-[280px] bg-[#decfb6] p-2 text-[20px] rounded"
          required
        />
        <button className="w-[280px] group relative inline-flex h-14 items-center justify-center overflow-hidden
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
