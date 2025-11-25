import React from 'react';
import { 
  Database, AppWindow, Bot, BarChart3, Building2, Layers3,
  ShieldCheck, CloudCog, DatabaseZap, Network, BrainCircuit, Fingerprint,
  Code, Database as SqlServerIcon, TestTube2, Search, DraftingCompass, Atom,
  Component, Container, GitMerge, Terminal, Leaf, SwatchBook, Type, Feather,
  HelpCircle, FolderSync, Share2, Users, KanbanSquare, Repeat, Mail, Sparkles,
  Send, Coffee, Linkedin, Github, Instagram
} from 'lucide-react';

interface Props extends React.SVGProps<SVGSVGElement> {
  name: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  // Power Platform
  'dynamics-365': Atom,
  'power-apps': AppWindow,
  'power-automate': Bot,
  'power-bi': BarChart3,
  'fno': Building2,
  'dataverse': Layers3,
  // Azure
  'entra': ShieldCheck,
  'compute': CloudCog,
  'analytics': DatabaseZap,
  'networking': Network,
  'cognitive': BrainCircuit,
  'security': Fingerprint,
  // Backend
  'dotnet': Code,
  'sqlserver': SqlServerIcon,
  'test': TestTube2,
  'search': Search,
  'architecture': DraftingCompass,
  // Microsoft 365
  'onedrive': FolderSync,
  'sharepoint': Share2,
  'teams': Users,
  'project': KanbanSquare,
  'loop': Repeat,
  'outlook': Mail,
  'graph-api': GitMerge,
  'copilot': Sparkles,
  // Additional
  'rest': Component,
  'graphql': GitMerge, 
  'docker': Container,
  'git': GitMerge,
  'mikrotik': HelpCircle, // Placeholder
  'powershell': Terminal,
  'flutter': Leaf,
  'typescript': Type,
  'frameworks': Layers3,
  'photoshop': SwatchBook,
  'illustrator': Feather,
  'financial': HelpCircle, // Placeholder
  // Contact & Social
  'telegram': Send,
  'coffee': Coffee,
  'linkedin': Linkedin,
  'github': Github,
  'instagram': Instagram,
  default: HelpCircle,
};

export const DynamicIcon: React.FC<Props> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || iconMap.default;
  return <IconComponent {...props} />;
};