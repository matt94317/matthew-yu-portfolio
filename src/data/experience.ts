export type TimelineItem = {
  kind: 'work' | 'education'
  title: string
  org: string
  location: string
  period: string
  start: string // ISO-ish for ordering
  summary: string
  bullets?: string[]
  tags?: string[]
}

export const timeline: TimelineItem[] = [
  {
    kind: 'education',
    title: 'Master of Information Technology',
    org: 'Queensland University of Technology',
    location: 'Brisbane, QLD',
    period: 'Feb 2025 – Dec 2026',
    start: '2025-02',
    summary:
      'Coursework across machine learning, cloud computing, advanced algorithms, cyber security and governance, networks and security, software life-cycle management and human-centred design — capped by an industry capstone project (Vertex).',
    tags: ['Machine Learning', 'Cloud Computing', 'Cyber Security', 'Algorithms', 'Industry Project'],
  },
  {
    kind: 'work',
    title: 'Mechanical Engineer',
    org: 'Delta Electronics',
    location: 'Taoyuan, Taiwan',
    period: 'Apr 2023 – Feb 2025',
    start: '2023-04',
    summary: 'Data Center Systems Business Unit — cooling system design for hyperscale Azure data centres.',
    bullets: [
      'Collaborated with Microsoft engineering teams on cooling system design for Azure data centres, improving thermal performance and energy efficiency through iterative design and field-test validation.',
      'Led problem analysis and root-cause investigation for engineering changes and sample production issues across multiple product lines.',
      'Owned Bill of Materials drafting and verification, coordinating material selection and supplier qualification across design, manufacturing and QA teams.',
    ],
    tags: ['Azure data centres', 'Thermal design', 'Root-cause analysis', 'Cross-functional delivery'],
  },
  {
    kind: 'work',
    title: 'Firmware Engineer Intern',
    org: 'SEDA G-Tech',
    location: 'Taiwan',
    period: 'Jun 2022 – Feb 2023',
    start: '2022-06',
    summary: 'Python development for a pressure-sensor mattress monitoring system for elder care.',
    tags: ['Python', 'Sensors', 'IoT'],
  },
  {
    kind: 'education',
    title: 'B.Sc. Mechanical Engineering',
    org: 'Yuan Ze University',
    location: 'Taoyuan, Taiwan',
    period: 'Graduated Jun 2022',
    start: '2018-09',
    summary: 'Undergraduate Thesis Excellence Award and Cross-Culture Communication Award.',
    tags: ['Thesis Excellence Award', 'Cross-Culture Communication Award'],
  },
]

export const awards = [
  {
    title: '1st Place — QUT Sport Innovation Hackathon',
    year: '2026',
    detail: 'Team SightLine · selected for an 8-week MVP program with Innovation Central Brisbane (Brisbane 2032 legacy initiative).',
  },
  {
    title: 'Undergraduate Thesis Excellence Award',
    year: '2022',
    detail: 'Yuan Ze University',
  },
  {
    title: 'Cross-Culture Communication Award',
    year: '2022',
    detail: 'Yuan Ze University',
  },
]
