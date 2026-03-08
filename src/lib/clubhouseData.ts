/**
 * clubhouseData — data helpers that back every UI screen.
 *
 * When NEXT_PUBLIC_DB_ENABLED !== "true" every function returns deterministic
 * mock data so the app works without a database.  When the flag is "true" the
 * helpers use Prisma instead.
 */

import { prisma, DB_ENABLED } from 'lib/dbClient';

// ────────────────────────────────────────────
// Shared types (mirrors Prisma model shapes)
// ────────────────────────────────────────────

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string;
  profile: {
    clubhouseName: string;
    avatarUrl: string | null;
    petType: string;
    petName: string;
    petPersonality: string;
  };
  userStats: {
    totalXp: number;
    currentRank: string;
    gamesPlayed: number;
  };
}

export interface GameSessionInput {
  userId: string;
  gameType: string;
  score: number;
  durationSec: number;
}

export interface GameSessionResult {
  id: string;
  userId: string;
  gameType: string;
  score: number;
  durationSec: number;
  xpEarned: number;
  startedAt: Date;
}

export interface PlaygroundStatus {
  xp: number;
  rank: string;
  nextAvailableGameAt: Date | null;
}

export interface LeaderboardEntry {
  name: string;
  [key: string]: string | number;
}

export interface HallOfFameData {
  topXp: LeaderboardEntry[];
  lunchLegends: LeaderboardEntry[];
  breakChampions: LeaderboardEntry[];
  questHeroes: LeaderboardEntry[];
}

export interface HomePageData {
  welcome: string;
  petStatus: { name: string; type: string; mood: string };
  missedTasks: string[];
  todayPriorities: { text: string; done: boolean }[];
  streak: { type: string; current: number; best: number };
  todayChallenge: string;
  lunchSummary: { available: boolean; matchedWith: string | null };
  songOfTheDay: { title: string; artist: string };
  workspaceTools: { label: string; url: string; icon: string | null }[];
}

// ────────────────────────────────────────────
// XP → Rank helper (reusable)
// ────────────────────────────────────────────

export function getRankTitle(xp: number): string {
  if (xp >= 2000) return 'General';
  if (xp >= 1000) return 'Captain';
  if (xp >= 500) return 'Sergeant';
  return 'Cadet';
}

// XP earned per game type
const XP_MAP: Record<string, number> = {
  BREATHING_BUDDY: 10,
  FOCUS_TAP: 15,
  MEMORY_MATCH: 20,
  WORD_SCRAMBLE: 10,
};

// Game‑type → session counter field name
const GAME_COUNTER_FIELD: Record<string, string> = {
  BREATHING_BUDDY: 'breathingSessions',
  FOCUS_TAP: 'focusTapSessions',
  MEMORY_MATCH: 'memoryMatchSessions',
  WORD_SCRAMBLE: 'wordScrambleSessions',
};

// ────────────────────────────────────────────
// 1.  getOrCreateDemoUser
// ────────────────────────────────────────────

const MOCK_DEMO_USER: DemoUser = {
  id: 'demo-user-001',
  email: 'demo@clubhouse.app',
  name: 'NovaFox',
  role: 'MEMBER',
  companyId: 'demo-company-001',
  profile: {
    clubhouseName: 'NovaFox',
    avatarUrl: null,
    petType: 'FOX',
    petName: 'Ember',
    petPersonality: 'ENERGETIC',
  },
  userStats: {
    totalXp: 1250,
    currentRank: 'Captain',
    gamesPlayed: 42,
  },
};

