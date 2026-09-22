import { PortfolioContent } from './types';
import {
  amirPortraitBase64,
  amirPortraithoverBase64
} from '../../assets/images/AmirPortrait';

export const content: PortfolioContent = {
  intro: {
    question: "Are you looking for Amir?",
    action: "Explore"
  },

  identity: {
    greeting: "I'm Amir Qaribi.",
    role: "Enterprise Software Engineer",
    role2: "Business Systems & Backend",
    role3: "Data & Integration",
    description:
      "I build and extend enterprise software with a focus on business systems, backend architecture, data, and system integration. My experience spans designing software from the ground up, working with established enterprise platforms, and turning complex organizational processes into reliable technical systems.",
    stats: [
      { label: "Years Exp.", value: "8+" },
      { label: "Focus", value: "Ent." },
      { label: "Clients", value: "Global" }
    ],
    personalSkills: [
      "Problem Solving",
      "Systems Thinking",
      "Business Understanding",
      "Technical Communication",
      "Solution Design"
    ],
    location: "Tehran, Iran",
    email: "AmirQaribi@outlook.com",
    imageUrl: amirPortraitBase64,
    imageHoverUrl: amirPortraithoverBase64,
  },

  skills: {
    title: "Core Expertise",
    description:
      "Technologies and engineering disciplines I use to design, build, integrate, and maintain enterprise software systems.",
    categories: [
      {
        name: "Enterprise Software",
        skills: [
          {
            name: ".NET & C#",
            description: "Enterprise Application Development",
            icon: "dotnet"
          },
          {
            name: "Clean Architecture",
            description: "Maintainable System Design",
            icon: "architecture"
          },
          {
            name: "Business Systems",
            description: "Enterprise Process & Domain Modeling",
            icon: "dynamics-365"
          },
          {
            name: "APIs & Services",
            description: "Backend & Service Architecture",
            icon: "compute"
          },
          {
            name: "Authentication",
            description: "JWT, Sessions & Access Control",
            icon: "security"
          },
          {
            name: "Testing",
            description: "Unit & Integration Testing",
            icon: "test"
          }
        ]
      },

      {
        name: "Data & SQL",
        skills: [
          {
            name: "SQL Server",
            description: "Relational Data & Query Design",
            icon: "sqlserver"
          },
          {
            name: "Entity Framework Core",
            description: "Data Access & ORM",
            icon: "sqlserver"
          },
          {
            name: "Data Modeling",
            description: "Relationships, Constraints & Integrity",
            icon: "dataverse"
          },
          {
            name: "Elasticsearch",
            description: "Full-Text Search & Indexing",
            icon: "search"
          },
          {
            name: "Data Integration",
            description: "Enterprise Data Flows",
            icon: "analytics"
          },
          {
            name: "File & Document Data",
            description: "Storage, Metadata & Content",
            icon: "onedrive"
          }
        ]
      },

      {
        name: "Systems Integration",
        skills: [
          {
            name: "REST APIs",
            description: "System-to-System Integration",
            icon: "graph-api"
          },
          {
            name: "Microsoft Graph",
            description: "Microsoft 365 Integration",
            icon: "graph-api"
          },
          {
            name: "Power Automate",
            description: "Business Process Automation",
            icon: "power-automate"
          },
          {
            name: "Dynamics 365",
            description: "Enterprise CRM & Business Systems",
            icon: "dynamics-365"
          },
          {
            name: "Microsoft 365",
            description: "Enterprise Platform Integration",
            icon: "teams"
          },
          {
            name: "Azure",
            description: "Cloud Services & Infrastructure",
            icon: "compute"
          }
        ]
      },

      {
        name: "Microsoft Platforms",
        skills: [
          {
            name: "Dynamics 365 CE",
            description: "CRM Customization & Development",
            icon: "dynamics-365"
          },
          {
            name: "Dataverse",
            description: "Business Data Platform",
            icon: "dataverse"
          },
          {
            name: "SharePoint",
            description: "Content & Collaboration",
            icon: "sharepoint"
          },
          {
            name: "Microsoft Teams",
            description: "Collaboration & Integration",
            icon: "teams"
          },
          {
            name: "Microsoft 365",
            description: "Enterprise Productivity Platform",
            icon: "outlook"
          },
          {
            name: "Azure & Entra",
            description: "Cloud & Identity Services",
            icon: "entra"
          }
        ]
      }
    ]
  },

  contact: {
    title: "Let's Work Together",
    description:
      "Have an enterprise software project, integration challenge, or technical problem to discuss? Feel free to reach out.",

    links: [
      {
        type: 'email',
        label: 'Email',
        value: 'AmirQaribi@outlook.com',
        link: 'mailto:AmirQaribi@outlook.com',
        icon: 'outlook'
      },
      {
        type: 'telegram',
        label: 'Telegram',
        value: '@AmirQaribi',
        link: 'https://t.me/AmirQaribi',
        icon: 'telegram'
      },
      {
        type: 'ton',
        label: 'Buy me a coffee',
        value: 'AmirQaribi.Ton',
        link: 'https://ton.app/pBKo',
        icon: 'coffee'
      }
    ],

    socials: [
      {
        type: 'linkedin',
        link: 'https://linkedin.com/in/amirqaribi',
        icon: 'linkedin'
      },
      {
        type: 'github',
        link: 'https://github.com/amirqaribi',
        icon: 'github'
      },
      {
        type: 'instagram',
        link: 'https://instagram.com/_amirqaribi/',
        icon: 'instagram'
      }
    ]
  }
};