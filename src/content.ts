// All copy on the site comes from Shairy Achwan's resume. Do not add details
// here that are not in the resume.

export const profile = {
  firstName: 'Shairy',
  fullName: 'Shairy Achwan',
  title: 'Cyber Security Engineer',
  specialism: 'Web · API · Mobile · AI & LLM Penetration Testing',
  preloaderRoles: ['Cyber Security Engineer', 'Penetration Tester', 'LLM Security'],
  intro:
    "Hello, I'm Shairy, a cyber security engineer and penetration tester across web, API, mobile and LLM applications. Welcome to my portfolio.",
  location: 'Noida, U.P., India',
  email: 'shairyachwan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shairy-a9b2ab1a3',
}

export const about = {
  lead: 'I find the weaknesses in applications before attackers do, and help teams fix them.',
  body: [
    'I am a cybersecurity analyst with 3 years of experience in VAPT for web applications, APIs, mobile applications, LLMs and network environments.',
    'My work is grounded in OWASP-based security testing, vulnerability validation, OSINT and risk assessment. I identify security weaknesses, support remediation, and improve overall security posture through comprehensive testing and reporting.',
  ],
  facts: [
    { value: '3 yrs', label: 'VAPT experience' },
    { value: '50+', label: 'VAPT engagements led at Acquisory' },
    { value: 'CEH', label: 'Practical certified' },
    { value: 'B.Tech', label: 'Computer Science, 2023' },
  ],
}

export type WorkItem = {
  index: string
  stat: string
  statLabel: string
  title: string
  org: string
  problem: string
  contribution: string[]
  methods: string[]
  outcome: string
}

export const work: WorkItem[] = [
  {
    index: '01',
    stat: '50+',
    statLabel: 'VAPT engagements',
    title: 'Full-scope VAPT across five attack surfaces',
    org: 'Acquisory Consulting LLP · 2024 – Present',
    problem:
      'Client web applications, APIs, mobile apps, LLMs and network infrastructure needed their vulnerabilities identified and their security risks assessed.',
    contribution: [
      'Lead and execute the engagements end to end.',
      'Select tools, methodologies and attack techniques for each target.',
      'Validate every finding and assess its potential impact.',
      'Work with clients on-site to communicate findings and support remediation.',
    ],
    methods: ['Web', 'API', 'Mobile', 'LLM', 'Network'],
    outcome: 'Actionable remediation recommendations that strengthen the security posture of client applications.',
  },
  {
    index: '02',
    stat: 'OSINT',
    statLabel: 'Recon-led testing',
    title: 'Footprinting that sharpens the attack',
    org: 'Acquisory Consulting LLP · 2024 – Present',
    problem: 'Attack simulations are only as focused as what is known about the target.',
    contribution: [
      'Map target infrastructure, personnel, exposed assets and technologies through OSINT and digital footprinting.',
      'Feed that picture into the test plan.',
    ],
    methods: ['OSINT', 'Digital footprinting'],
    outcome: 'More focused and effective attack simulations.',
  },
  {
    index: '03',
    stat: 'GIGW',
    statLabel: 'Compliance assessments',
    title: 'Government website guideline assessments',
    org: 'Acquisory Consulting LLP · 2024 – Present',
    problem:
      "Applications must meet the Government of India's Guidelines for Indian Government Websites (GIGW).",
    contribution: [
      'Assess application compliance against GIGW.',
      'Identify the areas that need security improvements.',
    ],
    methods: ['GIGW', 'Compliance', 'Security review'],
    outcome: 'The areas requiring security improvements, identified for each application.',
  },
  {
    index: '04',
    stat: '95%',
    statLabel: 'Vulnerability resolution rate',
    title: '40+ web applications penetration-tested',
    org: 'Xiarch Solutions Pvt. Ltd. · 2023 – 2024',
    problem: 'Web, API and mobile clients needed vulnerabilities found and, crucially, fixed.',
    contribution: [
      'Executed 45+ end-to-end VAPT projects across web, API and mobile.',
      'Performed mobile application security testing and developed security test cases.',
      'Wrote client reports covering impact, risk analysis and step-by-step remediation.',
    ],
    methods: ['Web', 'API', 'Mobile', 'Reporting'],
    outcome: 'Contributed to a 95% resolution rate for identified vulnerabilities, with repeatable testing methodologies documented.',
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Application security',
    items: [
      'Web, API & mobile app security testing',
      'Authentication & authorization',
      'Business logic',
      'OWASP Top 10',
      'Secure SDLC',
      'Vulnerability management',
      'OSINT',
      'Social engineering',
      'Digital footprinting',
    ],
  },
  {
    group: 'APIs & protocols',
    items: ['REST', 'GraphQL', 'OAuth 2.0', 'JWT', 'BOLA / IDOR', 'CORS', 'Rate limiting', 'Session management'],
  },
  {
    group: 'Tools',
    items: ['Burp Suite', 'OWASP ZAP', 'Acunetix', 'Nuclei', 'SQLMap', 'Postman', 'MobSF', 'Nmap', 'Wireshark', 'Kali Linux'],
  },
  { group: 'Scripting', items: ['Python', 'Bash'] },
  {
    group: 'Cloud & identity',
    items: ['Microsoft Entra ID', 'Azure attack techniques (AzRTS coursework, in progress)'],
  },
]

