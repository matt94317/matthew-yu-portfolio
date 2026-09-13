import type { IconType } from 'react-icons'
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGo,
  SiSharp,
  SiPostgresql,
  SiHtml5,
  SiReact,
  SiExpo,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiVite,
  SiNodedotjs,
  SiFlask,
  SiSupabase,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiStripe,
  SiClaude,
  SiOllama,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiTerraform,
  SiDocker,
  SiGithubactions,
  SiVercel,
  SiGit,
  SiJupyter,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { Bot, Braces, Database, Workflow, Cpu, Cloud, Code2, Brain } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Skill = {
  name: string
  icon?: IconType | LucideIcon
  color?: string
  /** slugs from projects.ts where this skill was used */
  usedIn?: string[]
}

export type SkillCategory = {
  id: string
  label: string
  icon: LucideIcon
  blurb: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: Code2,
    blurb: 'Typed where it matters, pragmatic everywhere else.',
    skills: [
      { name: 'Python', icon: SiPython, color: '#3776AB', usedIn: ['sightline', 'food-delivery'] },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', usedIn: ['vertex', 'anywear'] },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', usedIn: ['virex', 'recruitment-app'] },
      { name: 'Go', icon: SiGo, color: '#00ADD8', usedIn: ['vertex'] },
      { name: 'C#', icon: SiSharp, color: '#9B4F96' },
      { name: 'SQL', icon: Database, color: '#22d3ee', usedIn: ['vertex', 'anywear', 'food-delivery'] },
      { name: 'HTML / CSS', icon: SiHtml5, color: '#E34F26', usedIn: ['recruitment-app', 'food-delivery'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Mobile',
    icon: Cpu,
    blurb: 'Interfaces people actually use — on the web and on phones.',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB', usedIn: ['vertex', 'recruitment-app'] },
      { name: 'React Native', icon: SiReact, color: '#61DAFB', usedIn: ['anywear'] },
      { name: 'Expo', icon: SiExpo, color: '#ffffff', usedIn: ['anywear'] },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', usedIn: ['recruitment-app'] },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', usedIn: ['food-delivery'] },
      { name: 'Vite', icon: SiVite, color: '#646CFF', usedIn: ['vertex'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    icon: Braces,
    blurb: 'APIs, data models and payments that hold up in production.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', usedIn: ['virex', 'recruitment-app'] },
      { name: 'Flask', icon: SiFlask, color: '#ffffff', usedIn: ['sightline', 'food-delivery'] },
      { name: 'REST APIs', icon: Workflow, color: '#a78bfa', usedIn: ['vertex', 'virex', 'anywear'] },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', usedIn: ['vertex', 'anywear'] },
      { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E', usedIn: ['anywear'] },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', usedIn: ['recruitment-app'] },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1', usedIn: ['food-delivery'] },
      { name: 'SQLite', icon: SiSqlite, color: '#0F80CC' },
      { name: 'Stripe Connect', icon: SiStripe, color: '#635BFF', usedIn: ['anywear'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    icon: Brain,
    blurb: 'The layer where LLMs meet real infrastructure and real data.',
    skills: [
      { name: 'Claude API', icon: SiClaude, color: '#D97757', usedIn: ['sightline', 'virex'] },
      { name: 'Agent design', icon: Bot, color: '#22d3ee', usedIn: ['virex'] },
      { name: 'RAG pipelines', icon: Workflow, color: '#a78bfa', usedIn: ['vertex'] },
      { name: 'Ollama (self-hosted LLM)', icon: SiOllama, color: '#ffffff', usedIn: ['vertex'] },
      { name: 'Prompt engineering', icon: Brain, color: '#f472b6', usedIn: ['sightline', 'virex', 'vertex'] },
      { name: 'scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'Pandas', icon: SiPandas, color: '#ffffff' },
      { name: 'NumPy', icon: SiNumpy, color: '#4DABCF' },
      { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: Cloud,
    blurb: 'Reproducible environments, automated releases.',
    skills: [
      { name: 'AWS (EC2, S3, RDS, VPC, IAM)', icon: FaAws, color: '#FF9900', usedIn: ['vertex', 'cloud-infra'] },
      { name: 'Terraform', icon: SiTerraform, color: '#844FBA', usedIn: ['vertex', 'cloud-infra'] },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF', usedIn: ['recruitment-app'] },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Expo EAS', icon: SiExpo, color: '#ffffff', usedIn: ['anywear'] },
    ],
  },
]

/** Logos shown in the scrolling marquee */
export const marqueeLogos: { name: string; icon: IconType | LucideIcon; color: string }[] = [
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Go', icon: SiGo, color: '#00ADD8' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Terraform', icon: SiTerraform, color: '#844FBA' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Claude', icon: SiClaude, color: '#D97757' },
  { name: 'Ollama', icon: SiOllama, color: '#ffffff' },
  { name: 'Expo', icon: SiExpo, color: '#ffffff' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Stripe', icon: SiStripe, color: '#635BFF' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
]
