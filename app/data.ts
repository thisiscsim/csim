export type Project = {
  name: string;
  description: string;
  link: string;
  video: string;
  id: string;
  duration?: string;
  tools?: string[];
  caseStudy?: {
    background: string;
    solution: string;
    impactDescription?: string;
    impact: {
      stat: string;
      label: string;
      description?: string;
    }[];
    credits: {
      text: string;
      people: {
        name: string;
        role: string;
        image: string;
      }[];
    };
    images?: {
      src: string;
      alt: string;
      caption?: string;
    }[];
  };
};

export type ProjectGroup = {
  company: string;
  companyLink?: string;
  title?: string;
  start: string;
  end: string;
  description?: string;
  projects: Project[];
};

export const PROJECT_GROUPS: ProjectGroup[] = [
  {
    company: 'Harvey',
    companyLink: 'https://harvey.com',
    title: 'Design Lead',
    start: '2024',
    end: 'Now',
    projects: [
      {
        name: 'Artifacts',
        description: 'New interface for working with Harvey that goes beyond a simple chat',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-7',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Legal professionals were constrained by traditional chat interfaces when working with AI. Complex workflows required multiple conversations, making it difficult to maintain context and organize outputs. The lack of structured workspaces meant valuable insights were often lost in conversation histories.',
          solution:
            'We created Artifacts, a revolutionary interface that transforms how legal professionals interact with AI. By introducing persistent workspaces, structured outputs, and collaborative features, we enabled users to build, iterate, and share complex legal documents and analyses beyond the limitations of chat.',
          impactDescription:
            'Artifacts launched in Q3 2024 and has fundamentally changed how our users work with Harvey. Early metrics show significant improvements in workflow efficiency and user satisfaction.',
          impact: [
            {
              stat: '3.5x',
              label: 'Increase in document generation speed',
            },
            {
              stat: '87%',
              label: 'User adoption rate within first month',
            },
            {
              stat: '2.3 hours',
              label: 'Average time saved per user per day',
            },
          ],
          credits: {
            text: 'Leading design on such an ambitious project required close collaboration across all disciplines. Special thanks to the team that made this vision a reality.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Sarah Chen',
                role: 'Product Manager',
                image: '/images/credits/sarah-chen.jpg',
              },
              {
                name: 'Marcus Rodriguez',
                role: 'Engineering Lead',
                image: '/images/credits/marcus-rodriguez.jpg',
              },
              {
                name: 'Emma Watson',
                role: 'AI Research Lead',
                image: '/images/credits/emma-watson.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/artifacts-1.png',
              alt: 'Artifacts Workspace Interface',
              caption: 'The main workspace showing multiple artifacts and collaboration features',
            },
            {
              src: '/images/artifacts-2.png',
              alt: 'Document Generation Flow',
              caption: 'AI-powered document generation with real-time editing capabilities',
            },
          ],
        },
      },
      {
        name: 'File event log',
        description: 'Real-time event log for file uploads',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-2',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Users lacked visibility into file processing status, leading to confusion and support tickets. The absence of real-time feedback meant users often re-uploaded files or contacted support unnecessarily. This created operational overhead and degraded user experience.',
          solution:
            'We designed and implemented a comprehensive event log system that provides real-time updates on file processing. The interface shows detailed status information, progress indicators, and actionable error messages, giving users complete transparency into the system.',
          impactDescription:
            'The File Event Log dramatically reduced support burden and improved user confidence in the platform.',
          impact: [
            {
              stat: '73%',
              label: 'Reduction in file-related support tickets',
            },
            {
              stat: '4.8/5',
              label: 'User satisfaction rating',
            },
            {
              stat: '45 seconds',
              label: 'Average time to issue resolution',
            },
          ],
          credits: {
            text: 'This project showcased the power of cross-functional collaboration in solving user pain points.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Alex Kim',
                role: 'Frontend Engineer',
                image: '/images/credits/alex-kim.jpg',
              },
              {
                name: 'Jordan Taylor',
                role: 'Backend Engineer',
                image: '/images/credits/jordan-taylor.jpg',
              },
            ],
          },
        },
      },
      {
        name: 'Vault Projects & Knowledge Sources',
        description: 'Persistent workspaces for long context queries',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-3',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Legal teams struggled with maintaining context across complex, multi-document projects. Traditional folder structures were inadequate for AI-powered workflows, and valuable institutional knowledge was scattered across disparate systems.',
          solution:
            'We created Vault Projects, a sophisticated workspace system that combines document management with AI knowledge sources. Users can create persistent project spaces, configure custom knowledge bases, and maintain context across extended research sessions.',
          impactDescription:
            'Vault Projects has become the cornerstone of how enterprise legal teams organize and leverage their knowledge with Harvey.',
          impact: [
            {
              stat: '12TB+',
              label: 'Documents organized in Vault',
            },
            {
              stat: '94%',
              label: 'Improvement in query accuracy',
            },
            {
              stat: '5x',
              label: 'Faster project setup time',
            },
          ],
          credits: {
            text: 'Building Vault required deep understanding of legal workflows and close partnership with our users.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Rachel Green',
                role: 'Product Manager',
                image: '/images/credits/rachel-green.jpg',
              },
              {
                name: 'David Park',
                role: 'Infrastructure Lead',
                image: '/images/credits/david-park.jpg',
              },
              {
                name: 'Lisa Wang',
                role: 'ML Engineer',
                image: '/images/credits/lisa-wang.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/vault-1.png',
              alt: 'Vault Projects Dashboard',
              caption: 'Project organization with custom knowledge sources',
            },
            {
              src: '/images/vault-2.png',
              alt: 'Knowledge Configuration',
              caption: 'Configuring custom knowledge bases for specific practice areas',
            },
          ],
        },
      },
      {
        name: 'Review Tables',
        description: 'Multi-document retrieval, extraction & generation',
        link: 'https://pro.motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-review-table',
        duration: '6 months',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            "Empowering financial management is central to Arc's vision as a comprehensive banking platform. With limited functionalities in our payment offerings, our customers have lacked incentives to increase deposits and manage spend directly through our platform. This has led directly to slower growth in Asset Under Management (AUM) and increased customer churn to our competitors offering more complete solutions.",
          solution:
            'We developed Review Tables, a powerful interface that allows users to view and compare data across multiple documents in a structured table format. The solution enables users to extract, organize, and analyze information from various sources simultaneously.',
          impactDescription:
            'Review Tables was launched in the November of 2022 to Flex-Go Operators and Import Partners and has significantly improved our operations management process. We achieved a 6.5% increase in shipment on-time performance and saved over 250 hours previously spent triaging issues. These tangible improvements directly enhance customer satisfaction and operational efficiency.',
          impact: [
            {
              stat: '$1.2M+',
              label: 'Payments processed since launch',
            },
            {
              stat: '100+ Hours Saved',
              label: 'In time spent on bill consolidation',
            },
            {
              stat: '34% Uptick',
              label: 'In account deposits (AUM)',
            },
          ],
          credits: {
            text: "It's a huge privilege to have ownership over such a critical project and while I'm extremely proud of my role, it takes an entire village to get us across the line. Massive thanks to my key collaborators and many others.",
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Elliot Bensabat',
                role: 'Product Lead',
                image: '/images/credits/elliot-bensabat.jpg',
              },
              {
                name: 'Aniket Joshi',
                role: 'Engineering Lead',
                image: '/images/credits/aniket-joshi.jpg',
              },
              {
                name: 'Avi Khemani',
                role: 'Engineer',
                image: '/images/credits/avi-khemani.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/review-tables-1.png',
              alt: 'Review Tables Interface',
              caption: 'The main interface showing multiple documents in a table view',
            },
            {
              src: '/images/review-tables-2.png',
              alt: 'Data Extraction Process',
              caption: 'The data extraction and organization workflow',
            },
          ],
        },
      },
      {
        name: 'Vault File Browser',
        description: 'Full-featured DMS',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-4',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Legal professionals needed a document management system that could handle the complexity of legal documents while integrating seamlessly with AI capabilities. Existing solutions were either too generic or lacked the AI integration needed for modern legal work.',
          solution:
            'We built a comprehensive file browser that combines traditional DMS features with AI-powered search, tagging, and organization. The system supports complex permission structures, version control, and intelligent document suggestions based on context.',
          impactDescription:
            'The Vault File Browser has become the central hub for document management, replacing multiple legacy systems.',
          impact: [
            {
              stat: '2.3M+',
              label: 'Documents managed',
            },
            {
              stat: '82%',
              label: 'Reduction in time to find documents',
            },
            {
              stat: '99.99%',
              label: 'Uptime reliability',
            },
          ],
          credits: {
            text: 'Creating an enterprise-grade DMS required expertise from across the organization.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Michael Chen',
                role: 'Engineering Manager',
                image: '/images/credits/michael-chen.jpg',
              },
              {
                name: 'Sofia Martinez',
                role: 'Security Lead',
                image: '/images/credits/sofia-martinez.jpg',
              },
            ],
          },
        },
      },
      {
        name: 'Mobile 1.0',
        description: 'Native mobile experience for legal professionals',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-5',
        tools: ['Figma', 'Swift', 'Kotlin'],
        caseStudy: {
          background:
            "Legal professionals needed access to Harvey on the go, but the desktop experience wasn't optimized for mobile use cases. Lawyers working in court, during travel, or in client meetings required a mobile-first solution.",
          solution:
            'We designed native iOS and Android apps that reimagined Harvey for mobile contexts. The apps feature voice input, offline capabilities, and context-aware interfaces that adapt to different legal scenarios.',
          impactDescription:
            "Mobile 1.0 extended Harvey's reach beyond the office, enabling legal work anywhere.",
          impact: [
            {
              stat: '68%',
              label: 'Daily active mobile users',
            },
            {
              stat: '4.9★',
              label: 'App Store rating',
            },
            {
              stat: '3.2x',
              label: 'Increase in after-hours usage',
            },
          ],
          credits: {
            text: 'Launching native apps required a dedicated mobile team and new design paradigms.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'James Wilson',
                role: 'iOS Lead',
                image: '/images/credits/james-wilson.jpg',
              },
              {
                name: 'Priya Patel',
                role: 'Android Lead',
                image: '/images/credits/priya-patel.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/mobile-1.png',
              alt: 'Harvey Mobile Interface',
              caption: 'The mobile app featuring voice input and contextual actions',
            },
          ],
        },
      },
      {
        name: 'S-1 Workflow',
        description: 'Streamlined SEC filing preparation and review',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-6',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Preparing S-1 filings for IPOs is one of the most complex and time-sensitive legal processes. Teams spent months manually reviewing documents, cross-referencing regulations, and ensuring compliance. The risk of errors was high and the process was extremely resource-intensive.',
          solution:
            'We created a specialized workflow that automates S-1 preparation and review. The system uses AI to analyze documents, flag potential issues, suggest corrections, and ensure regulatory compliance. Interactive checklists and collaborative review tools streamline the entire process.',
          impactDescription:
            'The S-1 Workflow has transformed how law firms handle IPO preparations, reducing timeline and risk.',
          impact: [
            {
              stat: '67%',
              label: 'Reduction in filing preparation time',
            },
            {
              stat: '$2.4M',
              label: 'Average cost savings per filing',
            },
            {
              stat: '0',
              label: 'SEC comment letters on AI-reviewed sections',
            },
          ],
          credits: {
            text: 'This specialized workflow required deep securities law expertise and careful AI training.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Elizabeth Ross',
                role: 'Securities Law Expert',
                image: '/images/credits/elizabeth-ross.jpg',
              },
              {
                name: 'Robert Zhang',
                role: 'ML Engineering Lead',
                image: '/images/credits/robert-zhang.jpg',
              },
              {
                name: 'Amanda Foster',
                role: 'Product Manager',
                image: '/images/credits/amanda-foster.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/s1-workflow-1.png',
              alt: 'S-1 Review Dashboard',
              caption: 'AI-powered review interface with compliance checking',
            },
            {
              src: '/images/s1-workflow-2.png',
              alt: 'Collaborative Review Tools',
              caption: 'Multi-party review and approval workflows',
            },
          ],
        },
      },
    ],
  },
  {
    company: 'Arc',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2023',
    end: '2024',
    projects: [
      {
        name: 'Deposits',
        description: 'Faster, easier deposits for Arc users',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-1',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Arc users struggled with slow and cumbersome deposit processes. Traditional ACH transfers took 3-5 days, wire transfers were expensive, and the overall experience was fragmented. This friction prevented users from fully adopting Arc as their primary banking solution.',
          solution:
            'We redesigned the entire deposit experience, introducing instant deposits via debit card, streamlined ACH flows, and intelligent routing that automatically selects the best deposit method. The new interface provides real-time updates and clear timelines for fund availability.',
          impactDescription:
            'The new deposit system significantly increased user engagement and assets under management.',
          impact: [
            {
              stat: '$847M',
              label: 'Deposits processed in first year',
            },
            {
              stat: '89%',
              label: 'Reduction in deposit abandonment',
            },
            {
              stat: '2 minutes',
              label: 'Average time to complete deposit',
            },
          ],
          credits: {
            text: 'Reimagining deposits required close collaboration with banking partners and compliance teams.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Product Designer',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Kevin Liu',
                role: 'Banking Product Lead',
                image: '/images/credits/kevin-liu.jpg',
              },
              {
                name: 'Maria Gonzalez',
                role: 'Engineering Lead',
                image: '/images/credits/maria-gonzalez.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/deposits-1.png',
              alt: 'Deposit Flow Interface',
              caption: 'Streamlined deposit flow with intelligent routing',
            },
          ],
        },
      },
      {
        name: 'Notifications',
        description: 'Action center with granular, rule-based notification controls',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-4',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            "Users were overwhelmed by notifications and lacked control over what they received. Critical alerts were lost in noise, and teams couldn't configure notifications for their specific workflows. This led to missed opportunities and delayed responses to important financial events.",
          solution:
            'We built a sophisticated notification system with rule-based controls, allowing users to create custom notification rules based on transaction types, amounts, and other criteria. The action center provides a unified view of all notifications with intelligent prioritization.',
          impactDescription:
            'The new notification system improved response times to critical events and reduced notification fatigue.',
          impact: [
            {
              stat: '94%',
              label: 'Faster response to critical alerts',
            },
            {
              stat: '76%',
              label: 'Reduction in notification volume',
            },
            {
              stat: '4.7/5',
              label: 'User satisfaction score',
            },
          ],
          credits: {
            text: 'Creating an intelligent notification system required deep understanding of user workflows.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Product Designer',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Tom Anderson',
                role: 'Backend Engineer',
                image: '/images/credits/tom-anderson.jpg',
              },
              {
                name: 'Jessica Wu',
                role: 'Product Manager',
                image: '/images/credits/jessica-wu.jpg',
              },
            ],
          },
        },
      },
      {
        name: 'Settings & Security',
        description: 'Strengthening account and financial security',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-3',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Security settings were scattered across the platform, making it difficult for users to manage their account security. With increasing regulatory requirements and security threats, we needed a comprehensive security center that balanced usability with robust protection.',
          solution:
            'We designed a unified security center that consolidates all security settings in one place. Features include biometric authentication, hardware key support, granular permission controls, and audit logs. The interface uses progressive disclosure to keep simple tasks easy while supporting advanced configurations.',
          impactDescription:
            'The security center significantly improved account security while maintaining ease of use.',
          impact: [
            {
              stat: '99.8%',
              label: 'Reduction in account takeovers',
            },
            {
              stat: '83%',
              label: 'Users enabled 2FA',
            },
            {
              stat: '100%',
              label: 'SOC 2 compliance achieved',
            },
          ],
          credits: {
            text: 'Building a security center required expertise in security, compliance, and user experience.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Product Designer',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Ryan Mitchell',
                role: 'Security Engineer',
                image: '/images/credits/ryan-mitchell.jpg',
              },
              {
                name: 'Linda Chang',
                role: 'Compliance Lead',
                image: '/images/credits/linda-chang.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/security-1.png',
              alt: 'Security Center Dashboard',
              caption: 'Unified security settings with clear status indicators',
            },
          ],
        },
      },
      {
        name: 'Bill Pay',
        description: 'Unified platform to capture, scan, and automate invoice payments',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-2',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Businesses were managing bills across multiple platforms, leading to missed payments, duplicate work, and cash flow issues. Manual data entry was error-prone and time-consuming. Teams needed a unified solution that could handle the entire bill payment lifecycle.',
          solution:
            'We created an intelligent bill pay system that uses OCR and AI to automatically capture invoice data, schedule payments, and manage approvals. The system integrates with accounting software and provides real-time cash flow forecasting based on scheduled payments.',
          impactDescription:
            'Bill Pay transformed how businesses manage their payables, saving time and improving cash flow management.',
          impact: [
            {
              stat: '$2.3B',
              label: 'Bills processed annually',
            },
            {
              stat: '92%',
              label: 'Reduction in late payments',
            },
            {
              stat: '3.5 hours',
              label: 'Saved per week per user',
            },
          ],
          credits: {
            text: 'Bill Pay required innovation in OCR technology and workflow automation.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Product Designer',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Steve Johnson',
                role: 'ML Engineer',
                image: '/images/credits/steve-johnson.jpg',
              },
              {
                name: 'Emily Brown',
                role: 'Product Manager',
                image: '/images/credits/emily-brown.jpg',
              },
              {
                name: 'Carlos Rodriguez',
                role: 'Backend Lead',
                image: '/images/credits/carlos-rodriguez.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/billpay-1.png',
              alt: 'Bill Pay Dashboard',
              caption: 'Intelligent invoice processing with automated data extraction',
            },
            {
              src: '/images/billpay-2.png',
              alt: 'Payment Scheduling',
              caption: 'Cash flow forecasting based on scheduled payments',
            },
          ],
        },
      },
    ],
  },
  {
    company: 'Flexport',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2022',
    end: '2023',
    projects: [
      {
        name: 'Freight Forwarding App',
        description: 'Move shipments with realtime, actionable visibility and telemetry',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'flexport-1',
        tools: ['Figma', 'TypeScript', 'React', 'Next.js'],
        caseStudy: {
          background:
            'Freight forwarding was managed through spreadsheets, emails, and phone calls. Shippers lacked visibility into their supply chains, leading to delays, increased costs, and poor customer experiences. The industry needed digital transformation to meet modern logistics demands.',
          solution:
            'We built a comprehensive freight forwarding platform that provides real-time shipment tracking, predictive analytics, and automated exception handling. The system integrates with carriers, ports, and customs authorities to provide end-to-end visibility and control.',
          impactDescription:
            'The platform revolutionized how companies manage their global supply chains, bringing transparency to a traditionally opaque industry.',
          impact: [
            {
              stat: '$12B+',
              label: 'Freight managed annually',
            },
            {
              stat: '47%',
              label: 'Reduction in shipment delays',
            },
            {
              stat: '6.5%',
              label: 'Improvement in on-time delivery',
            },
          ],
          credits: {
            text: 'Building a platform for global logistics required deep industry knowledge and technical innovation.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Product Designer',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Wei Zhang',
                role: 'Engineering Manager',
                image: '/images/credits/wei-zhang.jpg',
              },
              {
                name: 'Sarah Thompson',
                role: 'Logistics Expert',
                image: '/images/credits/sarah-thompson.jpg',
              },
              {
                name: 'Marco Silva',
                role: 'Data Science Lead',
                image: '/images/credits/marco-silva.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/flexport-1.png',
              alt: 'Shipment Tracking Dashboard',
              caption: 'Real-time visibility across the entire supply chain',
            },
            {
              src: '/images/flexport-2.png',
              alt: 'Exception Management',
              caption: 'Automated alerts and resolution workflows for shipment issues',
            },
          ],
        },
      },
    ],
  },
  {
    company: 'Uber',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2022',
    end: '2022',
    projects: [
      {
        name: 'En-route Delay Notification',
        description: 'Helping bridge the rider-driver communication',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-1',
        tools: ['Figma', 'TypeScript', 'React Native'],
        caseStudy: {
          background:
            'Riders frequently experienced anxiety when drivers made unexpected stops or took unfamiliar routes. Without communication channels, riders would cancel trips or contact support, leading to poor experiences and lost revenue. Drivers needed a way to communicate legitimate delays without compromising safety.',
          solution:
            'We designed a contextual notification system that allows drivers to quickly communicate delays with pre-set messages while maintaining focus on driving. The system uses location data to intelligently suggest relevant delay reasons and automatically notifies riders with updated ETAs.',
          impactDescription:
            'The feature significantly reduced ride cancellations and improved trust between riders and drivers.',
          impact: [
            {
              stat: '31%',
              label: 'Reduction in delay-related cancellations',
            },
            {
              stat: '4.2→4.7',
              label: 'Driver rating improvement',
            },
            {
              stat: '850K',
              label: 'Daily notifications sent',
            },
          ],
          credits: {
            text: 'This project required balancing driver safety with rider communication needs.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Product Designer',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Maya Patel',
                role: 'Product Manager',
                image: '/images/credits/maya-patel.jpg',
              },
              {
                name: 'Jason Lee',
                role: 'Mobile Engineer',
                image: '/images/credits/jason-lee.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/uber-delay-1.png',
              alt: 'Driver Notification Interface',
              caption: 'Quick-access delay notifications for drivers',
            },
            {
              src: '/images/uber-delay-2.png',
              alt: 'Rider Update Screen',
              caption: 'Real-time updates keep riders informed',
            },
          ],
        },
      },
    ],
  },
  {
    company: 'Independent',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2024',
    end: '?',
    projects: [
      {
        name: 'Moab [Backed by Elad Gil, Karim Atiyeh, SPC]',
        description: 'Equipment inventory tooling',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-1',
        tools: ['Figma', 'TypeScript', 'Next.js'],
        caseStudy: {
          background:
            'Construction and industrial companies struggled with equipment tracking across job sites. Valuable machinery was often lost, underutilized, or double-booked. The lack of real-time inventory visibility led to project delays, increased rental costs, and significant capital inefficiencies.',
          solution:
            'We built Moab, a comprehensive equipment management platform featuring real-time GPS tracking, utilization analytics, and predictive maintenance scheduling. The system uses IoT sensors and mobile apps to provide complete visibility into equipment location, status, and availability.',
          impactDescription:
            'Moab has transformed how construction companies manage their equipment fleets, delivering immediate ROI.',
          impact: [
            {
              stat: '$4.2M',
              label: 'Average annual savings per customer',
            },
            {
              stat: '89%',
              label: 'Reduction in equipment downtime',
            },
            {
              stat: '3.7x',
              label: 'Improvement in equipment utilization',
            },
          ],
          credits: {
            text: 'Building Moab required deep understanding of construction workflows and IoT integration.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Co-founder & Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Daniel Cooper',
                role: 'Co-founder & CEO',
                image: '/images/credits/daniel-cooper.jpg',
              },
              {
                name: 'Rachel Kim',
                role: 'Head of Engineering',
                image: '/images/credits/rachel-kim.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/moab-1.png',
              alt: 'Equipment Dashboard',
              caption: 'Real-time fleet visibility with utilization metrics',
            },
            {
              src: '/images/moab-2.png',
              alt: 'Mobile Tracking App',
              caption: 'Field workers can update equipment status on the go',
            },
          ],
        },
      },
      {
        name: 'Amend AI [Backed by Neo]',
        description: 'Bringing data integrity back to users',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-2',
        tools: ['Figma', 'TypeScript', 'Next.js'],
        caseStudy: {
          background:
            'Organizations struggled with data quality issues across disparate systems. Manual data validation was time-consuming and error-prone. Bad data led to poor decisions, compliance issues, and significant operational costs. Teams needed automated solutions to maintain data integrity at scale.',
          solution:
            'Amend AI uses machine learning to automatically detect, flag, and fix data quality issues. The platform provides real-time monitoring, intelligent suggestions for data corrections, and automated workflows for data governance. It integrates seamlessly with existing data infrastructure.',
          impactDescription:
            'Amend AI has become essential infrastructure for data-driven organizations, ensuring reliable decision-making.',
          impact: [
            {
              stat: '96%',
              label: 'Accuracy in anomaly detection',
            },
            {
              stat: '10x',
              label: 'Faster data validation',
            },
            {
              stat: '$1.8M',
              label: 'Average savings from prevented data errors',
            },
          ],
          credits: {
            text: 'Amend required innovation in ML algorithms and deep understanding of enterprise data challenges.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Anna Schmidt',
                role: 'ML Research Lead',
                image: '/images/credits/anna-schmidt.jpg',
              },
              {
                name: 'Brian Foster',
                role: 'Founding Engineer',
                image: '/images/credits/brian-foster.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/amend-1.png',
              alt: 'Data Quality Dashboard',
              caption: 'Real-time monitoring of data health across systems',
            },
            {
              src: '/images/amend-2.png',
              alt: 'Anomaly Detection',
              caption: 'AI-powered detection with suggested corrections',
            },
          ],
        },
      },
      {
        name: 'Peach',
        description: 'Agentic dating in the modern age',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'independent-3',
        tools: ['Figma', 'TypeScript', 'Next.js'],
        caseStudy: {
          background:
            'Modern dating apps relied on superficial swiping mechanics that led to poor matches and dating fatigue. Users spent hours swiping with little success. The dating experience had become gamified rather than focused on meaningful connections.',
          solution:
            'Peach uses AI agents to understand user preferences beyond surface-level attributes. The app learns from conversations, date feedback, and behavioral patterns to make intelligent match suggestions. Instead of endless swiping, users receive curated daily matches with detailed compatibility insights.',
          impactDescription:
            'Peach is redefining online dating by prioritizing quality matches over quantity, leading to more meaningful connections.',
          impact: [
            {
              stat: '73%',
              label: 'First date success rate',
            },
            {
              stat: '4.5x',
              label: 'Higher engagement than traditional apps',
            },
            {
              stat: '82%',
              label: 'Users in relationships after 6 months',
            },
          ],
          credits: {
            text: 'Creating Peach required reimagining how technology can facilitate human connection.',
            people: [
              {
                name: 'Christopher Sim',
                role: 'Co-founder & Design',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Sophie Laurent',
                role: 'Co-founder & CEO',
                image: '/images/credits/sophie-laurent.jpg',
              },
              {
                name: 'Marcus Webb',
                role: 'Head of AI',
                image: '/images/credits/marcus-webb.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/peach-1.png',
              alt: 'Daily Match Interface',
              caption: 'Curated daily matches with compatibility insights',
            },
            {
              src: '/images/peach-2.png',
              alt: 'AI Conversation Assistant',
              caption: 'Intelligent conversation starters based on shared interests',
            },
          ],
        },
      },
    ],
  },
];

export const EMAIL = 'your@email.com';
