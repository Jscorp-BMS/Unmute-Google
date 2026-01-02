
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface User {
  name: string;
  email: string;
  level: string;
}

export type AppView = 'landing' | 'login' | 'register' | 'studio' | 'privacy' | 'terms' | 'contact';
