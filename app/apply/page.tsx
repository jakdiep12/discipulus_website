import type { Metadata } from "next";
import NavbarV2 from "../components/v2/NavbarV2";
import FooterV2 from "../components/v2/FooterV2";
import SubmissionForm from "../components/forms/SubmissionForm";

export const metadata: Metadata = {
  title: "Apply | Discipulus Ventures",
  description: "Apply to the Discipulus founder residency in El Segundo.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <NavbarV2 />
      <main className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_600px_at_80%_10%,rgba(80,110,180,0.22),transparent_65%)]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#f7e3b5]">Founder residency · El Segundo</p>
          <h1 className="mt-5 font-freight text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.95] tracking-tight">Build what matters.</h1>
          <p className="mb-14 mt-7 max-w-2xl text-base leading-7 text-white/60">
            Tell us what you’re building and why you’re the person to build it. We care more about technical depth, conviction, and evidence of action than polished startup language.
          </p>
          <SubmissionForm type="founder" />
        </div>
      </main>
      <FooterV2 />
    </div>
  );
}
