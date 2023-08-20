import { Badge, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toggleToken } from 'app/pages/SettingPage/slice/walletReducer';
import { RootState } from 'types/RootState';

const CustomBadge = ({ invisible }) => {
  return (
    <Badge color="success">
      {invisible ? null : (
        <CheckCircleIcon style={{ fontSize: 25, color: 'green' }} />
      )}
    </Badge>
  );
};

const Item = ({
  imgPath,
  handleClick,
  isChain,
  invisible,
  chainName,
  color,
}) => {
  return (
    <Grid item xs={12} sm={4} md={2}>
      <Button
        // elevation={3}
        variant="outlined"
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: color,
          '&:hover': {
            backgroundColor: 'lightgrey', // Change to your desired hover color
            cursor: 'pointer',
          },
        }}
      >
        <div>
          <img src={imgPath} alt="Button Icon" width="40px" height="40px" />
        </div>
        {isChain ? (
          <>
            <Typography>{chainName}</Typography>
            <CustomBadge invisible={invisible} />
          </>
        ) : null}
      </Button>
    </Grid>
  );
};

export const TokenList = ({ chainId }) => {
  const tokens = useSelector(
    (state: RootState) => state.chainInfo.chains[chainId - 1].tokens
  );
  const dispatch = useDispatch();
  const handleToggleToken = (tokenId) => {
    console.log('toggle token ', chainId, ' ', tokenId);
    dispatch(toggleToken({ chainId: chainId, tokenId: tokenId }));
  };
  return (
    <Grid container spacing={2}>
      {tokens.map((token, index) => (
        <Item
          key={index}
          imgPath={`/assets/images/chains/tokens/${token.name}.jpg`}
          handleClick={() => handleToggleToken(index)}
          isChain={false}
          invisible={false}
          chainName={''}
          color={token.on ? 'orange' : ''}
        />
      ))}
    </Grid>
  );
};

const Chain = ({ chain, handleClick }) => {
  const imgPath = `/assets/images/chains/${chain.name}.png`;
  const atChainId = useSelector((state: RootState) => state.chainInfo.atChain);

  // TODO validate wallet address
  const inv = !chain.walletAddress;
  const chainColor = chain.id === atChainId ? 'orange' : '';
  return (
    <Item
      imgPath={imgPath}
      handleClick={handleClick}
      isChain={true}
      invisible={inv}
      chainName={''}
      color={chainColor}
    />
  );
};
export default Chain;
