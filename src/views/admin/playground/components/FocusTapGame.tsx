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
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 4;
const TOTAL_ROUNDS = 10;

export default function FocusTapGame(props: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (xpAmount: number) => void;
}) {
  const { isOpen, onClose, onComplete } = props;
  const [started, setStarted] = useState(false);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const highlightTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cellBg = useColorModeValue('secondaryGray.300', 'navy.700');

  const highlightRandomCell = useCallback(() => {
    const cell = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
    setActiveCell(cell);
    highlightTimeRef.current = Date.now();
  }, []);

  const startGame = useCallback(() => {
    setStarted(true);
    setRound(0);
    setReactionTimes([]);
    setDone(false);
    timerRef.current = setTimeout(() => {
      highlightRandomCell();
    }, 500);
  }, [highlightRandomCell]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (index !== activeCell || !started || done) return;
      const reaction = Date.now() - highlightTimeRef.current;
      const newTimes = [...reactionTimes, reaction];
      setReactionTimes(newTimes);
      setActiveCell(null);
      const nextRound = round + 1;
      setRound(nextRound);
      if (nextRound >= TOTAL_ROUNDS) {
        setDone(true);
      } else {
        timerRef.current = setTimeout(() => {
          highlightRandomCell();
        }, 400);
      }
    },
    [activeCell, started, done, reactionTimes, round, highlightRandomCell],
  );

  useEffect(() => {
    if (!isOpen) {
      setStarted(false);
      setActiveCell(null);
      setRound(0);
      setReactionTimes([]);
      setDone(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isOpen]);

  const avgTime =
    reactionTimes.length > 0
      ? Math.round(
          reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length,
        )
      : 0;

  const handleFinish = () => {
    onComplete(15);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalHeader color={textColor}>Focus Tap</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="30px">
          {!started && !done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="md">
                Tap the highlighted tile as fast as you can! {TOTAL_ROUNDS}{' '}
                rounds.
              </Text>
              <Button
                variant="darkBrand"
                color="white"
                borderRadius="70px"
                px="30px"
                onClick={startGame}
              >
                Start
              </Button>
            </Flex>
          )}
          {started && !done && (
            <Flex direction="column" align="center" gap="16px" py="10px">
              <Text color="secondaryGray.600" fontSize="sm">
                Round {round + 1} of {TOTAL_ROUNDS}
              </Text>
              <SimpleGrid columns={GRID_SIZE} gap="8px">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                  <Box
                    key={i}
                    w="60px"
                    h="60px"
                    borderRadius="12px"
                    bg={i === activeCell ? brandColor : cellBg}
                    cursor={i === activeCell ? 'pointer' : 'default'}
                    transition="background 0.15s ease"
                    onClick={() => handleCellClick(i)}
                    _hover={
                      i === activeCell ? { opacity: 0.85 } : {}
                    }
                  />
                ))}
              </SimpleGrid>
            </Flex>
          )}
          {done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="2xl" fontWeight="700">
                Nice! +15 XP
              </Text>
              <Text color="secondaryGray.600" fontSize="md">
                Average reaction time: {avgTime}ms
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
