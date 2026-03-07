'use client';

import {
  Button,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';

const workspaceTools = [
  { label: 'Microsoft Teams', url: 'https://teams.microsoft.com' },
  { label: 'Slack', url: 'https://slack.com' },
  { label: 'Jira', url: 'https://www.atlassian.com/software/jira' },
  { label: 'Power BI', url: 'https://app.powerbi.com' },
  { label: 'Notion', url: 'https://www.notion.so' },
  { label: 'HubSpot', url: 'https://app.hubspot.com' },
];

export default function WorkspaceToolsCard() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Card>
      <Text fontSize="lg" fontWeight="700" color={textColor} mb="16px">
        Workspace Tools
      </Text>
      <SimpleGrid columns={{ base: 2, md: 3 }} gap="12px">
        {workspaceTools.map((tool) => (
          <Button
            key={tool.label}
            as={Link}
            href={tool.url}
            isExternal
            size="sm"
            variant="outline"
            colorScheme="brand"
            borderRadius="full"
            rel="noopener noreferrer"
            transition="all 0.25s ease"
            _hover={{ textDecoration: 'none', bg: 'brand.500', color: 'white', transform: 'scale(1.06)' }}
          >
            {tool.label}
          </Button>
        ))}
      </SimpleGrid>
    </Card>
  );
}