export async function getOrCreateDemoUser(): Promise<DemoUser> {
  if (!DB_ENABLED) {
    console.log('[clubhouseData] getOrCreateDemoUser → returning mock');
    return MOCK_DEMO_USER;
  }

  // --- Real DB path ---
  const email = 'demo@clubhouse.app';

  let user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true, userStats: true },
  });

  if (!user) {
    // Ensure a demo company exists
    let company = await prisma.company.findFirst({
      where: { domain: 'clubhouse.app' },
    });
    if (!company) {
      company = await prisma.company.create({
        data: { name: 'Demo Corp', domain: 'clubhouse.app' },
      });
    }

    user = await prisma.user.create({
      data: {
        email,
        name: 'NovaFox',
        role: 'MEMBER',
        companyId: company.id,
        profile: {
          create: {
            clubhouseName: 'NovaFox',
            petType: 'FOX',
            petName: 'Ember',
            petPersonality: 'ENERGETIC',
          },
        },
        userStats: { create: {} },
      },
      include: { profile: true, userStats: true },
    });
  }

  const profile = user.profile!;
  const stats = user.userStats!;

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? 'NovaFox',
    role: user.role,
    companyId: user.companyId,
    profile: {
      clubhouseName: profile.clubhouseName ?? 'NovaFox',
      avatarUrl: profile.avatarUrl,
      petType: profile.petType ?? 'FOX',
      petName: profile.petName ?? 'Ember',
      petPersonality: profile.petPersonality ?? 'ENERGETIC',
    },
    userStats: {
      totalXp: stats.totalXp,
      currentRank: getRankTitle(stats.totalXp),
      gamesPlayed: stats.gamesPlayed,
    },
  };
}

// ────────────────────────────────────────────
// 2.  recordGameSession
// ────────────────────────────────────────────

export async function recordGameSession(
  input: GameSessionInput,
): Promise<GameSessionResult> {
  if (!DB_ENABLED) {
    console.log('[clubhouseData] recordGameSession (mock)', input);
    return {
      id: `mock-session-${Date.now()}`,
      userId: input.userId,
      gameType: input.gameType,
      score: input.score,
      durationSec: input.durationSec,
      xpEarned: XP_MAP[input.gameType] ?? 0,
      startedAt: new Date(),
    };
  }

  // --- Real DB path ---
  const xpEarned = XP_MAP[input.gameType] ?? 0;

  const session = await prisma.gameSession.create({
    data: {
      userId: input.userId,
      gameType: input.gameType,
      durationSec: input.durationSec,
      score: input.score,
      xpEarned,
      xpCounted: true,
    },
  });

  // Update UserStats
  const counterField = GAME_COUNTER_FIELD[input.gameType];
  const incrementData: Record<string, number> = {
    totalXp: xpEarned,
    gamesPlayed: 1,
  };
  if (counterField) incrementData[counterField] = 1;

  // Build the increment update for UserStats
  const updateIncrements: Record<string, { increment: number }> = {
    totalXp: { increment: xpEarned },
    gamesPlayed: { increment: 1 },
  };
  if (counterField) {
    updateIncrements[counterField] = { increment: 1 };
  }

  await prisma.userStats.upsert({
    where: { userId: input.userId },
    create: {
      userId: input.userId,
      ...incrementData,
    },
    update: updateIncrements,
  });

  return {
    id: session.id,
    userId: session.userId,
    gameType: session.gameType,
    score: session.score ?? 0,
    durationSec: session.durationSec ?? input.durationSec,
    xpEarned: session.xpEarned,
    startedAt: session.startedAt,
  };
}

// ────────────────────────────────────────────
// 3.  getPlaygroundStatus
// ────────────────────────────────────────────

export async function getPlaygroundStatus(
  userId: string,
): Promise<PlaygroundStatus> {
  if (!DB_ENABLED) {
    console.log('[clubhouseData] getPlaygroundStatus (mock) userId=', userId);
    return {
      xp: 1250,
      rank: 'Captain',
      nextAvailableGameAt: null, // ready to play
    };
  }

  // --- Real DB path ---
  const stats = await prisma.userStats.findUnique({ where: { userId } });
  const lastSession = await prisma.gameSession.findFirst({
    where: { userId, xpCounted: true },
    orderBy: { startedAt: 'desc' },
  });

  const xp = stats?.totalXp ?? 0;
  const COOLDOWN_MS = 60 * 60 * 1000;
  let nextAvailableGameAt: Date | null = null;
  if (lastSession) {
    const cooldownEnd = new Date(
      lastSession.startedAt.getTime() + COOLDOWN_MS,
    );
    if (cooldownEnd.getTime() > Date.now()) {
      nextAvailableGameAt = cooldownEnd;
    }
  }

  return { xp, rank: getRankTitle(xp), nextAvailableGameAt };
}

// ────────────────────────────────────────────
// 4.  getHallOfFameLeaderboards
// ────────────────────────────────────────────

