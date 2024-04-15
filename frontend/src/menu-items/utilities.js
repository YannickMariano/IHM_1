// // assets
// import {
//   AppstoreAddOutlined,
//   AntDesignOutlined,
//   BarcodeOutlined,
//   BgColorsOutlined,
//   FontSizeOutlined,
//   UserOutlined,
//   LoadingOutlined,
//   HomeOutlined,
//   BookOutlined,
//   HourglassOutlined,
//   CalendarOutlined,
//   ApartmentOutlined,
//   ProjectOutlined,
//   OrderedListOutlined,
//   ClockCircleOutlined
// } from '@ant-design/icons';

// // icons
// const icons = {
//   FontSizeOutlined,
//   BgColorsOutlined,
//   UserOutlined,
//   BarcodeOutlined,
//   AntDesignOutlined,
//   LoadingOutlined,
//   AppstoreAddOutlined,
//   HomeOutlined,
//   BookOutlined,
//   HourglassOutlined,
//   CalendarOutlined,
//   ApartmentOutlined,
//   ProjectOutlined,
//   OrderedListOutlined,
//   ClockCircleOutlined
// };

// // ==============================|| MENU ITEMS - UTILITIES ||============================== //

// const utilities = {
//   id: 'utilities',
//   title: 'Utilities',
//   type: 'group',
//   children: [
//     {
//       id: 'util-professeur',
//       title: 'Professeur',
//       type: 'item',
//       url: '/professeur',
//       icon: icons.UserOutlined
//     },
//     {
//       id: 'util-matiere',
//       title: 'matiere',
//       type: 'item',
//       url: '/matiere',
//       icon: icons.BookOutlined
//     },
//     {
//       id: 'util-niveau',
//       title: 'Niveau',
//       type: 'item',
//       url: '/niveau',
//       icon: icons.ProjectOutlined
//     },
//     {
//       id: 'util-parcour',
//       title: 'Parcour',
//       type: 'item',
//       url: '/parcour',
//       icon: icons.ApartmentOutlined
//     },
//     {
//       id: 'util-salle',
//       title: 'salle',
//       type: 'item',
//       url: '/Salle',
//       icon: icons.HomeOutlined
//     },
//     {
//       id: 'util-horaire',
//       title: 'horaire',
//       type: 'item',
//       url: '/horaire',
//       icon: icons.ClockCircleOutlined
//     },
//     {
//       id: 'util-jour',
//       title: 'Jour',
//       type: 'item',
//       url: '/jour',
//       icon: icons.CalendarOutlined
//     },
//     {
//       id: 'util-EDT',
//       title: 'Emploi du temps',
//       type: 'item',
//       url: '/EDT',
//       icon: icons.OrderedListOutlined
//     },
//     {
//       id: 'util-typography',
//       title: 'Typography',
//       type: 'item',
//       url: '/typography',
//       icon: icons.AppstoreAddOutlined
//     },
//     {
//       id: 'util-color',
//       title: 'Color',
//       type: 'item',
//       url: '/color',
//       icon: icons.BgColorsOutlined
//     },
//     {
//       id: 'util-shadow',
//       title: 'Shadow',
//       type: 'item',
//       url: '/shadow',
//       icon: icons.BarcodeOutlined
//     },
//     {
//       id: 'util-icons',
//       title: 'Icons',
//       type: 'item',
//       url: '/icons/ant',
//       icon: icons.AntDesignOutlined,
//       breadcrumbs: false
//     }
//   ]
// };

// export default utilities;


// assets
import {
  TeamOutlined,       // Déjà utilisé pour "Professeur"
  BookOutlined,       // Suggestion pour "Matière"
  RiseOutlined,       // Suggestion pour "Niveau"
  ClusterOutlined,    // Suggestion pour "Parcours"
  HomeOutlined,       // Déjà utilisé pour "Salle"
  ScheduleOutlined,   // Suggestion pour "Horaire"
  // CalendarOutlined
  ClockCircleOutlined,
  OrderedListOutlined
} from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined,       // Déjà utilisé pour "Professeur"
  BookOutlined,       // Suggestion pour "Matière"
  RiseOutlined,       // Suggestion pour "Niveau"
  ClusterOutlined,    // Suggestion pour "Parcours"
  HomeOutlined,       // Déjà utilisé pour "Salle"
  ScheduleOutlined,   // Suggestion pour "Horaire"
  ClockCircleOutlined,
  OrderedListOutlined
  // CalendarOutlined 
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Planification',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Professeur',
      type: 'item',
      url: '/professeur',
      icon: icons.TeamOutlined
    },
    {
      id: 'util-color',
      title: 'Matière',
      type: 'item',
      url: '/matiere',
      icon: icons.BookOutlined
    },
    {
      id: 'util-shadow',
      title: 'Niveau',
      type: 'item',
      url: '/niveau',
      icon: icons.RiseOutlined
    },
    {
      id: 'util-parcours',
      title: 'Parcours',
      type: 'item',
      url: '/parcours',
      icon: icons.ClusterOutlined,
      breadcrumbs: false
    },
    {
      id: 'util-salle',
      title: 'Salle',
      type: 'item',
      url: '/salle',
      icon: icons.HomeOutlined
    },
    {
      id: 'util-horaire',
      title: 'Horaire',
      type: 'item',
      url: '/horaire',
      icon: icons.ClockCircleOutlined
    },
    {
      id: 'util-jour',
      title: 'Jour',
      type: 'item',
      url: '/jour',
      icon: icons.ScheduleOutlined
    },
    {
      id: 'util-calendrier',
      title: 'Calendrier',
      type: 'item',
      url: '/calendrier',
      icon: icons.ScheduleOutlined
    },
    {
      id: 'util-EDT',
      title: 'Emploi du temps',
      type: 'item',
      url: '/EDT',
      icon: icons.OrderedListOutlined
    }
  ]
};

export default utilities;
