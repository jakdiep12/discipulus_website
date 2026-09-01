export type Sector =
  | "Launch & Space"
  | "Defense & Autonomy"
  | "Advanced Manufacturing"
  | "Energy";

export type AtsKind = "greenhouse" | "ashby" | "lever" | "pinpoint";

interface CompanyDetails {
  id: string;
  name: string;
  sector: Sector;
  website: string;
}

export type Company = CompanyDetails &
  (
    | { ats: AtsKind; token: string }
    | { ats: null; token: null }
  );

export type ActiveCompany = Company & { ats: AtsKind; token: string };

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  sector: Sector;
  location: string;
  remote: boolean;
  department: string | null;
  url: string;
  postedAt: string | null;
}

export interface CompanyFetchResult {
  company: ActiveCompany;
  jobs: Job[];
  ok: boolean;
  /** True when `jobs` came from the last good snapshot rather than a live fetch. */
  stale: boolean;
  error?: string;
}

export interface JobSource {
  companyId: string;
  company: string;
  ats: AtsKind;
  ok: boolean;
  stale: boolean;
  count: number;
  error: string | null;
}

export interface JobBoardData {
  generatedAt: string;
  jobs: Job[];
  sources: JobSource[];
  totalSourceJobs: number;
}
