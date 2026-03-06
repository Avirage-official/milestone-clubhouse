// Chakra imports
import { Box, Flex, Icon, useColorModeValue, Text, keyframes } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAuth';
import FixedPlugin from 'components/fixedPlugin/FixedPlugin';
// Assets
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import { ReactNode } from 'react';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

function AuthIllustration(props: {
  children: ReactNode;
  illustrationBackground: string;
}) {
  const authBg = useColorModeValue('white', 'navy.900');
  const { children } = props;
  return (
    <Flex minW="100vh" w="100%" bg={authBg} position="relative" h="max-content">
      <Flex
        h={{
          sm: 'initial',
          md: 'unset',
          lg: '100vh',
          xl: '100vh',
        }}
        w={{ base: '100vw', md: '100%' }}
        maxW={{ md: '66%', lg: '1313px' }}
        mx={{ md: 'auto' }}
        pt={{ sm: '50px', md: '0px' }}
        px={{ lg: '30px', xl: '0px' }}
        ps={{ xl: '70px' }}
        justifyContent="start"
        direction="column"
      >
        <Link
          href="/admin"
          style={{
            width: 'fit-content',
            marginTop: '40px',
          }}
        >
          <Flex
            align="center"
            ps={{ base: '25px', lg: '0px' }}
            pt={{ lg: '0px', xl: '0px' }}
            w="fit-content"
          >
            <Icon
              as={FaChevronLeft}
              me="12px"
              h="13px"
              w="8px"
              color="secondaryGray.600"
            />
            <Text ms="0px" fontSize="sm" color="secondaryGray.600">
              Back to Milestone
            </Text>
          </Flex>
        </Link>
        {children}
        {/* Milestone branded illustration panel */}
        <Box
          display={{ base: 'none', md: 'block' }}
          h="100%"
          minH="100vh"
          w={{ lg: '50vw', '2xl': '44vw' }}
          position="absolute"
          right="0px"
        >
          <Flex
            bgGradient="linear(to-br, brand.500, brand.800, navy.900)"
            justify="center"
            align="center"
            w="100%"
            h="100%"
            position="absolute"
            borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
            direction="column"
            overflow="hidden"
          >
            {/* Animated decorative circles */}
            <Box
              position="absolute"
              top="10%"
              left="10%"
              w="200px"
              h="200px"
              borderRadius="full"
              bg="whiteAlpha.100"
              animation={`${float} 6s ease-in-out infinite`}
            />
            <Box
              position="absolute"
              bottom="15%"
              right="10%"
              w="150px"
              h="150px"
              borderRadius="full"
              bg="whiteAlpha.100"
              animation={`${float} 8s ease-in-out infinite 1s`}
            />
            <Box
              position="absolute"
              top="40%"
              right="25%"
              w="80px"
              h="80px"
              borderRadius="full"
              bg="whiteAlpha.50"
              animation={`${pulse} 4s ease-in-out infinite`}
            />
            <Box
              position="absolute"
              bottom="30%"
              left="20%"
              w="60px"
              h="60px"
              borderRadius="full"
              bg="whiteAlpha.50"
              animation={`${pulse} 5s ease-in-out infinite 0.5s`}
            />

            {/* Milestone branding */}
            <Box
              textAlign="center"
              zIndex="1"
              animation={`${slideUp} 0.8s ease-out`}
            >
              <Text
                fontSize={{ lg: '52px', xl: '64px' }}
                fontWeight="800"
                color="white"
                letterSpacing="-1px"
                mb="16px"
              >
                Milestone
              </Text>
              <Text
                fontSize={{ lg: 'lg', xl: 'xl' }}
                color="whiteAlpha.800"
                fontWeight="400"
                maxW="360px"
                mx="auto"
                lineHeight="1.6"
              >
                Your clubhouse for productive, joyful work.
              </Text>
              {/* Decorative line */}
              <Box
                mt="32px"
                mx="auto"
                w="60px"
                h="4px"
                borderRadius="full"
                bg="whiteAlpha.500"
              />
            </Box>
          </Flex>
        </Box>
        <Footer mb={{ xl: '3vh' }} />
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}

export default AuthIllustration;
