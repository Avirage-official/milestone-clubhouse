'use client';

import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useColorModeValue,
  keyframes,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import PetPlaceholder from 'views/admin/home/components/PetPlaceholder';
import WorkFocusCard from 'views/admin/home/components/WorkFocusCard';
import WellnessBreaksCard from 'views/admin/home/components/WellnessBreaksCard';
import SocialFunCards from 'views/admin/home/components/SocialFunCards';
import WorkspaceToolsCard from 'views/admin/home/components/WorkspaceToolsCard';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Home() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.400',
  );

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* A. Welcome + Pet & Notifications */}
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 2 }}
        gap="20px"
        mb="20px"
        animation={`${fadeUp} 0.5s ease-out`}
      >
        {/* Welcome Card */}
        <Card>
          <Text fontSize="2xl" fontWeight="700" color={textColor} mb="4px">
            Welcome back, NovaFox! 🎉
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            Your clubhouse is ready for today.
          </Text>
        </Card>

        {/* Pet Check-in & Notifications Card */}
        <Card>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap="20px"
            align="flex-start"
          >
            {/* Pet area */}
            <PetPlaceholder />

            {/* Notifications */}
            <Box flex="1">
              <Text fontSize="sm" fontWeight="700" color={textColor} mb="8px">
                Notifications
              </Text>
              <List spacing={3}>
                <ListItem fontSize="sm" color={textColorSecondary}>
                  🍫 Taylor sent a Snickers bar to your pet.
                </ListItem>
                <ListItem fontSize="sm" color={textColorSecondary}>
                  <Flex align="center" gap="8px" wrap="wrap">
                    <Text as="span">
                      📅 Alex invited you to lunch today at 12:30.
                    </Text>
                    <Button
                      size="xs"
                      colorScheme="brand"
                      borderRadius="full"
                      _hover={{ transform: 'scale(1.08)' }}
                      transition="all 0.2s ease"
                    >
                      Join
                    </Button>
                  </Flex>
                </ListItem>
              </List>
            </Box>
          </Flex>
        </Card>
      </SimpleGrid>

      {/* B. Work Focus & Progress */}
      <SimpleGrid
        columns={{ base: 1 }}
        gap="20px"
        mb="20px"
        animation={`${fadeUp} 0.6s ease-out`}
      >
        <WorkFocusCard />
      </SimpleGrid>

      {/* C. Wellness & Breaks */}
      <SimpleGrid
        columns={{ base: 1 }}
        gap="20px"
        mb="20px"
        animation={`${fadeUp} 0.7s ease-out`}
      >
        <WellnessBreaksCard />
      </SimpleGrid>

      {/* D. Social & Fun */}
      <Box mb="20px" animation={`${fadeUp} 0.8s ease-out`}>
        <SocialFunCards />
      </Box>

      {/* E. Workspace Tools */}
      <Box mb="20px" animation={`${fadeUp} 0.9s ease-out`}>
        <WorkspaceToolsCard />
      </Box>
    </Box>
  );
}
