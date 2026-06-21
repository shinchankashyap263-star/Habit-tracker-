export type HabitFrequency = 'daily' | 'weekly' | 'monthly';

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  frequency: HabitFrequency;
  color: string;
  createdAt: string;
  reminderTime?: string;
  category?: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: number;
  type: 'streak' | 'total' | 'xp' | 'habits';
  unlockedAt?: string;
}

export interface UserStats {
  totalXP: number;
  level: number;
  longestStreak: number;
}

export type Page = 'home' | 'calendar' | 'stats' | 'badges' | 'settings';
