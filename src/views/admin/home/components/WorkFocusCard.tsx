'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  List,
  ListItem,
  ListIcon,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdWarning, MdAdd, MdCheckCircle, MdLocalFireDepartment } from 'react-icons/md';
import Card from 'components/card/Card';

const missedTasks = [
  'Review pull request #42',
  'Send weekly report to the team',
];

export default function WorkFocusCard() {
  const [priorities, setPriorities] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.400',
  );
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  const addPriority = () => {
    const trimmed = input.trim();
    if (trimmed && priorities.length < 3) {
      setPriorities([...priorities, trimmed]);
      setInput('');
    }
  };

  return (
    <Card>
      <Text fontSize="lg" fontWeight="700" color={textColor} mb="16px">
        Today&apos;s Work Focus
      </Text>

      {/* Missed from yesterday */}
      <Box mb="20px">
        <Text fontSize="sm" fontWeight="600" color={textColor} mb="8px">
          Missed from yesterday
        </Text>
        {missedTasks.length > 0 ? (
          <List spacing={2}>
            {missedTasks.map((task, i) => (
              <ListItem key={i} fontSize="sm" color={textColorSecondary}>
                <ListIcon as={MdWarning} color="orange.400" />
                {task}
              </ListItem>
            ))}
          </List>
        ) : (
          <Text fontSize="sm" color="green.500" fontWeight="500">
            No missed tasks – nice work! 🎉
          </Text>
        )}
      </Box>

      {/* Today's priorities */}
      <Box mb="20px">
        <Text fontSize="sm" fontWeight="600" color={textColor} mb="8px">
          Today&apos;s priorities
        </Text>
        <List spacing={2} mb="8px">
          {priorities.map((p, i) => (
            <ListItem key={i} fontSize="sm" color={textColorSecondary}>
              <ListIcon as={MdCheckCircle} color={brandColor} />
              {p}
            </ListItem>
          ))}
        </List>
        {priorities.length < 3 && (
          <Flex gap="8px">
            <Input
              placeholder="Add a priority…"
              size="sm"
              borderRadius="10px"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addPriority();
              }}
            />
            <IconButton
              aria-label="Add priority"
              icon={<Icon as={MdAdd} />}
              size="sm"
              colorScheme="brand"
              borderRadius="full"
              onClick={addPriority}
              transition="all 0.2s ease"
              _hover={{ transform: 'scale(1.1) rotate(90deg)' }}
            />
          </Flex>
        )}
      </Box>

      {/* Streak */}
      <Flex align="center" gap="8px">
        <Box
          transition="all 0.3s ease"
          _hover={{ transform: 'scale(1.2)' }}
        >
          <Icon as={MdLocalFireDepartment} w="24px" h="24px" color="orange.400" />
        </Box>
        <Text fontSize="sm" color={textColor} fontWeight="600">
          5 day streak 🔥
        </Text>
        <Text fontSize="xs" color={textColorSecondary}>
          — Days with all priorities completed
        </Text>
      </Flex>
    </Card>
  );
}
