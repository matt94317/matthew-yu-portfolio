export type ProjectLink = { label: string; href: string; kind?: 'appstore' | 'web' | 'github' }

export type Project = {
  slug: string
  title: string
  subtitle: string
  period: string
  role: string
  category: 'AI' | 'Mobile' | 'Web' | 'Cloud' | 'Security'
  stack: string[]
  summary: string
  problem: string
  solution: string
  outcome: string
  highlights: string[]
  cover: string
  coverAlt: string
  accent: 'cyan' | 'violet' | 'pink' | 'emerald'
  featured: boolean
  award?: string
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: 'vertex',
    title: 'Vertex',
    subtitle: 'AI-powered vulnerability management platform',
    period: '2026 · QUT Industry Project',
    role: 'Full-stack developer · owns cloud deployment',
    category: 'Security',
    stack: ['Go', 'React', 'TypeScript', 'Vite', 'PostgreSQL', 'Ollama', 'RAG', 'Terraform', 'AWS'],
    summary:
      'An AI-assisted prioritisation platform, built as a QUT industry capstone, that layers organisational context onto vulnerability findings so a security team knows what to fix first.',
    problem:
      'Existing vulnerability tools rank findings without organisational context, forcing security teams to triage manually. Anything touching that data also has to handle it responsibly.',
    solution:
      'Co-developing the platform with a Go backend, React/TypeScript frontend and PostgreSQL data layer. A RAG pipeline retrieves client-specific context and a self-hosted Ollama model keeps sensitive data off third-party infrastructure, while a deterministic scoring engine constrains the LLM’s output.',
    outcome:
      'Delivering a working, cloud-deployed prototype despite limited access to sensitive validation data. I independently own the AWS deployment (EC2, S3, RDS, VPC, IAM) provisioned with Terraform, so environments stay version-controlled and reproducible.',
    highlights: [
      'Self-hosted LLM + RAG keeps organisation-sensitive data on-prem',
      'Deterministic SSVC-style scoring engine constrains AI output',
      'Infrastructure as code: Terraform-provisioned AWS stack',
      'QUT industry capstone project, built with a team',
    ],
    cover: '/images/cover-vertex.webp',
    coverAlt: 'Abstract illustration of a glowing network of threat nodes protected by a holographic shield',
    accent: 'cyan',
    featured: true,
  },
  {
    slug: 'anywear',
    title: 'AnyWear',
    subtitle: 'Peer-to-peer travel wardrobe app · iOS & Android',
    period: '2026 · Founder & sole developer',
    role: 'Built the entire product single-handedly',
    category: 'Mobile',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe Connect', 'Google Maps API', 'Cloudinary'],
    summary:
      'A marketplace where travellers rent outfits at their destination instead of overpacking — listings, bookings, payments, messaging and ID verification, live on the App Store with 20K+ users.',
    problem:
      'Solo travellers overpack because renting clothing at a destination has never been a viable option. The business model kept evolving while the product was being built.',
    solution:
      'Designed and built a cross-platform mobile app end to end: listings with photo upload, bookings, Stripe Connect payments, real-time messaging, reviews and ID verification, on a Supabase/PostgreSQL backend with row-level security.',
    outcome:
      'Shipped to the App Store and Google Play and grew past 20,000 users with zero paid marketing. Building through repeated model changes taught me to lock down system design and business logic before implementation — an approach I now apply on Vertex.',
    highlights: [
      '20K+ users, organic growth only',
      'Marketplace payments with Stripe Connect',
      'Real-time messaging, reviews and ID verification',
      'Single codebase for iOS and Android via Expo EAS',
    ],
    cover: '/images/cover-anywear.webp',
    coverAlt: 'AnyWear app home screen on an iPhone: “Travel Light, Dress Amazing”',
    accent: 'pink',
    featured: true,
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/au/app/anywear-travel-wardrobe/id6762925692', kind: 'appstore' },
      { label: 'Website', href: 'https://web.anywearglobal.app/', kind: 'web' },
    ],
  },
  {
    slug: 'sightline',
    title: 'SightLine · Educated Spectating',
    subtitle: 'AI explanations for live sport broadcasts',
    period: 'Apr 2026 · Team of 5',
    role: 'Engineering · Team SightLine (5 people)',
    category: 'AI',
    stack: ['Python', 'Flask', 'Claude API'],
    summary:
      'Real-time, beginner-friendly explanations of rules, tactics and key moments during live sport — built for Brisbane 2032 fan-engagement and awarded 1st place at the QUT Sport Innovation Hackathon.',
    problem:
      'Brisbane’s local sport engagement was projected to spike during the 2032 Olympics and drop sharply afterwards. The brief: design for lasting fan engagement.',
    solution:
      'Built “Educated Spectating”, an AI platform using Python and Flask integrated with the Claude API to generate live, plain-language explanations of what is happening on screen and why it matters.',
    outcome:
      'Won 1st place among all entrants and secured selection for an 8-week MVP program with Innovation Central Brisbane, backed by QUT Sport as part of the Brisbane 2032 legacy initiative.',
    highlights: [
      '1st place, 2026 QUT Sport Innovation Hackathon',
      'Selected for an 8-week MVP program with Innovation Central Brisbane',
      'Claude API generating real-time explanations',
      'Cross-disciplinary team of design, business and engineering',
    ],
    cover: '/images/cover-sightline.webp',
    coverAlt: 'Illustration of a night stadium with holographic AI overlays explaining the play',
    accent: 'violet',
    featured: true,
    award: '1st place',
  },
  {
    slug: 'virex',
    title: 'VIREX',
    subtitle: 'E-commerce AI automation agent',
    period: '2026 · Solo build',
    role: 'Designed and built the agent',
    category: 'AI',
    stack: ['Node.js', 'REST API', 'Claude Sonnet'],
    summary:
      'An autonomous agent that generates and publishes product listing content end to end, turning hours of repetitive e-commerce work into a pipeline.',
    problem:
      'Manually listing products on e-commerce platforms is repetitive, high-volume work that suits an autonomous agent better than a one-off script.',
    solution:
      'Designed and built an AI agent on a Node.js/REST backend that uses Claude to generate titles, descriptions and attributes, then publishes the listings automatically.',
    outcome:
      'Delivered a working automation pipeline. Loosely specified prompts produced unstable output, which sharpened a practical discipline in precisely scoping LLM output requirements — a lesson now built into every AI system I work on.',
    highlights: [
      'End-to-end listing generation and publishing',
      'Structured prompt contracts for stable LLM output',
      'Node.js + REST integration with store platforms',
    ],
    cover: '/images/cover-virex.webp',
    coverAlt: 'Illustration of glowing product cards flowing along a conveyor of light into a storefront',
    accent: 'emerald',
    featured: true,
  },
  {
    slug: 'recruitment-app',
    title: 'Online Recruitment & Management App',
    subtitle: 'IFN636 · Full-stack platform with CI/CD',
    period: '2025 · QUT coursework',
    role: 'Full-stack developer',
    category: 'Web',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'GitHub Actions'],
    summary:
      'A full-stack recruitment platform shipped through an automated GitHub Actions CI/CD pipeline.',
    problem: 'Course brief: deliver a production-style full-stack application with an automated release process.',
    solution: 'Built the React/Tailwind frontend and Node.js/MongoDB API, then wired a GitHub Actions pipeline to build and deploy every push.',
    outcome: 'A working recruitment platform with a repeatable, automated release process.',
    highlights: ['Automated CI/CD with GitHub Actions', 'REST API on Node.js and MongoDB'],
    cover: '/images/cover-recruit.webp',
    coverAlt: 'Illustration of candidate profile cards moving through a glowing pipeline',
    accent: 'cyan',
    featured: false,
  },
  {
    slug: 'food-delivery',
    title: 'Online Food Delivery Website',
    subtitle: 'IFN582 · End-to-end ordering platform',
    period: '2025 · QUT coursework',
    role: 'Full-stack developer',
    category: 'Web',
    stack: ['Python', 'Flask', 'Bootstrap', 'MySQL'],
    summary: 'An end-to-end food ordering platform, from menu browsing through checkout and order placement.',
    problem: 'Course brief: build a database-backed web application with a complete user journey.',
    solution: 'Developed the Flask backend, MySQL schema and Bootstrap UI covering menus, carts and orders.',
    outcome: 'A complete ordering flow with persistent data and server-rendered pages.',
    highlights: ['Relational data model in MySQL', 'Server-rendered Flask application'],
    cover: '/images/cover-food.webp',
    coverAlt: 'Illustration of a neon delivery scooter on a dark city map with floating dish cards',
    accent: 'pink',
    featured: false,
  },
  {
    slug: 'cloud-infra',
    title: 'Cloud Infrastructure as Code',
    subtitle: 'CAB432 · AWS provisioned with Terraform',
    period: '2026 · QUT coursework',
    role: 'Cloud engineer',
    category: 'Cloud',
    stack: ['Terraform', 'AWS EC2', 'S3', 'RDS', 'VPC', 'IAM'],
    summary: 'Provisioned scalable, fault-tolerant AWS infrastructure entirely as code and studied the cost, availability and security trade-offs behind it.',
    problem: 'Course brief: design and provision cloud architecture for a real workload using infrastructure as code.',
    solution: 'Wrote Terraform configurations for EC2 compute, S3 storage, RDS databases, VPC networking and IAM roles and policies.',
    outcome: 'A reproducible, version-controlled AWS environment — directly reused for deploying the Vertex platform.',
    highlights: ['Terraform for EC2, S3, RDS, VPC and IAM', 'Applied to a real deployment (Vertex)'],
    cover: '/images/cover-cloud.webp',
    coverAlt: 'Isometric illustration of glass server racks connected to a glowing cloud',
    accent: 'violet',
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
