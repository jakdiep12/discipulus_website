import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchAllJobs } from "./fetchers";
import type { ActiveCompany } from "./types";

afterEach(() => vi.unstubAllGlobals());

function company(id: string): ActiveCompany {
  return {
    id,
    name: "Test Company",
    sector: "Launch & Space",
    website: "https://example.com",
    ats: "greenhouse",
    token: id,
  };
}

describe("job-board fetchers", () => {
  it("drops a malformed posting without dropping the company", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ jobs: [
        { title: "Missing identifier" },
        { id: 7, title: "Valid role", location: { name: "El Segundo, CA" }, absolute_url: "https://example.com/7" },
      ] }), { status: 200 }),
    ));

    const [result] = await fetchAllJobs([company("malformed-record-test")]);
    expect(result.ok).toBe(true);
    expect(result.jobs.map(({ title }) => title)).toEqual(["Valid role"]);
  });

  it("serves the last good company snapshot after a transient failure", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ jobs: [
        { id: 8, title: "Cached role", location: { name: "Hawthorne, CA" }, absolute_url: "https://example.com/8" },
      ] }), { status: 200 }))
      .mockRejectedValueOnce(new Error("upstream unavailable"));
    vi.stubGlobal("fetch", fetchMock);
    const target = company("stale-snapshot-test");

    await fetchAllJobs([target]);
    const [stale] = await fetchAllJobs([target]);

    expect(stale.ok).toBe(false);
    expect(stale.stale).toBe(true);
    expect(stale.jobs.map(({ title }) => title)).toEqual(["Cached role"]);
  });
});
