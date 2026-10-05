import { Link, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, CheckCircle2, ClipboardList, Save, ShieldCheck } from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarPanel, DataTable, PageHeading, PortalShell, field, panel } from "@/components/SmartCollegePortal";

const h2 = "font-display text-3xl font-bold uppercase text-ice";
const roster: [string, string, string][] = [["101", "Rahul Kumar", "rahul@ssipmt.com"], ["102", "Aman Singh", "aman@ssipmt.com"], ["103", "Ravi Gupta", "ravi@ssipmt.com"]];
const subjects: string[] = ["Data Structures & Algorithms (CS301) - AIML Sem 3 Sec A", "Database Management System (CS302) - AIML Sem 3 Sec A"];
const exams = ["CT-1", "CT-2", "Assignment", "Mid-Term", "End Semester (ESE)"];

function Student({ active, children }: { active: string; children: ReactNode }) {
  return <PortalShell active={active} role="STUDENT" user="Rahul Kumar (101)" student>{children}</PortalShell>;
}
function Teacher({ active, children }: { active: string; children: ReactNode }) {
  return <PortalShell active={active} role="TEACHER" user="Prof. Rajesh Sharma" teacher>{children}</PortalShell>;
}
function Stats({ items }: { items: [string, string][] }) {
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{items.map(([k, v]) => <div key={k} className={panel}><p className="text-xs font-bold uppercase text-muted-foreground">{k}</p><p className="mt-4 font-display text-5xl font-bold text-ice">{v}</p></div>)}</div>;
}
function LineChart({ labels, values }: { labels: string[]; values: number[] }) {
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - v}`).join(" ");
  return <section className={panel}><h2 className={h2}>Marks progress chart</h2>
    <div className="mt-6 border-b border-l border-border p-3"><svg viewBox="-4 -4 108 108" className="h-60 w-full" preserveAspectRatio="none"><polygon points={`0,100 ${pts} 100,100`} className="fill-ember/15" /><polyline points={pts} fill="none" className="stroke-ember" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />{values.map((v, i) => <circle key={i} cx={(i / (values.length - 1)) * 100} cy={100 - v} r="1.6" className="fill-ember" />)}</svg></div>
    <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">{labels.map((l, i) => <span key={l} className="text-center">{l}<br /><b className="text-ice">{values[i]}%</b></span>)}</div></section>;
}

export function StudentDashboardPage() {
  return <Student active="Dashboard"><PageHeading eyebrow="Student portal" title="Welcome, Rahul Kumar" description="Roll No: 101 · Branch: AIML · Semester: 3 · Section: A" />
    <Stats items={[["Overall Attendance", "86.7%"], ["Overall Average Marks", "84.4%"], ["Enrolled Subjects", "5"], ["Active Warnings", "0"]]} />
    <section className={cn(panel, "mt-5")}><h2 className={cn(h2, "mb-5")}>Subject-wise attendance</h2>
      <DataTable heads={["Subject Code", "Subject Name", "Present / Total", "Attendance", "Status", "Target Calculator"]} rows={[["CS301", "Data Structures & Algorithms", "9 / 10", "90%", <b className="text-ember">Good Stand</b>, "Requirement Met"], ["CS302", "Database Management System", "4 / 5", "80%", <b className="text-ember">Good Stand</b>, "Requirement Met"]]} /></section></Student>;
}
export function StudentMarksPage() {
  return <Student active="My Marks"><PageHeading eyebrow="Student portal" title="Examination transcript" description="View marks obtained across CT-1, CT-2, Assignments, Mid-Terms, and End Semester Exams." />
    <section className={panel}><h2 className={cn(h2, "mb-5")}>Marks summary</h2><DataTable heads={["Subject Code", "Subject Name", "Exam Type", "Obtained / Max", "Percentage"]} rows={[["CS301", "Data Structures & Algorithms", "CT-1", "18 / 20", "90%"], ["CS302", "Database Management System", "CT-1", "17 / 20", "85%"]]} /></section></Student>;
}
export function StudentPerformancePage() {
  return <Student active="Performance"><PageHeading eyebrow="Student portal" title="Academic analytics" description="Track performance trends across subjects and examinations." />
    <LineChart labels={["CT-1", "CT-2", "Assignment", "Mid-Term", "ESE"]} values={[85, 90, 88, 84, 87]} /></Student>;
}
export function StudentProfilePage() {
  const rows = [["Full Name", "Rahul Kumar"], ["Roll Number", "101"], ["Email", "rahul@ssipmt.com"], ["Phone", "9876543210"], ["Department", "Computer Science & Engineering"], ["Branch", "AIML"], ["Semester", "Semester 3"], ["Section", "Section A"]];
  return <Student active="Profile"><PageHeading eyebrow="Student portal" title="Student profile" description="Official institutional enrollment record." />
    <section className={cn(panel, "max-w-3xl")}><h2 className={cn(h2, "mb-5")}>Academic information</h2><dl className="divide-y divide-border border border-border">{rows.map(([k, v]) => <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[200px_1fr]"><dt className="text-xs font-bold uppercase text-muted-foreground">{k}</dt><dd className="text-sm text-ice">{v}</dd></div>)}</dl></section></Student>;
}

export function TeacherDashboardPage() {
  return <Teacher active="Dashboard"><PageHeading eyebrow="Faculty portal" title="Faculty dashboard" description="Welcome back, Prof. Rajesh Sharma." />
    <Stats items={[["Assigned Subjects", "2"], ["Total Students", "60"], ["Avg Attendance", "85%"], ["Students < 75%", "5"]]} />
    <section className={cn(panel, "mt-5")}><h2 className={h2}>Quick faculty actions</h2><div className="mt-5 flex flex-wrap gap-3"><Button asChild variant="ember"><Link to="/teacher/attendance"><CalendarCheck />Mark daily attendance</Link></Button><Button asChild variant="quiet"><Link to="/teacher/marks"><ClipboardList />Enter exam marks</Link></Button></div></section></Teacher>;
}
export function TeacherAttendancePage() {
  const [subject, setSubject] = useState<string>(subjects[0] ?? ""); const [date, setDate] = useState("2026-08-10");
  const [shown, setShown] = useState(true); const [status, setStatus] = useState<Record<string, boolean>>({ "101": true, "102": true, "103": true }); const [msg, setMsg] = useState("");
  const setAll = (v: boolean) => setStatus(Object.fromEntries(roster.map(([r]) => [r, v])));
  return <Teacher active="Attendance"><PageHeading eyebrow="Faculty portal" title="Class attendance" description="Mark or edit daily attendance for students in your assigned subjects." />
    <section className={panel}><form className="grid gap-3 md:grid-cols-[1fr_200px_auto]" onSubmit={e => { e.preventDefault(); setShown(true); setMsg(""); }}><select className={field} value={subject} onChange={e => setSubject(e.target.value)}>{subjects.map(s => <option key={s}>{s}</option>)}</select><input type="date" required className={field} value={date} onChange={e => setDate(e.target.value)} /><Button variant="ember">Fetch student roster</Button></form></section>
    {shown && <section className={cn(panel, "mt-5")}><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className={h2}>Attendance sheet</h2><p className="mt-1 text-sm text-muted-foreground">Date: {date} · Subject: {subject.split(" (")[0]}</p></div><div className="flex gap-2"><Button variant="quiet" size="sm" onClick={() => setAll(true)}>Mark all present</Button><Button variant="quiet" size="sm" onClick={() => setAll(false)}>Mark all absent</Button></div></div>
      <DataTable heads={["Roll No", "Student Name", "Status"]} rows={roster.map(([r, n]) => [r, n, <div className="flex gap-2">{[true, false].map(v => <button key={String(v)} onClick={() => setStatus({ ...status, [r]: v })} className={cn("border px-3 py-1 text-xs font-bold", status[r] === v ? "border-ember bg-ember text-primary-foreground" : "border-border text-muted-foreground")}>{v ? "Present" : "Absent"}</button>)}</div>])} />
      {msg && <p role="status" className="mt-4 flex items-center gap-2 text-sm text-ember"><CheckCircle2 className="size-4" />{msg}</p>}
      <Button variant="ember" className="mt-5" onClick={() => setMsg(`Attendance saved: ${Object.values(status).filter(Boolean).length} present, ${Object.values(status).filter(v => !v).length} absent.`)}>Submit attendance</Button></section>}</Teacher>;
}
export function TeacherMarksPage() {
  const [msg, setMsg] = useState("");
  function save(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const d = new FormData(e.currentTarget); const max = Number(d.get("max")); if (roster.some(([r]) => Number(d.get(`m${r}`)) > max)) return setMsg(`Marks cannot exceed the maximum of ${max}.`); setMsg(`Marks saved for ${d.get("exam")}.`); }
  return <Teacher active="Enter Marks"><PageHeading eyebrow="Faculty portal" title="Enter exam marks" description="Input marks for Class Tests, Assignments, Mid-Terms, and End Semester Exams." />
    <section className={panel}><form onSubmit={save}><div className="grid gap-3 md:grid-cols-3"><select name="subject" className={field}><option>Data Structures & Algorithms (CS301)</option><option>Database Management System (CS302)</option></select><select name="exam" className={field}>{exams.map(x => <option key={x}>{x}</option>)}</select><input name="max" type="number" min={1} required defaultValue={20} className={field} placeholder="Maximum marks" /></div>
      <div className="mt-5"><DataTable heads={["Roll No", "Student Name", "Marks Obtained"]} rows={roster.map(([r, n]) => [r, n, <input name={`m${r}`} type="number" min={0} required className={cn(field, "h-9 max-w-32")} />])} /></div>
      {msg && <p role="status" className="mt-4 text-sm text-ember">{msg}</p>}<Button variant="ember" className="mt-5"><Save />Save marks</Button></form></section></Teacher>;
}
export function TeacherStudentsPage() {
  return <Teacher active="My Students"><PageHeading eyebrow="Faculty portal" title="Assigned students" description="View enrolled students in your assigned subjects and classes." />
    <section className={panel}><h2 className={cn(h2, "mb-5")}>Enrolled class list</h2><DataTable heads={["Roll No", "Student Name", "Email", "Branch", "Semester", "Section"]} rows={roster.map(r => [...r, "AIML", "Sem 3", "A"])} /></section></Teacher>;
}
export function TeacherPerformancePage() {
  return <Teacher active="Performance"><PageHeading eyebrow="Faculty portal" title="Class analytics" description="Track academic score distributions and identify low-performing students." />
    <BarPanel title="Marks distribution" labels={["CT-1", "CT-2", "Assignment", "Mid-Term", "ESE"]} values={[85, 78, 92, 80, 84]} /></Teacher>;
}

export function VerifyOtpPage() {
  const navigate = useNavigate(); const [msg, setMsg] = useState("");
  return <main className="min-h-screen bg-background px-4 py-10"><div className="mx-auto max-w-md">
    <Link to="/" className="mb-8 flex items-center justify-center gap-3"><span className="flex size-12 items-center justify-center border-2 border-ember font-display text-3xl font-bold text-ember">S</span><span className="font-display text-3xl font-bold uppercase text-ice">Smart College</span></Link>
    <section className={panel}><ShieldCheck className="size-8 text-ember" /><h1 className="mt-4 font-display text-5xl font-bold uppercase leading-none text-ice">Verify OTP</h1><p className="mt-3 text-sm text-muted-foreground">A 6-digit verification OTP was dispatched to your college email and mobile number.</p>
      <p className="mt-5 bg-secondary p-3 text-sm text-muted-foreground">Demo verification OTP: <b className="text-ice">849201</b></p>
      <form className="mt-5 space-y-4" onSubmit={e => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("otp")); if (v !== "849201") return setMsg("Incorrect OTP. Please try again."); setMsg("Account activated. Redirecting to sign in…"); setTimeout(() => navigate({ to: "/login" }), 1200); }}>
        <input name="otp" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="Enter 6-digit OTP" className={cn(field, "h-12 text-center text-xl tracking-[0.5em]")} />
        {msg && <p role="status" className="border-l-2 border-ember bg-secondary p-3 text-sm text-ice">{msg}</p>}
        <Button variant="ember" size="lg" className="h-12 w-full">Verify OTP & activate account</Button></form>
      <p className="mt-5 border-t border-border pt-5 text-center text-sm text-muted-foreground">Didn't receive code? <Link to="/register" className="font-bold text-ember">Re-enter details</Link></p></section></div></main>;
}
