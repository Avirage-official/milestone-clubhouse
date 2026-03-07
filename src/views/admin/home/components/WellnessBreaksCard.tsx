'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';

export default function WellnessBreaksCard() {
  const [gameState, setGameState] = useState<
    'idle' | 'playing' | 'done' | 'working'
  >('idle');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.400',
  );
  const gameBg = useColorModeValue('secondaryGray.300', 'navy.700');

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const startGame = () => {
    setGameState('playing');
    // Simulate a short micro-game (4 seconds for demo)
    setTimeout(() => {
      setGameState('done');
    }, 4000);
  };

  const beginWork = () => {
    setGameState('working');
    setSecondsLeft(60 * 60); // 60 minutes
    clearTimer();
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setGameState('idle');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startWorkSession = () => {
    beginWork();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <Card>
      <Text fontSize="lg" fontWeight="700" color={textColor} mb="16px">
        Wellness &amp; Breaks
      </Text>

      {gameState === 'idle' && (
        <Flex gap="12px" wrap="wrap">
          <Button colorScheme="brand" borderRadius="10px" onClick={startWorkSession}>
            Start work session
          </Button>
          <Button
            variant="outline"
            colorScheme="brand"
            borderRadius="10px"
            onClick={startGame}
          >
            Play micro game
          </Button>
        </Flex>
      )}

      {gameState === 'playing' && (
        <Box
          bg={gameBg}
          borderRadius="16px"
          p="20px"
          textAlign="center"
        >
          <Text fontSize="md" fontWeight="600" color={textColor}>
            🎮 Playing micro game…
          </Text>
          <Text fontSize="sm" color={textColorSecondary} mt="4px">
            Hang tight!
          </Text>
        </Box>
      )}

      {gameState === 'done' && (
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="600" color="green.500" mb="12px">
            ✅ Game complete!
          </Text>
          <Button colorScheme="brand" borderRadius="10px" onClick={beginWork}>
            Begin work
          </Button>
        </Box>
      )}

      {gameState === 'working' && (
        <Box>
          <Flex align="center" gap="12px" mb="12px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Next break in:
            </Text>
            <Text fontSize="2xl" fontWeight="700" color="brand.500">
              {formatTime(secondsLeft)}
            </Text>
          </Flex>
          <Tooltip
            label="Next game after current work session"
            hasArrow
            placement="top"
          >
            <Button
              variant="outline"
              colorScheme="brand"
              borderRadius="10px"
              isDisabled
            >
              Play micro game
            </Button>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
}
