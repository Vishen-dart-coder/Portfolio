import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
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
    degree: "IGCSE",
    logoUrl: "/logos/podar.jpg",
    start: "",
    end: "",
  },
  {
    school: "AWS Skill Builder",
    href: "https://skillbuilder.aws",
    degree: "Cloud Practitioner, Developer and Solutions Architect tracks",
    logoUrl: "/logos/aws-skill-builder.png",
    start: "",
    end: "",
  },
  {
    school: "Google Cloud certificate program",
    href: "https://cloud.google.com/learn/certification",
    degree: "Google Cloud certification",
    logoUrl: "/logos/google-cloud.png",
    start: "",
    end: "",
  },
  {
    school: "Udemy",
    href: "https://www.udemy.com",
    degree: "Online courses",
    logoUrl: "/logos/udemy.png",
    start: "",
    end: "",
  },
  {
    school: "Other certifications",
    href: "https://github.com/Vishen-dart-coder",
    degree: "Azure AI Engineer, Kubernetes",
    logoUrl: "/logos/microsoft.png",
    start: "",
    end: "",
  },
];
const hackathons: Hackathon[] = [
  { title: "AWS", dates: "", location: "Las Vegas", description: "", image: "/logos/aws.png", links: [] },
  { title: "AWS", dates: "", location: "Mumbai", description: "", image: "/logos/aws.png", links: [] },
  { title: "AWS", dates: "", location: "Bangalore", description: "", image: "/logos/aws.png", links: [] },
  { title: "Anthropic community event", dates: "", location: "", description: "", image: "/logos/anthropic.png", links: [] },
  { title: "Codex event", dates: "", location: "", description: "", image: "/logos/openai.png", links: [] },
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
  location: "India",
  locationLink: "https://www.google.com/maps/place/india",
  description:
    "Vishen Sharma is a full stack developer from India who ships production apps in React, Next.js and TypeScript.",
  intro: "I'm Vishen Sharma, a full stack developer from India",
  summary:
    "I ship production apps like [CareerFlow AI](https://careerflow-ai.org.in) and [Archive360](https://archive360.co), and in my spare time I build the pieces underneath them, from a [database engine](https://github.com/Vishen-dart-coder/db-from-scratch-in-js) to a [local AI agent](https://github.com/Vishen-dart-coder/GrokBot). Most days I'm deep in React, Next.js and TypeScript, and I care about interfaces that feel fast and honest.",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "Postgres", icon: Postgresql },
    { name: "JavaScript", icon: iconImage("/skills/javascript.svg") },
    { name: "Tailwind CSS", icon: iconImage("/skills/tailwindcss.svg") },
    { name: "Express", icon: iconImage("/skills/express.svg", true) },
    { name: "FastAPI", icon: iconImage("/skills/fastapi.svg") },
    { name: "MongoDB", icon: iconImage("/skills/mongodb.svg") },
    { name: "Electron", icon: iconImage("/skills/electron.svg") },
    { name: "Swift", icon: iconImage("/skills/swift.svg") },
    { name: "Ollama", icon: iconImage("/skills/ollama.svg", true) },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "AWS", icon: iconImage("/skills/aws.png") },
    { name: "Google Cloud", icon: iconImage("/skills/googlecloud.svg") },
    { name: "Azure", icon: iconImage("/skills/azure.png") },
    { name: "Linux", icon: iconImage("/skills/linux.svg") },
    { name: "Git", icon: iconImage("/skills/git.svg") },
    { name: "GitHub Actions", icon: iconImage("/skills/githubactions.svg") },
    { name: "Vercel", icon: iconImage("/skills/vercel.svg", true) },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "iamvishensharma@gmail.com",
    tel: "",
    social,
  },
  work,
  education,
  projects: [
    {
      title: "CareerFlow AI",
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
