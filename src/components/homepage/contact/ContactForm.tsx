'use client';

import React, { useRef, useState, useEffect } from "react";
import { sendForm, init } from "@emailjs/browser";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Read env vars using Next.js convention
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS ONLY on client
  useEffect(() => {
    if (typeof window === "undefined") return; // never run on server
    if (!publicKey) {
      console.warn(
        "EmailJS public key missing. Set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local"
      );
      return;
    }
    try {
      init(publicKey);
    } catch (e) {
      console.error("EmailJS init error:", e);
    }
  }, [publicKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!formRef.current) return;

    // Basic client-side validation
    const formData = new FormData(formRef.current);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!serviceId || !templateId) {
      setErrorMsg(
        "Email service not configured. Make sure NEXT_PUBLIC_EMAILJS_SERVICE_ID and NEXT_PUBLIC_EMAILJS_TEMPLATE_ID are set."
      );
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      // sendForm must run in the browser; we're already in client event handler
      await sendForm(serviceId, templateId, formRef.current as HTMLFormElement);
      setStatus("success");
      formRef.current.reset();
    } catch (err: any) {
      console.error("EmailJS send error:", err);
      setErrorMsg(err?.text || err?.message || "Failed to send. Try again.");
      setStatus("error");
    }
  }

  return (
    <div className="contact-form w-full max-w-full md:max-w-xl mx-auto px-4">
      <div className="card backdrop-blur-xs shadow-lg rounded-2xl overflow-hidden p-6 md:p-8 hover:scale-102 hover:bg-base-100 transition-all duration-200 ease-in-out">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 w-full"
          aria-live="polite"
        >
          <div className="form-control flex flex-col w-full">
            <label className="label pb-1" htmlFor="name">
              <span className="label-text text-sm">Full Name</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Alex Johnson"
              className="input input-bordered transition duration-200 py-3 px-3 md:py-3 md:px-4 rounded-xl w-full text-sm"
              required
            />
          </div>

          <div className="form-control flex flex-col w-full">
            <label className="label pb-1" htmlFor="email">
              <span className="label-text text-sm">Email</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. alex@example.com"
              className="input input-bordered transition duration-200 py-3 px-3 md:py-3 md:px-4 rounded-xl w-full text-sm"
              required
            />
          </div>

          <div className="form-control flex flex-col w-full">
            <label className="label pb-1" htmlFor="message">
              <span className="label-text text-sm">Message</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="textarea textarea-bordered transition duration-200 py-3 px-3 md:py-3 md:px-4 w-full min-h-[10rem] text-sm rounded-xl"
              placeholder="Write your message here..."
              required
            />
          </div>

          <div className="form-control w-full mt-2">
            <button
              type="submit"
              className={`btn btn-primary btn-wide py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform ${
                status === "sending" ? "opacity-80 pointer-events-none" : ""
              }`}
              aria-disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>

          <div className="mt-3" aria-live="polite">
            {status === "success" && (
              <div className="alert alert-success shadow-lg">
                <div>
                  <span>Message sent — I will get back to you soon. 🎉</span>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <span>{errorMsg || "Something went wrong. Try again."}</span>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}