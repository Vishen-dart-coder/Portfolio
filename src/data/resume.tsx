import { Icons } from "@/components/icons";
import {
  Binary,
  ChartLine,
  ChartPie,
  Database,
  Filter,
  HomeIcon,
  Layers,
  Network,
  Shapes,
  Sheet,
  TableProperties,
  Workflow,
} from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Java } from "@/components/ui/svgs/java";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

function iconImage(src: string, invertInDark = false) {
  function SkillIcon({ className }: { className?: string }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className={[className, invertInDark ? "dark:invert" : ""].join(" ")} />
    );
  }
  return SkillIcon;
}

type Work = {
  company: string;
  href: string;
  badges: readonly string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end?: string;
  description: string;
};

type Education = {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
};

type Hackathon = {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  win?: string;
  mlh?: string;
  links: readonly { title: string; icon: ReactNode; href: string }[];
};

type Social = {
  name: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  navbar: boolean;
};

// Add entries here later. Each section stays hidden while its list is empty.
const work: Work[] = [
  {
    company: "Walmart Global Tech",
    href: "https://www.theforage.com",
    badges: [],
    location: "Virtual",
    title: "Advanced Software Engineering Virtual Internship",
    logoUrl: "/logos/walmart.png",
    start: "Jul 2026",
    end: "Jul 2026",
    description:
      "Completed practical tasks in advanced data structures, software architecture, relational database design and data munging.",
  },
  {
    company: "Deloitte",
    href: "https://www.theforage.com",
    badges: [],
    location: "Virtual",
    title: "Data Analytics Virtual Internship",
    logoUrl: "/logos/deloitte.png",
    start: "Jun 2026",
    end: "Jul 2026",
    description:
      "Completed practical tasks in data analysis and forensic technology.",
  },
  {
    company: "Wells Fargo",
    href: "https://www.theforage.com",
    badges: [],
    location: "Virtual",
    title: "Software Engineering Virtual Internship",
    logoUrl: "/logos/wells-fargo.png",
    start: "Jun 2026",
    end: "Jun 2026",
    description:
      "Designed a data model and implemented it in code.",
  },
];
const education: Education[] = [
  {
    school: "Podar International School",
    href: "https://www.podareducation.org",
    degree: "IB & Cambridge International (IGCSE)",
    logoUrl: "/logos/podar.jpg",
    start: "",
    end: "",
  },
];

type Certification = {
  name: string;
  issuer: string;
  date: string;
  logoUrl: string;
  href?: string;
  kind: "certification" | "course";
};

