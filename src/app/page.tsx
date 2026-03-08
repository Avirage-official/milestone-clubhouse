'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  keyframes,
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MdArrowForward,
  MdHome,
  MdChat,
  MdEmail,
  MdEdit,
  MdGroup,
  MdEmojiEvents,
  MdSportsEsports,
} from 'react-icons/md';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

export default function Home() {
  return (
    <Box
      minH="100vh"
      w="100%"
      bg="linear-gradient(180deg, #a78bfa 0%, #7c5ce0 30%, #6d5acf 60%, #8b7fd4 100%)"
      fontFamily="DM Sans"
      overflowX="hidden"
      position="relative"
    >
      {/* ── Navbar ── */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        px={{ base: '20px', md: '48px' }}
        py="18px"
        animation={`${fadeUp} 0.6s ease-out`}
      >
        {/* Logo */}
        <HStack spacing="8px">
          <Icon as={MdHome} boxSize="22px" color="white" />
          <Text fontSize="md" fontWeight="800" color="white" letterSpacing="-0.2px">
            MILESTONE CLUBHOUSE
          </Text>
        </HStack>

        {/* Nav Links – hidden on mobile */}
        <HStack
          spacing="32px"
          display={{ base: 'none', md: 'flex' }}
        >
          {['Features', 'Games', 'Leaderboard', 'Contact'].map((item) => (
            <Text
              key={item}
              fontSize="sm"
              fontWeight="500"
              color="whiteAlpha.900"
              cursor="pointer"
              _hover={{ color: 'white' }}
              transition="color 0.2s"
            >
              {item}
            </Text>
          ))}
        </HStack>

        {/* Auth Buttons */}
        <HStack spacing="12px">
          <Link href="/auth/sign-in">
            <Text
              fontSize="sm"
              fontWeight="600"
              color="white"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
              display={{ base: 'none', sm: 'block' }}
            >
              Log in
            </Text>
          </Link>
          <Link href="/auth/sign-in">
            <Button
              size="sm"
              bg="white"
              color="brand.500"
              fontWeight="700"
              borderRadius="full"
              px="20px"
              _hover={{ bg: 'whiteAlpha.900', transform: 'scale(1.03)' }}
              transition="all 0.2s"
            >
              Sign up
            </Button>
          </Link>
        </HStack>
      </Flex>

      {/* ── Hero Copy ── */}
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        pt={{ base: '48px', md: '64px' }}
        pb={{ base: '32px', md: '48px' }}
        px="20px"
        animation={`${fadeUp} 0.8s ease-out`}
      >
        <Heading
          fontSize={{ base: '40px', sm: '52px', md: '68px', lg: '78px' }}
          fontWeight="700"
          color="white"
          lineHeight="1.08"
          maxW="820px"
          mb="20px"
        >
          Make work feel like a&nbsp;clubhouse
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="whiteAlpha.800"
          maxW="560px"
          mb="36px"
          lineHeight="1.6"
        >
          Mini-games, lunch buddies, and a team pet — all in one fun daily hub,
          because great teams deserve a&nbsp;great&nbsp;hangout.
        </Text>
        <Link href="/auth/sign-in">
          <Button
            size="lg"
            bg="brand.800"
            color="white"
            fontWeight="600"
            borderRadius="full"
            px="32px"
            h="54px"
            fontSize="md"
            rightIcon={
              <Flex
                bg="whiteAlpha.200"
                borderRadius="full"
                w="32px"
                h="32px"
                align="center"
                justify="center"
              >
                <Icon as={MdArrowForward} color="white" />
              </Flex>
            }
            _hover={{ bg: 'brand.900', transform: 'translateY(-2px)' }}
            transition="all 0.25s"
            boxShadow="0 8px 32px rgba(0,0,0,0.18)"
          >
            Enter Clubhouse
          </Button>
        </Link>
      </Flex>

      {/* ── Hero Image + Floating Cards ── */}
      <Box
        position="relative"
        maxW="1200px"
        mx="auto"
        px={{ base: '16px', md: '32px' }}
        pb={{ base: '60px', md: '80px' }}
        animation={`${fadeUp} 1s ease-out`}
      >
        {/* Main hero image */}
        <Box
          borderRadius="24px"
          overflow="hidden"
          boxShadow="0 24px 80px rgba(0,0,0,0.25)"
          position="relative"
          w="100%"
          h={{ base: '280px', sm: '360px', md: '480px', lg: '560px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80"
            alt="Team collaborating together"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Gradient overlay for depth */}
          <Box
            position="absolute"
            inset="0"
            bg="linear-gradient(180deg, rgba(124,92,224,0.15) 0%, rgba(124,92,224,0.35) 100%)"
          />
        </Box>

        {/* ── Floating Card: Chat ── */}
        <Box
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          top={{ md: '30px', lg: '40px' }}
          left={{ md: '-20px', lg: '-40px' }}
          bg="white"
          borderRadius="20px"
          p="20px"
          maxW="280px"
          boxShadow="0 12px 40px rgba(0,0,0,0.12)"
          animation={`${float} 4s ease-in-out infinite`}
        >
          <HStack mb="12px">
            <Flex
              bg="brand.100"
              borderRadius="10px"
              w="32px"
              h="32px"
              align="center"
              justify="center"
            >
              <Icon as={MdChat} color="brand.500" boxSize="16px" />
            </Flex>
            <Text fontSize="xs" fontWeight="700" color="navy.700">
              Team Chat
            </Text>
          </HStack>
          <Text fontSize="xs" color="secondaryGray.600" lineHeight="1.5">
            Hey team! Anyone up for a quick trivia round before standup? 🎮
          </Text>
          <HStack mt="10px" spacing="8px">
            <Box bg="brand.100" borderRadius="full" px="10px" py="4px">
              <Text fontSize="10px" fontWeight="600" color="brand.500">
                yes!
              </Text>
            </Box>
            <Box bg="green.100" borderRadius="full" px="10px" py="4px">
              <Text fontSize="10px" fontWeight="600" color="green.500">
                count me in 🙋
              </Text>
            </Box>
          </HStack>
        </Box>

        {/* ── Floating Card: Leaderboard ── */}
        <Box
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          top={{ md: '20px', lg: '30px' }}
          right={{ md: '-20px', lg: '-30px' }}
          bg="white"
          borderRadius="20px"
          p="20px"
          maxW="260px"
          boxShadow="0 12px 40px rgba(0,0,0,0.12)"
          animation={`${float} 4.5s ease-in-out 0.5s infinite`}
        >
          <HStack mb="12px" justify="space-between">
            <HStack>
              <Icon as={MdEmojiEvents} color="orange.500" boxSize="18px" />
              <Text fontSize="xs" fontWeight="700" color="navy.700">
                Leaderboard
              </Text>
            </HStack>
            <Text fontSize="10px" color="secondaryGray.600">This week</Text>
          </HStack>
          {[
            { name: 'Sarah K.', xp: '2,450 XP', rank: '🥇' },
            { name: 'James P.', xp: '2,180 XP', rank: '🥈' },
            { name: 'Laura C.', xp: '1,960 XP', rank: '🥉' },
          ].map((player, i) => (
            <HStack key={i} justify="space-between" py="6px">
              <HStack>
                <Text fontSize="xs">{player.rank}</Text>
                <Text fontSize="xs" fontWeight="600" color="navy.700">
                  {player.name}
                </Text>
              </HStack>
              <Text fontSize="10px" fontWeight="600" color="brand.500">
                {player.xp}
              </Text>
            </HStack>
          ))}
        </Box>

        {/* ── Floating Card: Games ── */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          bottom={{ lg: '100px' }}
          left={{ lg: '-30px' }}
          bg="white"
          borderRadius="16px"
          px="16px"
          py="12px"
          boxShadow="0 8px 32px rgba(0,0,0,0.1)"
          animation={`${float} 5s ease-in-out 1s infinite`}
        >
          <HStack spacing="10px">
            <Flex
              bg="orange.100"
              borderRadius="10px"
              w="36px"
              h="36px"
              align="center"
              justify="center"
            >
              <Icon as={MdSportsEsports} color="orange.500" boxSize="20px" />
            </Flex>
            <Box>
              <Text fontSize="xs" fontWeight="700" color="navy.700">
                Mini-Games
              </Text>
              <Text fontSize="10px" color="secondaryGray.600">
                3 new games unlocked!
              </Text>
            </Box>
          </HStack>
        </Box>

        {/* ── Floating Card: Team Workspace ── */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          bottom={{ lg: '80px' }}
          right={{ lg: '-20px' }}
          bg="white"
          borderRadius="20px"
          p="18px"
          maxW="280px"
          boxShadow="0 12px 40px rgba(0,0,0,0.12)"
          animation={`${float} 4.8s ease-in-out 0.8s infinite`}
        >
          <HStack mb="10px" justify="space-between">
            <HStack>
              <Icon as={MdGroup} color="brand.500" boxSize="16px" />
              <Text fontSize="xs" fontWeight="700" color="navy.700">
                Team workspace
              </Text>
            </HStack>
            <HStack spacing="4px">
              <Icon as={MdEdit} color="secondaryGray.500" boxSize="12px" />
            </HStack>
          </HStack>
          <Text fontSize="11px" fontWeight="600" color="navy.700" mb="6px">
            Sprint Retro Notes
          </Text>
          <Text fontSize="10px" color="secondaryGray.600" lineHeight="1.5">
            Great sprint everyone! Top wins: shipped the new playground,
            onboarding flow got 4.8★ feedback. Let&apos;s keep the momentum going.
          </Text>
        </Box>

        {/* ── Floating Badge: Inbox ── */}
        <Box
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          bottom={{ md: '30px', lg: '20px' }}
          left="50%"
          transform="translateX(-50%)"
          bg="white"
          borderRadius="16px"
          px="16px"
          py="10px"
          boxShadow="0 8px 32px rgba(0,0,0,0.1)"
          animation={`${float} 3.5s ease-in-out 1.5s infinite`}
        >
          <HStack spacing="10px">
            <Flex
              bg="blue.50"
              borderRadius="10px"
              w="32px"
              h="32px"
              align="center"
              justify="center"
            >
              <Icon as={MdEmail} color="blue.500" boxSize="16px" />
            </Flex>
            <Box>
              <Text fontSize="xs" fontWeight="600" color="navy.700">
                5 new team updates
              </Text>
              <Text fontSize="10px" color="secondaryGray.600">
                Lunch buddy match is ready!
              </Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
