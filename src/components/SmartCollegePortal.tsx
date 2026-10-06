import { Link, useNavigate } from "@tanstack/react-router";
import {
  Award, BarChart3, BookOpen, Building2, CalendarCheck, ChartNoAxesColumn,
  ChevronRight, Code2, Eye, EyeOff, FileText, GraduationCap, LogOut, Menu,
  Plus, Printer, Search, ShieldCheck, Trash2, UserRound, Users, X,
} from "lucide-react";
import { FormEvent, ReactNode, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminNav = [
  ["Dashboard", "/admin", BarChart3], ["Departments", "/admin/departments", Building2],
  ["Branches", "/admin/branches", Code2], ["Students", "/admin/students", GraduationCap],
  ["Teachers", "/admin/teachers", Users], ["Subjects", "/admin/subjects", BookOpen],
  ["Reports", "/admin/reports", FileText],
] as const;

const studentNav = [
  ["Dashboard", "/student", BarChart3], ["My Attendance", "/student/attendance", CalendarCheck],
  ["My Marks", "/student/marks", Award], ["Performance", "/student/performance", ChartNoAxesColumn],
  ["Profile", "/student/profile", UserRound],
] as const;
const teacherNav = [
  ["Dashboard", "/teacher", BarChart3], ["Attendance", "/teacher/attendance", CalendarCheck],
  ["Enter Marks", "/teacher/marks", Award], ["My Students", "/teacher/students", Users],
  ["Performance", "/teacher/performance", ChartNoAxesColumn],
] as const;

export function PortalShell({ active, role = "ADMIN", user = "System Administrator", children, student = false, teacher = false }: { active: string; role?: string; user?: string; children: ReactNode; student?: boolean; teacher?: boolean }) {
  const [open, setOpen] = useState(false);
  const nav = student ? studentNav : teacher ? teacherNav : adminNav;
  return <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[270px_1fr]">
    <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-border bg-card transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-24 items-center justify-between border-b border-border px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="flex size-10 items-center justify-center border-2 border-ember font-display text-2xl font-bold text-ember">S</span><span className="font-display text-2xl font-bold uppercase leading-[0.8]">College<br/>Portal</span></Link>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button>
      </div>
      <nav className="flex-1 space-y-1 p-4" aria-label="Portal navigation">{nav.map(([label, to, Icon]) => <Link key={label} to={to} onClick={() => setOpen(false)} className={cn("flex h-11 items-center gap-3 border-l-2 px-4 text-sm font-semibold transition-colors", active === label ? "border-ember bg-secondary text-ice" : "border-transparent text-muted-foreground hover:bg-secondary hover:text-ice")}><Icon className="size-4" />{label}<ChevronRight className="ml-auto size-4" /></Link>)}</nav>
      <div className="border-t border-border p-4"><Button asChild variant="quiet" className="w-full"><Link to="/login"><LogOut /> Logout</Link></Button></div>
    </aside>
    {open && <button className="fixed inset-0 z-30 bg-background/80 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" />}
    <div className="min-w-0">
      <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border bg-background px-5 sm:px-8">
        <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></Button><span className="hidden font-display text-xl font-bold uppercase sm:block">College Management System</span></div>
        <div className="flex items-center gap-3"><span className="border border-ember px-2 py-1 text-[10px] font-bold text-ember">{role}</span><span className="hidden text-sm font-semibold sm:block">{user}</span></div>
      </header>
      <main className="mx-auto max-w-[1480px] p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  </div>;
}

export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-8 border-b border-border pb-7"><p className="mb-2 text-xs font-bold uppercase text-ember">{eyebrow}</p><h1 className="font-display text-5xl font-bold uppercase leading-none text-ice sm:text-6xl">{title}</h1><p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p></div>;
}

export const field = "h-11 w-full border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ember";
const label = "mb-2 block text-xs font-bold uppercase text-muted-foreground";
export const panel = "border border-border bg-card p-5 sm:p-7";

