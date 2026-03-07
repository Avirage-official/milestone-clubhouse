'use client';

import { Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { MdLock } from 'react-icons/md';

export default function PrivacyNote(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  return (
    <Card p="20px" {...rest}>
      <Flex align="center" mb="8px" gap="8px">
        <Icon as={MdLock} color={brandColor} w="20px" h="20px" />
        <Text color={textColorPrimary} fontWeight="bold" fontSize="lg">
          Privacy
        </Text>
      </Flex>
      <Text color={textColorSecondary} fontSize="sm">
        Individual messages and notes are always private. Leaderboards use only
        aggregated metrics — full message content is never shared.
      </Text>
    </Card>
  );
}
