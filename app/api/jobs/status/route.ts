import { COMPANIES } from "@/lib/job-board/companies";
import { getJobBoardData } from "@/lib/job-board/jobs";

export const revalidate = 3600;

export async function GET() {
  const data = await getJobBoardData();
  return Response.json({
    generatedAt: data.generatedAt,
    totalJobs: data.jobs.length,
    totalSourceJobs: data.totalSourceJobs,
    trackedCompanies: COMPANIES.length,
    totalSources: data.sources.length,
    healthySources: data.sources.filter((source) => source.ok).length,
    sources: data.sources,
  });
}
