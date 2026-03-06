'use client';

import {
  Box,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export interface StepPreferencesData {
  breakReminders: boolean;
  notificationStyle: string;
}

interface StepPreferencesProps {
  data: StepPreferencesData;
  onChange: (data: StepPreferencesData) => void;
}

export default function StepPreferences({
  data,
  onChange,
}: StepPreferencesProps) {
  const textColor = useColorModeValue('navy.700', 'white');

  return (
    <Stack spacing="28px">
      <Box>
        <Text fontSize="3xl" mb="4px">🔔</Text>
        <Heading size="lg" color={textColor} mb="8px">
          Nudge preferences
        </Heading>
        <Text color="secondaryGray.600" fontSize="md">
          Almost done! Choose how you&apos;d like us to nudge you throughout the day.
        </Text>
      </Box>

      <Flex
        justify="space-between"
        align="center"
        bg={useColorModeValue('secondaryGray.300', 'navy.900')}
        borderRadius="16px"
        p="16px"
      >
        <Box>
          <Text fontWeight="500" color={textColor} fontSize="md">
            Send me gentle break reminders
          </Text>
          <Text color="secondaryGray.600" fontSize="sm">
            We&apos;ll remind you to stretch and recharge.
          </Text>
        </Box>
        <Switch
          colorScheme="brandScheme"
          size="md"
          isChecked={data.breakReminders}
          onChange={() =>
            onChange({ ...data, breakReminders: !data.breakReminders })
          }
        />
      </Flex>

      <Box>
        <Text fontWeight="500" color={textColor} mb="12px" fontSize="sm">
          Make notifications:
        </Text>
        <RadioGroup
          value={data.notificationStyle}
          onChange={(val) => onChange({ ...data, notificationStyle: val })}
          colorScheme="brandScheme"
        >
          <Stack spacing="10px">
            <Radio value="Chill">🧊 Chill — calm and minimal</Radio>
            <Radio value="Playful">🎉 Playful — fun and engaging</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Stack>
  );
}
