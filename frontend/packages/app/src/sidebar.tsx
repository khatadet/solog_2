import React , {useEffect} from 'react';
import HomeIcon from '@material-ui/icons/Home';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import YouTube from '@material-ui/icons/YouTube';
import SignOut from '@material-ui/icons/Settings';


import {
  Sidebar,
  SidebarItem,
  SidebarDivider,
  SidebarSpace,
  SidebarUserSettings,
  SidebarThemeToggle,
  SidebarPinButton,
} from '@backstage/core';



export const AppSidebar = () => (
  <Sidebar>
    <SidebarDivider />
   
    <SidebarItem icon={HomeIcon} to="" text="Home" />
    
    
    <SidebarItem
            icon={CreateComponentIcon}
      to="/solog_modul"
      text="solog_modul"
    />
    <SidebarItem
            icon={CreateComponentIcon}
      to="/solog_modul_farm"
      text="solog_modul_farm"
    />
    <SidebarItem
      icon={CreateComponentIcon}
      to="/solog"
      text="ติดต่อเรา"
    />
    

    <SidebarPinButton />

  <SidebarDivider />
    <SidebarSpace />
    <SidebarDivider />
    <SidebarItem
      icon={SignOut}
      to="sign_out"
      text="Sign Out"
    />

   
  </Sidebar>
);
