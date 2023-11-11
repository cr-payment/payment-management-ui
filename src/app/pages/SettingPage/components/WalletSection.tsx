import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from 'types';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Chain, { TokenList } from './Chain';
import {
  switchChain,
  changeAddress,
  useWalletSlice,
} from 'app/pages/SettingPage/slice/walletReducer';
import { chainType } from 'app/pages/SettingPage/slice/walletReducer';
// xử lí lưu vào store khi thay đổi
const WalletAddress = ({ chainId }) => {
  const chainList: chainType[] = useSelector(
    (state: RootState) => state.chainInfo.chains
  );
  const chain: chainType | undefined = chainList.find(
    (chain) => chain.id === chainId
  );
  const dispatch = useDispatch();

  const defaultVal: string = chain!.walletAddress;
  const [walletAddress, setWalletAddress] = useState<string>(defaultVal);

  // Update the value whenever the defaultVal prop changes
  useEffect(() => {
    setWalletAddress(defaultVal);
  }, [defaultVal]);
  const handleWalletAddressChange = (event) => {
    event.preventDefault();
    setWalletAddress(event.target.value);
  };

  const handleSaveAddress = (event) => {
    event.preventDefault();
    const newAddress = event.target.walletAddress.value;
    dispatch(changeAddress({ chainId: chainId, newAddress: newAddress }));
  };

  return (
    <form onSubmit={handleSaveAddress}>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ p: 0 }}>
            Wallet address
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="walletAddress"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            type="text"
            size="small"
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const WalletSection = () => {
  const { actions } = useWalletSlice();
  const chainList: chainType[] = useSelector(
    (state: RootState) => state.chainInfo.chains
  );
  const atChainId = useSelector((state: RootState) => state?.chainInfo.atChain);
  const dispatch = useDispatch();
  const handleChain = (chainId: number) => {
    // TODO dispatch change info of chain -> tokens accepted
    dispatch(switchChain(chainId));
  };

  return (
    <div>
      <WalletAddress chainId={atChainId} />
      <h2>Choose tokens to receive</h2>
      <TokenList chainId={atChainId} />
    </div>
  );
};

export default WalletSection;
