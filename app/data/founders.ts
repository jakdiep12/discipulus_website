export interface Founder {
    id: string;
    name: string;
    imageUrl: string;
    companyLogo?: string;
    companyLink?: string;
    companyDescription: string;
    testimonial?: string;
    companyLogoText?: string;
    companyLogoEmoji?: string;
    companyLogoFont?: string;
    companyLogoSize?: 'xsmall' | 'small' | 'default' | 'large';
    companyLogoPadding?: boolean;
    companyLogoMarginBottom?: 'default' | 'less';
    hidden?: boolean;
}
  
export const founders: Founder[] = [
    {
      id: "founder1",
      name: "Peter Goldsborough",
      imageUrl: "/founders/peter.jpg",
      companyLogo: "/companies/rune.png",
      companyLink: "https://www.runetech.co/",
      companyDescription: "AI-enabled predictive logistics for the military.",
      testimonial: "It's safe to say that the Discipulus Cohort was a game changing experience. The opportunity to learn from established entrepreneurs, dedicate time to creating my initial pitch deck and presenting it to world class investors was an incredible opportunity that every defense tech founder needs."
    },
    {
      id: "founder2",
      name: "Ted Feldmann",
      imageUrl: "/founders/ted.jpeg",
      companyLogo: "/companies/durin.png",
      companyLink: "https://www.durin.com/",
      companyDescription: "Autonomous drilling for mineral discovery.",
      testimonial: "What an incredible experience with Discipulus last week. Alongside 9 other focused, aligned, and moral young people I propelled myself and my startup with an intensity lacking most everywhere else. Excited for what is next for Discipulus!"
    },
    {
      id: "founder5",
      name: "Denver Rayburn",
      imageUrl: "/founders/denver.png",
      companyLogo: "/companies/framework.png",
      companyLink: "https://framework.co/",
      companyDescription: "Building the future of apparel manufacturing.",
      testimonial: "DV packed more value into a week than others could in a quarter. The intensity, a hallmark of El Segundo, was exceptional, propelling our company forward. The DV team quarterbacked our fundraising efforts, orchestrating back-to-back meetings with world-class operators and investors. If you're looking to generate significant momentum in your company's early stages, this is the definitive program."
    },
    {
      id: "founder4",
      name: "Johnny Ni",
      imageUrl: "/founders/johnny.jpeg",
      companyLogo: "/companies/vanguard.png",
      companyLink: "https://www.vanguarddefense.us/",
      companyDescription: "Accelerating electronic defense capabilities.",
      testimonial: "Discipulus Cohort was the launchpad Vanguard needed to transform our vision into reality. Since joining, we've raised a pre-seed round, initiated a CRADA partnership, and are in talks with some large customers for our product integration. The guidance, network, and momentum we gained through Discipulus have been instrumental in driving both our tech and partnerships forward.",
      companyLogoSize: 'small',
      companyLogoPadding: true,
      companyLogoMarginBottom: 'less',
    },
    {
      id: "founder6",
      name: "Elliot Forcier-Poirier",
      imageUrl: "/founders/elliot.png",
      companyLogo: "/companies/watoga.png",
      companyLink: "https://www.watoga.tech/",
      companyDescription: "AI Co-pilot for mining.",
      testimonial: "Everyone in our cohort was mission aligned from day one and it created a profound bond between everyone in the batch. DV condensed several months of value in just a week. It set the stage immensely well for our pre-seed round and the team was there throughout the process to help us succeed. Discipulus will be ground-zero for many generational companies and will definitely be a significant factor in restoring western prosperity."
    },
    {
      id: "founder7",
      name: "Robert Mendehlson",
      imageUrl: "/founders/robert.jpeg",
      companyLogo: "/companies/actinide.png",
      companyLink: "https://www.actinideinc.com/",
      companyDescription: "Building America's isotope refinery.",
      hidden: true,
    },
    {
      id: "founder8",
      name: "Constantin Whitmire",
      imageUrl: "/founders/constantin.jpg",
      companyLogo: "/companies/1aulogo.png",
      companyLink: "https://www.1autechnologies.com/",
      companyDescription: "Next-generation photonic systems.",
      testimonial: "Jakob is a patriot, whose intense dynamism throughout the program was infectious. Beyond the Cohort, DVs mix of industry acumen and extensive network has allowed us to grow quickly without compromising our core mission. Can't wait to see what's next for El Segundo!",
      companyLogoSize: 'xsmall',
    },
    {
      id: "founder9",
      name: "Fed Chávez-Torres",
      imageUrl: "/founders/fed.png",
      companyLogo: "/companies/tex.png",
      companyLink: "https://tex.pro/",
      companyDescription: "Intelligence for equipment procurement & sales.",
      testimonial: "From day one, Discipulus brought together founders who were deeply mission-aligned and serious about building enduring American companies. That alignment created trust, speed, and an uncommon sense of purpose. It's rare to find a program that pushes this hard while staying true to first principles.",
      companyLogoSize: 'large',
      companyLogoPadding: true,
    },
];