"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/lib/useFocusTrap";

export default function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const dialogRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    let response: Response;
    try {
      response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", fields }),
      });
    } catch {
      setError("We couldn’t reach the server. Check your connection and try again.");
      setStatus("error");
      return;
    }
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("success");
  }

  const modal = open ? (
    <div className="fixed inset-0 z-[10000] grid place-items-center p-4 sm:p-6">
      <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close contact form" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="contact-title" tabIndex={-1} className="relative w-full max-w-xl border border-white/15 bg-navy-2 p-6 text-left shadow-2xl outline-none sm:p-9">
        <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center text-2xl text-white/50 transition hover:text-white" aria-label="Close">×</button>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#f7e3b5]">Get in touch</p>
        <h2 id="contact-title" className="mt-3 font-freight text-4xl text-white">Contact us.</h2>
        <p className="mt-3 text-sm leading-6 text-white/55">Send a note directly to the Discipulus team.</p>
        {status === "success" ? (
          <div className="mt-8 border border-[#f7e3b5]/30 p-6 text-center" role="status">
            <p className="text-white">Message sent.</p>
            <button className="mt-4 text-sm text-white/55 underline hover:text-white" onClick={() => setOpen(false)}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="hidden" aria-hidden><label>Website<input name="website_check" tabIndex={-1} autoComplete="off" /></label></div>
            <ContactField label="Name" name="name" required autoComplete="name" />
            <ContactField label="Email" name="email" type="email" required autoComplete="email" />
            <label className="block">
              <span className="mb-2 block font-mono text-[0.63rem] uppercase tracking-[0.12em] text-white/50">Message</span>
              <textarea name="message" required rows={5} className="w-full resize-y border border-white/15 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#f7e3b5]/70" />
            </label>
            <button disabled={status === "sending"} className="min-h-[50px] bg-white px-6 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy transition hover:bg-[#f7e3b5] disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && <p className="text-sm text-red-300" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button type="button" onClick={() => { setStatus("idle"); setOpen(true); }} className="inline-flex min-h-[52px] items-center justify-center border border-white/15 px-7 py-4 text-[0.875rem] tracking-wider text-white/70 transition-all hover:border-white/30 hover:bg-white/[0.03] hover:text-white sm:min-h-0 sm:py-3 sm:text-[0.8rem]">
        Contact us
      </button>
      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}

function ContactField({ label, name, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return <label className="block"><span className="mb-2 block font-mono text-[0.63rem] uppercase tracking-[0.12em] text-white/50">{label}</span><input name={name} className="w-full border border-white/15 bg-white/[0.035] px-4 py-3 text-white outline-none focus:border-[#f7e3b5]/70" {...props} /></label>;
}
