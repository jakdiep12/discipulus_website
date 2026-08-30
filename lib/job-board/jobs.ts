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

export async function getJobBoardData(): Promise<JobBoardData> {
  const results = await fetchAllJobs(COMPANIES);
  const jobs = results
    .flatMap((result) => result.jobs)
    .filter((job) => isSouthernCalifornia(job.location))
    .sort(compareJobs);

  return {
    generatedAt: new Date().toISOString(),
    jobs,
    totalSourceJobs: results.reduce((total, result) => total + result.jobs.length, 0),
    sources: results.map((result) => ({
      companyId: result.company.id,
      company: result.company.name,
      ats: result.company.ats,
      ok: result.ok,
      count: result.jobs.length,
      error: result.error ?? null,
    })),
  };
}
