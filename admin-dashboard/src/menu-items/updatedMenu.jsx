/* eslint-disable prettier/prettier */
// type
import { Home3, HomeTrendUp, Box, Archive, User,ScanBarcode,  Setting2 } from 'iconsax-react';

// icons
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  artifacts: Box,
  stockRegistering: Archive,
  users: User,
  settings: Setting2,
  ScanBarcode: ScanBarcode
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const UpdatedMenu = {
  id: 'group-dashboard',
  title: 'Navigation',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.dashboard,
      breadcrumbs: false
    },
    {
      id: 'artifacts',
      title: 'Artifacts',
      type: 'item',
      url: '/artifacts',
      icon: icons.artifacts,
      breadcrumbs: false
    },
    {
      id: 'stock-registering',
      title: 'Stock Registering',
      type: 'item',
      url: '/stock-registering',
      icon: icons.stockRegistering,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.users,
      breadcrumbs: false
    },
    {
      id: 'qr-codes',
      title: 'Qr Codes',
      type: 'item',
      url: '/qr-codes',
      icon: icons.ScanBarcode,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.settings,
      breadcrumbs: false
    }
  ]
};

export default UpdatedMenu;
