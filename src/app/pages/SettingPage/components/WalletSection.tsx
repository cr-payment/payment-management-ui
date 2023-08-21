import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from 'types';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Chain, { TokenList } from './Chain';
import {
  switchChain,
  changeAddress,
  useWalletSlice,
  addWalletRequest,
} from 'app/pages/SettingPage/slice/walletReducer';
import { chainType } from 'app/pages/SettingPage/slice/types';
import { selectAtChain, selectChainList } from '../slice/selectors';
// xử lí lưu vào store khi thay đổi
const WalletAddress = ({ chainId }) => {
  const chainList: chainType[] = useSelector(selectChainList);
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
    // dispatch(changeAddress({ chainId: chainId, newAddress: newAddress }));
    dispatch(
      addWalletRequest({ networkId: chainId, walletAddress: newAddress })
    );
  };

  return (
    <form onSubmit={handleSaveAddress}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Wallet address</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="walletAddress"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            type="text"
            size="small"
            sx={{width:300}}

          />
        </Grid>
      </Grid>
      <Box flexGrow={15} my={2}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
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
  const chainList: chainType[] = useSelector(selectChainList);
  const atChainId = useSelector(selectAtChain);
  const dispatch = useDispatch();
  const handleChain = (chainId: number) => {
    // TODO dispatch change info of chain -> tokens accepted
    dispatch(switchChain(chainId));
  };

  return (
    <div>
      <Typography variant="h4">Supported chains</Typography>
      <Box flexGrow={15} my={2}></Box>
      <Grid container spacing={2}>
        {chainList.map((chain) => (
          <Chain
            key={chain.id}
            chain={chain}
            handleClick={() => handleChain(chain.id)}
          />
        ))}
      </Grid>
      <Box flexGrow={15} my={2}></Box>
      <WalletAddress chainId={atChainId} />
      <Typography variant="h4">Choose tokens to pay</Typography>
      <Box flexGrow={15} my={2}></Box>
      <TokenList chainId={atChainId} />
    </div>
  );
};

export default WalletSection;
