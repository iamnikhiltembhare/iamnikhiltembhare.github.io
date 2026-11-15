/*
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to update the portfolio.
 *  Everything on the page is generated from this object.
 *  Content is based on the FlowCV resume (flowcv.com/resume/vkpmc4vrfo)
 *  and GitHub (github.com/iamnikhiltembhare).
 * ─────────────────────────────────────────────────────────────
 */
window.PORTFOLIO = {
  name: "Nikhil Tembhare",
  initials: "NT",
  role: "IT Support Engineer",
  status: "Available for new opportunities",
  location: "Mumbai, India",
  headline: "I keep systems running, secure and users productive.",
  intro:
    "IT Support Engineer in Mumbai with a background in Linux, cyber security and web development. I resolve escalations, find root causes and build small tools that make work easier.",
  avatar: "assets/avatar.jpg",
  avatarBadge: "👋 Hi there!",
  // CV button: link or file path; set to "" to hide. The PDF is generated from this file — open resume.html
  // and print to PDF after editing. (Previous link: https://flowcv.com/resume/vkpmc4vrfo)
  resume: "assets/Nikhil-Tembhare-Resume.pdf",
  email: "niktem20@duck.com",
  // Privacy-friendly analytics (https://www.goatcounter.com). Put your GoatCounter code here, e.g. "nikhil" for
  // nikhil.goatcounter.com. Leave "" to disable — no script is loaded then.
  analytics: { goatcounter: "" },
  contactBlurb:
    "Need IT support, a Linux or security hand, or a website built? Have a role in mind or just want to say hi? My inbox is always open.",

  socials: [
    { label: "GitHub", url: "https://github.com/iamnikhiltembhare", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/nikhil-tembhare", icon: "linkedin" },
    { label: "X / Twitter", url: "https://x.com/nikhilptembhare", icon: "x" },
    { label: "Personal website", url: "https://flowcv.me/nikhiltembhare", icon: "web" },
  ],

  stats: [
    { value: "4+", label: "Years experience" },
    { value: "6", label: "Certifications" },
    { value: "7", label: "Linux distros used" },
    { value: "24/7", label: "Critical-incident support" },
  ],

  about: [
    "I'm an IT Support Engineer at FlexiLoans in Mumbai. I handle escalations from L2 support, run root cause analysis, apply patches and updates, and provide 24/7 support when critical incidents happen.",
    "I hold a BCA and a PG Diploma in Information Security from RTMNU, and I've spent over two years working hands-on with Linux. I practise ethical hacking on a freelance basis and hold Essentials certifications in Ethical Hacking, Digital Forensics and Network Defense.",
    "Before support, I built and deployed client websites as a web developer and taught programming to BCA & BCCA students. I still enjoy building — clean, responsive web apps with HTML, CSS, JavaScript and React.",
  ],
  facts: [
    { label: "Based in", value: "Mumbai, India" },
    { label: "Currently", value: "IT Support Engineer @ FlexiLoans" },
    { label: "Focus", value: "IT Support · Linux · Security" },
    { label: "Education", value: "BCA · PGDIS (RTMNU)" },
    { label: "Languages", value: "English, Hindi, Marathi" },
  ],

  // Skills: { name, level } renders an animated percentage bar (level 0–100, a self-assessment —
  // adjust to taste). Plain strings render as chips. Groups with only strings show chips only.
  skills: [
    {
      group: "IT Support",
      items: [
        { name: "Troubleshooting", level: 95 },
        { name: "Windows 7 – 11", level: 92 },
        { name: "Root Cause Analysis", level: 88 },
        { name: "Patch Management", level: 85 },
        { name: "Incident Response", level: 85 },
        "Windows Server 2025",
        "Change Requests",
      ],
    },
    {
      group: "Linux",
      items: [
        { name: "Ubuntu / Ubuntu Server", level: 90 },
        { name: "Arch Linux", level: 80 },
        { name: "Red Hat", level: 75 },
        { name: "Kali Linux", level: 75 },
        "CentOS",
        "Linux Mint",
        "Parrot OS",
      ],
    },
    {
      group: "Security",
      items: [
        { name: "Network Security", level: 75 },
        { name: "Ethical Hacking", level: 70 },
        { name: "Wireshark", level: 70 },
        { name: "Nmap", level: 70 },
        { name: "Cryptography", level: 65 },
        "Information Security",
      ],
    },
    {
      group: "Web Development",
      items: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 88 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 75 },
        { name: "TypeScript", level: 65 },
        "SASS",
        "Pug",
        "Bootstrap",
        "MERN Stack",
      ],
    },
    {
      group: "Programming",
      items: [
        { name: "Python", level: 75 },
        { name: "Java", level: 70 },
        { name: "C", level: 70 },
        { name: "C++", level: 65 },
      ],
    },
    {
      group: "Certifications",
      items: ["Ethical Hacking Essentials (EHE)", "Digital Forensics Essentials (DFE)", "Network Defense Essentials (NDE)", "Python", "Problem Solving", "HackerRank"],
    },
  ],

  projects: [
    {
      title: "Flat vs Reducing Interest Calculator",
      tag: "Tools",
      description:
        "Offline, dependency-free loan calculator that compares flat and reducing-balance interest — EMI, total interest and the equivalent rate in the other method.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "assets/projects/interest-calculator.jpg",
      color: "#00b894",
      live: "",
      code: "https://github.com/iamnikhiltembhare/interest-rate-calculator-offline",
    },
    {
      title: "Modern Calculator",
      tag: "Web App",
      description:
        "Material-style calculator with spring animations, a clean state-machine hook and a layout that adapts from mobile to large desktop.",
      tech: ["React", "TypeScript", "Material UI", "Framer Motion", "Vite"],
      image: "assets/projects/modern-calculator.jpg",
      color: "#6c5ce7",
      live: "",
      code: "https://github.com/iamnikhiltembhare/TestCalculator",
    },
    {
      title: "Modern Flip Clock",
      tag: "Web App",
      description: "An animated flip clock with date and seconds, built as a single page and deployed on GitHub Pages.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "assets/projects/flip-clock.jpg",
      color: "#e17055",
      live: "https://iamnikhiltembhare.github.io/flip-clock/",
      code: "https://github.com/iamnikhiltembhare/flip-clock",
    },
  ],

  experience: [
    {
      role: "IT Support Engineer",
      company: "FlexiLoans Pvt Ltd · Mumbai",
      period: "Feb 2025 — Present",
      points: [
        "Handle escalated issues from L2 support and conduct root cause analysis (RCA).",
        "Provide 24/7 after-hours support for critical incidents and escalations.",
        "Apply patches and updates to maintain system security and performance.",
        "Collaborate with clients to identify and implement technical solutions, and coordinate on-site support with field engineers.",
        "Log, track and resolve customer queries, and keep the knowledge base and self-help docs up to date.",
      ],
    },
    {
      role: "IT Support Engineer",
      company: "Teamwork · Mumbai",
      period: "Dec 2023 — Feb 2025",
      points: [
        "Diagnosed and resolved hardware and software issues, minimising downtime.",
        "Led system recovery after failures to ensure business continuity.",
        "Managed Change Requests (CRs) with testing and rollback plans to reduce risk.",
        "Applied patches and updates to maintain system security and performance.",
      ],
    },
    {
      role: "Technical Teacher Associate",
      company: "Disha Computer Institute · Nagpur",
      period: "May 2022 — Sep 2023",
      points: [
        "Taught programming concepts and courses based on the BCA & BCCA syllabus.",
        "Guided students through syllabus projects and mentored them one-on-one on complex topics.",
        "Designed and assessed programming assignments, projects and exams.",
      ],
    },
    {
      role: "Web Developer & Junior Graphics Designer",
      company: "Digitron Softwares · Nagpur",
      period: "Jan 2021 — Aug 2021",
      points: [
        "Developed custom websites and pages based on client requirements.",
        "Managed live projects and deployed them to servers on time.",
        "Tested and optimised sites for performance, security and user experience, with post-deployment support.",
      ],
    },
    {
      type: "education",
      role: "PG Diploma in Information Security (PGDIS)",
      company: "RTMNU · Nagpur",
      period: "Oct 2022 — Sep 2023",
      points: [
        "Cyber security, cryptography, network security and Linux server administration (Red Hat).",
        "Hands-on with Kali Linux, Parrot OS, Wireshark and Nmap.",
      ],
    },
    {
      type: "education",
      role: "Bachelor of Computer Application (BCA)",
      company: "City Premier College, Ajni · RTMNU",
      period: "Jul 2018 — Sep 2021",
      points: ["Programming in C, C++, Java and Python, with an introduction to ML & AI."],
    },
  ],
};
