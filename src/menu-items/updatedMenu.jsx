/* eslint-disable prettier/prettier */
// type
import { Home3, HomeTrendUp, Box, Archive, User,ScanBarcode, Timer1, Setting2, Gallery, ArchiveBook } from 'iconsax-react';

// icons
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  artifacts: Box,
  stockRegistering: Archive,
  users: User,
  settings: Setting2,
  timetable: Timer1,
  library:ArchiveBook, 
  gallery:Gallery,
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
      id: 'stock',
      title: 'Stocks',
      type: 'item',
      url: '/stock-registering',
      icon: icons.stockRegistering,
      breadcrumbs: false
    },
    // {
    //   id: 'users',
    //   title: 'Users',
    //   type: 'item',
    //   url: '/users',
    //   icon: icons.users,
    //   breadcrumbs: false
    // },
 
  
    {
      id: 'library',
      title: 'Library',
      type: 'item',
      url: '/library',
      icon: icons.library,
      breadcrumbs: false
    },
    {
      id: 'gallery',
      title: 'Gallery',
      type: 'item',
      url: '/gallery',
      icon: icons.gallery,
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
      id: 'timetable',
      title: 'Timimgs',
      type: 'item',
      url: '/time-tables',
      icon: icons.timetable,
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
