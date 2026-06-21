import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO, differenceInDays } from 'date-fns';
import type { Habit, HabitCompletion, HabitFrequency } from '../types';
import { XP_PER_COMPLETION, XP_STREAK_BONUS } from './constants';

export function getDateKey(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}

export function isHabitDueToday(habit: Habit, date: Date = new Date()): boolean {
  if (habit.frequency === 'daily') return true;
  if (habit.frequency === 'weekly') {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
    return isWithinInterval(date, { start: weekStart, end: weekEnd });
  }
  if (habit.frequency === 'monthly') {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    return isWithinInterval(date, { start: monthStart, end: monthEnd });
  }
  return true;
}

export function isHabitCompletedOnDate(
  habitId: string,
  date: string,
  completions: HabitCompletion[]
): boolean {
  return completions.some(c => c.habitId === habitId && c.date === date);
}

export function getCompletionsForDate(
  date: string,
  completions: HabitCompletion[]
): HabitCompletion[] {
  return completions.filter(c => c.date === date);
}

export function getTodayProgress(
  habits: Habit[],
  completions: HabitCompletion[],
  date: Date = new Date()
): number {
  const dateKey = getDateKey(date);
  const dueHabits = habits.filter(h => isHabitDueToday(h, date));
  if (dueHabits.length === 0) return 0;
  const completed = dueHabits.filter(h =>
    isHabitCompletedOnDate(h.id, dateKey, completions)
  );
  return Math.round((completed.length / dueHabits.length) * 100);
}

export function getCurrentStreak(
  habitId: string,
  completions: HabitCompletion[],
  frequency: HabitFrequency
): number {
  if (frequency !== 'daily') {
    // For weekly/monthly, just count completed periods
    const habitCompletions = completions.filter(c => c.habitId === habitId);
    return habitCompletions.length;
  }

  let streak = 0;
  const today = new Date();
  const todayKey = getDateKey(today);

  // Check if completed today
  const completedToday = isHabitCompletedOnDate(habitId, todayKey, completions);

  // Start from today or yesterday
  let checkDate = completedToday ? today : subDays(today, 1);

  for (let i = 0; i < 365; i++) {
    const dateKey = getDateKey(checkDate);
    if (isHabitCompletedOnDate(habitId, dateKey, completions)) {
      streak++;
      checkDate = subDays(checkDate, 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getLongestStreak(
  habitId: string,
  completions: HabitCompletion[]
): number {
  const habitCompletions = completions
    .filter(c => c.habitId === habitId)
    .map(c => c.date)
    .sort();

  if (habitCompletions.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < habitCompletions.length; i++) {
    const prevDate = parseISO(habitCompletions[i - 1]);
    const currDate = parseISO(habitCompletions[i]);
    const diff = differenceInDays(currDate, prevDate);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }

  return longest;
}

export function getOverallCurrentStreak(
  habits: Habit[],
  completions: HabitCompletion[]
): number {
  const dailyHabits = habits.filter(h => h.frequency === 'daily');
  if (dailyHabits.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  const todayKey = getDateKey(today);

  // Check if all daily habits completed today
  const allCompletedToday = dailyHabits.every(h =>
    isHabitCompletedOnDate(h.id, todayKey, completions)
  );

  let checkDate = allCompletedToday ? today : subDays(today, 1);

  for (let i = 0; i < 365; i++) {
    const dateKey = getDateKey(checkDate);
    const allCompleted = dailyHabits.every(h =>
      isHabitCompletedOnDate(h.id, dateKey, completions)
    );

    if (allCompleted) {
      streak++;
      checkDate = subDays(checkDate, 1);
    } else {
      break;
    }
  }

  return streak;
}

export function calculateTotalXP(completions: HabitCompletion[], habits: Habit[]): number {
  let xp = completions.length * XP_PER_COMPLETION;

  // Add streak bonuses
  habits.forEach(h => {
    const streak = getCurrentStreak(h.id, completions, h.frequency);
    if (streak >= 3) xp += Math.floor(streak / 3) * XP_STREAK_BONUS;
  });

  return xp;
}

export function getLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXPForNextLevel(xp: number): { current: number; needed: number } {
  const currentLevelXP = xp % 100;
  return { current: currentLevelXP, needed: 100 };
}

export function generateId(): string {
  return 'h' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

export function getCompletionsForMonth(
  year: number,
  month: number,
  completions: HabitCompletion[]
): Map<string, number> {
  const map = new Map<string, number>();
  completions.forEach(c => {
    const date = parseISO(c.date);
    if (date.getFullYear() === year && date.getMonth() === month) {
      const count = map.get(c.date) || 0;
      map.set(c.date, count + 1);
    }
  });
  return map;
}
