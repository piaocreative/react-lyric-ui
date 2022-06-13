import { AppBar, Box, Button, Container, IconButton, makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { FC, useState } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { Routes } from '../../config/Routes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { authSlice } from '../../redux/auth.slice';
import { Logo } from '../atoms/Logo';

const useStyles = makeStyles((theme) => ({
  logo: {
    cursor: 'pointer',
  },
}));

export const Header: FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();

  const openMenu = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="space-between">
          <Logo className={classes.logo} onClick={() => history.push(Routes.Catalog)} size="small" />

          <Box display="flex" alignItems="center" style={{ gap: 20 }}>
            {location.pathname !== Routes.Upload && (
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  history.push(Routes.Upload);
                }}
              >
                Upload
              </Button>
            )}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem component={RouterLink} to={Routes.Catalog}>Catalog</MenuItem>
              <MenuItem component={RouterLink} to={Routes.Profile}>Profile</MenuItem>
              <MenuItem onClick={() => dispatch(authSlice.actions.logOut())}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
