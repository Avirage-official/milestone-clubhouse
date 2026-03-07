'use client';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';

const WORDS = ['focus', 'mindful', 'energy', 'balance', 'growth'];

function scrambleWord(word: string): string {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join('');
  return scrambled === word ? scrambleWord(word) : scrambled;
}

export default function WordScrambleGame(props: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (xpAmount: number) => void;
}) {
  const { isOpen, onClose, onComplete } = props;
  const [started, setStarted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [done, setDone] = useState(false);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  const startGame = useCallback(() => {
    setStarted(true);
    setWordIndex(0);
    setScore(0);
    setDone(false);
    setGuess('');
    setFeedback('');
    setScrambled(scrambleWord(WORDS[0]));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setStarted(false);
      setDone(false);
      setWordIndex(0);
      setScore(0);
      setGuess('');
      setFeedback('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const isCorrect = guess.trim().toLowerCase() === WORDS[wordIndex];
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setFeedback(isCorrect ? '✅ Correct!' : `❌ The word was "${WORDS[wordIndex]}"`);

    setTimeout(() => {
      const next = wordIndex + 1;
      if (next >= WORDS.length) {
        setDone(true);
      } else {
        setWordIndex(next);
        setScrambled(scrambleWord(WORDS[next]));
        setGuess('');
        setFeedback('');
      }
    }, 1200);
  };

  const handleFinish = () => {
    onComplete(10);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalHeader color={textColor}>Word Scramble</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="30px">
          {!started && !done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="md">
                Unscramble {WORDS.length} words. Type your answer and submit!
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
                Word {wordIndex + 1} of {WORDS.length}
              </Text>
              <Text
                color={brandColor}
                fontSize="3xl"
                fontWeight="700"
                letterSpacing="4px"
                textTransform="uppercase"
              >
                {scrambled}
              </Text>
              <Input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Type your answer…"
                size="lg"
                borderRadius="16px"
                textAlign="center"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !feedback) handleSubmit();
                }}
                isDisabled={!!feedback}
              />
              {feedback ? (
                <Text color={textColor} fontSize="md" fontWeight="600">
                  {feedback}
                </Text>
              ) : (
                <Button
                  variant="darkBrand"
                  color="white"
                  borderRadius="70px"
                  px="30px"
                  onClick={handleSubmit}
                  isDisabled={!guess.trim()}
                >
                  Submit
                </Button>
              )}
            </Flex>
          )}
          {done && (
            <Flex direction="column" align="center" gap="20px" py="20px">
              <Text color={textColor} fontSize="2xl" fontWeight="700">
                Nice! +10 XP
              </Text>
              <Text color="secondaryGray.600" fontSize="md">
                Score: {score}/{WORDS.length} correct
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
