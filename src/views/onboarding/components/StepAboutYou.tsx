'use client';

import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export interface StepAboutYouData {
  firstName: string;
  companyEmail: string;
  role: string;
}

interface StepAboutYouProps {
  data: StepAboutYouData;
  onChange: (data: StepAboutYouData) => void;
}

const ROLE_OPTIONS = ['Sales', 'Product', 'Operations', 'Engineering', 'Other'];

export default function StepAboutYou({ data, onChange }: StepAboutYouProps) {
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const update = (field: keyof StepAboutYouData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Stack spacing="24px">
      <Box>
        <Heading size="lg" color={textColor} mb="8px">
          About you
        </Heading>
        <Text color="secondaryGray.600" fontSize="md">
          Tell us a little about yourself so we can personalise your experience.
        </Text>
      </Box>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
          First name<Text as="span" color={brandStars}>*</Text>
        </FormLabel>
        <Input
          variant="auth"
          fontSize="sm"
          size="lg"
          placeholder="e.g. Alex"
          value={data.firstName}
          onChange={(e) => update('firstName', e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
          Company email<Text as="span" color={brandStars}>*</Text>
        </FormLabel>
        <Input
          variant="auth"
          fontSize="sm"
          size="lg"
          type="email"
          placeholder="you@company.com"
          value={data.companyEmail}
          onChange={(e) => update('companyEmail', e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
          Role / team<Text as="span" color={brandStars}>*</Text>
        </FormLabel>
        <Select
          variant="auth"
          fontSize="sm"
          size="lg"
          placeholder="Select your role"
          value={data.role}
          onChange={(e) => update('role', e.target.value)}
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
