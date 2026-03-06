'use client';

import { PropsWithChildren, useState } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { SidebarContext } from 'contexts/SidebarContext';
import { isWindowAvailable } from 'utils/navigation';

interface OnboardingLayoutProps extends PropsWithChildren {}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const bgColor = useColorModeValue('secondaryGray.300', 'navy.900');
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';

  return (
    <Box>
      <SidebarContext.Provider
        value={{ toggleSidebar, setToggleSidebar }}
      >
        <Box
          bg={bgColor}
          minHeight="100vh"
          height="100%"
          w="100%"
        >
          {children}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
