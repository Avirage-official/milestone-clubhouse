'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Text,
  keyframes,
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

const STORAGE_KEY = 'milestone_onboarding';

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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

/**
 * Safely read persisted onboarding state from sessionStorage.
 */
function loadPersistedState(): { step: number; data: OnboardingData } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed.step === 'number' &&
      parsed.step >= 0 &&
      parsed.step < TOTAL_STEPS &&
      parsed.data
    ) {
      return { step: parsed.step, data: parsed.data };
    }
  } catch {
    // ignore corrupted storage
  }
  return null;
}

/**
 * Replace this function with an API call when the backend is ready.
 * e.g. await saveOnboardingProfile(data);
 */
async function saveOnboardingProfile(data: OnboardingData): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('[Onboarding] Profile data collected:', data);
}

const STEP_LABELS = [
  'About You',
  'Work Style',
  'Identity',
  'Pet Setup',
  'Preferences',
];

export default function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  // Restore state from sessionStorage on mount (survives refresh)
  const [step, setStep] = useState(() => {
    if (isDemo) return 0;
    const persisted = loadPersistedState();
    return persisted ? persisted.step : 0;
  });

  const [data, setData] = useState<OnboardingData>(() => {
    if (isDemo) return DEMO_DATA;
    const persisted = loadPersistedState();
    return persisted ? persisted.data : initialData;
  });

  // Track animation direction (1 = forward, -1 = backward)
  const [direction, setDirection] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const isFinishing = useRef(false);

  // Persist state to sessionStorage whenever step or data changes
  useEffect(() => {
    if (isDemo) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch {
      // storage full or unavailable – ignore
    }
  }, [step, data, isDemo]);

  // Clean up storage on finish
  const clearStorage = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // ---- colours ----
  const bg = useColorModeValue('secondaryGray.300', 'navy.900');
  const cardBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('navy.700', 'white');
  const subtleText = useColorModeValue('secondaryGray.600', 'secondaryGray.500');
  const dotActive = useColorModeValue('brand.500', 'brand.400');
  const dotInactive = useColorModeValue('secondaryGray.300', 'navy.700');
  const progressBg = useColorModeValue('secondaryGray.200', 'navy.700');
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  // ---- step helpers ----
  const next = useCallback(() => {
    setDirection(1);
    setAnimKey((k) => k + 1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setAnimKey((k) => k + 1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const finish = useCallback(async () => {
    if (isFinishing.current) return;
    isFinishing.current = true;
    await saveOnboardingProfile(data);
    clearStorage();
    router.push('/admin/default');
  }, [data, router, clearStorage]);

  // ---- handle browser back button ----
  useEffect(() => {
    const handlePopState = () => {
      if (step > 0) {
        prev();
        // Push a new entry so back button can be used again
        window.history.pushState(null, '', window.location.href);
      }
    };

    // Push an initial entry so we can intercept back
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step, prev]);

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

  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100;

  const stepAnimation =
    direction >= 0
      ? `${slideIn} 0.35s ease-out`
      : `${slideIn} 0.35s ease-out reverse`;

  return (
    <Flex
      minH="100vh"
      bg={bg}
      align="center"
      justify="center"
      px={{ base: '16px', md: '24px' }}
      py="40px"
    >
      <Box w="100%" maxW="600px" animation={`${fadeIn} 0.5s ease-out`}>
        {/* Milestone header */}
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="800"
          color={brandColor}
          mb="8px"
          letterSpacing="-0.5px"
        >
          Milestone
        </Text>
        <Text
          textAlign="center"
          fontSize="sm"
          color={subtleText}
          mb="28px"
        >
          Let&apos;s set up your clubhouse
        </Text>

        {/* Progress bar */}
        <Box mb="8px" px="4px">
          <Box
            h="6px"
            borderRadius="full"
            bg={progressBg}
            overflow="hidden"
          >
            <Box
              h="100%"
              borderRadius="full"
              bg={dotActive}
              w={`${progressPercent}%`}
              transition="width 0.4s ease"
            />
          </Box>
        </Box>

        {/* Step label & counter */}
        <Flex justify="space-between" align="center" mb="16px" px="4px">
          <Text fontSize="sm" fontWeight="600" color={textColor}>
            {STEP_LABELS[step]}
          </Text>
          <Text fontSize="sm" color={subtleText}>
            {step + 1} / {TOTAL_STEPS}
          </Text>
        </Flex>

        {/* Progress dots */}
        <HStack justify="center" spacing="8px" mb="24px">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <Box
              key={i}
              w={i === step ? '24px' : '10px'}
              h="10px"
              borderRadius="full"
              bg={i <= step ? dotActive : dotInactive}
              transition="all 0.3s ease"
            />
          ))}
        </HStack>

        {/* Card */}
        <Card bg={cardBg} borderRadius="20px" boxShadow="lg">
          <CardBody p={{ base: '24px', md: '40px' }}>
            <Box
              key={animKey}
              animation={stepAnimation}
            >
              {renderStep()}
            </Box>

            {/* Navigation buttons */}
            <Flex mt="32px" justify="space-between">
              <Button
                variant="outline"
                colorScheme="brandScheme"
                onClick={prev}
                isDisabled={step === 0}
                borderRadius="16px"
                transition="all 0.2s ease"
              >
                Back
              </Button>

              {step < TOTAL_STEPS - 1 ? (
                <Button
                  variant="brand"
                  onClick={next}
                  borderRadius="16px"
                  transition="all 0.2s ease"
                  _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
                  _active={{ transform: 'translateY(0px)' }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="brand"
                  onClick={finish}
                  borderRadius="16px"
                  transition="all 0.2s ease"
                  _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
                  _active={{ transform: 'translateY(0px)' }}
                >
                  🎉 Finish Setup
                </Button>
              )}
            </Flex>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
}