export const surfaces: { name: string; detail: string }[] = [
  { name: 'Web applications', detail: 'OWASP Top 10, authentication and authorization flaws, business logic.' },
  { name: 'APIs', detail: 'REST and GraphQL, OAuth 2.0 and JWT, BOLA/IDOR, CORS, rate limiting, sessions.' },
  { name: 'Mobile applications', detail: 'Mobile app security testing and security test case design, with MobSF.' },
  { name: 'AI & LLM', detail: 'LLM penetration testing, backed by the Certified LLM Security Professional credential.' },
  { name: 'Network', detail: 'Network infrastructure VAPT with Nmap and Wireshark.' },
]

export const method: { step: string; detail: string }[] = [
  { step: 'Recon', detail: 'OSINT and digital footprinting to map infrastructure, people, exposed assets and technologies.' },
  { step: 'Attack', detail: 'Testing with the tools, methodologies and techniques the target calls for.' },
  { step: 'Validate', detail: 'Confirm each vulnerability and assess its real impact and risk.' },
  { step: 'Remediate', detail: 'Reports with step-by-step fixes, and hands-on support for remediation.' },
]

export type TimelineItem = {
  when: string
  role: string
  org: string
  kind: 'Experience' | 'Education'
  points: string[]
}

export const timeline: TimelineItem[] = [
  {
    when: 'Apr 2024 – Present',
    role: 'Associate Cyber Security',
    org: 'Acquisory Consulting LLP',
    kind: 'Experience',
    points: [
      'Lead and execute 50+ VAPT engagements across web, APIs, mobile, LLMs and network infrastructure.',
      'Conduct OSINT and digital footprinting to focus attack simulations.',
      'Assess compliance with GIGW and identify security improvements.',
      'Mentor and guide interns on VAPT methodologies, validation and best practice.',
      'Engage directly with clients during on-site security assessments.',
    ],
  },
  {
    when: 'Aug 2023',
    role: 'B.Tech. in Computer Science',
    org: 'Gautam Buddha University, Greater Noida',
    kind: 'Education',
    points: [],
  },
  {
    when: 'Feb 2023 – Apr 2024',
    role: 'Cybersecurity Consultant L1',
    org: 'Xiarch Solutions Pvt. Ltd.',
    kind: 'Experience',
    points: [
      'Executed 45+ end-to-end VAPT projects across web, API and mobile.',
      'Penetration-tested 40+ web applications, contributing to a 95% vulnerability resolution rate.',
      'Performed mobile application security testing and developed security test cases.',
      'Delivered client reports and documented repeatable testing methodologies.',
    ],
  },
]

export const certifications = [
  { name: 'Certified Ethical Hacker', note: 'CEH (Practical)' },
  { name: 'Certified LLM Security Professional', note: 'AI & LLM security' },
  { name: 'AzRTS coursework', note: 'Microsoft Entra ID & Azure attack techniques · in progress' },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#focus', label: 'Focus' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]
