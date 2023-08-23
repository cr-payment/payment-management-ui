import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------
interface Props {
  disabledLink?: boolean;
  sx?: object;
}

export const Logo = forwardRef(({ disabledLink = false, sx }: Props, ref) => {
  const logo = (
    <Box
      component="img"
      src={process.env.PUBLIC_URL + '/assets/logo.png'}
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});
