import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, BookOpen, GraduationCap, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import campusImage from "@/assets/smart-campus.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart College — Manage your college in one place" },
      { name: "description", content: "One place for attendance, marks, performance and records for students, teachers and administrators." },
      { property: "og:title", content: "Smart College — Manage your college in one place" },
      { property: "og:description", content: "One place for attendance, marks, performance and records for students, teachers and administrators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const portals = [
  {
    number: "01", name: "Student", Icon: GraduationCap,
    description: "Check your attendance, marks and profile.",
    links: ["Dashboard", "Attendance", "Marks", "Performance", "Profile"],
  },
  {
    number: "02", name: "Teacher", Icon: BookOpen,
    description: "Take attendance, enter marks and track students.",
    links: ["Dashboard", "Attendance", "Marks", "Performance", "Students"],
  },
  {
    number: "03", name: "Admin", Icon: ShieldCheck,
    description: "Manage people, courses and reports.",
    links: ["Dashboard", "Students", "Teachers", "Branches", "Departments", "Subjects", "Reports"],
  },
];

const suppliedPages: Record<string, "/admin" | "/admin/departments" | "/admin/branches" | "/admin/students" | "/admin/teachers" | "/admin/subjects" | "/admin/reports" | "/student" | "/student/attendance" | "/student/marks" | "/student/performance" | "/student/profile" | "/teacher" | "/teacher/attendance" | "/teacher/marks" | "/teacher/performance" | "/teacher/students"> = {
  "Admin Dashboard": "/admin",
  "Admin Departments": "/admin/departments",
  "Admin Branches": "/admin/branches",
  "Admin Students": "/admin/students",
  "Admin Teachers": "/admin/teachers",
  "Admin Subjects": "/admin/subjects",
  "Admin Reports": "/admin/reports",
  "Student Dashboard": "/student",
  "Student Attendance": "/student/attendance",
  "Student Marks": "/student/marks",
  "Student Performance": "/student/performance",
  "Student Profile": "/student/profile",
  "Teacher Dashboard": "/teacher",
  "Teacher Attendance": "/teacher/attendance",
  "Teacher Marks": "/teacher/marks",
  "Teacher Performance": "/teacher/performance",
  "Teacher Students": "/teacher/students",
};

function Index() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const openPage = (name: string) => setSelectedPage(name);

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="relative flex min-h-[650px] flex-col overflow-hidden border-b border-border md:min-h-[760px] lg:min-h-[min(820px,92vh)]">
        <img src={campusImage} alt="Contemporary college courtyard beneath an orange architectural canopy" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="campus-hero absolute inset-0" aria-hidden="true" />
        <header className="relative z-10 mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <a href="#top" className="flex items-center gap-3 text-foreground" aria-label="Smart College home">
            <span className="flex size-10 items-center justify-center border-2 border-ember text-ember font-display text-2xl font-bold leading-none">S</span>
            <span className="font-display text-[1.7rem] font-bold uppercase leading-[0.75] tracking-normal sm:text-[2rem]">Smart<br />College</span>
          </a>
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Account">
            <Button asChild variant="quiet" className="h-10 px-4 sm:px-6"><Link to="/login">Login</Link></Button>
            <Button asChild variant="hero" className="h-10 px-4 sm:px-6"><Link to="/register">Register <ArrowRight /></Link></Button>
          </nav>
        </header>

        <div id="top" className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col items-center justify-center px-5 pb-24 pt-8 text-center sm:px-8 lg:px-12 lg:pb-28">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-ice sm:text-sm"><span className="h-px w-8 bg-ember" />Your campus, connected<span className="h-px w-8 bg-ember" /></p>
          <h1 className="max-w-[1100px] font-display text-[clamp(4.4rem,12vw,11.5rem)] font-black uppercase leading-[0.78] text-ice">
            Manage your<br /><span className="text-ember">college</span> in<br />one place<span className="text-ember">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ice sm:mt-10 sm:text-lg">Attendance, marks, performance and records for students, teachers and administrators.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-8">
            <Button asChild variant="hero" size="lg" className="h-12 px-7"><Link to="/login">Login <ArrowRight /></Link></Button>
            <Button asChild variant="quiet" size="lg" className="h-12 px-7"><Link to="/register">Create an account</Link></Button>

          </div>
        </div>
        <a href="#portals" className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-xs font-bold uppercase text-ice transition-colors hover:text-ember"><ArrowDown className="size-4" /> Explore portals</a>
      </section>

      <section id="portals" className="mx-auto max-w-[1480px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24" aria-label="Portals">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-border pb-7 md:flex-row md:items-end lg:mb-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-ember">Made for every role</p>
            <h2 className="font-display text-6xl font-bold uppercase leading-none text-ice sm:text-7xl lg:text-8xl">Your space.<br />Your way.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">Everything you need to stay on top of campus life, all in one place.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {portals.map(({ number, name, Icon, description, links }) => (
            <article key={name} className="group flex min-h-[450px] flex-col border border-border bg-card p-6 transition-colors hover:border-ember/70 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="portal-index font-display text-6xl font-bold leading-none text-ember">{number}</span>
                <Icon className="size-8 stroke-1 text-ice" aria-hidden="true" />
              </div>
              <h3 className="mt-10 font-display text-5xl font-bold uppercase leading-none text-card-foreground sm:text-6xl">{name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <ul className="mt-7 border-t border-border">
                {links.map((link) => {
                  const suppliedPage = suppliedPages[`${name} ${link}`];
                  return <li key={link} className="border-b border-border">
                    {suppliedPage ? (
                      <Button asChild variant="ghost" className="h-10 w-full justify-between rounded-none px-0 text-sm font-medium text-card-foreground hover:bg-transparent hover:text-ember">
                        <Link to={suppliedPage}>{link}<ArrowRight className="transition-transform group-hover:translate-x-0.5" /></Link>
                      </Button>
                    ) : (
                      <Button variant="ghost" className="h-10 w-full justify-between rounded-none px-0 text-sm font-medium text-card-foreground hover:bg-transparent hover:text-ember" onClick={() => openPage(`${name} ${link}`)}>
                        {link}<ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    )}
                  </li>;
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <footer className="border-t border-border px-5 py-7 text-sm text-muted-foreground sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1384px] flex-wrap items-center justify-between gap-3"><span className="font-display text-xl font-bold uppercase text-ice">Smart College</span><span>© 2026 Smart College</span></div>
      </footer>

      {selectedPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 px-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedPage(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="unavailable-title" className="relative w-full max-w-md border border-border bg-card p-7 shadow-xl sm:p-9">
            <Button variant="ghost" size="icon" className="absolute right-3 top-3" aria-label="Close" onClick={() => setSelectedPage(null)}><X /></Button>
            <p className="text-xs font-bold uppercase text-ember">Smart College</p>
            <h2 id="unavailable-title" className="mt-3 font-display text-5xl font-bold uppercase leading-none text-ice">{selectedPage}</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">This page wasn't included in the file you shared. Upload the rest of your frontend to make this section available.</p>
            <Button variant="hero" className="mt-7 h-10 px-6" onClick={() => setSelectedPage(null)}>Back to home</Button>
          </div>
        </div>
      )}
    </main>
  );
}