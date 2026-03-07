'use client';
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                        
=========================================================
* Milestone - v1.1.0
=========================================================

* Product Page: 
* Copyright 2022 Milestone ()

* Designed and Coded by Milestone

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState } from 'react';
import { Box, Grid, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import IdentityCard from 'views/admin/profile/components/IdentityCard';
import PetSettingsCard from 'views/admin/profile/components/PetSettingsCard';
import PreferencesCard from 'views/admin/profile/components/PreferencesCard';
import PrivacyNote from 'views/admin/profile/components/PrivacyNote';

interface ProfileState {
  // Identity
  firstName: string;
  clubhouseName: string;
  role: string;
  timeZone: string;
  // Pet
  petType: string;
  petName: string;
  petPersonality: string;
  // Preferences
  breakReminders: boolean;
  petNudges: boolean;
  includeInLeaderboards: boolean;
  notificationTone: string;
  maxRemindersPerDay: number;
}

const initialState: ProfileState = {
  firstName: 'Adela',
  clubhouseName: 'AceAdela',
  role: 'Product',
  timeZone: 'America/New_York',
  petType: 'Dog',
  petName: 'Buddy',
  petPersonality: 'Chill',
  breakReminders: true,
  petNudges: true,
  includeInLeaderboards: true,
  notificationTone: 'Chill',
  maxRemindersPerDay: 3,
};

export default function ProfileAndPet() {
  const [state, setState] = useState<ProfileState>(initialState);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  const handleChange = (field: string, value: string | boolean | number) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Box mb="20px">
        <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl">
          Profile &amp; Pet
        </Text>
        <Text color={textColorSecondary} fontSize="md">
          Customize your clubhouse identity and how your pet supports you.
        </Text>
      </Box>

      <Grid
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
        }}
        gap={{ base: '20px', xl: '20px' }}
        mb="20px"
      >
        <IdentityCard
          firstName={state.firstName}
          clubhouseName={state.clubhouseName}
          role={state.role}
          timeZone={state.timeZone}
          onChange={handleChange}
        />
        <PetSettingsCard
          petType={state.petType}
          petName={state.petName}
          petPersonality={state.petPersonality}
          onChange={handleChange}
        />
      </Grid>

      <Grid
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
        }}
        gap={{ base: '20px', xl: '20px' }}
        mb="20px"
      >
        <PreferencesCard
          breakReminders={state.breakReminders}
          petNudges={state.petNudges}
          includeInLeaderboards={state.includeInLeaderboards}
          notificationTone={state.notificationTone}
          maxRemindersPerDay={state.maxRemindersPerDay}
          onChange={handleChange}
        />
        <PrivacyNote />
      </Grid>
    </Box>
  );
}
