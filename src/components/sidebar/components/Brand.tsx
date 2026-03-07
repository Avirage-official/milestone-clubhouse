// Chakra imports
import { Flex, Text, useColorModeValue, keyframes } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  60% { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

export function SidebarBrand() {
	//   Chakra color mode
	let textColor = useColorModeValue('navy.700', 'white');
	let accentColor = useColorModeValue('brand.500', 'brand.400');

	return (
		<Flex alignItems='center' flexDirection='column' my='32px' animation={`${popIn} 0.6s ease-out`}>
			<Text
				fontSize='xl'
				fontWeight='800'
				color={textColor}
				letterSpacing='-0.5px'
				lineHeight='1.2'
			>
				Milestone
			</Text>
			<Text
				fontSize='sm'
				fontWeight='600'
				color={accentColor}
				letterSpacing='1px'
				textTransform='uppercase'
			>
				Clubhouse
			</Text>
			<HSeparator mb='20px' mt='16px' />
		</Flex>
	);
}

export default SidebarBrand;