export function AuthPage({ register = false }: { register?: boolean }) {
  const navigate = useNavigate(); const [show, setShow] = useState(false); const [message, setMessage] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const data = new FormData(e.currentTarget);
    if (register) { const email=String(data.get("email")); if (!email.endsWith("@ssipmt.com")) return setMessage("Use your SSIPMT email ending with @ssipmt.com."); if (data.get("password") !== data.get("confirm")) return setMessage("Passwords do not match."); return navigate({to:"/verify-otp"}); }
    const role=String(data.get("role")); if(role === "Admin") navigate({to:"/admin"}); else if(role === "Student") navigate({to:"/student"}); else navigate({to:"/teacher"});
  }
  return <main className="min-h-screen bg-background px-4 py-10"><div className={cn("mx-auto", register ? "max-w-3xl" : "max-w-md")}>
    <Link to="/" className="mb-8 flex items-center justify-center gap-3"><span className="flex size-12 items-center justify-center border-2 border-ember font-display text-3xl font-bold text-ember">S</span><span className="font-display text-3xl font-bold uppercase text-ice">Smart College</span></Link>
    <section className={panel}><p className="text-xs font-bold uppercase text-ember">{register ? "Student access" : "Portal access"}</p><h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none text-ice">{register ? "Create your account" : "Welcome back"}</h1><p className="mt-3 text-sm text-muted-foreground">{register ? "Register your SSIPMT college account with email and phone verification." : "Sign in to access your college dashboard."}</p>
    <form onSubmit={submit} className="mt-7 space-y-5">{register ? <>
      <div className="grid gap-5 sm:grid-cols-2"><Field name="roll" title="Roll Number" placeholder="e.g. 121"/><Field name="name" title="Full Name" placeholder="Enter your full name"/></div>
      <div className="grid gap-5 sm:grid-cols-2"><Field name="email" title="College Email (@ssipmt.com)" type="email"/><Field name="phone" title="Phone Number" type="tel" pattern="[0-9]{10}" placeholder="10 digits"/></div>
      <div className="grid gap-5 sm:grid-cols-2"><Select name="department" title="Department" options={["Computer Science & Engineering","Electronics & Communication","Mechanical Engineering","Civil Engineering"]}/><Select name="branch" title="Branch" options={["AIML","CSE","CSE-AI","ECE"]}/></div>
      <div className="grid gap-5 sm:grid-cols-2"><Select name="semester" title="Semester" options={["Semester 3","Semester 1"]}/><Select name="section" title="Section" options={["Section A","Section B"]}/></div>
      <div className="grid gap-5 sm:grid-cols-2"><Field name="password" title="Create Password" type="password" minLength={4}/><Field name="confirm" title="Confirm Password" type="password" minLength={4}/></div>
    </> : <><Field name="username" title="Email or Username / Roll No" placeholder="Enter your email or roll number"/><div><label className={label}>Password</label><div className="relative"><input required name="password" type={show?"text":"password"} className={field} placeholder="Enter your password"/><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1" onClick={()=>setShow(!show)} aria-label={show?"Hide password":"Show password"}>{show?<EyeOff/>:<Eye/>}</Button></div></div><Select name="role" title="Select Role" options={["Admin","Teacher","Student"]}/></>}
      {message && <p role="status" className="border-l-2 border-ember bg-secondary p-3 text-sm text-ice">{message}</p>}
      <Button variant="ember" size="lg" className="h-12 w-full" type="submit">{register ? "Send OTP & Proceed" : "Sign In"}</Button>
    </form>
    <p className="mt-5 border-t border-border pt-5 text-center text-sm text-muted-foreground">{register ? <>Already registered? <Link to="/login" className="font-bold text-ember">Sign in here</Link></> : <>Need a student account? <Link to="/register" className="font-bold text-ember">Register here</Link></>}</p>
    {!register && <div className="mt-5 bg-secondary p-4 text-xs leading-6 text-muted-foreground"><strong className="text-ice">Demo credentials</strong><br/>Admin: admin@ssipmt.com / admin123<br/>Teacher: prof.sharma@ssipmt.com / teacher123<br/>Student: 101 or rahul@ssipmt.com / student123</div>}
    </section></div></main>;
}

