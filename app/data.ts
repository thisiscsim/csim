export type Project = {
  title: string;
  year: string;
  media: string;
  id: string;
  aspectRatio?: 'landscape' | 'portrait' | 'wide'; // landscape = 5:4, portrait = 4:5, wide = 3:2
  description?: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Harvey Artifacts',
    year: '2025',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-artifacts',
    aspectRatio: 'wide',
    description:
      'Artifacts reimagines how users work with Harvey, moving beyond simple chat into a versatile interface for drafting, review, and analysis.',
  },
  {
    title: 'Harvey Word Add-In',
    year: '2024',
    media: '/word-add-in.mp4',
    id: 'harvey-word',
    aspectRatio: 'landscape',
    description:
      'Draft and review documents and contracts faster with analysis, playbooks, and integrated knowledge with our word plugin.',
  },
  {
    title: 'Harvey Vault',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-vault',
    aspectRatio: 'wide',
    description:
      "Vault is Harvey's document management system, designed to help legal teams upload and store thousands of documents.",
  },
  {
    title: 'Harvey Review',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-review-table',
    description:
      'Our large-scale document extraction tool, upload thousands of documents, ask up to 100 questions simultaneously, and generate structured insights.',
  },
  {
    title: 'Harvey S-1 Workflow',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-s1',
    aspectRatio: 'landscape',
    description:
      "Agentic workflow where Harvey could one-shot a company's S-1 filing, as well as produce a tailored risk factor profile.",
  },
  {
    title: 'Harvey Design System',
    year: '2025',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-design-system',
    aspectRatio: 'wide',
    description:
      'Design system built from the ground up for clarity, consistency, and scale, making our design language more semantic and accessible.',
  },
  {
    title: 'Harvey Upload Event Logging',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-upload-logging',
    aspectRatio: 'wide',
    description:
      "Clear, transparent insight into document uploads—why files fail, what's processing, and which documents needs attention.",
  },
  {
    title: 'Exa Search',
    year: '2025',
    media: 'https://csim.b-cdn.net/Projects/exa_search.webp',
    id: 'exa-search',
    aspectRatio: 'wide',
    description:
      "I freelanced with Exa for one month to help them conceptualize their new search product that's not only tailored for humans but agents as well.",
  },
  {
    title: 'Arc Bill Pay',
    year: '2023',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'arc-billpay',
    aspectRatio: 'wide',
    description:
      "Arc's platform for automating invoice payments, designed to simplify and consolidate a process that had been manual and time-intensive for customers.",
  },
  {
    title: 'Flexport Freight Forwarding App',
    year: '2022',
    media:
      'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/flexport-real-time-visibility.mp4',
    id: 'flexport-freight',
    aspectRatio: 'wide',
    description:
      'End-to-end shipment observability that gave operations teams a unified view of freight movement from factory to retail stores.',
  },
  {
    title: 'Uber Delay Notification',
    year: '2022',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'uber-delay',
    aspectRatio: 'landscape',
    description:
      'A lightweight system for handling unexpected driver delays, keeping riders informed and enabling fast, low-stress rebooking.',
  },
  {
    title: 'Uber Pick-Up Visibility',
    year: '2022',
    media:
      'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/uber-pick-up-visibility-rider-app.mp4',
    id: 'uber-pickup',
    aspectRatio: 'landscape',
    description:
      'Enhanced pickup guidance using street-level context and clear visual cues to help riders and drivers meet in the right place.',
  },
];

export const EMAIL = 'your@email.com';
