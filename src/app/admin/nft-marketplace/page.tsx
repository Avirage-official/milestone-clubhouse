'use client';
/*!
=========================================================
* Milestone - v1.1.0
=========================================================
* Playground Page – Mini-games, quests, and ranks
=========================================================
*/

import React, { useState, useEffect, useCallback } from 'react';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
  keyframes,
} from '@chakra-ui/react';
import {
  MdSelfImprovement,
  MdAdsClick,
  MdGridOn,
  MdTextFields,
} from 'react-icons/md';
import Card from 'components/card/Card';
import BreathingBuddyGame from 'views/admin/playground/components/BreathingBuddyGame';
import FocusTapGame from 'views/admin/playground/components/FocusTapGame';
import MemoryMatchGame from 'views/admin/playground/components/MemoryMatchGame';
import WordScrambleGame from 'views/admin/playground/components/WordScrambleGame';

// --- Rank mapping ---
function getRank(xp: number): string {
  if (xp >= 2000) return 'General';
  if (xp >= 1000) return 'Captain';
  if (xp >= 500) return 'Sergeant';
  return 'Cadet';
}

// --- Cooldown: 1 hour ---
const COOLDOWN_MS = 60 * 60 * 1000;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Game definitions ---
const GAMES = [
  {
    id: 'breathing',
    name: 'Breathing Buddy',
    description: 'Guided 4-4-4-4 breathing exercise',
    duration: '3 min',
    xp: 10,
    icon: MdSelfImprovement,
  },
  {
    id: 'focusTap',
    name: 'Focus Tap',
    description: 'Tap highlighted tiles as fast as you can',
    duration: '2 min',
    xp: 15,
    icon: MdAdsClick,
  },
  {
    id: 'memory',
    name: 'Memory Match',
    description: 'Match pairs of emoji cards',
    duration: '3 min',
    xp: 20,
    icon: MdGridOn,
  },
  {
    id: 'wordScramble',
    name: 'Word Scramble',
    description: 'Unscramble the hidden words',
    duration: '2 min',
    xp: 10,
    icon: MdTextFields,
  },
] as const;

// --- Quests ---
const QUESTS = [
  {
    id: 'walk',
    title: 'Mindful Walk',
    description:
      'Take a 10-minute walk outside and notice 3 things you appreciate.',
  },
  {
    id: 'chat',
    title: 'Social Connect',
    description: 'Have a non-work chat with a teammate.',
  },
  {
    id: 'song',
    title: 'Song of the Day',
    description: 'Share your song of the day in the clubhouse.',
  },
];

