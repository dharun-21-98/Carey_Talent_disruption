// Enums and Interfaces

export type Persona = 'landing' | 'talent' | 'employer' | 'admin';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string; // Remote, Hybrid, On-site
  visaSupport: boolean;
  matchScore: number;
  timeline: string;
  logo: string;
  description: string;
  requirements: string[];
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  secondaryRole?: string;
  location: string;
  targetLocation?: string; // e.g. "Open to US"
  visaStatus: string;
  visaExpiry: string;
  experience: string; // e.g. "6 Years"
  salary: string;
  skills: string[];
  badges: string[]; // For legacy support
  
  // New specific metrics
  matchScore: number; // Keep for legacy, but map to stars
  starRating: 3 | 4 | 5; // Solid, Strong, Elite
  starLabel: string; // e.g. "LLM + Robotics (rare)"
  
  hiringSpeed: 'Fast' | 'Medium' | 'Slow';
  hiringSpeedLabel: string; // e.g. "30 days"
  
  costTier: '$' | '$$' | '$$$' | '$$$$';
  costBreakdown?: {
    salary: string;
    visa: string;
    relocation: string;
  };

  stability: 'Low Risk' | 'Medium Risk' | 'High Risk';
  stabilityReason?: string;

  // Icons flags
  isRemoteReady: boolean;
  needsRelocation: boolean;
  needsVisa: boolean;

  highlights: string[];
  avatar: string;
}

// Mock Data

export const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior LLM Engineer',
    company: 'Robotics AI Inc',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    type: 'On-site',
    visaSupport: true,
    matchScore: 94,
    timeline: '6 weeks',
    logo: 'https://picsum.photos/40/40?random=1',
    description: 'Lead the development of reasoning agents for autonomous robotics.',
    requirements: ['PyTorch', 'CUDA', 'RAG']
  },
  {
    id: '2',
    title: 'Applied AI Researcher',
    company: 'BioGen Labs',
    location: 'London, UK',
    salary: '£85k - £110k',
    type: 'Hybrid',
    visaSupport: true,
    matchScore: 88,
    timeline: '8 weeks',
    logo: 'https://picsum.photos/40/40?random=2',
    description: 'Research novel protein folding models using generative AI.',
    requirements: ['Bioinformatics', 'TensorFlow', 'Python']
  },
  {
    id: '3',
    title: 'AI Automation Lead',
    company: 'FinCore Systems',
    location: 'Singapore',
    salary: 'SGD 180k',
    type: 'On-site',
    visaSupport: false,
    matchScore: 72,
    timeline: '4 weeks',
    logo: 'https://picsum.photos/40/40?random=3',
    description: 'Automate high-frequency trading workflows.',
    requirements: ['FinTech', 'AutoGPT', 'Low-latency']
  },
  {
    id: '4',
    title: 'CV Engineer',
    company: 'Autonomous Mobility',
    location: 'Munich, Germany',
    salary: '€95k - €120k',
    type: 'On-site',
    visaSupport: true,
    matchScore: 65,
    timeline: '12 weeks',
    logo: 'https://picsum.photos/40/40?random=4',
    description: 'Computer vision for self-driving trucks.',
    requirements: ['C++', 'OpenCV', 'LiDAR']
  },
  {
    id: '5',
    title: 'LLM Engineer',
    company: 'AI SaaS Startup',
    location: 'Remote',
    salary: '$120k - $150k',
    type: 'Remote',
    visaSupport: false,
    matchScore: 81,
    timeline: '2 weeks',
    logo: 'https://picsum.photos/40/40?random=5',
    description: 'Fine-tuning open source models for enterprise clients.',
    requirements: ['HuggingFace', 'LoRA', 'AWS']
  }
];

