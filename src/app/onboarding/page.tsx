'use client';

import { Suspense } from 'react';
import OnboardingWizard from 'views/onboarding/OnboardingWizard';

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingWizard />
    </Suspense>
  );
}
