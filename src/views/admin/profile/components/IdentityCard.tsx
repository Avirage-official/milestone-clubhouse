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
} from '@chakra-ui/react';
import Card from 'components/card/Card';

interface IdentityCardProps {
  firstName: string;
  clubhouseName: string;
  role: string;
  timeZone: string;
  onChange: (field: string, value: string) => void;
  [x: string]: any;
}

export default function IdentityCard(props: IdentityCardProps) {
  const { firstName, clubhouseName, role, timeZone, onChange, ...rest } = props;
  const toast = useToast();

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.700');
  const inputText = useColorModeValue('secondaryGray.900', 'white');

  const handleSave = () => {
    const data = { firstName, clubhouseName, role, timeZone };
    console.log('Profile saved (demo only):', data);
    toast({
      title: 'Profile saved (demo only)',
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
        Clubhouse Identity
      </Text>
      <Text color={textColorSecondary} fontSize="md" mb="20px">
        Your display info on leaderboards and team views.
      </Text>

      <Flex direction="column" gap="16px">
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            First Name
          </FormLabel>
          <Input
            value={firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            bg={inputBg}
            color={inputText}
            border="none"
            borderRadius="16px"
            fontSize="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Clubhouse Name
          </FormLabel>
          <Input
            value={clubhouseName}
            onChange={(e) => onChange('clubhouseName', e.target.value)}
            bg={inputBg}
            color={inputText}
            border="none"
            borderRadius="16px"
            fontSize="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Role / Team
          </FormLabel>
          <Select
            value={role}
            onChange={(e) => onChange('role', e.target.value)}
            bg={inputBg}
            color={inputText}
            border="none"
            borderRadius="16px"
            fontSize="sm"
          >
            <option value="Sales">Sales</option>
            <option value="Product">Product</option>
            <option value="Operations">Operations</option>
            <option value="Engineering">Engineering</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
            Time Zone
          </FormLabel>
          <Select
            value={timeZone}
            onChange={(e) => onChange('timeZone', e.target.value)}
            bg={inputBg}
            color={inputText}
            border="none"
            borderRadius="16px"
            fontSize="sm"
          >
            <option value="America/New_York">Eastern Time (US)</option>
            <option value="America/Chicago">Central Time (US)</option>
            <option value="America/Denver">Mountain Time (US)</option>
            <option value="America/Los_Angeles">Pacific Time (US)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="Europe/Berlin">Central European Time</option>
            <option value="Asia/Tokyo">Japan Standard Time</option>
            <option value="Asia/Kolkata">India Standard Time</option>
            <option value="More">More…</option>
          </Select>
        </FormControl>

        <Box>
          <Button variant="brand" fontWeight="500" onClick={handleSave}>
            Save changes
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}
