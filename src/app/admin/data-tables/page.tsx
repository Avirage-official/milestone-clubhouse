'use client';
/*!
=========================================================
* Milestone - v1.1.0
=========================================================
* Hall of Fame Page – Leaderboards and personal standing
=========================================================
*/

import React from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';

// --- Rank mapping (same as Playground) ---
function getRankTitle(xp: number): string {
  if (xp >= 2000) return 'General';
  if (xp >= 1000) return 'Captain';
  if (xp >= 500) return 'Sergeant';
  return 'Cadet';
}

// --- Current user ---
const currentUser = 'NovaFox';

// --- Mock data ---
const topXpData = [
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
];

const lunchLegendsData = [
  { name: 'PixelWolf', lunches: 14, lastWith: 'BlazeStar' },
  { name: 'AquaDash', lunches: 12, lastWith: 'NeonGlyph' },
  { name: 'NovaFox', lunches: 11, lastWith: 'EchoVibe' },
  { name: 'IronPulse', lunches: 9, lastWith: 'CosmicRay' },
  { name: 'BlazeStar', lunches: 8, lastWith: 'PixelWolf' },
  { name: 'EchoVibe', lunches: 7, lastWith: 'NovaFox' },
  { name: 'ZenithAce', lunches: 5, lastWith: 'LunarByte' },
  { name: 'NeonGlyph', lunches: 4, lastWith: 'AquaDash' },
];

const breakChampionsData = [
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
];

const questHeroesData = [
  { name: 'BlazeStar', quests: 9, signature: '10-min walk' },
  { name: 'NovaFox', quests: 7, signature: 'Lunch with someone new' },
  { name: 'IronPulse', quests: 6, signature: 'Stretch break' },
  { name: 'PixelWolf', quests: 6, signature: 'Desk cleanup' },
  { name: 'EchoVibe', quests: 5, signature: 'Hydration check' },
  { name: 'AquaDash', quests: 5, signature: '10-min walk' },
  { name: 'NeonGlyph', quests: 4, signature: 'Gratitude note' },
  { name: 'ZenithAce', quests: 3, signature: 'Mindful minute' },
];

// --- Helper: find user rank in a leaderboard ---
function findUserRank(
  data: { name: string }[],
  userName: string,
): number | null {
  const idx = data.findIndex((d) => d.name === userName);
  return idx >= 0 ? idx + 1 : null;
}

// --- Leaderboard card component ---
function LeaderboardCard({
  title,
  description,
  headers,
  rows,
}: {
  title: string;
  description?: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" direction="column">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          {title}
        </Text>
        {description && (
          <Text color="secondaryGray.600" fontSize="sm" fontWeight="400" mt="4px">
            {description}
          </Text>
        )}
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              {headers.map((h) => (
                <Th
                  key={h}
                  pe="10px"
                  borderColor={borderColor}
                >
                  <Text
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                  >
                    {h}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, i) => (
              <Tr key={i}>
                {row.map((cell, j) => (
                  <Td
                    key={j}
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '120px', md: '150px', lg: 'auto' }}
                    borderColor="transparent"
                  >
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {cell}
                    </Text>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

export default function HallOfFame() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');

  // Derive user standings
  const totalMembers = 48;
  const userXpEntry = topXpData.find((d) => d.name === currentUser);
  const userXp = userXpEntry ? userXpEntry.xp : 0;
  const userRankTitle = getRankTitle(userXp);
  const xpRank = findUserRank(topXpData, currentUser);
  const lunchRank = findUserRank(lunchLegendsData, currentUser);
  const breakRank = findUserRank(breakChampionsData, currentUser);
  const questRank = findUserRank(questHeroesData, currentUser);

  const formatRank = (rank: number | null) =>
    rank !== null ? `#${rank}` : '—';

  // Prepare table rows
  const xpRows = topXpData.map((d, i) => [
    `#${i + 1}`,
    d.name,
    d.xp.toLocaleString(),
    getRankTitle(d.xp),
  ]);

  const lunchRows = lunchLegendsData.map((d, i) => [
    `#${i + 1}`,
    d.name,
    d.lunches,
    d.lastWith,
  ]);

  const breakRows = breakChampionsData.map((d, i) => [
    `#${i + 1}`,
    d.name,
    d.breaks,
    `${d.avgSession} min`,
  ]);

  const questRows = questHeroesData.map((d, i) => [
    `#${i + 1}`,
    d.name,
    d.quests,
    d.signature,
  ]);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Page heading */}
      <Flex direction="column" mb="20px">
        <Text color={textColor} fontSize="2xl" fontWeight="700">
          Hall of Fame
        </Text>
        <Text color={textColorSecondary} fontSize="md" fontWeight="400" mt="4px">
          See how the clubhouse crew is doing this week.
        </Text>
      </Flex>

      {/* Your Standing card */}
      <Card flexDirection="column" w="100%" mb="20px" p="20px">
        <Text color={textColor} fontSize="22px" fontWeight="700" mb="12px">
          Your Standing
        </Text>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '8px', md: '24px' }}
          wrap="wrap"
        >
          <Text color={textColor} fontSize="md" fontWeight="500">
            XP: {userXp.toLocaleString()} · Rank: {userRankTitle} · Overall:{' '}
            {xpRank !== null ? `#${xpRank} / ${totalMembers}` : '—'}
          </Text>
          <Text color={textColor} fontSize="md" fontWeight="500">
            Lunch rank: {formatRank(lunchRank)} · Break rank:{' '}
            {formatRank(breakRank)} · Quest rank: {formatRank(questRank)}
          </Text>
        </Flex>
      </Card>

      {/* Leaderboard grid */}
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <LeaderboardCard
          title="Top XP"
          description="Highest XP earners in the clubhouse"
          headers={['RANK', 'CLUBHOUSE NAME', 'XP', 'RANK TITLE']}
          rows={xpRows}
        />
        <LeaderboardCard
          title="Lunch Legends"
          description="Most social lunchers this month"
          headers={['RANK', 'NAME', 'LUNCHES (THIS MONTH)', 'LAST LUNCH WITH']}
          rows={lunchRows}
        />
        <LeaderboardCard
          title="Break Champions"
          description="Healthiest break-takers this week"
          headers={['RANK', 'NAME', 'HEALTHY BREAKS (THIS WEEK)', 'AVG WORK SESSION (MIN)']}
          rows={breakRows}
        />
        <LeaderboardCard
          title="Quest Heroes"
          description="Most quests completed this week"
          headers={['RANK', 'NAME', 'QUESTS DONE (THIS WEEK)', 'SIGNATURE QUEST']}
          rows={questRows}
        />
      </SimpleGrid>
    </Box>
  );
}
