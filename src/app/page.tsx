'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import LandingMascot from 'components/landing/LandingMascot';

export default function Home() {
  const bg = useColorModeValue('secondaryGray.300', 'navy.900');
  const textColor = useColorModeValue('navy.700', 'white');
  const subtextColor = useColorModeValue('secondaryGray.600', 'secondaryGray.500');

  return (
    <Flex
      minH="100vh"
      w="100%"
      bg={bg}
      direction="column"
      fontFamily="DM Sans"
    >
      {/* Top-left logo */}
      <Box px={{ base: '24px', md: '48px' }} pt={{ base: '24px', md: '32px' }}>
        <Text fontSize="xl" fontWeight="800" color={textColor}>
          🏠 Milestone Clubhouse
        </Text>
      </Box>

      {/* Hero section */}
      <Flex
        flex="1"
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        px={{ base: '24px', md: '48px' }}
        gap={{ base: '40px', md: '80px' }}
      >
        {/* Left: copy + CTA */}
        <Box maxW="560px" textAlign={{ base: 'center', md: 'left' }}>
          <Heading
            fontSize={{ base: '36px', md: '54px' }}
            fontWeight="700"
            color={textColor}
            lineHeight="1.15"
            mb="16px"
          >
            Make work feel like a&nbsp;clubhouse
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={subtextColor}
            mb="32px"
            maxW="480px"
            mx={{ base: 'auto', md: '0' }}
          >
            A fun daily hub with mini-games, lunch buddies, and a team pet —
            because great teams deserve a great hangout.
          </Text>
          <Link href="/auth/sign-in" passHref>
            <Button
              variant="brand"
              size="lg"
              fontSize="md"
              fontWeight="600"
              px="40px"
              h="54px"
            >
              Enter Clubhouse
            </Button>
          </Link>
        </Box>

        {/* Right: mascot */}
        <Flex
          justify="center"
          align="center"
          mt={{ base: '0', md: '0' }}
        >
          <LandingMascot />
        </Flex>
      </Flex>
    </Flex>
  );
}