function Field(props: { name:string; title:string; type?:string; placeholder?:string; pattern?:string; minLength?:number }) { return <div><label className={label}>{props.title}</label><input required className={field} {...props} /></div>; }
function Select({name,title,options}:{name:string;title:string;options:string[]}) { return <div><label className={label}>{title}</label><select required name={name} className={field}>{options.map(x=><option key={x}>{x}</option>)}</select></div>; }

export const studentsSeed = [
["101","Rahul Kumar","rahul@ssipmt.com","AIML","Sem 3","A"],["102","Aman Singh","aman@ssipmt.com","AIML","Sem 3","A"],["103","Ravi Gupta","ravi@ssipmt.com","AIML","Sem 3","A"],["104","Kunal Sharma","kunal@ssipmt.com","AIML","Sem 3","A"],["105","Ananya Patel","ananya@ssipmt.com","AIML","Sem 3","A"],["106","Priya Verma","priya@ssipmt.com","AIML","Sem 3","B"],["107","Deepak Mishra","deepak@ssipmt.com","AIML","Sem 3","B"],["108","Neha Yadav","neha@ssipmt.com","AIML","Sem 3","B"],["109","Arjun Tiwari","arjun@ssipmt.com","AIML","Sem 3","B"],["110","Sneha Joshi","sneha@ssipmt.com","AIML","Sem 3","B"],
["111","Aditya Raj","aditya@ssipmt.com","CSE","Sem 3","A"],["112","Rohit Das","rohit@ssipmt.com","CSE","Sem 3","A"],["113","Monika Saini","monika@ssipmt.com","CSE","Sem 3","A"],["114","Vivek Singh","vivek@ssipmt.com","CSE","Sem 3","B"],["115","Kavya Reddy","kavya@ssipmt.com","CSE","Sem 3","B"],["116","Harshit Jain","harshit@ssipmt.com","CSE-AI","Sem 3","A"],["117","Divya Nair","divya@ssipmt.com","CSE-AI","Sem 3","A"],["118","Shivam Chouhan","shivam@ssipmt.com","CSE-AI","Sem 3","A"],["119","Pooja Desai","pooja@ssipmt.com","CSE-AI","Sem 3","B"],["120","Tushar Bhatt","tushar@ssipmt.com","CSE-AI","Sem 3","B"],
["201","Akash Soni","akash@ssipmt.com","ECE","Sem 3","A"],["202","Shreya Pandey","shreya@ssipmt.com","ECE","Sem 3","A"],["203","Nikhil Kumar","nikhil@ssipmt.com","ECE","Sem 3","A"],["204","Isha Rawat","isha@ssipmt.com","ECE","Sem 3","B"],["205","Varun Mehta","varun@ssipmt.com","ECE","Sem 3","B"],["301","Rishabh Pal","rishabh@ssipmt.com","ME","Sem 3","A"],["302","Suman Thakur","suman@ssipmt.com","ME","Sem 3","A"],["303","Gaurav Ahuja","gaurav@ssipmt.com","ME","Sem 3","B"],["401","Naman Dubey","naman@ssipmt.com","CE","Sem 3","A"],["402","Trisha Bansal","trisha@ssipmt.com","CE","Sem 3","A"],
["501","Mayank Shukla","mayank@ssipmt.com","AIML","Sem 1","A"],["502","Payal Gupta","payal@ssipmt.com","AIML","Sem 1","A"],["503","Abhinav Rao","abhinav@ssipmt.com","AIML","Sem 1","B"],["601","Riya Malhotra","riya@ssipmt.com","CSE","Sem 5","A"],["602","Sahil Bose","sahil@ssipmt.com","CSE","Sem 5","A"],["603","Mansi Arora","mansi@ssipmt.com","CSE","Sem 5","B"],["701","Tanmay Singh","tanmay@ssipmt.com","ECE","Sem 5","A"],["702","Kiran Patel","kiran@ssipmt.com","ECE","Sem 5","A"],["801","Ritika Sharma","ritika@ssipmt.com","ME","Sem 5","A"],["802","Dev Chauhan","dev@ssipmt.com","CE","Sem 5","A"]
] as const;

