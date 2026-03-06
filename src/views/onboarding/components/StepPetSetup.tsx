'use client';

import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export interface StepPetSetupData {
  pet: string;
  petName: string;
  petHelp: string;
}

interface StepPetSetupProps {
  data: StepPetSetupData;
  onChange: (data: StepPetSetupData) => void;
}

const PETS = [
  { value: 'cat', emoji: '🐱', label: 'Cat' },
  { value: 'dog', emoji: '🐶', label: 'Dog' },
  { value: 'fox', emoji: '🦊', label: 'Fox' },
  { value: 'panda', emoji: '🐼', label: 'Panda' },
  { value: 'owl', emoji: '🦉', label: 'Owl' },
];

const HELP_OPTIONS = [
  'Remind me to take breaks',
  'Celebrate my wins',
  'Keep me company while I work',
];

export default function StepPetSetup({ data, onChange }: StepPetSetupProps) {
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const cardBg = useColorModeValue('white', 'navy.800');
  const selectedBorder = useColorModeValue('brand.500', 'brand.400');
  const defaultBorder = useColorModeValue('secondaryGray.200', 'navy.600');

  return (
    <Stack spacing="24px">
      <Box>
        <Heading size="lg" color={textColor} mb="8px">
          Pet setup
        </Heading>
        <Text color="secondaryGray.600" fontSize="md">
          Every clubhouse member gets a companion pet!
        </Text>
      </Box>

      <Box>
        <Text fontWeight="500" color={textColor} mb="12px" fontSize="sm">
          Choose your pet
        </Text>
        <SimpleGrid columns={{ base: 3, md: 5 }} spacing="12px">
          {PETS.map((p) => (
            <Box
              key={p.value}
              bg={cardBg}
              borderRadius="16px"
              border="2px solid"
              borderColor={data.pet === p.value ? selectedBorder : defaultBorder}
              p="16px"
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ borderColor: selectedBorder }}
              onClick={() => onChange({ ...data, pet: p.value })}
            >
              <Text fontSize="3xl" mb="4px">
                {p.emoji}
              </Text>
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                {p.label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
          Name your pet<Text as="span" color={brandStars}>*</Text>
        </FormLabel>
        <Input
          variant="auth"
          fontSize="sm"
          size="lg"
          placeholder="e.g. Whiskers"
          value={data.petName}
          onChange={(e) => onChange({ ...data, petName: e.target.value })}
        />
      </FormControl>

      <Box>
        <Text fontWeight="500" color={textColor} mb="12px" fontSize="sm">
          What should your pet help you with?
        </Text>
        <RadioGroup
          value={data.petHelp}
          onChange={(val) => onChange({ ...data, petHelp: val })}
          colorScheme="brandScheme"
        >
          <Stack spacing="10px">
            {HELP_OPTIONS.map((opt) => (
              <Radio key={opt} value={opt}>
                {opt}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    </Stack>
  );
}
