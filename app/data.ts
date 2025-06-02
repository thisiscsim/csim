export type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
  caseStudy?: {
    background: string
    solution: string
    impact: {
      stat: string
      label: string
      description?: string
    }[],
    credits: {
      text: string
      people: {
        name: string
        role: string
        image: string
      }[]
    },
    images?: {
      src: string
      alt: string
      caption?: string
    }[]
  }
}

export type ProjectGroup = {
  company: string
  companyLink?: string
  title?: string
  start: string
  end: string
  description?: string
  projects: Project[]
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
  date: string
  categories: string[]
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECT_GROUPS: ProjectGroup[] = [
  {
    company: 'Harvey',
    companyLink: 'https://harvey.com',
    title: 'Design Lead',
    start: '2024',
    end: 'Current',
    description: "I'm currently the design lead for Vault where I work on our multi-document review queries, data management and knowledge base features. I'm also the co-lead of Harvey's design system, which supports dozens of internal embedded product surfaces.",
    projects: [
      {
        name: 'Review Tables',
        description:
          'Multi-document retrieval, extraction & generation',
        link: 'https://pro.motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-review-table',
        caseStudy: {
          background: 'Empowering financial management is central to Arc’s vision as a comprehensive banking platform. With limited functionalities in our payment offerings, our customers have lacked incentives to increase deposits and manage spend directly through our platform. This has led directly to slower growth in Asset Under Management (AUM) and increased customer churn to our competitors offering more complete solutions.',
          solution: 'We developed Review Tables, a powerful interface that allows users to view and compare data across multiple documents in a structured table format. The solution enables users to extract, organize, and analyze information from various sources simultaneously.',
          impact: [
            {
              stat: '$1.2M+',
              label: 'Payments processed since launch'
            },
            {
              stat: '100+ Hours Saved',
              label: 'In time spent on bill consolidation'
            },
            {
              stat: '34% Uptick',
              label: 'In account deposits (AUM)'
            }
          ],
          credits: {
            text: "It's a huge privilege to have ownership over such a critical project and while I'm extremely proud of my role, it takes an entire village to get us across the line. Massive thanks to my key collaborators and many others.",
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg'
              },
              {
                name: 'Elliot Bensabat',
                role: 'Product Lead',
                image: '/images/credits/elliot-bensabat.jpg'
              },
              {
                name: 'Aniket Joshi',
                role: 'Engineering Lead',
                image: '/images/credits/aniket-joshi.jpg'
              },
              {
                name: 'Avi Khemani',
                role: 'Engineer',
                image: '/images/credits/avi-khemani.jpg'
              }
            ]
          },
          images: [
            {
              src: '/images/review-tables-1.png',
              alt: 'Review Tables Interface',
              caption: 'The main interface showing multiple documents in a table view'
            },
            {
              src: '/images/review-tables-2.png',
              alt: 'Data Extraction Process',
              caption: 'The data extraction and organization workflow'
            }
          ]
        }
      },
      {
        name: 'File event log',
        description: 'Real-time event log for file uploads',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-2',
      },
      {
        name: 'Vault Projects & Knowledge Sources',
        description: 'Persistent workspaces for long context queries',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-3',
      },
      {
        name: 'Vault File Browser',
        description: 'Full-featured DMS',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-4',
      },
    ],
  },
  {
    company: 'Arc',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2023',
    end: '2024',
    description: "As one of Arc's earliest designers, I worked across nearly every part of the product. I led design for Cash Management and Spend features like Bill Pay, Deposits, Auto-Transfers, Vendor Management, and Spend Insights, along with infrastructure such as Settings, Notifications, and Onboarding.",
    projects: [
      {
        name: 'Deposits',
        description: 'Faster, easier deposits for Arc users',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-1',
      },
      {
        name: 'Bill Pay',
        description: 'Unified platform to capture, scan, and automate invoice payments',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-2',
      },
      {
        name: 'Settings & Security',
        description: 'Strengthening account and financial security',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-3',
      },
      {
        name: 'Notifications',
        description: 'Action center with granular, rule-based notification controls',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-4',
      },
    ],
  },
  {
    company: 'Flexport',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2022',
    end: '2023',
    description: "I was a designer on the Operations Tooling team. I worked on the Freight Forwarding App, on a feature called TeamView, an end-to-end shipment visibility tool that enables operations teams to easily track shipments from the factory to the local warehouse.",
    projects: [
      {
        name: 'Freight Forwarding App',
        description: 'Move shipments with realtime, actionable visibility and telemetry',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'flexport-1',
      },
    ],
  },
  {
    company: 'Uber',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2022',
    end: '2022',
    description: "Worked with the rider team at Uber, designed multiple features across different touchpoints to bridge the trip experience between riders and drivers.",
    projects: [
      {
        name: 'En-route Delay Notification',
        description: 'Helping bridge the rider-driver communication',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-1',
      },
      {
        name: 'Driver Onboarding',
        description: 'Enhanced driver onboarding experience',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-2',
      },
    ],
  },
  {
    company: 'Independent',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2024',
    end: 'Current',
    description: "On the side, I'm also a design consultant for some of the most promising emerging software companies.",
    projects: [
      {
        name: 'Moab [Backed by Elad Gil, Karim Atiyeh, SPC]',
        description: 'Equipment inventory tooling',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-1',
      },
      {
        name: 'Amend AI [Backed by Neo]',
        description: 'Bringing data integrity back to users',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-2',
      },
    ],
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How I built this site',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
    date: '2025.3.14',
    categories: ['Design', 'Code', 'Tech'],
  },
  {
    title: 'Reclaiming my health',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
    date: '2025.3.14',
    categories: ['Personal'],
  },
  {
    title: 'How I prototype and handoff my designs with v0',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
    date: '2025.3.14',
    categories: ['Design', 'Tech', 'Interaction'],
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
    date: '2025-05-26',
    categories: ['Tech'],
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ibelick',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ibelick',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/ibelick',
  },
  {
    label: 'Resume',
    link: 'https://www.instagram.com/ibelick',
  },
]

export const EMAIL = 'your@email.com'

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Harvey',
    title: 'Design Lead',
    start: '2024',
    end: 'Current',
    link: 'https://harvey.com',
    id: 'harvey'
  },
  {
    company: 'Arc',
    title: 'Product Designer',
    start: '2023',
    end: '2024',
    link: 'https://arc.com',
    id: 'arc'
  },
  {
    company: 'Flexport',
    title: 'Product Designer',
    start: '2022',
    end: '2023',
    link: 'https://flexport.com',
    id: 'flexport'
  },
  {
    company: 'Uber',
    title: 'Product Designer',
    start: '2022',
    end: '2022',
    link: 'https://uber.com',
    id: 'uber'
  }
]
