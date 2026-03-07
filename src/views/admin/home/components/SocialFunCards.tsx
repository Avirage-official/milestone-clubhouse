'use client';

import { useState } from 'react';
import {
  Button,
  Flex,
  Input,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Card from 'components/card/Card';

function ChallengeCard() {
  const [done, setDone] = useState(false);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.400',
  );

  return (
    <Card>
      <Text fontSize="sm" fontWeight="700" color={textColor} mb="8px">
        Today&apos;s Challenge
      </Text>
      <Text fontSize="sm" color={textColorSecondary} mb="12px">
        Take a 10-minute walk outside and share a photo in the team chat.
      </Text>
      <Button
        size="sm"
        colorScheme={done ? 'green' : 'brand'}
        borderRadius="full"
        onClick={() => setDone(!done)}
        transition="all 0.25s ease"
        _hover={{ transform: 'scale(1.05)' }}
      >
        {done ? '✅ Done!' : '🎯 Mark as done'}
      </Button>
    </Card>
  );
}

function LunchBuddiesCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.400',
  );

  return (
    <>
      <Card>
        <Text fontSize="sm" fontWeight="700" color={textColor} mb="8px">
          Lunch Buddies
        </Text>
        <Text fontSize="sm" color={textColorSecondary} mb="12px">
          3 people are open for lunch around 12–1pm.
        </Text>
        <Button
          size="sm"
          variant="outline"
          colorScheme="brand"
          borderRadius="full"
          onClick={onOpen}
          transition="all 0.25s ease"
          _hover={{ transform: 'scale(1.05)' }}
        >
          🍽️ View options
        </Button>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(4px)" />
        <ModalContent borderRadius="24px" p="8px">
          <ModalHeader>Lunch Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <Text fontSize="sm" color={textColorSecondary} mb="4px">
              • Jordan — Sushi Place, 12:00 pm
            </Text>
            <Text fontSize="sm" color={textColorSecondary} mb="4px">
              • Morgan — Taco Truck, 12:15 pm
            </Text>
            <Text fontSize="sm" color={textColorSecondary}>
              • Riley — Café Bistro, 12:30 pm
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function SongOfTheDayCard() {
  const [url, setUrl] = useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.400',
  );

  const isValidUrl = (value: string) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  };

  return (
    <Card>
      <Text fontSize="sm" fontWeight="700" color={textColor} mb="8px">
        Song of the Day
      </Text>
      <Input
        placeholder="Paste a Spotify URL…"
        size="sm"
        borderRadius="10px"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        mb="8px"
      />
      {isValidUrl(url.trim()) ? (
        <Link
          href={url.trim()}
          isExternal
          fontSize="sm"
          fontWeight="600"
          color="brand.500"
          _hover={{ textDecoration: 'underline' }}
        >
          🎵 Play my song of the day
        </Link>
      ) : (
        <Text fontSize="xs" color={textColorSecondary}>
          {url.trim()
            ? 'Please enter a valid URL (https://…)'
            : 'Share your vibe with the team!'}
        </Text>
      )}
    </Card>
  );
}

export default function SocialFunCards() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
      <ChallengeCard />
      <LunchBuddiesCard />
      <SongOfTheDayCard />
    </SimpleGrid>
  );
}
