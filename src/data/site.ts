// Everything about me that isn't a project lives here.
// Projects are Markdown files in src/content/projects/.

import okc from "../assets/timeline/okc-downtown.jpg";
import dragonBridge from "../assets/timeline/dragon-bridge.jpeg";
import hoiAn from "../assets/timeline/hoi-anh.jpeg";
import vnBeach from "../assets/timeline/vn-beach.jpeg";
import sakura from "../assets/timeline/jp-pic-1.jpeg";
import kinkakuji from "../assets/timeline/jp-pic-2.jpeg";

export const site = {
  name: "Ramone Robertson",
  role: "Backend Engineer",
  location: "Oklahoma City, OK",
  availability: "Open to backend engineering roles",
  email: "ramoneqr7@gmail.com",
  github: "https://github.com/RamoneRobertson",
  linkedin: "https://www.linkedin.com/in/ramone-robertson/",
  photo: "/photo.jpg",
  photoAlt: "Ramone Robertson smiling, wearing glasses and a blue denim shirt",
  description:
    "Ramone Robertson is a backend engineer in Oklahoma City with nearly six years of infrastructure and security engineering at Boeing, now building backend services and cloud infrastructure on AWS.",

  intro:
    "I spent nearly six years at Boeing building and securing the physical infrastructure behind DoD training systems, from server racks and networks to Kubernetes. Now I build the same kind of systems on AWS, along with the backend services that run on them.",

  about: {
    heading: "Reliability is designed in, not added later.",
    paragraphs: [
      "I'm Ramone, a backend engineer in Oklahoma City.",
      "I started at Boeing in 2017 on the infrastructure behind military flight and ground training systems: racking servers, building networks, hardening everything to DoD standards, and eventually moving legacy simulation software onto Kubernetes. When a training session goes down, a room full of people stops working, so I learned to build systems that don't.",
      "In 2023 I took a planned career break and moved to Tokyo to study Japanese full-time and retrain in web development at Le Wagon. In 2026 I came home to help care for my grandmother, and used that time to go deep on backend engineering and AWS. The projects on this site are the result.",
      "I'm looking for a team where I can own services end to end: design the API, model the data, write the Terraform, and be responsible for how it runs in production."
    ],
    facts: [
      { label: "Based in", value: "Oklahoma City, OK" },
      { label: "Looking for", value: "Backend Engineer" },
      { label: "Certified", value: "AWS Solutions Architect – Associate" },
      { label: "Studying for", value: "CKA (Certified Kubernetes Administrator)" },
      { label: "Languages", value: "English, Japanese (N4)" }
    ],
    // A short personal section under the bio. Every photo needs alt text.
    life: {
      heading: "Outside of work",
      paragraphs: [
        "Nearly three years in Japan gave me cherry blossoms at night in Tokyo, temples in Kyoto, and a lot of practice ordering in Japanese.",
        "From Tokyo I made three long trips to Vietnam, mostly Da Nang and Hoi An: December 2023, summer 2025 (when I built Mofumo in Java and Spring Boot) and November 2025 to January 2026. What keeps pulling me back is the warmth of the weather and the people, the food, My An beach, the Dragon Bridge, Hoi An's old town and the café scene."
      ],
      photos: [
        { src: sakura, alt: "Cherry blossoms lit up at night over a crowded Tokyo street" },
        { src: kinkakuji, alt: "Kinkaku-ji, the golden pavilion in Kyoto, reflected in its pond" },
        { src: dragonBridge, alt: "The Dragon Bridge in Da Nang lit up gold over the Han River at night" },
        { src: hoiAn, alt: "A lantern-lined street of yellow shophouses in Hoi An's old town" },
        { src: vnBeach, alt: "A jet ski on the sand at a Da Nang beach under a blue sky" },
        { src: okc, alt: "Downtown Oklahoma City at sunset, the Devon Energy Center reflected in a fountain" }
      ]
    }
  },

  stats: [
    { value: "5+ yrs", label: "Infrastructure and security at Boeing" },
    { value: "ATO", label: "DoD systems taken through authorization" },
    { value: "80%", label: "Faster deploys after moving to Kubernetes" },
    { value: "AWS", label: "Certified Solutions Architect – Associate" }
  ],

  // Only tools used in the featured projects. Icons come from src/lib/icons.ts.
  skills: [
    { name: "Languages", items: ["Go", "Java", "Python", "TypeScript"] },
    { name: "Backend", items: ["REST APIs", "WebSockets", "Spring Boot", "Spring Security", "JWT", "Spotify Web API"] },
    { name: "Data", items: ["Redis", "MySQL", "DynamoDB"] },
    { name: "AWS", items: ["EC2", "Lambda", "API Gateway", "S3", "CloudFront"] },
    { name: "Infrastructure", items: ["Kubernetes", "Docker", "Terraform", "GitHub Actions"] }
  ],

  boeing: {
    title: "Software Engineer",
    company: "Boeing",
    dates: "Jul 2017 – Mar 2023",
    place: "Oklahoma City, OK",
    intro:
      "Built, secured and operated the infrastructure behind large-scale military ground and aircraft training systems, from bare metal to Kubernetes, and took it through formal DoD authorization.",
    highlights: [
      { value: "80%", label: "faster deployments" },
      { value: "70%", label: "less manual audit work" },
      { value: "50%", label: "less troubleshooting downtime" },
      { value: "50+", label: "endpoints scanned weekly" }
    ],
    // Wrap a key term in **double asterisks** to give it a soft highlight.
    groups: [
      {
        title: "Kubernetes and platform",
        points: [
          "Led the move of legacy simulation software into containers on a **Rancher-managed Kubernetes** cluster, cutting deployment time by **80%**.",
          "Integrated **VMware-hosted Kubernetes** clusters (Rancher) into the existing enterprise framework."
        ]
      },
      {
        title: "Security and compliance",
        points: [
          "Hardened Group Policy to **DISA STIG** criteria so every system met **DoD vulnerability assessment** standards.",
          "Engineered custom GPO settings with LGPO tools to **automate policy deployment** and keep configuration consistent across enterprise-scale infrastructure.",
          "Configured users, groups and permissions in **Active Directory** for precise access control on mission-critical training systems.",
          "Automated vulnerability scanning across **50+ endpoints** with **Tenable Nessus** and custom Bash and PowerShell, cutting manual audit effort by **70%**."
        ]
      },
      {
        title: "Network services",
        points: [
          "Configured and ran **DHCP and DNS** for **high-availability** environments, including primary boot servers for network Linux imaging.",
          "Provisioned **20+ Cisco switches** with custom **VLANs** and subnetting to isolate traffic between simulation components."
        ]
      },
      {
        title: "Hardware to authorization",
        points: [
          "**Primary technical owner** for building enterprise server racks and networking hardware: turned architecture plans into running systems, installed OS and firmware, and remediated audit findings to secure formal **ATO**.",
          "Provisioned **bare-metal servers**, including RAID configuration, SCSI boot optimization and **SAN** setup for Windows and Unix training systems.",
          "Mapped proprietary simulation code to cut live-session troubleshooting downtime by **50%**, and wrote **10+ technical manuals** used as the baseline for military Technical Orders."
        ]
      }
    ]
  },

  // Newest first. An entry can have `parts`, each with a label, dates and bullet points.
  // Wrap a key term in **double asterisks** to highlight it.
  timeline: [
    {
      dates: "Apr 2023 – Present",
      title: "Career break",
      org: "Tokyo, then Oklahoma City",
      detail: "A planned break to learn Japanese and retrain in modern web development, followed by a move home for family.",
      parts: [
        {
          label: "Japanese language school",
          dates: "From Apr 2023 · Tokyo",
          points: [
            "Studied Japanese **20+ hours a week**: kanji, grammar, vocabulary and regular speech assignments.",
            "Group communication projects and school trips, carried out in Japanese."
          ]
        },
        {
          label: "Le Wagon Tokyo · Web development bootcamp",
          dates: "Alongside language school",
          points: [
            "Full-stack training in Git, Ruby, **Ruby on Rails**, SQL, HTML, CSS and JavaScript, deployment to Heroku, product management and demo-day pitches.",
            "**Film location marketplace**, team of four: an Airbnb for shoots, where businesses rent their space to productions for commercials, films, YouTube and social content. Rails served the REST endpoints and JavaScript called the **Mapbox API** to map available locations.",
            "**AnimePanda**: anime recommendations from a panda chatbot built on the **OpenAI API**, with title data from the **MyAnimeList API**. Filter by genre and year, then swipe through recommendation cards and save the ones you like."
          ]
        },
        {
          label: "Family care and backend focus",
          dates: "Jan 2026 – Present · Oklahoma City",
          points: [
            "Came home to help care for my grandmother. The flexible schedule gave me room to go deep on backend engineering.",
            "Built the projects on this site and earned the **AWS Solutions Architect – Associate** certification. Now looking for my next full-time backend role."
          ]
        }
      ]
    },
    {
      dates: "Jul 2017 – Mar 2023",
      title: "Software Engineer",
      org: "Boeing",
      detail: "Infrastructure, platform and security engineering for military training systems.",
      parts: []
    }
  ],

  // Live visitor counter served by API Gateway -> Lambda -> DynamoDB.
  visitorApi: "https://ramonerobertson.dev/v1/visitors"
};
