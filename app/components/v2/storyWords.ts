import type React from "react";

export type Bit = string | React.ReactElement;

/**
 * Word count for a set of story bits, tokenised exactly the way StoryText does
 * it. This lives outside the `"use client"` renderer so server components can
 * pre-compute reveal offsets without importing a client function.
 */
export function countWords(bits: readonly Bit[]): number {
  let count = 0;
  for (const bit of bits) {
    if (typeof bit === "string") {
      for (const part of bit.split(/(\s+)/)) {
        if (part !== "" && !/^\s+$/.test(part)) count += 1;
      }
    } else {
      // A bold-phrase element reveals as a single unit.
      count += 1;
    }
  }
  return count;
}
