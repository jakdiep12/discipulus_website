import type { Metadata } from "next";
import Link from "next/link";
import FooterV2 from "../components/v2/FooterV2";
import NavbarV2 from "../components/v2/NavbarV2";
import JobFilters from "./JobFilters";
import "./jobs.css";
import { COMPANIES } from "@/lib/job-board/companies";
import { relativeTime } from "@/lib/job-board/format";
import { getJobBoardData } from "@/lib/job-board/jobs";
import {
  buildJobHref,
  parseJobQuery,
  sectorCounts,
  selectJobPage,
  type JobQuery,
  type RawSearchParams,
} from "@/lib/job-board/query";
import { SECTORS, SECTOR_COLOR, SECTOR_LABEL } from "@/lib/job-board/sectors";
import type { Job } from "@/lib/job-board/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hard Tech Jobs | Discipulus Ventures",
  description:
    "Open roles at Southern California aerospace, defense, energy, and advanced manufacturing companies.",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const [params, data] = await Promise.all([searchParams, getJobBoardData()]);
  const query = parseJobQuery(params);
  const page = selectJobPage(data.jobs, query);
  const counts = sectorCounts(data.jobs, query);
  const generated = new Date(data.generatedAt);
  const sortedCompanies = [...COMPANIES].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="jobs-page">
      <NavbarV2 />

      <header className="jobs-hero">
        <div className="jobs-hero-grid" aria-hidden />
        <div className="jobs-kicker"><span /> Southern California industrial network</div>
        <h1>Find your place<br />on the factory floor<br />of the future.</h1>
        <p>
          Live roles at the aerospace, defense, manufacturing, and energy companies
          rebuilding America&apos;s industrial base from Southern California.
        </p>
        <a href="#open-roles" className="jobs-primary-button">Explore open roles <span aria-hidden>↓</span></a>
        <dl className="jobs-stats">
          <Stat label="Open roles" value={page.total.toLocaleString()} />
          <Stat label="Companies" value={String(COMPANIES.length)} />
          <Stat label="Sources live" value={`${data.sources.filter((source) => source.ok).length}/${data.sources.length}`} />
          <Stat label="Updated" value={generated.toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
        </dl>
      </header>

      <section id="open-roles" className="jobs-filter-shell" aria-label="Job filters">
        <div className="jobs-container">
          <JobFilters query={query} companies={sortedCompanies} />
          <div className="jobs-sector-filters" aria-label="Filter by sector">
            <SectorLink query={query} sector="All" label={`All · ${counts.all}`} />
            {SECTORS.map((sector) => (
              <SectorLink key={sector} query={query} sector={sector} label={`${SECTOR_LABEL[sector]} · ${counts.bySector[sector]}`} />
            ))}
          </div>
        </div>
      </section>

      <main className="jobs-container jobs-results">
        <div className="jobs-results-heading">
          <div><span className="jobs-section-number">01 / OPEN POSITIONS</span><h2>Work on what matters.</h2></div>
          <p aria-live="polite">
            {page.total === 0 ? "No matching roles" : `Showing ${page.from}–${page.to} of ${page.total} roles`}
          </p>
        </div>

        {page.total === 0 ? (
          <div className="jobs-empty"><p>No roles match those filters.</p><Link href="/jobs">Clear filters</Link></div>
        ) : (
          <>
            <ul className="jobs-list">
              {page.jobs.map((job) => <JobRow key={job.id} job={job} generatedAt={generated} />)}
            </ul>
            <Pagination query={query} page={page.page} pageCount={page.pageCount} />
          </>
        )}
        <p className="jobs-refresh-note">Roles refresh hourly from public company career pages.</p>
      </main>

      <FooterV2 />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function SectorLink({ query, sector, label }: { query: JobQuery; sector: JobQuery["sector"]; label: string }) {
  const active = query.sector === sector;
  return <Link aria-current={active ? "true" : undefined} className={active ? "is-active" : ""} href={buildJobHref(query, { sector })} scroll={false}>{label}</Link>;
}

function JobRow({ job, generatedAt }: { job: Job; generatedAt: Date }) {
  return (
    <li>
      <a href={job.url} target="_blank" rel="noreferrer" className="jobs-row">
        <span className="jobs-sector-mark" style={{ background: SECTOR_COLOR[job.sector] }} aria-hidden />
        <span className="jobs-row-main">
          <strong>{job.title}</strong>
          <span>{job.company} <i>·</i> {job.location}{job.department && <><i>·</i> {job.department}</>}</span>
        </span>
        <span className="jobs-row-side">{job.remote && <em>Remote</em>} {relativeTime(job.postedAt, generatedAt)} <b aria-hidden>↗</b></span>
      </a>
    </li>
  );
}

function Pagination({ query, page, pageCount }: { query: JobQuery; page: number; pageCount: number }) {
  if (pageCount <= 1) return null;
  return (
    <nav className="jobs-pagination" aria-label="Pagination">
      {page > 1 ? <Link href={buildJobHref(query, { page: page - 1 })} scroll={false} rel="prev">← Previous</Link> : <span />}
      <span>Page {page} of {pageCount}</span>
      {page < pageCount ? <Link href={buildJobHref(query, { page: page + 1 })} scroll={false} rel="next">Next →</Link> : <span />}
    </nav>
  );
}