export default function Playground() {
  const [xp, setXp] = useState(0);
  const [lastXpGameTime, setLastXpGameTime] = useState<number>(0);
  const [countdown, setCountdown] = useState('');
  const [questsDone, setQuestsDone] = useState<Record<string, boolean>>({});
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const toast = useToast();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const badgeAvailableBg = useColorModeValue('green.100', 'green.500');
  const badgeCooldownBg = useColorModeValue('orange.100', 'orange.500');

  // Load state from localStorage
  useEffect(() => {
    try {
      const storedXp = localStorage.getItem('playground_xp');
      const storedTime = localStorage.getItem('playground_lastXpGameTime');
      const storedQuests = localStorage.getItem('playground_quests');
      if (storedXp) setXp(parseInt(storedXp, 10));
      if (storedTime) setLastXpGameTime(parseInt(storedTime, 10));
      if (storedQuests) setQuestsDone(JSON.parse(storedQuests));
    } catch (e) {
      console.warn('Failed to load playground state from localStorage:', e);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const tick = () => {
      if (!lastXpGameTime) {
        setCountdown('');
        return;
      }
      const elapsed = Date.now() - lastXpGameTime;
      const remaining = COOLDOWN_MS - elapsed;
      if (remaining <= 0) {
        setCountdown('');
      } else {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setCountdown(
          `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`,
        );
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lastXpGameTime]);

  const xpAvailable =
    !lastXpGameTime || Date.now() - lastXpGameTime >= COOLDOWN_MS;

  const handleGameComplete = useCallback(
    (xpAmount: number) => {
      if (xpAvailable) {
        const newXp = xp + xpAmount;
        const now = Date.now();
        setXp(newXp);
        setLastXpGameTime(now);
        localStorage.setItem('playground_xp', String(newXp));
        localStorage.setItem('playground_lastXpGameTime', String(now));
        toast({
          title: `+${xpAmount} XP earned!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'XP is on cooldown',
          description: 'You can still play for fun.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
      setActiveGame(null);
    },
    [xp, xpAvailable, toast],
  );

  const toggleQuest = (id: string) => {
    const updated = { ...questsDone, [id]: !questsDone[id] };
    setQuestsDone(updated);
    localStorage.setItem('playground_quests', JSON.stringify(updated));
  };

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* --- Status Bar --- */}
      <Card mb="20px" p="20px" sx={{ animation: `${fadeUp} 0.4s ease-out` }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          gap="16px"
        >
          <Flex direction="column">
            <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
              XP
            </Text>
            <Text color={textColor} fontSize="2xl" fontWeight="700">
              {xp.toLocaleString()} XP
            </Text>
          </Flex>
          <Flex direction="column">
            <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
              Rank
            </Text>
            <Text color={brandColor} fontSize="2xl" fontWeight="700">
              {getRank(xp)}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
              Next available game in
            </Text>
            <Text color={textColor} fontSize="2xl" fontWeight="700">
              {countdown || 'Ready!'}
            </Text>
          </Flex>
        </Flex>
      </Card>

      {/* --- Mini-games Grid --- */}
      <Text
        color={textColor}
        fontSize="2xl"
        ms="4px"
        mb="20px"
        fontWeight="700"
      >
        Mini-games
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="30px" animation={`${fadeUp} 0.6s ease-out`}>
        {GAMES.map((game) => (
          <Card key={game.id} p="20px">
            <Flex direction="column" justify="space-between" h="100%">
              <Box>
                <Flex align="center" mb="10px">
                  <Icon
                    as={game.icon}
                    w="28px"
                    h="28px"
                    color={brandColor}
                    me="10px"
                  />
                  <Text color={textColor} fontSize="lg" fontWeight="bold">
                    {game.name}
                  </Text>
                </Flex>
                <Text color="secondaryGray.600" fontSize="sm" mb="8px">
                  {game.description}
                </Text>
                <Text color="secondaryGray.500" fontSize="xs" mb="12px">
                  ~{game.duration}
                </Text>
              </Box>
              <Flex justify="space-between" align="center">
                <Badge
                  px="8px"
                  py="2px"
                  borderRadius="8px"
                  bg={xpAvailable ? badgeAvailableBg : badgeCooldownBg}
                  color={xpAvailable ? 'green.700' : 'orange.700'}
                  fontSize="xs"
                  fontWeight="600"
                >
                  {xpAvailable ? 'XP available' : 'XP on cooldown'}
                </Badge>
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="full"
                  px="24px"
                  py="5px"
                  onClick={() => setActiveGame(game.id)}
                  transition="all 0.25s ease"
                  _hover={{ transform: 'scale(1.05)', boxShadow: '0 4px 15px rgba(66, 42, 251, 0.3)' }}
                >
                  Play
                </Button>
              </Flex>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* --- Quests Section --- */}
      <Text
        color={textColor}
        fontSize="2xl"
        ms="4px"
        mb="20px"
        fontWeight="700"
      >
        Today&apos;s Quests
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px" animation={`${fadeUp} 0.8s ease-out`}>
        {QUESTS.map((quest) => (
          <Card key={quest.id} p="20px">
            <Flex direction="column" justify="space-between" h="100%">
              <Box mb="12px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="6px"
                >
                  {quest.title}
                </Text>
                <Text color="secondaryGray.600" fontSize="sm">
                  {quest.description}
                </Text>
              </Box>
              <Checkbox
                colorScheme="brandScheme"
                isChecked={!!questsDone[quest.id]}
                onChange={() => toggleQuest(quest.id)}
              >
                <Text color={textColor} fontSize="sm" fontWeight="500">
                  Mark as done
                </Text>
              </Checkbox>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* --- Game Modals --- */}
      <BreathingBuddyGame
        isOpen={activeGame === 'breathing'}
        onClose={() => setActiveGame(null)}
        onComplete={handleGameComplete}
      />
      <FocusTapGame
        isOpen={activeGame === 'focusTap'}
        onClose={() => setActiveGame(null)}
        onComplete={handleGameComplete}
      />
      <MemoryMatchGame
        isOpen={activeGame === 'memory'}
        onClose={() => setActiveGame(null)}
        onComplete={handleGameComplete}
      />
      <WordScrambleGame
        isOpen={activeGame === 'wordScramble'}
        onClose={() => setActiveGame(null)}
        onComplete={handleGameComplete}
      />
    </Box>
  );
}
