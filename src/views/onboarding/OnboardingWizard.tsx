'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import StepAboutYou, {
  StepAboutYouData,
} from './components/StepAboutYou';
import StepWorkStyle, {
  StepWorkStyleData,
} from './components/StepWorkStyle';
import StepClubhouseIdentity, {
  StepClubhouseIdentityData,
} from './components/StepClubhouseIdentity';
import StepPetSetup, {
  StepPetSetupData,
} from './components/StepPetSetup';
import StepPreferences, {
  StepPreferencesData,
} from './components/StepPreferences';

export interface OnboardingData {
  aboutYou: StepAboutYouData;
  workStyle: StepWorkStyleData;
  clubhouseIdentity: StepClubhouseIdentityData;
  petSetup: StepPetSetupData;
  preferences: StepPreferencesData;
}

const TOTAL_STEPS = 5;

const DEMO_DATA: OnboardingData = {
  aboutYou: {
    firstName: 'Alex',
    companyEmail: 'alex@milestone.app',
    role: 'Engineering',
  },
  workStyle: {
    focusTime: 'Morning',
    workStyle: 'Sprinter',
  },
  clubhouseIdentity: {
    clubhouseName: 'RocketRanger',
    theme: 'purple',
  },
  petSetup: {
    pet: 'fox',
    petName: 'Blaze',
    petHelp: 'Celebrate my wins',
  },
  preferences: {
    breakReminders: true,
    notificationStyle: 'Playful',
  },
};

const initialData: OnboardingData = {
  aboutYou: { firstName: '', companyEmail: '', role: '' },
  workStyle: { focusTime: '', workStyle: '' },
  clubhouseIdentity: { clubhouseName: '', theme: '' },
  petSetup: { pet: '', petName: '', petHelp: '' },
  preferences: { breakReminders: true, notificationStyle: 'Chill' },
};

/**
 * Replace this function with an API call when the backend is ready.
 * e.g. await saveOnboardingProfile(data);
 */
async function saveOnboardingProfile(data: OnboardingData): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('[Onboarding] Profile data collected:', data);
}

export default function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(
    isDemo ? DEMO_DATA : initialData,
  );

  // ---- colours ----
  const bg = useColorModeValue('secondaryGray.300', 'navy.900');
  const cardBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('navy.700', 'white');
  const dotActive = useColorModeValue('brand.500', 'brand.400');
  const dotInactive = useColorModeValue('secondaryGray.300', 'navy.700');

  // ---- step helpers ----
  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)), []);
  const prev = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const finish = useCallback(async () => {
    await saveOnboardingProfile(data);
    router.push('/admin/default');
  }, [data, router]);

  // ---- autonomous demo ----
  useEffect(() => {
    if (!isDemo) return;
    const timer = setTimeout(() => {
      if (step < TOTAL_STEPS - 1) {
        next();
      } else {
        finish();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isDemo, step, next, finish]);

  // ---- updaters ----
  const updateAboutYou = (d: StepAboutYouData) =>
    setData((prev) => ({ ...prev, aboutYou: d }));
  const updateWorkStyle = (d: StepWorkStyleData) =>
    setData((prev) => ({ ...prev, workStyle: d }));
  const updateIdentity = (d: StepClubhouseIdentityData) =>
    setData((prev) => ({ ...prev, clubhouseIdentity: d }));
  const updatePetSetup = (d: StepPetSetupData) =>
    setData((prev) => ({ ...prev, petSetup: d }));
  const updatePreferences = (d: StepPreferencesData) =>
    setData((prev) => ({ ...prev, preferences: d }));

  // ---- render current step ----
  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepAboutYou data={data.aboutYou} onChange={updateAboutYou} />;
      case 1:
        return <StepWorkStyle data={data.workStyle} onChange={updateWorkStyle} />;
      case 2:
        return (
          <StepClubhouseIdentity
            data={data.clubhouseIdentity}
            onChange={updateIdentity}
          />
        );
      case 3:
        return <StepPetSetup data={data.petSetup} onChange={updatePetSetup} />;
      case 4:
        return (
          <StepPreferences data={data.preferences} onChange={updatePreferences} />
        );
      default:
        return null;
    }
  };

  return (
    <Flex
      minH="100vh"
      bg={bg}
      align="center"
      justify="center"
      px={{ base: '16px', md: '24px' }}
      py="40px"
    >
      <Box w="100%" maxW="600px">
        {/* progress indicator */}
        <Flex justify="center" align="center" mb="24px" gap="8px">
          <Text fontSize="sm" fontWeight="600" color={textColor}>
            Step {step + 1} of {TOTAL_STEPS}
          </Text>
        </Flex>

        <HStack justify="center" spacing="8px" mb="32px">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <Box
              key={i}
              w="10px"
              h="10px"
              borderRadius="full"
              bg={i <= step ? dotActive : dotInactive}
              transition="background 0.3s"
            />
          ))}
        </HStack>

        {/* card */}
        <Card bg={cardBg} borderRadius="20px" boxShadow="lg">
          <CardBody p={{ base: '24px', md: '40px' }}>
            {renderStep()}

            {/* navigation buttons */}
            <Flex mt="32px" justify="space-between">
              <Button
                variant="outline"
                colorScheme="brandScheme"
                onClick={prev}
                isDisabled={step === 0}
                borderRadius="16px"
              >
                Back
              </Button>

              {step < TOTAL_STEPS - 1 ? (
                <Button
                  variant="brand"
                  onClick={next}
                  borderRadius="16px"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="brand"
                  onClick={finish}
                  borderRadius="16px"
                >
                  Finish
                </Button>
              )}
            </Flex>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
}
