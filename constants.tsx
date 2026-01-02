
import React from 'react';
import { Testimonial, Amenity, PricingPlan } from './types';

export const COLORS = {
  navy: '#0A192F',
  gold: '#D4AF37',
  goldDark: '#B8962E',
  slate: '#64748B'
};

export interface Scenario {
  id: string;
  title: string;
  icon: string;
  prompt: string;
  description: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'free-flow',
    title: 'Free Flow Chat',
    icon: '💬',
    prompt: 'You are having a casual, friendly conversation about their day, hobbies, or interests.',
    description: 'A relaxed chat to build general conversational comfort.'
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    icon: '💼',
    prompt: 'You are a hiring manager at a global tech company. Conduct a professional but encouraging interview.',
    description: 'Practice answering common professional questions with confidence.'
  },
  {
    id: 'cafe',
    title: 'Ordering at a Cafe',
    icon: '☕',
    prompt: 'You are a barista at a busy London cafe. Help the user order their drink and snack.',
    description: 'Master everyday transactional English in public spaces.'
  },
  {
    id: 'unmute-challenge',
    title: 'Unmute Challenge',
    icon: '🚀',
    prompt: 'Give the user a simple topic (e.g., "Tell me about your favorite festival in Tamil Nadu") and encourage them to speak for 60 seconds without stopping. Provide high encouragement.',
    description: 'A 60-second non-stop speaking exercise to kill hesitation.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Karthik Raja",
    role: "Senior Software Engineer",
    content: "I always struggled with the 'L' and 'R' sounds in meetings. Shashtika's coaching transformed my confidence. I now lead global standups without hesitation.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Priya Sundar",
    role: "Marketing Manager",
    content: "The 1-on-1 sessions are a game-changer. Learning natural idioms and rhythm helped me sound more native and less robotic.",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Senthil Kumar",
    role: "Graduate Student",
    content: "Passing my IELTS was my goal, but speaking confidently was the real prize. The Native accent reduction workshop is incredible.",
    image: "https://picsum.photos/100/100?random=3"
  }
];

export const AMENITIES: Amenity[] = [
  {
    title: "Live 1-on-1 Sessions",
    description: "Personalized coaching tailored to your specific career needs and vocabulary requirements.",
    icon: "microphone"
  },
  {
    title: "Grammar Workshops",
    description: "Break free from Tamil-to-English literal translations. Learn to think and speak in English directly.",
    icon: "book"
  },
  {
    title: "Accent Reduction",
    description: "Master the tricky pronunciations that usually give away non-native speakers. Focus on clarity and flow.",
    icon: "wave"
  }
];

export const PRICING: PricingPlan[] = [
  {
    name: "Standard Month",
    price: "₹4,999",
    description: "Regular monthly subscription",
    features: ["4 Live Sessions", "Daily Practice Tasks", "Grammar Support", "Community Access"],
    isFeatured: false
  },
  {
    name: "7-Day Trial Offer",
    price: "₹999",
    description: "Special first-week access",
    features: ["2 Live Sessions", "Personalized Assessment", "Full Resource Library", "Instant Voice Coach Access"],
    isFeatured: true
  },
  {
    name: "VIP Confidence",
    price: "₹12,999",
    description: "For fast-track professionals",
    features: ["Unlimited Live Sessions", "Daily 1-on-1 Feedback", "Executive Coaching", "Native Slang Masterclass"],
    isFeatured: false
  }
];

export const SYSTEM_INSTRUCTION = `
You are the Unmute Lead Coach, a warm, encouraging Native English Coach. 
Your mission is to help Tamil speakers lose their hesitation and speak English like a native.

Tone: Warm, encouraging, and highly patient. Never judgmental.
Speech Style: Use clear, standard English. Speak at a slightly measured pace (not too fast).
Cultural Awareness: You understand that the user might translate from Tamil in their head. If they struggle with a word, offer a gentle suggestion.

Correction Strategy: 
1. Do not correct every single mistake immediately. 
2. Let them finish their thought.
3. Provide positive reinforcement first (e.g., "Great job! That was very clear.").
4. Offer ONE small tip (e.g., "Just one small tip: for the word 'Development', try to emphasize the second syllable. Want to try that again?").

Greeting: "Welcome to the Unmute Studio, [User Name]. I’m your coach. There are no mistakes here, only progress. What would you like to practice today?"
Closing: "You did a great job today. Your fluency is improving! I've saved your progress. See you for your next session."
Trial Conversion (occasional): "You're doing so well! Imagine how much faster you'd grow with our Premium Native One-on-One sessions. You can unlock full access in your dashboard."

Context: The user is in a private "Safe Space" studio.
`;