export function DataTable({heads, rows, onDelete}:{heads:string[];rows:(string|ReactNode)[][];onDelete?:(i:number)=>void}) { return <div className="overflow-x-auto border border-border"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead className="bg-secondary text-xs uppercase text-muted-foreground"><tr>{heads.map(h=><th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i} className="border-t border-border text-card-foreground hover:bg-secondary/50">{r.map((c,j)=><td key={j} className="px-4 py-3">{c}</td>)}{onDelete && <td className="px-4 py-2"><Button variant="ghost" size="icon" aria-label="Delete" onClick={()=>onDelete(i)}><Trash2 className="text-destructive"/></Button></td>}</tr>)}</tbody></table></div>; }

export function DashboardPage() { const dept=[85,79,81,84], branch=[85,83,82,79,81,84]; return <PortalShell active="Dashboard"><PageHeading eyebrow="Administration" title="College dashboard" description="Centralized oversight of departments, branches, attendance, and academic performance."/><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{[["Total Students","2,500"],["Total Teachers","150"],["Departments","8"],["Branches","15"],["Attendance","82%"],["Students < 75%","240"]].map(([k,v],i)=><div key={k} className={cn(panel,i===5&&"border-ember")}><p className="text-xs font-bold uppercase text-muted-foreground">{k}</p><p className="mt-4 font-display text-5xl font-bold text-ice">{v}</p></div>)}</div><div className="mt-5 grid gap-5 xl:grid-cols-2"><BarPanel title="Department-wise attendance" labels={["CSE","ECE","ME","CE"]} values={dept}/><BarPanel title="Branch-wise attendance" labels={["CSE","CSE-AI","AIML","ECE","ME","CE"]} values={branch}/></div><section className={cn(panel,"mt-5")}><h2 className="mb-5 font-display text-3xl font-bold uppercase text-ice">At-risk students</h2><DataTable heads={["Roll No","Student","Branch","Semester","Attendance","Avg Marks","Risk"]} rows={[["102","Aman Singh","AIML","Sem 3","60%","46.7%",<Risk/>],["103","Ravi Gupta","AIML","Sem 3","70%","67.5%",<Risk/>]]}/></section></PortalShell>; }
function Risk(){return <span className="border border-ember px-2 py-1 text-[10px] font-bold text-ember">AT RISK</span>}
export function BarPanel({title,labels,values}:{title:string;labels:string[];values:number[]}) { return <section className={panel}><h2 className="font-display text-3xl font-bold uppercase text-ice">{title}</h2><div className="mt-6 flex h-56 items-end gap-3 border-b border-l border-border px-3 pt-4">{values.map((v,i)=><div key={labels[i]} className="flex h-full flex-1 flex-col justify-end gap-2 text-center"><span className="text-xs font-bold text-ice">{v}%</span><div className="w-full bg-ember" style={{height:`${v}%`}}/><span className="pb-2 text-[10px] text-muted-foreground">{labels[i]}</span></div>)}</div></section>; }

type DirectoryKind = "departments" | "branches" | "teachers" | "subjects";
type DirectoryConfig = {
  active: string;
  title: string;
  desc: string;
  fields: [string, string][];
  heads: string[];
  rows: string[][];
};

