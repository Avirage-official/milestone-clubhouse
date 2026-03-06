'use client';

import { Box, Text, keyframes } from '@chakra-ui/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  15% { transform: rotate(14deg); }
  30% { transform: rotate(-8deg); }
  45% { transform: rotate(14deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

export default function LandingMascot() {
  return (
    <Box position="relative" display="inline-block">
      {/* Speech bubble */}
      <Box
        position="absolute"
        top="-60px"
        left="50%"
        transform="translateX(-50%)"
        bg="white"
        color="navy.700"
        px="16px"
        py="8px"
        borderRadius="16px"
        boxShadow="lg"
        fontSize="sm"
        fontWeight="600"
        whiteSpace="nowrap"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid white',
        }}
      >
        <Text>Hey! Come in 👋</Text>
      </Box>

      {/* Mascot – bouncing placeholder emoji; swap for Lottie later */}
      <Box animation={`${bounce} 2s ease-in-out infinite`}>
        <Text
          fontSize={{ base: '80px', md: '120px' }}
          lineHeight="1"
          userSelect="none"
        >
          <Box as="span" display="inline-block" animation={`${wave} 2.5s ease-in-out infinite`}>
            🐾
          </Box>
        </Text>
      </Box>
    </Box>
  );
}
