import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const portals = [
  {
    number: "01",
    name: "Student",
    note: "Your next chapter.",
    description: "A clear view of your journey. Keep attendance, examination marks and academic progress together in one considered space.",
    links: [
      ["Dashboard", "/student"],
      ["Attendance", "/student/attendance"],
      ["Marks", "/student/marks"],
      ["Performance", "/student/performance"],
      ["Profile", "/student/profile"],
    ],
  },
  {
    number: "02",
    name: "Teacher",
    note: "Room to inspire.",
    description: "Less administration, more connection. Take attendance, enter marks and follow the progress of every student in your classroom.",
    links: [
      ["Dashboard", "/teacher"],
      ["Attendance", "/teacher/attendance"],
      ["Marks", "/teacher/marks"],
      ["Performance", "/teacher/performance"],
      ["Students", "/teacher/students"],
    ],
  },
  {
    number: "03",
    name: "Admin",
    note: "Everything in balance.",
    description: "The whole campus, thoughtfully organised. Bring people, departments, subjects and institutional records into focus.",
    links: [
      ["Dashboard", "/admin"],
      ["Students", "/admin/students"],
      ["Teachers", "/admin/teachers"],
      ["Branches", "/admin/branches"],
      ["Departments", "/admin/departments"],
      ["Subjects", "/admin/subjects"],
      ["Reports", "/admin/reports"],
    ],
  },
] as const;

function CollegeHeader() {
  return (
    <header className="college-header">
      <Link to="/" className="college-wordmark" aria-label="Smart College home">
        SMART COLLEGE <span>SC.</span>
      </Link>
      <nav aria-label="Main navigation" className="college-nav">
        <a href="#portals">The portals</a>
        <Link to="/login">Sign in</Link>
      </nav>
      <div className="college-header-right">
        <span className="college-edition">Campus, connected.</span>
        <Button asChild variant="hero"><Link to="/register">Join the campus <ArrowUpRight data-icon="inline-end" /></Link></Button>
      </div>
    </header>
  );
}

function CampusHero() {
  return (
    <section className="college-hero" aria-labelledby="campus-title">
      <img src="/images/college-workshop.png" alt="Warm sunlight through crafted wooden lattice screens in a quiet campus library" className="college-hero-image" width={1536} height={1024} fetchPriority="high" />
      <div className="college-hero-shade" aria-hidden="true" />
      <CollegeHeader />
      <div className="college-hero-copy">
        <p className="college-kicker"><span>01 / A connected campus</span><span className="college-hairline" /></p>
        <h1 id="campus-title">A place<br />to <em>grow.</em></h1>
        <p className="college-hero-lede">Every journey begins with a connection.</p>
        <p className="college-hero-description">Your classes. Your progress. Your people.<br />College life, brought together in one place.</p>
        <div className="college-hero-actions">
          <Button asChild variant="hero" size="lg"><Link to="/login">Enter your portal <ArrowUpRight data-icon="inline-end" /></Link></Button>
          <a href="#portals" className="college-text-link">Explore the campus <ArrowDown className="size-3" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="college-hero-bottom">
        <nav aria-label="Choose your portal" className="college-chapter-nav">
          {portals.map(({ number, name }) => <a key={name} href={`#${name.toLowerCase()}`}><span>{number}</span>{name}</a>)}
        </nav>
        <span className="college-volume">SMART COLLEGE — VOL. 01</span>
        <a href="#portals" className="college-scroll">Scroll to discover <ArrowDown className="size-3" aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function CampusPortals() {
  return (
    <section id="portals" className="college-portals" aria-labelledby="portals-title">
      <div className="college-section-heading">
        <div><p className="college-kicker">Three roles. One community.</p><h2 id="portals-title">Find your <em>place.</em></h2></div>
        <p>A space for everyone who makes<br />a campus feel like a campus.</p>
      </div>
      <div className="college-portal-grid">
        {portals.map(({ number, name, note, description, links }) => (
          <article id={name.toLowerCase()} key={name} className="college-portal-card">
            <div className="college-portal-top"><span>{number} / PORTAL</span><ArrowUpRight className="size-5" aria-hidden="true" /></div>
            <h3>{name}</h3>
            <p className="college-portal-note">{note}</p>
            <p className="college-portal-description">{description}</p>
            <ul>{links.map(([label, to]) => <li key={to}><Link to={to}>{label}<ArrowUpRight className="size-3" aria-hidden="true" /></Link></li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CollegeHomepage() {
  return (
    <main className="college-home">
      <CampusHero />
      <CampusPortals />
      <footer className="college-footer"><Link to="/" className="college-wordmark">SMART COLLEGE <span>SC.</span></Link><p>Made for your everyday campus life.</p><span>© 2026 Smart College</span></footer>
    </main>
  );
}
