import { getJobBoardData } from "@/lib/job-board/jobs";
import {
  PAGE_SIZE,
  parseJobQuery,
  selectJobPage,
  type RawSearchParams,
} from "@/lib/job-board/query";

export const revalidate = 3600;

/**
 * Accepts the same `q` / `sector` / `company` / `remote` / `page` parameters as
 * the board. Responses are always paginated so the full catalogue is never
 * serialized to a browser by accident.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const data = await getJobBoardData();
  const query = parseJobQuery(Object.fromEntries(url.searchParams) as RawSearchParams);

  const page = selectJobPage(data.jobs, query);
  return Response.json({
    generatedAt: data.generatedAt,
    totalJobs: data.jobs.length,
    matchedJobs: page.total,
    page: page.page,
    pageCount: page.pageCount,
    pageSize: PAGE_SIZE,
    jobs: page.jobs,
    sources: data.sources,
  });
}
