"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buildJobHref, type JobQuery } from "@/lib/job-board/query";
import type { Company } from "@/lib/job-board/types";

interface JobFiltersProps {
  query: JobQuery;
  companies: readonly Company[];
}

/**
 * The only client component on the board. It receives the query and the company
 * list — never the job catalogue — and just rewrites the URL; the server does
 * the filtering and returns one page of results.
 */
const JobFilters: React.FC<JobFiltersProps> = ({ query, companies }) => {
  const router = useRouter();
  const [term, setTerm] = useState(query.q);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep the field in step when the query changes from outside (chips, back button).
  useEffect(() => setTerm(query.q), [query.q]);
  useEffect(() => () => clearTimeout(debounce.current), []);

  function go(overrides: Partial<JobQuery>, mode: "push" | "replace" = "push") {
    clearTimeout(debounce.current);
    router[mode](buildJobHref(query, overrides), { scroll: false });
  }

  function onTermChange(value: string) {
    setTerm(value);
    clearTimeout(debounce.current);
    // Replace rather than push, so typing a query does not bury the previous
    // page under one history entry per pause in typing.
    debounce.current = setTimeout(() => go({ q: value.trim() }, "replace"), 300);
  }

  return (
    <form
      action="/jobs"
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        go({ q: term.trim() });
      }}
      className="jobs-filter-grid"
    >
      {/* Sector lives in the chips above, so carry it through a no-JS submit. */}
      {query.sector !== "All" && <input type="hidden" name="sector" value={query.sector} />}

      <label className="jobs-search">
        <span className="sr-only">Search jobs</span>
        <span aria-hidden>
          ⌕
        </span>
        <input
          type="search"
          name="q"
          value={term}
          onChange={(event) => onTermChange(event.target.value)}
          placeholder="Search role, company, or location"
        />
      </label>

      <select
        name="company"
        aria-label="Filter by company"
        value={query.companyId}
        onChange={(event) => go({ companyId: event.target.value })}
      >
        <option value="All">All companies</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      <label
        className="jobs-remote"
      >
        <input
          type="checkbox"
          name="remote"
          value="1"
          checked={query.remoteOnly}
          onChange={(event) => go({ remoteOnly: event.target.checked })}
        />
        Remote only
      </label>

      <noscript>
        <button
          type="submit"
          className="jobs-filter-submit"
        >
          Apply filters
        </button>
      </noscript>
    </form>
  );
};

export default JobFilters;
