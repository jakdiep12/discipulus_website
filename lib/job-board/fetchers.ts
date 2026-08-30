import type { ActiveCompany, Company, CompanyFetchResult, Job } from "./types";

const REQUEST_TIMEOUT_MS = 20_000;

interface GreenhouseJob {
  id?: string | number;
  title?: string;
  location?: { name?: string };
  departments?: Array<{ name?: string }>;
  absolute_url?: string;
  first_published?: string;
  updated_at?: string;
}

interface AshbyJob {
  id?: string;
  title?: string;
  location?: string;
  isRemote?: boolean;
  department?: string;
  team?: string;
  jobUrl?: string;
  applyUrl?: string;
  publishedAt?: string;
}

interface LeverJob {
  id?: string;
  text?: string;
  categories?: { location?: string; team?: string; department?: string };
  hostedUrl?: string;
  createdAt?: number;
}

interface PinpointJob {
  id?: string;
  title?: string;
  location?: { city?: string; province?: string };
  workplace_type?: string;
  workplace_type_text?: string;
  job?: { department?: { name?: string } };
  url?: string;
}

async function safeFetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      Accept: "application/json",
      "User-Agent": "discipulus-jobs/1.0 (+https://discipulusventures.com)",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return (await response.json()) as T;
}

function expectArray<T>(value: unknown, source: string): T[] {
  if (!Array.isArray(value)) throw new Error(`Unexpected response from ${source}`);
  return value as T[];
}

function requiredId(value: string | number | undefined, source: string): string {
  if (value === undefined || value === "") throw new Error(`Job without an ID from ${source}`);
  return String(value);
}

function validDate(value: string | number | undefined): string | null {
  if (value === undefined) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function guessRemote(location: string): boolean {
  return /remote/i.test(location);
}

async function fetchGreenhouse(company: ActiveCompany): Promise<Job[]> {
  const data = await safeFetchJson<{ jobs?: GreenhouseJob[] }>(
    `https://boards-api.greenhouse.io/v1/boards/${company.token}/jobs?content=false`,
  );
  return expectArray<GreenhouseJob>(data.jobs, company.name).map((job) => {
    const location = job.location?.name ?? "Location TBD";
    return {
      id: `${company.id}-${requiredId(job.id, company.name)}`,
      title: job.title ?? "Untitled role",
      company: company.name,
      companyId: company.id,
      sector: company.sector,
      location,
      remote: guessRemote(location),
      department: job.departments?.[0]?.name ?? null,
      url: job.absolute_url ?? company.website,
      postedAt: validDate(job.first_published ?? job.updated_at),
    };
  });
}

async function fetchAshby(company: ActiveCompany): Promise<Job[]> {
  const data = await safeFetchJson<{ jobs?: AshbyJob[] }>(
    `https://api.ashbyhq.com/posting-api/job-board/${company.token}`,
  );
  return expectArray<AshbyJob>(data.jobs, company.name).map((job) => {
    const location = job.location ?? "Location TBD";
    return {
      id: `${company.id}-${requiredId(job.id, company.name)}`,
      title: job.title ?? "Untitled role",
      company: company.name,
      companyId: company.id,
      sector: company.sector,
      location,
      remote: Boolean(job.isRemote) || guessRemote(location),
      department: job.department ?? job.team ?? null,
      url: job.jobUrl ?? job.applyUrl ?? company.website,
      postedAt: validDate(job.publishedAt),
    };
  });
}

async function fetchLever(company: ActiveCompany): Promise<Job[]> {
  const data = await safeFetchJson<LeverJob[]>(
    `https://api.lever.co/v0/postings/${company.token}?mode=json`,
  );
  return expectArray<LeverJob>(data, company.name).map((job) => {
    const location = job.categories?.location ?? "Location TBD";
    return {
      id: `${company.id}-${requiredId(job.id, company.name)}`,
      title: job.text ?? "Untitled role",
      company: company.name,
      companyId: company.id,
      sector: company.sector,
      location,
      remote: guessRemote(location),
      department: job.categories?.team ?? job.categories?.department ?? null,
      url: job.hostedUrl ?? company.website,
      postedAt: validDate(job.createdAt),
    };
  });
}

async function fetchPinpoint(company: ActiveCompany): Promise<Job[]> {
  const data = await safeFetchJson<{ data?: PinpointJob[] }>(
    `https://${company.token}.pinpointhq.com/postings.json`,
  );
  return expectArray<PinpointJob>(data.data, company.name).map((job) => {
    const location = job.location
      ? [job.location.city, job.location.province].filter(Boolean).join(", ") || "Location TBD"
      : job.workplace_type_text ?? "Location TBD";
    return {
      id: `${company.id}-${requiredId(job.id, company.name)}`,
      title: job.title ?? "Untitled role",
      company: company.name,
      companyId: company.id,
      sector: company.sector,
      location,
      remote: job.workplace_type === "remote" || guessRemote(location),
      department: job.job?.department?.name ?? null,
      url: job.url ?? company.website,
      postedAt: null,
    };
  });
}

const FETCHERS: Record<ActiveCompany["ats"], (company: ActiveCompany) => Promise<Job[]>> = {
  greenhouse: fetchGreenhouse,
  ashby: fetchAshby,
  lever: fetchLever,
  pinpoint: fetchPinpoint,
};

async function fetchCompanyJobs(company: ActiveCompany): Promise<CompanyFetchResult> {
  try {
    return { company, jobs: await FETCHERS[company.ats](company), ok: true };
  } catch (error) {
    return {
      company,
      jobs: [],
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function fetchAllJobs(companies: readonly Company[]): Promise<CompanyFetchResult[]> {
  const activeCompanies = companies.filter(
    (company): company is ActiveCompany => company.ats !== null,
  );
  return Promise.all(activeCompanies.map(fetchCompanyJobs));
}
