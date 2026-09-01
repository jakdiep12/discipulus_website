import { describe, expect, it } from "vitest";
import { PAGE_SIZE, parseJobQuery, selectJobPage } from "./query";
import type { Job } from "./types";

function job(id: number, location = "El Segundo, CA", remote = false): Job {
  return {
    id: String(id),
    title: `Engineer ${id}`,
    company: "Test Company",
    companyId: "test-company",
    sector: "Launch & Space",
    location,
    remote,
    department: null,
    url: "https://example.com/job",
    postedAt: null,
  };
}

describe("job-board queries", () => {
  it("returns only one bounded page", () => {
    const jobs = Array.from({ length: PAGE_SIZE + 7 }, (_, index) => job(index));
    const page = selectJobPage(jobs, parseJobQuery({}));

    expect(page.jobs).toHaveLength(PAGE_SIZE);
    expect(page.total).toBe(PAGE_SIZE + 7);
    expect(page.pageCount).toBe(2);
  });

  it("keeps generic remote roles out of the default SoCal feed", () => {
    const jobs = [job(1), job(2, "Remote — US", true)];
    expect(selectJobPage(jobs, parseJobQuery({})).jobs.map(({ id }) => id)).toEqual(["1"]);
  });

  it("includes generic remote roles when remote-only is selected", () => {
    const jobs = [job(1), job(2, "Remote — US", true)];
    expect(selectJobPage(jobs, parseJobQuery({ remote: "1" })).jobs.map(({ id }) => id)).toEqual(["2"]);
  });
});
