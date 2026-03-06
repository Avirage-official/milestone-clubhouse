'use client';

import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export interface StepWorkStyleData {
  focusTime: string;
  workStyle: string;
}

interface StepWorkStyleProps {
  data: StepWorkStyleData;
  onChange: (data: StepWorkStyleData) => void;
}

const FOCUS_OPTIONS = ['Morning', 'Afternoon', 'Evening'];
const STYLE_OPTIONS = [
  { value: 'Sprinter', label: '⚡ Sprinter' },
  { value: 'Steady', label: '🧘 Steady' },
  { value: 'Juggler', label: '🐙 Juggler' },
];

export default function StepWorkStyle({ data, onChange }: StepWorkStyleProps) {
  const textColor = useColorModeValue('navy.700', 'white');

  return (
    <Stack spacing="28px">
      <Box>
        <Heading size="lg" color={textColor} mb="8px">
          Work style
        </Heading>
        <Text color="secondaryGray.600" fontSize="md">
          Help us understand how you work best.
        </Text>
      </Box>

      <Box>
        <Text fontWeight="500" color={textColor} mb="12px" fontSize="sm">
          When do you focus best?
        </Text>
        <RadioGroup
          value={data.focusTime}
          onChange={(val) => onChange({ ...data, focusTime: val })}
          colorScheme="brandScheme"
        >
          <Stack spacing="10px">
            {FOCUS_OPTIONS.map((opt) => (
              <Radio key={opt} value={opt}>
                {opt}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>

      <Box>
        <Text fontWeight="500" color={textColor} mb="12px" fontSize="sm">
          You&apos;re more like:
        </Text>
        <RadioGroup
          value={data.workStyle}
          onChange={(val) => onChange({ ...data, workStyle: val })}
          colorScheme="brandScheme"
        >
          <Stack spacing="10px">
            {STYLE_OPTIONS.map((opt) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    </Stack>
  );
}
