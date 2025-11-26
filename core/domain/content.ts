import { PortfolioContent } from './types';
import { amirPortraitBase64,amirPortraithoverBase64 } from '../../assets/images/AmirPortrait';

export const content: PortfolioContent = {
  intro: {
    question: "Are you looking for Amir?",
    action: "Discover"
  },
  identity: {
    greeting: "I'm Amir Qaribi.",
    role: "Senior Software Engineer",
    role2: "Dynamics 365 CE Expert",
    role3: "Backend Engineer",
    description: "Passionate about creating innovative solutions that bridge technology and business needs. I specialize in building scalable web applications and AI-powered systems. With over four years of experience in Microsoft's CRM ecosystem, I'm an active developer and consultant for Dynamics 365, dedicated to enhancing business efficiency with top-notch technology.",
    stats: [
      { label: "Years Exp.", value: "8+" },
      { label: "Solutions", value: "50+" },
      { label: "Clients", value: "Global" }
    ],
    personalSkills: [
      "Problem Solving",
      "Team Leadership",
      "Project Management",
      "Client Communication",
      "Agile Methodologies"
    ],
    location: "Tehran, Iran",
    email: "AmirQaribi@outlook.com",
    imageUrl: amirPortraitBase64,
    imageHoverUrl: amirPortraithoverBase64,
  },
  skills: {
    title: "Technical Arsenal",
    description: "A curated list of technologies and tools I wield to build modern, scalable, and impactful solutions.",
    categories: [
      {
        name: "Power Platform",
        skills: [
          { name: "Dynamics 365 CE", description: "Customization & Consulting", icon: "dynamics-365" },
          { name: "Power Apps", description: "Custom Business Apps", icon: "power-apps" },
          { name: "Power Automate", description: "Workflow Automation", icon: "power-automate" },
          { name: "Power BI", description: "Data Visualization", icon: "power-bi" },
          { name: "F&O", description: "Finance & Operations", icon: "fno" },
          { name: "Dataverse", description: "Scalable Data Platform", icon: "dataverse" },
        ]
      },
      {
        name: "Azure Services",
        skills: [
          { name: "Entra & Azure AD", description: "Identity Management", icon: "entra" },
          { name: "Compute & DevOps", description: "CI/CD & App Services", icon: "compute" },
          { name: "Analytics & Databases", description: "Data Solutions", icon: "analytics" },
          { name: "Networking", description: "Secure Connections", icon: "networking" },
          { name: "Cognitive & ML", description: "AI-Powered Services", icon: "cognitive" },
          { name: "Security & Identity", description: "Protection & Governance", icon: "security" },
        ]
      },
      {
        name: "Backend Development",
        skills: [
          { name: ".NET Ecosystem & C#", description: "Robust Backend Logic", icon: "dotnet" },
          { name: "SQL Server & EF Core", description: "Database Management", icon: "sqlserver" },
          { name: "Testing", description: "Unit & Integration Tests", icon: "test" },
          { name: "Search Engines", description: "Elasticsearch, Analytics", icon: "search" },
          { name: "Design Patterns", description: "Architecture & Best Practices", icon: "architecture" },
          { name: "Graph API", description: "Microsoft 365 Integration", icon: "graph-api" },
        ]
      },
      {
        name: "Microsoft 365",
        skills: [
          { name: "OneDrive", description: "Cloud Storage & Sync", icon: "onedrive" },
          { name: "SharePoint", description: "Admin & Collaboration", icon: "sharepoint" },
          { name: "MS Teams", description: "Development & Comms", icon: "teams" },
          { name: "MS Project", description: "Project Management", icon: "project" },
          { name: "MS Loop & Lists", description: "Fluid Collaboration", icon: "loop" },
          { name: "Outlook & Exchange", description: "Email & Calendaring", icon: "outlook" },
        ]
      }
    ]
  },
  contact: {
    title: "Let's Work Together",
    description: "Have a project in mind or just want to connect? Feel free to reach out.",
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
  },
};