// Always mock for now — real queries will be wired later.
export async function getHallOfFameLeaderboards(
  _companyId: string,
): Promise<HallOfFameData> {
  console.log(
    '[clubhouseData] getHallOfFameLeaderboards → returning mock data',
  );

  return {
    topXp: [
      { name: 'BlazeStar', xp: 2450 },
      { name: 'IronPulse', xp: 2100 },
      { name: 'PixelWolf', xp: 1800 },
      { name: 'NovaFox', xp: 1250 },
      { name: 'EchoVibe', xp: 1100 },
      { name: 'AquaDash', xp: 980 },
      { name: 'NeonGlyph', xp: 750 },
      { name: 'ZenithAce', xp: 620 },
      { name: 'CosmicRay', xp: 410 },
      { name: 'LunarByte', xp: 200 },
    ],
    lunchLegends: [
      { name: 'PixelWolf', lunches: 14, lastWith: 'BlazeStar' },
      { name: 'AquaDash', lunches: 12, lastWith: 'NeonGlyph' },
      { name: 'NovaFox', lunches: 11, lastWith: 'EchoVibe' },
      { name: 'IronPulse', lunches: 9, lastWith: 'CosmicRay' },
      { name: 'BlazeStar', lunches: 8, lastWith: 'PixelWolf' },
      { name: 'EchoVibe', lunches: 7, lastWith: 'NovaFox' },
      { name: 'ZenithAce', lunches: 5, lastWith: 'LunarByte' },
      { name: 'NeonGlyph', lunches: 4, lastWith: 'AquaDash' },
    ],
    breakChampions: [
      { name: 'EchoVibe', breaks: 12, avgSession: 45 },
      { name: 'BlazeStar', breaks: 10, avgSession: 50 },
      { name: 'AquaDash', breaks: 9, avgSession: 55 },
      { name: 'NeonGlyph', breaks: 8, avgSession: 48 },
      { name: 'PixelWolf', breaks: 8, avgSession: 52 },
      { name: 'IronPulse', breaks: 7, avgSession: 60 },
      { name: 'NovaFox', breaks: 6, avgSession: 42 },
      { name: 'ZenithAce', breaks: 5, avgSession: 65 },
      { name: 'CosmicRay', breaks: 4, avgSession: 38 },
      { name: 'LunarByte', breaks: 3, avgSession: 70 },
    ],
    questHeroes: [
      { name: 'BlazeStar', quests: 9, signature: '10-min walk' },
      { name: 'NovaFox', quests: 7, signature: 'Lunch with someone new' },
      { name: 'IronPulse', quests: 6, signature: 'Stretch break' },
      { name: 'PixelWolf', quests: 6, signature: 'Desk cleanup' },
      { name: 'EchoVibe', quests: 5, signature: 'Hydration check' },
      { name: 'AquaDash', quests: 5, signature: '10-min walk' },
      { name: 'NeonGlyph', quests: 4, signature: 'Gratitude note' },
      { name: 'ZenithAce', quests: 3, signature: 'Mindful minute' },
    ],
  };
}

// ────────────────────────────────────────────
// 5.  getHomePageData
// ────────────────────────────────────────────

export async function getHomePageData(
  _userId: string,
): Promise<HomePageData> {
  if (!DB_ENABLED) {
    console.log('[clubhouseData] getHomePageData → returning mock data');
  }

  // For now always return mock data — will wire Prisma queries later.
  return {
    welcome: 'Welcome back, NovaFox! 🎉',
    petStatus: { name: 'Ember', type: 'FOX', mood: 'happy' },
    missedTasks: ['Review Q2 roadmap'],
    todayPriorities: [
      { text: 'Ship onboarding flow', done: false },
      { text: 'Code review for Alex', done: false },
      { text: 'Update design tokens', done: true },
    ],
    streak: { type: 'DAILY_PRIORITIES', current: 5, best: 12 },
    todayChallenge: 'Take a 10-minute walk and notice 3 things you appreciate.',
    lunchSummary: { available: true, matchedWith: 'Alex' },
    songOfTheDay: { title: 'Here Comes the Sun', artist: 'The Beatles' },
    workspaceTools: [
      { label: 'Figma', url: 'https://figma.com', icon: null },
      { label: 'Notion', url: 'https://notion.so', icon: null },
      { label: 'Slack', url: 'https://slack.com', icon: null },
    ],
  };
}
