'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useColorModeValue,
  useToast,
  RadioGroup,
  Radio,
  Stack,
  Icon,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import { MdPets } from 'react-icons/md';

const personalityDescriptions: Record<string, string> = {
  Chill: 'Fewer, softer reminders.',
  Energetic: 'More playful nudges and celebrations.',
  Motivator: 'Focus on goals and streaks.',
};

interface PetSettingsCardProps {
  petType: string;
  petName: string;
  petPersonality: string;
  onChange: (field: string, value: string) => void;
  [x: string]: any;
}

export default function PetSettingsCard(props: PetSettingsCardProps) {
  const { petType, petName, petPersonality, onChange, ...rest } = props;
  const toast = useToast();

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.700');
  const inputText = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const handleSave = () => {
    const data = { petType, petName, petPersonality };
    console.log('Pet saved (demo only):', data);
    toast({
      title: 'Pet saved (demo only)',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card p="20px" {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mb="4px"
      >
        Pet Settings
      </Text>
      <Text color={textColorSecondary} fontSize="md" mb="20px">
        Customize your companion.
      </Text>

      {/* Pet preview area */}
      <Flex align="center" mb="20px" gap="16px">
        <IconBox
          w="80px"
          h="80px"
          bg={boxBg}
          icon={<Icon as={MdPets} color={brandColor} w="40px" h="40px" />}
        />
        <Box>
          <Text color={textColorPrimary} fontWeight="700" fontSize="lg">
            {petName}
          </Text>
          <Text color={textColorSecondary} fontSize="sm">
            {petType} · {petPersonality}
          </Text>
        </Box>
      </Flex>

      <Flex direction="column" gap="16px">
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Pet Type
          </FormLabel>
          <Select
            value={petType}
            onChange={(e) => onChange('petType', e.target.value)}
            bg={inputBg}
            color={inputText}
            border="none"
            borderRadius="16px"
            fontSize="sm"
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Fox">Fox</option>
            <option value="Panda">Panda</option>
            <option value="Owl">Owl</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Pet Name
          </FormLabel>
          <Input
            value={petName}
            onChange={(e) => onChange('petName', e.target.value)}
            bg={inputBg}
            color={inputText}
            border="none"
            borderRadius="16px"
            fontSize="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Personality
          </FormLabel>
          <RadioGroup
            value={petPersonality}
            onChange={(val) => onChange('petPersonality', val)}
          >
            <Stack direction="row" spacing="24px">
              <Radio value="Chill" colorScheme="brandScheme">
                Chill
              </Radio>
              <Radio value="Energetic" colorScheme="brandScheme">
                Energetic
              </Radio>
              <Radio value="Motivator" colorScheme="brandScheme">
                Motivator
              </Radio>
            </Stack>
          </RadioGroup>
          <Text color={textColorSecondary} fontSize="sm" mt="8px">
            {personalityDescriptions[petPersonality] || ''}
          </Text>
        </FormControl>

        <Box>
          <Button variant="brand" fontWeight="500" onClick={handleSave}>
            Save pet
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}
