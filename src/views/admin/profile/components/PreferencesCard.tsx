'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import SwitchField from 'components/fields/SwitchField';

interface PreferencesCardProps {
  breakReminders: boolean;
  petNudges: boolean;
  includeInLeaderboards: boolean;
  notificationTone: string;
  maxRemindersPerDay: number;
  onChange: (field: string, value: boolean | string | number) => void;
  [x: string]: any;
}

export default function PreferencesCard(props: PreferencesCardProps) {
  const {
    breakReminders,
    petNudges,
    includeInLeaderboards,
    notificationTone,
    maxRemindersPerDay,
    onChange,
    ...rest
  } = props;
  const toast = useToast();

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  const handleSave = () => {
    const data = {
      breakReminders,
      petNudges,
      includeInLeaderboards,
      notificationTone,
      maxRemindersPerDay,
    };
    console.log('Preferences saved (demo only):', data);
    toast({
      title: 'Preferences saved (demo only)',
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
        Reminders &amp; Notifications
      </Text>
      <Text color={textColorSecondary} fontSize="md" mb="20px">
        Control how and when you get nudged.
      </Text>

      <Flex direction="column" gap="16px">
        <SwitchField
          isChecked={breakReminders}
          onChange={() => onChange('breakReminders', !breakReminders)}
          reversed={true}
          fontSize="sm"
          id="breakReminders"
          label="Break reminders"
        />
        <SwitchField
          isChecked={petNudges}
          onChange={() => onChange('petNudges', !petNudges)}
          reversed={true}
          fontSize="sm"
          id="petNudges"
          label="Pet nudges"
        />
        <SwitchField
          isChecked={includeInLeaderboards}
          onChange={() =>
            onChange('includeInLeaderboards', !includeInLeaderboards)
          }
          reversed={true}
          fontSize="sm"
          id="includeInLeaderboards"
          label="Include me in leaderboards"
        />

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Notification Tone
          </FormLabel>
          <RadioGroup
            value={notificationTone}
            onChange={(val) => onChange('notificationTone', val)}
          >
            <Stack direction="row" spacing="24px">
              <Radio value="Chill" colorScheme="brandScheme">
                Chill
              </Radio>
              <Radio value="Playful" colorScheme="brandScheme">
                Playful
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Max reminders per day: {maxRemindersPerDay}
          </FormLabel>
          <Slider
            value={maxRemindersPerDay}
            min={0}
            max={5}
            step={1}
            onChange={(val) => onChange('maxRemindersPerDay', val)}
            colorScheme="brandScheme"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex justify="space-between" mt="4px">
            <Text color={textColorSecondary} fontSize="xs">
              0
            </Text>
            <Text color={textColorSecondary} fontSize="xs">
              5
            </Text>
          </Flex>
        </FormControl>

        <Box>
          <Button variant="brand" fontWeight="500" onClick={handleSave}>
            Save preferences
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}
