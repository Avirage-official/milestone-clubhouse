'use client';

import { PropsWithChildren } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { isWindowAvailable } from 'utils/navigation';

interface OnboardingLayoutProps extends PropsWithChildren {}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const bgColor = useColorModeValue('secondaryGray.300', 'navy.900');
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';

  return (
    <Box
      bg={bgColor}
      minHeight="100vh"
      height="100%"
      w="100%"
    >
      {children}
    </Box>
  );
}
