import {
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
  keyframes,
} from '@chakra-ui/react';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const wiggle = keyframes`
  0%, 100% { transform: translate(-50%, 0%) rotate(0deg); }
  25% { transform: translate(-50%, 0%) rotate(-3deg); }
  75% { transform: translate(-50%, 0%) rotate(3deg); }
`;

export default function SidebarDocs() {
  const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';
  const borderColor = useColorModeValue('white', 'navy.800');

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="30px"
      me="20px"
      position="relative"
    >
      <Flex
        border="5px solid"
        borderColor={borderColor}
        bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
        borderRadius="50%"
        w="94px"
        h="94px"
        align="center"
        justify="center"
        mx="auto"
        position="absolute"
        left="50%"
        top="-47px"
        transform="translate(-50%, 0%)"
        animation={`${wiggle} 3s ease-in-out infinite`}
        fontSize="40px"
      >
        🏠
      </Flex>
      <Flex
        direction="column"
        mb="12px"
        align="center"
        justify="center"
        px="15px"
        pt="55px"
      >
        <Text
          fontSize={{ base: 'lg', xl: '18px' }}
          color="white"
          fontWeight="bold"
          lineHeight="150%"
          textAlign="center"
          px="10px"
          mb="14px"
          bgGradient="linear(to-r, white, whiteAlpha.800, white)"
          bgClip="text"
          bgSize="200% auto"
          animation={`${shimmer} 3s linear infinite`}
        >
          Milestone Clubhouse
        </Text>
        <Text
          fontSize="14px"
          color={'white'}
          px="10px"
          mb="14px"
          textAlign="center"
        >
          Your fun &amp; productive workspace awaits!
        </Text>
      </Flex>
      <Link href="">
        <Button
          bg="whiteAlpha.300"
          _hover={{ bg: 'whiteAlpha.200', transform: 'scale(1.05)' }}
          _active={{ bg: 'whiteAlpha.100', transform: 'scale(0.98)' }}
          mb={{ sm: '16px', xl: '24px' }}
          color={'white'}
          fontWeight="regular"
          fontSize="sm"
          minW="185px"
          mx="auto"
          borderRadius="full"
          transition="all 0.25s ease"
        >
          Explore More ✨
        </Button>
      </Link>
    </Flex>
  );
}
