import React from 'react';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import TvIcon from '@material-ui/icons/Tv';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SideNavDrawer from './sidenav/SideNavDrawer';
import SideNavHeader from './sidenav/SideNavHeader';
import SideNavSignOut from './sidenav/SideNavSignOut';
import SideNavLinks from './sidenav/SideNavLinks';
import ThemeToggle from './sidenav/ThemeToggle';

const sidenavItems = [
  {
    text: 'Home',
    path: '/',
    icon: <HomeIcon />
  },
  {
    text: 'Join',
    path: '/play',
    icon: <VideogameAssetIcon />
  },
  {
    text: 'Host',
    path: '/host',
    icon: <TvIcon />
  },
  {
    text: 'Emcee',
    path: '/emcee',
    icon: <RecordVoiceOverIcon />
  },
];

const SideNav = ({ open, toggleDrawer, toggleTheme, user }) => {

  return (
      <SideNavDrawer open={open} onClose={toggleDrawer} >
          <SideNavHeader user={user}
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer} />
          <Divider />
          <SideNavLinks items={sidenavItems} toggleDrawer={toggleDrawer} />
          <Divider />
          <SideNavSignOut />
          <Divider />
          <ThemeToggle toggleTheme={toggleTheme} />
      </SideNavDrawer>
  );
}

export default SideNav;
