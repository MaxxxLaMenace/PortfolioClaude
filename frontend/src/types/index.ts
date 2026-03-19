export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  images: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'language' | 'other';
  level: number;
  icon: string;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

export type ProjectFormData = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>;
export type SkillFormData = Omit<Skill, '_id'>;
