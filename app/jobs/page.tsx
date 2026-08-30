import type { Metadata } from "next";
import JobBoard from "./JobBoard";
import { COMPANIES } from "@/lib/job-board/companies";
import { getJobBoardData } from "@/lib/job-board/jobs";
import "./jobs.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hard Tech Jobs | Discipulus Ventures",
  description:
    "Open roles at Southern California aerospace, defense, energy, and advanced manufacturing companies.",
};

export default async function JobsPage() {
  const data = await getJobBoardData();

  return (
    <JobBoard
      jobs={data.jobs}
      companies={COMPANIES}
      sourceCount={data.sources.length}
      failedCount={data.sources.filter((source) => !source.ok).length}
      generatedAt={data.generatedAt}
    />
  );
}
