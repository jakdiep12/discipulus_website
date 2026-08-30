"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { relativeTime } from "@/lib/job-board/format";
import { SECTORS, SECTOR_COLOR, SECTOR_LABEL } from "@/lib/job-board/sectors";
import type { Company, Job, Sector } from "@/lib/job-board/types";

interface Props {
  jobs: readonly Job[];
  companies: readonly Company[];
  sourceCount: number;
  failedCount: number;
  generatedAt: string;
}

const PAGE_SIZE = 60;

export default function JobBoard({ jobs, companies, sourceCount, failedCount, generatedAt }: Props) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<Sector | "All">("All");
  const [companyId, setCompanyId] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sectorCounts = useMemo(() => {
    const counts: Partial<Record<Sector, number>> = {};
    for (const job of jobs) counts[job.sector] = (counts[job.sector] ?? 0) + 1;
    return counts;
  }, [jobs]);

  const sortedCompanies = useMemo(
    () => [...companies].sort((a, b) => a.name.localeCompare(b.name)),
    [companies],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (sector !== "All" && job.sector !== sector) return false;
      if (companyId !== "All" && job.companyId !== companyId) return false;
      if (remoteOnly && !job.remote) return false;
      if (!normalized) return true;
      return [job.title, job.company, job.location, job.department ?? ""]
        .some((value) => value.toLowerCase().includes(normalized));
    });
  }, [companyId, jobs, query, remoteOnly, sector]);

  const visible = filtered.slice(0, visibleCount);
  const generated = new Date(generatedAt);

  function updateFilters(update: () => void) {
    update();
    setVisibleCount(PAGE_SIZE);
  }

  function clearFilters() {
    updateFilters(() => {
      setQuery("");
      setSector("All");
      setCompanyId("All");
      setRemoteOnly(false);
    });
  }

  return (
    <div className="jobs-page">
      <nav className="jobs-nav" aria-label="Primary navigation">
        <Link href="/" className="jobs-wordmark" aria-label="Discipulus Ventures home">
          <span className="jobs-mark" aria-hidden>DV</span>
          <span>Discipulus Ventures</span>
        </Link>
        <div className="jobs-nav-links">
          <Link href="/#program">Program</Link>
          <Link href="/cohort">Cohort</Link>
          <Link href="/team">Team</Link>
          <Link href="/jobs" aria-current="page">Jobs</Link>
          <a className="jobs-nav-cta" href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q" target="_blank" rel="noreferrer">Apply</a>
        </div>
      </nav>

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
          <Stat label="Open roles" value={jobs.length.toLocaleString()} />
          <Stat label="Companies" value={String(companies.length)} />
          <Stat label="Sources live" value={`${sourceCount - failedCount}/${sourceCount}`} />
          <Stat label="Updated" value={generated.toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
        </dl>
      </header>

      <section id="open-roles" className="jobs-filter-shell" aria-label="Job filters">
        <div className="jobs-container">
          <div className="jobs-filter-grid">
            <label className="jobs-search">
              <span className="sr-only">Search jobs</span>
              <span aria-hidden>⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => updateFilters(() => setQuery(event.target.value))}
                placeholder="Search role, company, or location"
              />
            </label>
            <select
              value={companyId}
              aria-label="Filter by company"
              onChange={(event) => updateFilters(() => setCompanyId(event.target.value))}
            >
              <option value="All">All companies</option>
              {sortedCompanies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
            </select>
            <label className="jobs-remote">
              <input type="checkbox" checked={remoteOnly} onChange={(event) => updateFilters(() => setRemoteOnly(event.target.checked))} />
              Remote only
            </label>
          </div>
          <div className="jobs-sector-filters" aria-label="Filter by sector">
            <FilterButton active={sector === "All"} onClick={() => updateFilters(() => setSector("All"))} label={`All · ${jobs.length}`} />
            {SECTORS.map((item) => (
              <FilterButton key={item} active={sector === item} onClick={() => updateFilters(() => setSector(item))} label={`${SECTOR_LABEL[item]} · ${sectorCounts[item] ?? 0}`} />
            ))}
          </div>
        </div>
      </section>

      <main className="jobs-container jobs-results">
        <div className="jobs-results-heading">
          <div><span className="jobs-section-number">01 / OPEN POSITIONS</span><h2>Work on what matters.</h2></div>
          <p aria-live="polite">Showing {visible.length} of {filtered.length} roles</p>
        </div>

        {filtered.length === 0 ? (
          <div className="jobs-empty"><p>No roles match those filters.</p><button onClick={clearFilters}>Clear filters</button></div>
        ) : (
          <>
            <ul className="jobs-list">
              {visible.map((job) => <JobRow key={job.id} job={job} generatedAt={generated} />)}
            </ul>
            {visible.length < filtered.length && (
              <button className="jobs-load-more" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Load {Math.min(PAGE_SIZE, filtered.length - visible.length)} more roles
              </button>
            )}
          </>
        )}
      </main>

      <footer className="jobs-footer">
        <div className="jobs-container jobs-footer-cta"><p>Your work should move the country forward.</p><a href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q" target="_blank" rel="noreferrer">Build with us <span aria-hidden>↗</span></a></div>
        <div className="jobs-container jobs-footer-meta"><span>Discipulus Ventures · El Segundo, California</span><span>Roles refresh hourly from public company career pages.</span></div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button aria-pressed={active} onClick={onClick} className={active ? "is-active" : ""}>{label}</button>;
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
