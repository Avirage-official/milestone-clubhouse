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

const EMOJIS = ['🎯', '🚀', '⭐', '🎨', '🔥', '💎'];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatchGame(props: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (xpAmount: number) => void;
}) {
  const { isOpen, onClose, onComplete } = props;
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const lockRef = useRef(false);

  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardBg = useColorModeValue('secondaryGray.300', 'navy.700');

  const initGame = useCallback(() => {
    const deck = shuffleArray([...EMOJIS, ...EMOJIS]);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setDone(false);
    setStarted(true);
    lockRef.current = false;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setStarted(false);
      setDone(false);
      setFlipped([]);
      setMatched([]);
      setAttempts(0);
      lockRef.current = false;
    }
  }, [isOpen]);

  const handleCardClick = useCallback(
    (index: number) => {
      if (
        lockRef.current ||
        flipped.includes(index) ||
        matched.includes(index) ||
        !started ||
        done
      )
        return;

      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        lockRef.current = true;
        setAttempts((a) => a + 1);
        const [first, second] = newFlipped;
        if (cards[first] === cards[second]) {
          const newMatched = [...matched, first, second];
          setMatched(newMatched);
          setFlipped([]);
          lockRef.current = false;
          if (newMatched.length === cards.length) {
            setDone(true);
          }
        } else {
          setTimeout(() => {
            setFlipped([]);
            lockRef.current = false;
          }, 800);
        }
      }
    },
    [flipped, matched, cards, started, done],
  );

  const handleFinish = () => {
    onComplete(20);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalHeader color={textColor}>Memory Match</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="30px">
          {!started && !done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="md">
                Match all 6 pairs of emoji cards. Flip 2 at a time!
              </Text>
              <Button
                variant="darkBrand"
                color="white"
                borderRadius="70px"
                px="30px"
                onClick={initGame}
              >
                Start
              </Button>
            </Flex>
          )}
          {started && !done && (
            <Flex direction="column" align="center" gap="16px" py="10px">
              <Text color="secondaryGray.600" fontSize="sm">
                Attempts: {attempts}
              </Text>
              <SimpleGrid columns={4} gap="10px">
                {cards.map((emoji, i) => {
                  const isFlipped = flipped.includes(i);
                  const isMatched = matched.includes(i);
                  const showFace = isFlipped || isMatched;
                  return (
                    <Flex
                      key={i}
                      w="60px"
                      h="70px"
                      borderRadius="12px"
                      bg={isMatched ? 'green.100' : showFace ? brandColor : cardBg}
                      align="center"
                      justify="center"
                      cursor={showFace ? 'default' : 'pointer'}
                      onClick={() => handleCardClick(i)}
                      transition="all 0.2s ease"
                      _hover={!showFace ? { opacity: 0.8 } : {}}
                      fontSize="24px"
                      userSelect="none"
                    >
                      {showFace ? emoji : '?'}
                    </Flex>
                  );
                })}
              </SimpleGrid>
            </Flex>
          )}
          {done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="2xl" fontWeight="700">
                Nice! +20 XP
              </Text>
              <Text color="secondaryGray.600" fontSize="md">
                Completed in {attempts} attempts!
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
