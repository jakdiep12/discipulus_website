import Image from "next/image";
import Link from "next/link";

const APPLY_URL = "https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q";

export default function HomeV2() {
  return (
    <div className="foundry-site">
      <header className="foundry-header">
        <nav className="foundry-nav" aria-label="Primary navigation">
          <Link href="/" className="foundry-wordmark">
            <span aria-hidden>D/V</span>
            <strong>Discipulus<br />Ventures</strong>
          </Link>
          <div className="foundry-links">
            <a href="#thesis">Thesis</a>
            <a href="#residency">Residency</a>
            <Link href="/cohort">Founders</Link>
            <Link href="/jobs">Jobs</Link>
          </div>
          <a className="foundry-nav-apply" href={APPLY_URL} target="_blank" rel="noreferrer">Fall ’26 applications <span aria-hidden>↗</span></a>
        </nav>

        <div className="foundry-hero">
          <div className="foundry-hero-copy">
            <p className="foundry-folio">VOL. 03 · EL SEGUNDO, CALIFORNIA · 2026</p>
            <h1>Build the next American industrial generation.</h1>
            <p className="foundry-deck">A ten-day founder residency for people building the machines, materials, energy systems, and defense technologies that move the country forward.</p>
            <div className="foundry-actions">
              <a href={APPLY_URL} target="_blank" rel="noreferrer">Apply to Discipulus <span aria-hidden>→</span></a>
              <Link href="/jobs">Find your next mission <span aria-hidden>↗</span></Link>
            </div>
          </div>
          <div className="foundry-hero-art">
            <Image src="/cohort-workshop-session.png" alt="Founders working inside an El Segundo industrial workshop" fill priority sizes="(max-width: 800px) 100vw, 46vw" />
            <div className="foundry-art-years" aria-hidden><span>1913</span><span>1961</span><span>2026</span></div>
            <div className="foundry-art-caption"><span>PLATE I</span><p>The aerospace city by the sea.</p></div>
          </div>
        </div>
        <div className="foundry-ticker" aria-label="Areas of focus">
          <span>Aerospace</span><i>✦</i><span>Defense</span><i>✦</i><span>Advanced manufacturing</span><i>✦</i><span>Energy</span><i>✦</i><span>Critical infrastructure</span>
        </div>
      </header>

      <main>
        <section id="thesis" className="foundry-thesis foundry-wrap">
          <div className="foundry-margin-note"><span>THE DISCIPULUS THESIS</span><p>Industrial capacity is national capacity.</p></div>
          <div className="foundry-thesis-main">
            <span className="foundry-dropcap">W</span>
            <p className="foundry-lede">e believe American prosperity depends on our ability to build in the physical world again.</p>
            <div className="foundry-columns">
              <p>For too long, ambitious builders were told that atoms were slow, hardware was hard, and the future belonged entirely to software. The next era will belong to founders who combine the speed of software with mastery of manufacturing, energy, and engineering.</p>
              <p>Discipulus gives those founders a place to work alongside one another, learn from experienced operators, meet aligned capital, and build lasting relationships in the heart of Southern California’s industrial base.</p>
            </div>
          </div>
        </section>

        <section className="foundry-image-story">
          <div className="foundry-image-large">
            <Image src="/demo-day.jpeg" alt="Founders touring an advanced manufacturing facility" fill sizes="(max-width: 800px) 100vw, 70vw" />
          </div>
          <aside>
            <span>FIELD DISPATCH / EL SEGUNDO</span>
            <blockquote>“Build close enough to the problem that the difference between a pitch and a product becomes impossible to ignore.”</blockquote>
            <p>Discipulus founders spend their residency inside the ecosystem they’re helping create—among factories, engineers, operators, customers, and fellow builders.</p>
          </aside>
        </section>

        <section id="residency" className="foundry-residency">
          <div className="foundry-wrap">
            <div className="foundry-residency-head">
              <div><span>THE RESIDENCY</span><p>Ten consequential days</p></div>
              <h2>A working session for founders who already feel the urgency.</h2>
            </div>
            <ol className="foundry-timeline">
              <li><span>01—03</span><h3>Clarify</h3><p>Interrogate the mission, tighten the product, and define the milestones that matter.</p></li>
              <li><span>04—07</span><h3>Construct</h3><p>Work beside technical founders and operators who understand the constraints of the physical world.</p></li>
              <li><span>08—09</span><h3>Connect</h3><p>Build relationships with investors, customers, and talent aligned with the national interest.</p></li>
              <li><span>10+</span><h3>Continue</h3><p>Leave with a company moving faster and a network that keeps working after the residency ends.</p></li>
            </ol>
          </div>
        </section>

        <section className="foundry-builders foundry-wrap">
          <div className="foundry-builders-head">
            <span>BUILDERS IN RESIDENCE</span>
            <h2>Real companies.<br />Hard problems.<br />No spectators.</h2>
          </div>
          <div className="foundry-builder-grid">
            <article className="foundry-builder-photo">
              <Image src="/FoundingFathers.png" alt="Discipulus founder cohort in front of an American flag" fill sizes="(max-width: 800px) 100vw, 58vw" />
            </article>
            <article><span>01</span><h3>Durin</h3><p>Autonomous drilling for mineral discovery.</p></article>
            <article><span>02</span><h3>Rune</h3><p>AI-enabled predictive logistics for the military.</p></article>
            <article><span>03</span><h3>Vanguard</h3><p>Accelerating electronic defense capabilities.</p></article>
            <article><span>04</span><h3>Actinide</h3><p>Building America’s isotope refinery.</p></article>
          </div>
        </section>

        <section className="foundry-jobs">
          <div className="foundry-wrap foundry-jobs-grid">
            <div>
              <p>THE INDUSTRIAL CLASSIFIEDS</p>
              <h2>The country needs people who can build.</h2>
            </div>
            <div className="foundry-job-sample">
              <div><span>SECTOR</span><strong>Aerospace & defense</strong></div>
              <div><span>REGION</span><strong>Southern California</strong></div>
              <div><span>STATUS</span><strong><i /> Live roles updated hourly</strong></div>
              <Link href="/jobs">Open the jobs network <span aria-hidden>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="foundry-cta foundry-wrap">
          <p>APPLICATIONS ARE OPEN FOR FALL 2026</p>
          <h2>If you’re building an enduring industrial company, come build it here.</h2>
          <a href={APPLY_URL} target="_blank" rel="noreferrer">Apply to the residency <span aria-hidden>→</span></a>
        </section>
      </main>

      <footer className="foundry-footer">
        <div className="foundry-wrap foundry-footer-grid">
          <div className="foundry-wordmark"><span aria-hidden>D/V</span><strong>Discipulus<br />Ventures</strong></div>
          <p>For founders rebuilding<br />the American industrial base.</p>
          <div><Link href="/team">Team</Link><Link href="/cohort">Cohort</Link><Link href="/jobs">Jobs</Link><a href="mailto:jakob.diepenbrock@discipulusventures.com">Contact</a></div>
          <span>© 2026 · El Segundo, California</span>
        </div>
      </footer>
    </div>
  );
}
