'use client';

import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export interface StepClubhouseIdentityData {
  clubhouseName: string;
  theme: string;
}

interface StepClubhouseIdentityProps {
  data: StepClubhouseIdentityData;
  onChange: (data: StepClubhouseIdentityData) => void;
}

const THEMES = [
  { value: 'purple', label: '💜 Purple Reign', color: 'brand.500' },
  { value: 'ocean', label: '🌊 Ocean Breeze', color: 'blue.500' },
  { value: 'sunset', label: '🌅 Sunset Glow', color: 'orange.500' },
  { value: 'forest', label: '🌿 Forest Calm', color: 'green.500' },
];

export default function StepClubhouseIdentity({
  data,
  onChange,
}: StepClubhouseIdentityProps) {
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const cardBg = useColorModeValue('white', 'navy.800');
  const selectedBorder = useColorModeValue('brand.500', 'brand.400');
  const defaultBorder = useColorModeValue('secondaryGray.200', 'navy.600');

  return (
    <Stack spacing="24px">
      <Box>
        <Heading size="lg" color={textColor} mb="8px">
          Clubhouse identity
        </Heading>
        <Text color="secondaryGray.600" fontSize="md">
          Pick a name and theme for your profile.
        </Text>
      </Box>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
          Clubhouse name<Text as="span" color={brandStars}>*</Text>
        </FormLabel>
        <Input
          variant="auth"
          fontSize="sm"
          size="lg"
          placeholder="e.g. RocketRanger"
          value={data.clubhouseName}
          onChange={(e) => onChange({ ...data, clubhouseName: e.target.value })}
        />
      </FormControl>

      <Box>
        <Text fontWeight="500" color={textColor} mb="12px" fontSize="sm">
          Pick a theme
        </Text>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing="12px">
          {THEMES.map((t) => (
            <Box
              key={t.value}
              bg={cardBg}
              borderRadius="16px"
              border="2px solid"
              borderColor={data.theme === t.value ? selectedBorder : defaultBorder}
              p="16px"
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ borderColor: selectedBorder }}
              onClick={() => onChange({ ...data, theme: t.value })}
            >
              <Text fontSize="2xl" mb="6px">
                {t.label.split(' ')[0]}
              </Text>
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                {t.label.split(' ').slice(1).join(' ')}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
}
