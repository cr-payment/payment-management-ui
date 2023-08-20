import { Icon, IconifyIcon } from '@iconify/react';
import { Box } from '@mui/material';
import React, { forwardRef } from 'react';

// ----------------------------------------------------------------------
interface Props {
  sx?: object;
  width?: number | string;
  icon: IconifyIcon | string;
}

export const Iconify = forwardRef(
  ({ icon, width = 20, sx, ...other }: Props, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

// export default Iconify;