const directoryConfigs: Record<DirectoryKind, DirectoryConfig> = {
  departments:{active:"Departments",title:"Manage departments",desc:"Add, view, and manage all academic departments across the college.",fields:[["Department Name","name"],["Department Code","code"]],heads:["ID","Department Name","Code"],rows:[["#1","Computer Science & Engineering","CSE_DEPT"],["#2","Electronics & Communication","ECE_DEPT"],["#3","Mechanical Engineering","ME_DEPT"],["#4","Civil Engineering","CE_DEPT"]]},
  branches:{active:"Branches",title:"Manage branches",desc:"Configure academic branches and associate them with departments.",fields:[["Department","department"],["Branch Name","name"],["Branch Code","code"]],heads:["ID","Branch Name","Code","Department"],rows:[["#1","Computer Science","CSE","Computer Science"],["#2","CSE Artificial Intelligence","CSE-AI","Computer Science"],["#3","AI & Machine Learning","AIML","Computer Science"]]},
  teachers:{active:"Teachers",title:"Faculty directory",desc:"Add and manage faculty accounts across college departments.",fields:[["Username","username"],["Name","name"],["Email","email"],["Department","department"]],heads:["ID","Name","Email","Department"],rows:[["#1","Dr. Ananya Verma","dr.verma@ssipmt.com","Computer Science"],["#2","Prof. Rajesh Sharma","prof.sharma@ssipmt.com","Computer Science"]]},
  subjects:{active:"Subjects",title:"Subject catalogue",desc:"Organize subjects by branch and semester.",fields:[["Subject Code","code"],["Subject Name","name"],["Branch","branch"],["Semester","semester"]],heads:["Code","Subject Name","Branch","Semester"],rows:[["CS301","Data Structures & Algorithms","AIML","Sem 3"],["CS302","Database Management System","AIML","Sem 3"]]},
};

export function DirectoryPage({kind}:{kind:DirectoryKind}) { const configs=directoryConfigs[kind]; const [rows,setRows]=useState<string[][]>(configs.rows); const [notice,setNotice]=useState(""); function add(e:FormEvent<HTMLFormElement>){e.preventDefault(); const d=new FormData(e.currentTarget); const vals=configs.fields.map(([,n])=>String(d.get(n))); setRows([...rows,kind==="departments"?[`#${rows.length+1}`,...vals]:kind==="branches"?[`#${rows.length+1}`,vals[1]||"",vals[2]||"",vals[0]||""]:kind==="teachers"?[`#${rows.length+1}`,vals[1]||"",vals[2]||"",vals[3]||""]:vals]); e.currentTarget.reset(); setNotice(`${configs.active.slice(0,-1)} saved.`)} return <PortalShell active={configs.active}><PageHeading eyebrow="Administration" title={configs.title} description={configs.desc}/><div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]"><section className={panel}><h2 className="font-display text-3xl font-bold uppercase text-ice">Add new</h2><form className="mt-5 space-y-4" onSubmit={add}>{configs.fields.map(([t,n])=><Field key={n} name={n} title={t}/>) }{notice&&<p className="text-sm text-ember">{notice}</p>}<Button variant="ember" className="w-full"><Plus/>Save {configs.active.slice(0,-1)}</Button></form></section><section className={panel}><h2 className="mb-5 font-display text-3xl font-bold uppercase text-ice">Existing {configs.active.toLowerCase()}</h2><DataTable heads={[...configs.heads,"Action"]} rows={rows} onDelete={i=>setRows(rows.filter((_,n)=>n!==i))}/></section></div></PortalShell>; }

