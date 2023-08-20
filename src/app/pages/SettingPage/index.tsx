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

interface Props {}

export function SettingPage(props: Props) {
  return (
    <div>
      {/* TODO button for bill popup*/}
      {/* <button onClick={()=>{}}>Bill</button> */}
      <Bill></Bill>
      <h1>Settings</h1>
      <Info />
      <h1>Wallets</h1>
      <WalletSection />
    </div>
  );
}
