'use client';

import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
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
        borderRadius="16px"
        w="120px"
        h="120px"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        animation={`${bounce} 2s ease-in-out infinite`}
        fontSize="56px"
        mb="12px"
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
