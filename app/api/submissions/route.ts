import { NextRequest, NextResponse } from "next/server";

const LIMITS: Record<string, number> = {
  name: 120, email: 254, message: 4000, company: 160, website: 500, location: 160,
  stage: 80, summary: 4000, traction: 4000, why: 4000, other: 4000,
  profile: 500, discipline: 160, experience: 160, interest: 4000, background: 4000,
};

const REQUIRED = {
  founder: ["name", "email", "company", "location", "stage", "summary", "traction", "why"],
  talent: ["name", "email", "profile", "location", "discipline", "experience", "interest", "background"],
  contact: ["name", "email", "message"],
} as const;

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  if (
    !payload ||
    !["founder", "talent", "contact"].includes(payload.type) ||
    !payload.fields ||
    typeof payload.fields !== "object" ||
    Array.isArray(payload.fields)
  ) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (payload.fields.website_check) return NextResponse.json({ ok: true });

  const type = payload.type as keyof typeof REQUIRED;
  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = payload.fields[key];
    if (typeof value === "string" && value.trim()) fields[key] = value.trim().slice(0, max);
  }

  if (REQUIRED[type].some((key) => !fields[key]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email || "")) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUBMISSIONS_TO_EMAIL;
  const from = process.env.SUBMISSIONS_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Submission email is not configured. Set RESEND_API_KEY, SUBMISSIONS_TO_EMAIL, and SUBMISSIONS_FROM_EMAIL.");
    return NextResponse.json({ error: "Submissions are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const rows = Object.entries(fields)
    .map(([key, value]) => `<tr><th style="padding:8px;text-align:left;vertical-align:top">${escapeHtml(key)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
    .join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: fields.email,
      subject: `${type === "founder" ? "Founder application" : type === "talent" ? "Talent network" : "Website contact"}: ${fields.name}`,
      html: `<h1>${type === "founder" ? "Founder application" : type === "talent" ? "Talent network submission" : "Website contact"}</h1><table>${rows}</table>`,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected submission", response.status, await response.text());
    return NextResponse.json({ error: "We couldn’t send your submission. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] || character);
}
