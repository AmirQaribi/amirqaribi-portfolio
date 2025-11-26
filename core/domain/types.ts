export interface Skill {
  name: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
}

export interface IdentityContent {
  greeting: string;
  role: string;
  role2: string;
  role3: string;
  description: string;
  stats: { label: string; value: string }[];
  personalSkills: string[];
  location: string;
  email: string;
  imageUrl: string;
  imageHoverUrl: string;
}

export interface ContactLink {
  type: 'email' | 'telegram' | 'ton';
  label: string;
  value: string;
  link: string;
  icon: string;
}

export interface SocialLink {
  type: 'linkedin' | 'github' | 'instagram';
  link: string;
  icon: string;
}

export interface ContactContent {
  title: string;
  description: string;
  links: ContactLink[];
  socials: SocialLink[];
}

export interface PortfolioContent {
  intro: {
    question: string;
    action: string;
  };
  identity: IdentityContent;
  skills: {
    title: string;
    description: string;
    categories: SkillCategory[];
  };
  contact: ContactContent;
}