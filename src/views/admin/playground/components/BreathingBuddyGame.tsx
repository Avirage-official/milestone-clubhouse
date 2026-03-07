'use client';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect, useRef, useCallback } from 'react';

const PHASES = ['Inhale…', 'Hold…', 'Exhale…', 'Hold…'] as const;
const PHASE_DURATION = 4000; // 4 seconds per phase
const TOTAL_CYCLES = 4;

export default function BreathingBuddyGame(props: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (xpAmount: number) => void;
}) {
  const { isOpen, onClose, onComplete } = props;
  const [started, setStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!started || done) return;
    timerRef.current = setInterval(() => {
      setPhaseIndex((prev) => {
        const next = prev + 1;
        if (next >= PHASES.length) {
          setCycle((c) => {
            const nextCycle = c + 1;
            if (nextCycle >= TOTAL_CYCLES) {
              setDone(true);
              cleanup();
              return c;
            }
            return nextCycle;
          });
          return 0;
        }
        return next;
      });
    }, PHASE_DURATION);
    return cleanup;
  }, [started, done, cleanup]);

  useEffect(() => {
    if (!isOpen) {
      setStarted(false);
      setPhaseIndex(0);
      setCycle(0);
      setDone(false);
      cleanup();
    }
  }, [isOpen, cleanup]);

  const circleScale = () => {
    if (!started || done) return 1;
    if (PHASES[phaseIndex] === 'Inhale…') return 1.6;
    if (PHASES[phaseIndex] === 'Exhale…') return 0.8;
    return phaseIndex === 1 ? 1.6 : 0.8;
  };

  const handleFinish = () => {
    onComplete(10);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalHeader color={textColor}>Breathing Buddy</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="30px">
          {!started && !done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="md">
                Follow the breathing circle: 4s Inhale → 4s Hold → 4s Exhale →
                4s Hold. {TOTAL_CYCLES} cycles total.
              </Text>
              <Button
                variant="darkBrand"
                color="white"
                borderRadius="70px"
                px="30px"
                onClick={() => setStarted(true)}
              >
                Start
              </Button>
            </Flex>
          )}
          {started && !done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color="secondaryGray.600" fontSize="sm">
                Cycle {cycle + 1} of {TOTAL_CYCLES}
              </Text>
              <Box
                w="120px"
                h="120px"
                borderRadius="50%"
                bg={brandColor}
                opacity={0.7}
                transform={`scale(${circleScale()})`}
                transition={`transform ${PHASE_DURATION}ms ease-in-out`}
              />
              <Text color={textColor} fontSize="2xl" fontWeight="700">
                {PHASES[phaseIndex]}
              </Text>
            </Flex>
          )}
          {done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="2xl" fontWeight="700">
                Nice! +10 XP
              </Text>
              <Text color="secondaryGray.600" fontSize="md">
                Great breathing session! You completed {TOTAL_CYCLES} cycles.
              </Text>
              <Button
                variant="darkBrand"
                color="white"
                borderRadius="70px"
                px="30px"
                onClick={handleFinish}
              >
                Finish
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