export function StudentsPage() { const [rows,setRows]=useState(studentsSeed.map(x=>[...x] as string[])); const [search,setSearch]=useState(""); const [branch,setBranch]=useState("All Branches"); const [sem,setSem]=useState("All Semesters"); const filtered=useMemo(()=>rows.filter(r=>(!search||`${r[0]} ${r[1]}`.toLowerCase().includes(search.toLowerCase()))&&(branch==="All Branches"||r[3]===branch)&&(sem==="All Semesters"||r[4]===sem)),[rows,search,branch,sem]); function add(e:FormEvent<HTMLFormElement>){e.preventDefault();const d=new FormData(e.currentTarget);setRows([...rows,["New",String(d.get("name")),String(d.get("email")),String(d.get("branch")),String(d.get("sem")),"A"]]);e.currentTarget.reset()} return <PortalShell active="Students"><PageHeading eyebrow="Administration" title="Student directory" description="View, filter, and register students across all departments and semesters."/><section className={panel}><div className="grid gap-3 md:grid-cols-[1fr_180px_180px]"><div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><input value={search} onChange={e=>setSearch(e.target.value)} className={cn(field,"pl-10")} placeholder="Search name / roll no"/></div><select className={field} value={branch} onChange={e=>setBranch(e.target.value)}>{["All Branches","AIML","CSE","CSE-AI","ECE","ME","CE"].map(x=><option key={x}>{x}</option>)}</select><select className={field} value={sem} onChange={e=>setSem(e.target.value)}>{["All Semesters","Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6"].map(x=><option key={x}>{x}</option>)}</select></div></section><section className={cn(panel,"mt-5")}><h2 className="font-display text-3xl font-bold uppercase text-ice">Add student</h2><form onSubmit={add} className="mt-5 grid gap-3 md:grid-cols-5"><input required name="name" className={field} placeholder="Student name"/><input required name="email" type="email" className={field} placeholder="College email"/><select name="branch" className={field}>{["AIML","CSE","CSE-AI","ECE","ME","CE"].map(x=><option key={x}>{x}</option>)}</select><select name="sem" className={field}>{["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5"].map(x=><option key={x}>{x}</option>)}</select><Button variant="ember"><Plus/>Save Student</Button></form></section><section className={cn(panel,"mt-5")}><div className="mb-5 flex items-end justify-between"><h2 className="font-display text-3xl font-bold uppercase text-ice">Student roster</h2><span className="text-sm text-ember">{filtered.length} Students</span></div><DataTable heads={["Roll No","Name","Email","Branch","Semester","Sec","Action"]} rows={filtered} onDelete={i=>{const target=filtered[i];setRows(rows.filter(r=>r!==target))}}/></section></PortalShell>; }

export function ReportsPage(){const [ready,setReady]=useState(false);return <PortalShell active="Reports"><PageHeading eyebrow="Administration" title="College reports" description="Generate attendance and performance records by academic branch."/><section className={cn(panel,"max-w-2xl")}><form className="grid gap-5 sm:grid-cols-2" onSubmit={e=>{e.preventDefault();setReady(true)}}><Select name="type" title="Report Type" options={["Attendance Report","Performance Report"]}/><Select name="branch" title="Branch" options={["All Branches","AIML","CSE","CSE-AI","ECE","ME","CE"]}/><Button variant="ember" className="sm:col-span-2"><ChartNoAxesColumn/>Generate Report</Button></form>{ready&&<div className="mt-6 border-t border-border pt-6"><p className="text-sm text-muted-foreground">Your report is ready for printing.</p><Button variant="quiet" className="mt-4" onClick={()=>window.print()}><Printer/>Print report</Button></div>}</section></PortalShell>}

export function AttendancePage(){return <PortalShell active="My Attendance" role="STUDENT" user="Rahul Kumar (101)" student><PageHeading eyebrow="Student portal" title="Attendance log" description="View detailed subject-wise attendance logs and track progress toward the 75% target."/><div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] [&>*]:min-w-0"><section className={panel}><h2 className="mb-5 font-display text-3xl font-bold uppercase text-ice">Attendance records</h2><DataTable heads={["Date","Subject Code","Subject Name","Status"]} rows={[["2026-08-10","CS301","Data Structures & Algorithms",<span className="font-bold text-ember">Present</span>],["2026-08-10","CS302","Database Management System",<span className="font-bold text-ember">Present</span>]]}/></section><section className={panel}><Award className="size-8 text-ember"/><h2 className="mt-5 font-display text-3xl font-bold uppercase text-ice">75% target</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Both recorded classes are present. Keep attending upcoming classes to stay above the college target.</p><div className="mt-6 h-2 bg-secondary"><div className="h-full w-full bg-ember"/></div><p className="mt-2 text-right text-sm font-bold text-ice">100%</p></section></div></PortalShell>}
