import type { Habit, Badge } from '../types';

export const HABIT_COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e',
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6', '#2563eb', '#7c3aed', '#d946ef',
];

export const EMOJI_OPTIONS = [
  '💧', '💪', '📚', '🧘', '😴', '🗣️', '🏃', '🍎', '✍️', '🎵',
  '🧹', '💰', '🌿', '🎯', '⏰', '🧠', '💊', '🚶', '🎨', '📝',
  '🥗', '🏋️', '🚴', '🧑‍💻', '🤝', '🙏', '🌞', '🌙', '💤', '🎮',
];

export const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', name: 'Drink Water', emoji: '💧', frequency: 'daily', color: '#06b6d4', createdAt: new Date().toISOString(), category: 'Health' },
  { id: 'h2', name: 'Exercise', emoji: '💪', frequency: 'daily', color: '#ef4444', createdAt: new Date().toISOString(), category: 'Fitness' },
  { id: 'h3', name: 'Read', emoji: '📚', frequency: 'daily', color: '#8b5cf6', createdAt: new Date().toISOString(), category: 'Learning' },
  { id: 'h4', name: 'Meditation', emoji: '🧘', frequency: 'daily', color: '#22c55e', createdAt: new Date().toISOString(), category: 'Wellness' },
  { id: 'h5', name: 'Sleep 8 Hours', emoji: '😴', frequency: 'daily', color: '#3b82f6', createdAt: new Date().toISOString(), category: 'Health' },
  { id: 'h6', name: 'Learn English', emoji: '🗣️', frequency: 'daily', color: '#f97316', createdAt: new Date().toISOString(), category: 'Learning' },
];

export const ALL_BADGES: Badge[] = [
  { id: 'b1', name: 'First Step', emoji: '🌱', description: 'Complete your first habit', requirement: 1, type: 'total' },
  { id: 'b2', name: 'Getting Started', emoji: '🔥', description: '3-day streak', requirement: 3, type: 'streak' },
  { id: 'b3', name: 'One Week Strong', emoji: '⭐', description: '7-day streak', requirement: 7, type: 'streak' },
  { id: 'b4', name: 'Two Weeks!', emoji: '🏆', description: '14-day streak', requirement: 14, type: 'streak' },
  { id: 'b5', name: 'Monthly Master', emoji: '👑', description: '30-day streak', requirement: 30, type: 'streak' },
  { id: 'b6', name: 'Unstoppable', emoji: '💎', description: '60-day streak', requirement: 60, type: 'streak' },
  { id: 'b7', name: 'Legend', emoji: '🦄', description: '100-day streak', requirement: 100, type: 'streak' },
  { id: 'b8', name: 'Habit Builder', emoji: '🧱', description: 'Complete 10 habits total', requirement: 10, type: 'total' },
  { id: 'b9', name: 'Dedicated', emoji: '💪', description: 'Complete 50 habits total', requirement: 50, type: 'total' },
  { id: 'b10', name: 'Centurion', emoji: '💯', description: 'Complete 100 habits total', requirement: 100, type: 'total' },
  { id: 'b11', name: 'XP Collector', emoji: '✨', description: 'Earn 500 XP', requirement: 500, type: 'xp' },
  { id: 'b12', name: 'XP Master', emoji: '🌟', description: 'Earn 2000 XP', requirement: 2000, type: 'xp' },
  { id: 'b13', name: 'Habit Collector', emoji: '📋', description: 'Create 5 habits', requirement: 5, type: 'habits' },
  { id: 'b14', name: 'Habit Enthusiast', emoji: '🎯', description: 'Create 10 habits', requirement: 10, type: 'habits' },
];

export const XP_PER_COMPLETION = 10;
export const XP_STREAK_BONUS = 5;
export const XP_PER_LEVEL = 100;

export const CATEGORIES = ['Health', 'Fitness', 'Learning', 'Wellness', 'Productivity', 'Social', 'Other'];
