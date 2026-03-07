'use client';

import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-16px) scale(1.05); }
  50% { transform: translateY(-12px) scale(1.02); }
  70% { transform: translateY(-16px) scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(66, 42, 251, 0.15); }
  50% { box-shadow: 0 0 20px rgba(66, 42, 251, 0.3); }
`;

export default function PetPlaceholder() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.400',
  );
  const petBg = useColorModeValue('secondaryGray.300', 'navy.700');

  return (
    <Box textAlign="center">
      <Box
        bg={petBg}
        borderRadius="20px"
        w="120px"
        h="120px"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        animation={`${bounce} 2.5s ease-in-out infinite, ${glow} 3s ease-in-out infinite`}
        fontSize="56px"
        mb="12px"
        cursor="pointer"
        transition="all 0.3s ease"
        _hover={{ transform: 'scale(1.1)', borderRadius: '24px' }}
      >
        🐶
      </Box>
      <Text fontSize="sm" color={textColor} fontWeight="600">
        Your Pet
      </Text>
      <Text fontSize="xs" color={textColorSecondary} mt="4px">
        Hunger: 40% · Energy: 70%
      </Text>
    </Box>
  );
}
