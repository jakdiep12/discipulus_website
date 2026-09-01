import { isSouthernCalifornia } from "./geo";
import { SECTORS } from "./sectors";
import type { Job, Sector } from "./types";

export const PAGE_SIZE = 50;

export interface JobQuery {
  q: string;
  sector: Sector | "All";
  companyId: string;
  remoteOnly: boolean;
  page: number;
}

export interface JobPage {
  /** Only the roles for the requested page — this is all the browser receives. */
  jobs: Job[];
  total: number;
  page: number;
  pageCount: number;
  from: number;
  to: number;
}

export type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function isSector(value: string): value is Sector {
  return (SECTORS as readonly string[]).includes(value);
}

export function parseJobQuery(params: RawSearchParams): JobQuery {
  const sector = first(params.sector);
  const page = Number.parseInt(first(params.page), 10);
  return {
    q: first(params.q).slice(0, 120).trim(),
    sector: isSector(sector) ? sector : "All",
    companyId: first(params.company) || "All",
    remoteOnly: first(params.remote) === "1",
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

export function buildJobHref(query: JobQuery, overrides: Partial<JobQuery> = {}): string {
  const merged = { ...query, ...overrides };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.sector !== "All") params.set("sector", merged.sector);
  if (merged.companyId !== "All") params.set("company", merged.companyId);
  if (merged.remoteOnly) params.set("remote", "1");
  // Any filter change resets to page 1 unless the caller asked for a page.
  const page = overrides.page ?? (Object.keys(overrides).length > 0 ? 1 : merged.page);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/jobs?${search}` : "/jobs";
}

export function matchesQuery(job: Job, query: JobQuery, normalizedTerm: string): boolean {
  if (query.sector !== "All" && job.sector !== query.sector) return false;
  if (query.companyId !== "All" && job.companyId !== query.companyId) return false;
  if (query.remoteOnly && !job.remote) return false;
  if (!query.remoteOnly && job.remote && !isSouthernCalifornia(job.location)) return false;
  if (!normalizedTerm) return true;
  return [job.title, job.company, job.location, job.department ?? ""].some((value) =>
    value.toLowerCase().includes(normalizedTerm),
  );
}

export function selectJobPage(jobs: readonly Job[], query: JobQuery): JobPage {
  const normalizedTerm = query.q.toLowerCase();
  const matched = jobs.filter((job) => matchesQuery(job, query, normalizedTerm));
  const pageCount = Math.max(1, Math.ceil(matched.length / PAGE_SIZE));
  const page = Math.min(query.page, pageCount);
  const from = (page - 1) * PAGE_SIZE;
  const window = matched.slice(from, from + PAGE_SIZE);

  return {
    jobs: window,
    total: matched.length,
    page,
    pageCount,
    from: matched.length === 0 ? 0 : from + 1,
    to: from + window.length,
  };
}

/**
 * Counts per sector for the current query with the sector facet itself removed,
 * so the chips show what each sector would yield rather than always 0 for the
 * ones you are not on.
 */
export function sectorCounts(
  jobs: readonly Job[],
  query: JobQuery,
): { all: number; bySector: Record<Sector, number> } {
  const normalizedTerm = query.q.toLowerCase();
  const bySector = { ...Object.fromEntries(SECTORS.map((s) => [s, 0])) } as Record<Sector, number>;
  let all = 0;
  for (const job of jobs) {
    if (!matchesQuery(job, { ...query, sector: "All" }, normalizedTerm)) continue;
    all += 1;
    bySector[job.sector] += 1;
  }
  return { all, bySector };
}
