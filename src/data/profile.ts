/**
 * Personal details used across the site.
 * Edit this file to update your name, links, tagline and bio.
 */
export const profile = {
  name: 'Matthew Yu',
  firstName: 'Matthew',
  initials: 'MY',
  title: 'Software Engineer',
  roles: ['Software Engineer', 'AI Systems Builder', 'Cloud & Mobile Developer', 'Mechanical Engineer turned Coder'],
  location: 'Brisbane, Australia',
  email: 'matt94317@gmail.com',
  github: 'https://github.com/matt94317',
  linkedin: 'https://www.linkedin.com/in/matthew-yu-6653b4200/',
  cvUrl: '/Matthew_Yu_CV.pdf',
  availability: 'Graduating Dec 2026 · open to graduate & junior software roles',
  tagline:
    'I build AI-powered products end to end — from a travel wardrobe app with 20K+ users to a cloud-deployed vulnerability-management platform for a real security team.',
  bio: [
    'I started my career as a mechanical engineer at Delta Electronics, working alongside Microsoft engineers on cooling systems for Azure data centres. Two years of root-cause analysis, cross-functional coordination and shipping physical products taught me how to reason about systems under real constraints.',
    'In 2025 I moved to Brisbane to complete a Master of Information Technology at QUT and rebuilt my toolkit around software: TypeScript and React on the front, Go, Python and Node.js behind it, PostgreSQL underneath, and AWS provisioned with Terraform. What I enjoy most is the layer where AI meets infrastructure — making LLM-driven systems reliable, scoped and safe with real organisational data.',
    'Outside of coursework I ship things. AnyWear, a peer-to-peer travel wardrobe app I built solo in React Native, has grown past 20,000 users. My hackathon team took first place at the 2026 QUT Sport Innovation Hackathon. And I am currently co-building Vertex, an AI-assisted vulnerability prioritisation platform for QUT Information Security.',
  ],
  facts: [
    { label: 'Based in', value: 'Brisbane, QLD' },
    { label: 'Studying', value: 'Master of IT, QUT (2025–26)' },
    { label: 'Previously', value: 'Mechanical Engineer, Delta Electronics' },
    { label: 'Languages', value: 'English · Mandarin (native)' },
    { label: 'Focus', value: 'AI systems · Cloud · Full-stack' },
    { label: 'Status', value: 'Open to graduate roles' },
  ],
} as const

export const stats = [
  { value: 20, suffix: 'K+', label: 'users on AnyWear, the app I built solo' },
  { value: 1, prefix: '#', suffix: '', label: 'place, 2026 QUT Sport Innovation Hackathon' },
  { value: 2, suffix: ' yrs', label: 'engineering at Delta Electronics with Microsoft' },
  { value: 7, suffix: '', label: 'projects built since 2025, from mobile apps to cloud platforms' },
] as const