export const ARJUN_PROFILE: Candidate = {
  id: 'c1',
  name: 'Arjun Mehta',
  role: 'LLM Engineer',
  secondaryRole: 'Healthcare AI',
  location: 'Berlin, Germany',
  targetLocation: 'Open to US',
  visaStatus: 'EU Blue Card',
  visaExpiry: '2028',
  experience: '6 Years',
  salary: '€115,000',
  skills: ['LLMs', 'RAG Systems', 'PyTorch', 'Kubernetes'],
  badges: ['Rare Talent', 'Healthcare AI'],
  matchScore: 92,
  starRating: 4,
  starLabel: 'LLM + Healthcare (rare)',
  hiringSpeed: 'Fast',
  hiringSpeedLabel: '< 30 days',
  costTier: '$$',
  costBreakdown: { salary: '$$', visa: '$', relocation: '$' },
  stability: 'Low Risk',
  stabilityReason: 'Stable tenure, long-term visa validity.',
  isRemoteReady: true,
  needsRelocation: true,
  needsVisa: true,
  highlights: ['Built clinical RAG assistant', '2 NLP conference papers', 'Experience with regulated AI'],
  avatar: 'https://picsum.photos/200/200?random=99'
};

export const SAMPLE_CANDIDATES: Candidate[] = [
  ARJUN_PROFILE,
  {
    id: 'c_mike',
    name: 'Mike X',
    role: 'Senior LLM Engineer',
    secondaryRole: 'FinTech',
    location: 'Brazil',
    targetLocation: 'Open to US',
    visaStatus: 'Needs H1B',
    visaExpiry: 'N/A',
    experience: '7 Years',
    salary: '$160,000',
    skills: ['Python', 'LangChain', 'AWS', 'Postgres'],
    badges: ['Visa Required', 'Relocation', 'Remote Ready'],
    matchScore: 88,
    starRating: 4,
    starLabel: 'Strong',
    hiringSpeed: 'Medium',
    hiringSpeedLabel: '1-3 months',
    costTier: '$$',
    costBreakdown: { salary: '$$', visa: '$$', relocation: '$' },
    stability: 'Low Risk',
    stabilityReason: 'History of long tenure at Fintech startups.',
    isRemoteReady: true,
    needsRelocation: true,
    needsVisa: true,
    highlights: ['Built LLM systems at fintech startup', 'Ex-Amazon', 'OPT → H1B eligible'],
    avatar: 'https://picsum.photos/200/200?random=55'
  },
  {
    id: 'c2',
    name: 'Sarah Chen',
    role: 'Computer Vision PhD',
    location: 'Toronto, Canada',
    visaStatus: 'Citizen',
    visaExpiry: 'N/A',
    experience: '4 Years',
    salary: '$140,000',
    skills: ['SLAM', '3D Reconstruction', 'C++'],
    badges: ['Top 1%'],
    matchScore: 95,
    starRating: 5,
    starLabel: 'Elite',
    hiringSpeed: 'Medium',
    hiringSpeedLabel: '1-2 months',
    costTier: '$$$',
    costBreakdown: { salary: '$$$', visa: 'None', relocation: '$' },
    stability: 'Low Risk',
    stabilityReason: 'Academic background, highly stable.',
    isRemoteReady: false,
    needsRelocation: true,
    needsVisa: false,
    highlights: ['Published in CVPR', 'SLAM specialist', 'Ex-Google Research Intern'],
    avatar: 'https://picsum.photos/200/200?random=88'
  },
  {
    id: 'c3',
    name: 'David Okafor',
    role: 'ML Ops Specialist',
    location: 'Lagos, Nigeria',
    visaStatus: 'None',
    visaExpiry: 'N/A',
    experience: '8 Years',
    salary: '$90,000',
    skills: ['AWS SageMaker', 'Docker', 'Terraform'],
    badges: ['Remote Expert'],
    matchScore: 78,
    starRating: 3,
    starLabel: 'Solid',
    hiringSpeed: 'Slow',
    hiringSpeedLabel: '3+ months',
    costTier: '$',
    costBreakdown: { salary: '$', visa: '$$', relocation: '$$' },
    stability: 'Medium Risk',
    stabilityReason: 'Visa complexity adds timeline risk.',
    isRemoteReady: true,
    needsRelocation: true,
    needsVisa: true,
    highlights: ['Remote-first veteran', 'Scale infrastructure expert', 'Cost-optimization focus'],
    avatar: 'https://picsum.photos/200/200?random=77'
  }
];