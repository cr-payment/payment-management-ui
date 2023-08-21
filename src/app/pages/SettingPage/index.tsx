/**
 *
 * SettingPage
 *
 */
import Button from 'theme/overrides/Button';
import Info from './components/Info';
import WalletSection from './components/WalletSection';
import * as React from 'react';
import Bill from '../ProjectPagePopup/components/Bill';
import { selectAuth } from '../LoginPage/slice/selectors';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

export function SettingPage() {
  // TODO if not authed, redirect to login page
  const { loading, dataAuth, error } = useSelector(selectAuth);
  if (!dataAuth) {
    window.location.href = '/login';
  }
  return (
    <div>
      <Bill></Bill>
      <Typography variant="h3">Settings</Typography>
      <Box flexGrow={15} my={2}></Box>
      <Info />
      <Box flexGrow={15} my={2}></Box>
      <Typography variant="h3">Wallets</Typography>
      <Box flexGrow={15} my={2}></Box>
      <WalletSection />
    </div>
  );
}
