const SOCAL_KEYWORDS = [
  "el segundo", "hawthorne", "los angeles", "long beach", "torrance",
  "redondo beach", "manhattan beach", "hermosa beach", "gardena", "carson",
  "culver city", "playa vista", "inglewood", "palos verdes", "san pedro",
  "cerritos", "pasadena", "burbank", "glendale", "santa monica",
  "woodland hills", "chatsworth", "santa clarita", "palmdale", "irvine",
  "costa mesa", "anaheim", "huntington beach", "newport beach", "tustin",
  "san diego", "carlsbad", "oceanside", "escondido", "riverside",
  "san bernardino", "ontario", "rancho cucamonga", "temecula", "oxnard",
  "ventura", "camarillo", "thousand oaks", "vandenberg", "lompoc",
  "santa barbara", "goleta", "southern california", "greater los angeles",
  "socal",
];

const SOCAL_PATTERNS = SOCAL_KEYWORDS.map((keyword) => {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i");
});

export function isSouthernCalifornia(location: string): boolean {
  return SOCAL_PATTERNS.some((pattern) => pattern.test(location));
}
