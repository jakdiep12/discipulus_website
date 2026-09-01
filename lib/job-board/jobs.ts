import { COMPANIES } from "./companies";
import { fetchAllJobs } from "./fetchers";
import { isSouthernCalifornia } from "./geo";
import type { Job, JobBoardData } from "./types";

function postedTime(job: Job): number {
  if (!job.postedAt) return Number.NEGATIVE_INFINITY;
  const time = Date.parse(job.postedAt);
  return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
}

function compareJobs(a: Job, b: Job): number {
  return (
    postedTime(b) - postedTime(a) ||
    a.title.localeCompare(b.title) ||
    a.company.localeCompare(b.company)
  );
}

/**
 * The board is a Southern California board, so postings are matched against the
 * SoCal keyword list — but remote roles carry a generic location ("Remote — US")
 * that no keyword can match, and dropping them here is what left the remote
 * filter with nothing to show. Remote roles at these companies belong on the
 * board, so they come through on the `remote` flag instead.
 */
function isRelevant(job: Job): boolean {
  return job.remote || isSouthernCalifornia(job.location);
}

const CACHE_TTL_MS = 3_600_000;

let cached: { data: JobBoardData; expiresAt: number } | null = null;
let inFlight: Promise<JobBoardData> | null = null;

/**
 * The board is rendered per request now that filtering happens on the server,
 * so the catalogue is memoised in the server instance for an hour. Next's own
 * data cache cannot carry all of this — Anduril alone answers with ~3 MB and
 * anything over 2 MB is rejected — which without this would mean re-fetching
 * every board on every page view. Concurrent misses share one refresh rather
 * than each starting their own fan-out.
 */
export async function getJobBoardData(): Promise<JobBoardData> {
  if (cached && cached.expiresAt > Date.now()) return cached.data;
  inFlight ??= refresh();
  return inFlight;
}

async function refresh(): Promise<JobBoardData> {
  try {
    const data = await buildJobBoardData();
    cached = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return data;
  } catch (error) {
    // Per-company failures are already handled in fetchAllJobs, so this only
    // trips on something unexpected — serve the previous catalogue if we have one.
    if (cached) return cached.data;
    throw error;
  } finally {
    inFlight = null;
  }
}

async function buildJobBoardData(): Promise<JobBoardData> {
  const results = await fetchAllJobs(COMPANIES);
  const jobs = results.flatMap((result) => result.jobs).filter(isRelevant).sort(compareJobs);

  return {
    generatedAt: new Date().toISOString(),
    jobs,
    totalSourceJobs: results.reduce((total, result) => total + result.jobs.length, 0),
    sources: results.map((result) => ({
      companyId: result.company.id,
      company: result.company.name,
      ats: result.company.ats,
      ok: result.ok,
      stale: result.stale,
      count: result.jobs.length,
      error: result.error ?? null,
    })),
  };
}
