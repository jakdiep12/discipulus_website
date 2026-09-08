"use client";

import React, { FormEvent, useState } from "react";

type SubmissionType = "founder" | "talent";

const inputClass =
  "w-full border border-white/15 bg-white/[0.035] px-4 py-3.5 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#f7e3b5]/70";
const labelClass =
  "mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/55";

export default function SubmissionForm({ type }: { type: SubmissionType }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

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
        body: JSON.stringify({ type, fields }),
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

  if (status === "success") {
    return (
      <div className="border border-[#f7e3b5]/30 bg-[#f7e3b5]/[0.06] p-8 text-center" role="status">
        <p className="font-freight text-3xl text-white">Thank you.</p>
        <p className="mt-3 text-sm leading-6 text-white/60">
          {type === "founder"
            ? "We’ve received your application and will be in touch if there’s a fit."
            : "You’re in the network. We’ll reach out when a relevant opportunity comes up."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <label>Website<input name="website_check" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <Field label="Full name" name="name" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />

      {type === "founder" ? (
        <>
          <Field label="Company or project" name="company" required />
          <Field label="Company website" name="website" type="url" placeholder="https://" />
          <Field label="Where are you based?" name="location" required autoComplete="address-level2" />
          <label>
            <span className={labelClass}>Company stage</span>
            <select name="stage" required className={inputClass} defaultValue="">
              <option value="" disabled className="bg-navy">Select one</option>
              <option className="bg-navy">Exploring an idea</option>
              <option className="bg-navy">Building pre-launch</option>
              <option className="bg-navy">Launched / pre-revenue</option>
              <option className="bg-navy">Early revenue</option>
            </select>
          </label>
          <TextArea label="What are you building?" name="summary" required placeholder="Explain the problem, your approach, and who it’s for." />
          <TextArea label="What have you accomplished so far?" name="traction" required placeholder="Product, customers, technical milestones, or other evidence of progress." />
          <TextArea label="Why Discipulus, and why now?" name="why" required />
          <TextArea label="Anything else we should know?" name="other" />
        </>
      ) : (
        <>
          <Field label="LinkedIn or personal site" name="profile" type="url" required placeholder="https://" />
          <Field label="Where are you based?" name="location" required autoComplete="address-level2" />
          <Field label="Primary discipline" name="discipline" required placeholder="Engineering, operations, design…" />
          <Field label="Experience level" name="experience" required placeholder="Student, 3 years, staff-level…" />
          <TextArea label="What kind of work are you looking for?" name="interest" required />
          <TextArea label="What should founders know about you?" name="background" required />
        </>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-[52px] bg-white px-7 py-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-navy transition hover:bg-[#f7e3b5] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Submitting…" : type === "founder" ? "Submit application" : "Join the talent network"}
        </button>
        {status === "error" && <p className="mt-3 text-sm text-red-300" role="alert">{error}</p>}
      </div>
    </form>
  );
}

function Field({ label, name, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      <input name={name} className={inputClass} {...props} />
    </label>
  );
}

function TextArea({ label, name, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  return (
    <label className="sm:col-span-2">
      <span className={labelClass}>{label}</span>
      <textarea name={name} rows={5} className={`${inputClass} resize-y`} {...props} />
    </label>
  );
}