// Dates are as printed on each certificate. Add each credential's verification link as `href`.
const certifications: Certification[] = [
  { kind: "certification", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "2026", logoUrl: "/logos/aws.png" },
  { kind: "certification", name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", date: "May 2026", logoUrl: "/logos/aws.png" },
  { kind: "certification", name: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", date: "May 2026", logoUrl: "/logos/aws.png" },
  { kind: "certification", name: "Professional Cloud Developer", issuer: "Google Cloud", date: "May 2026", logoUrl: "/logos/google-cloud.png" },
  { kind: "certification", name: "Professional Machine Learning Engineer", issuer: "Google Cloud", date: "2026", logoUrl: "/logos/google-cloud.png" },
  { kind: "certification", name: "Certified Kubernetes Application Developer (CKAD)", issuer: "Cloud Native Computing Foundation", date: "May 2026", logoUrl: "/logos/cncf.png" },
  { kind: "certification", name: "Azure Developer Associate", issuer: "Microsoft", date: "May 2026", logoUrl: "/logos/microsoft.png" },
  { kind: "certification", name: "Azure AI Engineer Associate", issuer: "Microsoft", date: "May 2026", logoUrl: "/logos/microsoft.png" },
  { kind: "certification", name: "Security+ ce", issuer: "CompTIA", date: "May 2026", logoUrl: "/logos/comptia.png" },
  { kind: "course", name: "AWS Cloud Practitioner Essentials", issuer: "AWS Training & Certification", date: "Jun 2026", logoUrl: "/logos/aws-skill-builder.png" },
  { kind: "course", name: "Operating Systems from Scratch, Parts 1–4", issuer: "Udemy", date: "Apr 2026", logoUrl: "/logos/udemy.png" },
  { kind: "course", name: "Certified MS Excel", issuer: "Softpro Computer Education", date: "2026", logoUrl: "" },
];
const hackathons: Hackathon[] = [
  { title: "AWS", dates: "", location: "Las Vegas", description: "", image: "/logos/aws.png", links: [] },
  { title: "AWS", dates: "", location: "Mumbai", description: "", image: "/logos/aws.png", links: [] },
  { title: "AWS", dates: "", location: "Bangalore", description: "", image: "/logos/aws.png", links: [] },
  { title: "Anthropic community event", dates: "", location: "", description: "", image: "/logos/anthropic.png", links: [] },
  { title: "Codex event", dates: "", location: "", description: "", image: "/logos/openai.png", links: [] },
  { title: "Inter-House Tech-Quest, third place", dates: "Apr 2025", location: "Podar International School", description: "", image: "/logos/podar.jpg", links: [] },
];

const social: Record<string, Social> = {
  GitHub: {
    name: "GitHub",
    url: "https://github.com/Vishen-dart-coder",
    icon: Icons.github,
    navbar: true,
  },
  LinkedIn: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vishen-sharma",
    icon: Icons.linkedin,
    navbar: true,
  },
  email: {
    name: "Send Email",
    url: "mailto:iamvishensharma@gmail.com",
    icon: Icons.email,
    navbar: true,
  },
};

export const DATA = {
  name: "Vishen Sharma",
  initials: "VS",
  url: "https://vishen-portfolio.vercel.app",
  location: "Netherlands",
  locationLink: "https://www.google.com/maps/place/netherlands",
  description:
    "Vishen Sharma builds web apps, AI tools and the systems under them. Based in the Netherlands.",
  intro: "I'm Vishen Sharma, based in the Netherlands",
  summary:
    "I ship production apps like [CareerFlow AI](https://careerflow-ai.org.in) and [Archive360](https://archive360.co), and in my spare time I build the pieces underneath them, from a [database engine](https://github.com/Vishen-dart-coder/db-from-scratch-in-js) to a [local AI agent](https://github.com/Vishen-dart-coder/GrokBot). Most days I'm deep in React, Next.js and TypeScript, and I care about interfaces that feel fast and honest.",
  avatarUrl: "/me.jpg",
  skillGroups: ["Languages", "Frameworks", "Data & AI", "Cloud & DevOps", "Engineering & analysis"],
  stats: [
    { value: "2", label: "live products" },
    { value: "3", label: "virtual internships" },
    { value: "24", label: "public repos" },
  ],
  skills: [
    { group: "Frameworks", name: "React", icon: ReactLight },
    { group: "Frameworks", name: "Next.js", icon: NextjsIconDark },
    { group: "Languages", name: "Typescript", icon: Typescript },
    { group: "Frameworks", name: "Node.js", icon: Nodejs },
    { group: "Languages", name: "Python", icon: Python },
    { group: "Languages", name: "Go", icon: Golang },
    { group: "Languages", name: "Java", icon: Java },
    { group: "Languages", name: "SQL", icon: TableProperties },
    { group: "Data & AI", name: "Postgres", icon: Postgresql },
    { group: "Languages", name: "JavaScript", icon: iconImage("/skills/javascript.svg") },
    { group: "Frameworks", name: "Tailwind CSS", icon: iconImage("/skills/tailwindcss.svg") },
    { group: "Frameworks", name: "Express", icon: iconImage("/skills/express.svg", true) },
    { group: "Frameworks", name: "FastAPI", icon: iconImage("/skills/fastapi.svg") },
    { group: "Data & AI", name: "MongoDB", icon: iconImage("/skills/mongodb.svg") },
    { group: "Frameworks", name: "Electron", icon: iconImage("/skills/electron.svg") },
    { group: "Languages", name: "Swift", icon: iconImage("/skills/swift.svg") },
    { group: "Data & AI", name: "Ollama", icon: iconImage("/skills/ollama.svg", true) },
    { group: "Cloud & DevOps", name: "Docker", icon: Docker },
    { group: "Cloud & DevOps", name: "Kubernetes", icon: Kubernetes },
    { group: "Cloud & DevOps", name: "AWS", icon: iconImage("/skills/aws.png") },
    { group: "Cloud & DevOps", name: "Google Cloud", icon: iconImage("/skills/googlecloud.svg") },
    { group: "Cloud & DevOps", name: "Azure", icon: iconImage("/skills/azure.png") },
    { group: "Cloud & DevOps", name: "Linux", icon: iconImage("/skills/linux.svg") },
    { group: "Cloud & DevOps", name: "Git", icon: iconImage("/skills/git.svg") },
    { group: "Cloud & DevOps", name: "GitHub Actions", icon: iconImage("/skills/githubactions.svg") },
    { group: "Cloud & DevOps", name: "Vercel", icon: iconImage("/skills/vercel.svg", true) },
    { group: "Engineering & analysis", name: "Microsoft Excel", icon: Sheet },
    { group: "Engineering & analysis", name: "System Design", icon: Network },
    { group: "Engineering & analysis", name: "Software Architecture", icon: Layers },
    { group: "Engineering & analysis", name: "Database Design", icon: Database },
    { group: "Engineering & analysis", name: "Algorithms & Data Structures", icon: Binary },
    { group: "Engineering & analysis", name: "UML Modeling", icon: Shapes },
    { group: "Engineering & analysis", name: "Data Analysis", icon: ChartLine },
    { group: "Engineering & analysis", name: "Data Visualization", icon: ChartPie },
    { group: "Engineering & analysis", name: "Data Preparation", icon: Filter },
    { group: "Engineering & analysis", name: "Process Improvement", icon: Workflow },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "iamvishensharma@gmail.com",
    tel: "",
    social,
  },
  work,
  education,
  certifications,
  projects: [
    {
      title: "CareerFlow AI",
      featured: true,
      href: "https://careerflow-ai.org.in",
      dates: "Live",
      active: true,
      description:
        "AI-powered career guidance platform helping students and professionals navigate their career paths with intelligent recommendations and insights.",
      technologies: ["React", "Node.js", "AI/ML"],
      links: [
        {
          type: "Website",
          href: "https://careerflow-ai.org.in",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/careerflow.png",
      video: "",
    },
    {
      title: "Archive360",
      featured: true,
      href: "https://archive360.co",
      dates: "Live",
      active: true,
      description:
        "Enterprise-grade digital archiving solution securing India's past and digitizing its future with AI-led document management and compliant record control.",
      technologies: ["Next.js", "TypeScript", "Cloud Storage"],
      links: [
        {
          type: "Website",
          href: "https://archive360.co",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/archive360.png",
      video: "",
    },
    {
      title: "GrokBot Local",
      ship: {
        summary: "Shipped in 23 h · 11 commits",
        steps: [
          { name: "First commit: desktop agent on Ollama", timestamp: "29 Sep 2026, 02:17 IST", isCompleted: true },
          { name: "Packaged as a macOS app", timestamp: "29 Sep 2026, 03:26 IST", isCompleted: true },
          { name: "DMG releases published by CI", timestamp: "29 Sep 2026, 12:01 IST", isCompleted: true },
          { name: "Shipped: model switcher, regenerate, export", timestamp: "30 Sep 2026, 01:29 IST", isCompleted: true },
        ],
      },
      href: "https://github.com/Vishen-dart-coder/GrokBot",
      dates: "Open source",
      active: true,
      description:
        "A local-first desktop AI agent powered by Ollama. Each chat gets its own workspace, runs shell and file tools with approvals, connects to MCP servers, and supports hands-free voice mode.",
      technologies: ["Electron", "React", "TypeScript", "Ollama", "MCP"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Vishen-dart-coder/GrokBot",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://raw.githubusercontent.com/Vishen-dart-coder/GrokBot/main/docs/chat.png",
      video: "",
    },
    {
      title: "Mini-Supabase",
      href: "https://github.com/Vishen-dart-coder/db-from-scratch-in-js",
      dates: "Open source",
      active: true,
      description:
        "A zero-dependency backend-as-a-service with a database engine I wrote from scratch: an LSM tree with an in-memory MemTable flushing to append-only SSTables, plus auth and object storage.",
      technologies: ["Node.js", "Express", "LSM tree"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Vishen-dart-coder/db-from-scratch-in-js",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "ox-alpha",
      ship: {
        summary: "Shipped in 48 min · 4 commits",
        steps: [
          { name: "First commit: TUI chat client", timestamp: "23 Aug 2026, 20:27 IST", isCompleted: true },
          { name: "Polished the TUI, added README", timestamp: "23 Aug 2026, 21:07 IST", isCompleted: true },
          { name: "Shipped with demo GIF", timestamp: "23 Aug 2026, 21:15 IST", isCompleted: true },
        ],
      },
      href: "https://github.com/Vishen-dart-coder/ox-alpha",
      dates: "Open source",
      active: true,
      description:
        "A quiet terminal chat client for OpenRouter. Streams replies, reads from a folder you trust, and only writes files when you allow it.",
      technologies: ["Python", "Textual", "OpenRouter"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Vishen-dart-coder/ox-alpha",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://raw.githubusercontent.com/Vishen-dart-coder/ox-alpha/main/docs/assets/demo.gif",
      video: "",
    },
    {
      title: "Halftone Donut",
      ship: {
        summary: "Shipped in 11 min · 4 commits",
        steps: [
          { name: "First commit: halftone renderer", timestamp: "27 Aug 2026, 13:43 IST", isCompleted: true },
          { name: "Shipped with README and demo", timestamp: "27 Aug 2026, 13:54 IST", isCompleted: true },
        ],
      },
      href: "https://github.com/Vishen-dart-coder/Donut-Animation",
      dates: "Open source",
      active: true,
      description:
        "A raymarched torus rendered as a 45° newspaper halftone on a canvas. Drag to spin, with adaptive quality to hold 60 fps.",
      technologies: ["JavaScript", "Canvas", "Raymarching"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Vishen-dart-coder/Donut-Animation",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://raw.githubusercontent.com/Vishen-dart-coder/Donut-Animation/main/donut-readme.gif",
      video: "",
    },
    {
      title: "CoreML Vehicle Tracker",
      href: "https://github.com/Vishen-dart-coder/Car-Recognition-Tracking",
      dates: "Open source",
      active: true,
      description:
        "A macOS-native vehicle tracker that runs a YOLO model through CoreML and Vision, with no PyTorch or OpenCV at runtime.",
      technologies: ["Swift", "CoreML", "Vision", "YOLO"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Vishen-dart-coder/Car-Recognition-Tracking",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Baseline",
      ship: {
        summary: "Shipped in 51 min · 6 commits",
        steps: [
          { name: "First commit", timestamp: "27 Aug 2026, 12:32 IST", isCompleted: true },
          { name: "Fixed image paths and run steps", timestamp: "27 Aug 2026, 12:37 IST", isCompleted: true },
          { name: "Shipped", timestamp: "27 Aug 2026, 13:23 IST", isCompleted: true },
        ],
      },
      href: "https://github.com/Vishen-dart-coder/Baseline",
      dates: "Open source",
      active: true,
      description:
        "A single-file landing page for a members' tennis club and academy. No build step, just HTML, CSS and vanilla JS with Lenis smooth scrolling.",
      technologies: ["HTML", "CSS", "JavaScript", "Lenis"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Vishen-dart-coder/Baseline",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://raw.githubusercontent.com/Vishen-dart-coder/Baseline/main/hero.jpg",
      video: "",
    },
  ],
  hackathons,
};
