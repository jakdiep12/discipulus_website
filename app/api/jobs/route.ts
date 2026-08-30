import { getJobBoardData } from "@/lib/job-board/jobs";

export const revalidate = 3600;

export async function GET() {
  const data = await getJobBoardData();
  return Response.json({ generatedAt: data.generatedAt, totalJobs: data.jobs.length, jobs: data.jobs, sources: data.sources });
}
