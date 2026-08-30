import type { Sector } from "./types";

export const SECTORS: Sector[] = [
  "Launch & Space",
  "Defense & Autonomy",
  "Advanced Manufacturing",
  "Energy",
];

export const SECTOR_COLOR: Record<Sector, string> = {
  "Launch & Space": "#f7e3b5",
  "Defense & Autonomy": "#91a8d0",
  "Advanced Manufacturing": "#cb7858",
  Energy: "#82aa8b",
};

export const SECTOR_LABEL: Record<Sector, string> = {
  "Launch & Space": "Launch & space",
  "Defense & Autonomy": "Defense & autonomy",
  "Advanced Manufacturing": "Advanced manufacturing",
  Energy: "Energy",
};
