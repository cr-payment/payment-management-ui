import { Box, List, ListItemText } from '@mui/material';
import { NavProps } from 'layouts/dashboard/Nav/config';
import React, { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------
interface INavSection extends HTMLAttributes<HTMLDivElement> {
  data: NavProps[];
}

export function NavSection({ data = [], ...other }: INavSection) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface INavItem {
  item: NavProps;
}

function NavItem({ item }: INavItem) {
  const { title, path, icon } = item;

  return (
    <StyledNavItem
      disableGutters
      component={NavLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />
    </StyledNavItem>
  );
}
