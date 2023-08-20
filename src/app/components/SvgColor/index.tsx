import { forwardRef } from 'react';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
  src: string;
  sx: object;
}

export const SvgColor = forwardRef(({ src, sx, ...other }: Props, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));
