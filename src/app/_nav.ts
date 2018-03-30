export const navigation = [
  {
    name: 'CHỨC NĂNG CHÍNH',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop'
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
  // {
  //   title: true,
  //   name: 'Components'
  // },
  {
    name: 'Thống kê trạng thái',
    url: '/thongke',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Thống kê chất lượng hệ thống',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Trạng thái kết nối RF-Mesh theo Điện lực',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Sơ đồ quan hệ RF-Mesh',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Trạng thái kết nối RF-Mesh theo Trạm',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tỉ lệ online TB theo Tháng/Quý',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      // {
      //   name: 'Popovers',
      //   url: '/base/popovers',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Progress',
      //   url: '/base/progress',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Switches',
      //   url: '/base/switches',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Tables',
      //   url: '/base/tables',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Tabs',
      //   url: '/base/tabs',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Tooltips',
      //   url: '/base/tooltips',
      //   icon: 'icon-puzzle'
      // }
    ]
  },
  {
    name: 'Ghi chỉ số và ra hóa đơn',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Ghép chỉ số vào file CMIS',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Ghép chỉ số đổi giá?',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Ghép file XML giữa Web và Thiết bị',
        url: '/buttons/social-buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Xem chỉ số cmis ở ngày bất kỳ/tháng',
        url: '/buttons/social-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Giám sát các thông số điện',
    url: '/giamsat',
    icon: 'icon-star',
    children: [
      {
        name: 'Chỉ số c.tơ khách hàng',
        url: '/icons/flags',
        icon: 'icon-star',
        // badge: {
        //   variant: 'success',
        //   text: 'NEW'
        // }
      },
      {
        name: 'TSVH c.tơ khách hàng',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        // badge: {
        //   variant: 'secondary',
        //   text: '4.7'
        // }
      },
      {
        name: 'Dữ liệu đ.đo trạm biến áp',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      },
      {
        name: 'Chỉ số chốt ngày c.tơ',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      },
      {
        name: 'Chỉ số chốt tháng c.tơ',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      },
      {
        name: 'Đọc tức thời đ.đo',
        url: '/giamsat/docdiemdo',
        icon: 'icon-star'
      },
      {
        name: 'Đọc tức thời từ DCU',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Cảnh báo/Tổn thất',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Ước tính tổn thất',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'CB non tải, quá tải TBA',
        url: '/notifications/modals',
        icon: 'icon-bell'
      },
      {
        name: 'Cảnh báo vận hành đ.đo',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Nhập thông tin KH từ CMIS',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Điểm đo khai báo sai TT',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'KH treo/tháo c.tơ',
        url: '/notifications/modals',
        icon: 'icon-bell'
      },
      {
        name: 'KH khai báo CMIS không được cập nhật',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  
  {
    name: 'Báo cáo',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Thống kê sản lượng',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Đánh giá chất lượng phân phối điện',
        url: '/notifications/modals',
        icon: 'icon-bell'
      },
      {
        name: 'Báo cáo vận hành',
        url: '/notifications/modals',
        icon: 'icon-bell'
      },
      {
        name: 'Xuất thông tin điểm đo',
        url: '/notifications/modals',
        icon: 'icon-bell'
      },
      {
        name: 'Nhật ký lắp đặt vận hành',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Quản lý',
    url: '/quanly',
    icon: 'icon-bell',
    children: [
      {
        name: 'Quản lý người dùng',
        url: '/quanly/nguoidung',
        icon: 'icon-bell'
      },
      // {
      //   name: 'Đánh giá chất lượng phân phối điện',
      //   url: '/notifications/modals',
      //   icon: 'icon-bell'
      // },
      // {
      //   name: 'Báo cáo vận hành',
      //   url: '/notifications/modals',
      //   icon: 'icon-bell'
      // },
      // {
      //   name: 'Xuất thông tin điểm đo',
      //   url: '/notifications/modals',
      //   icon: 'icon-bell'
      // },
      // {
      //   name: 'Nhật ký lắp đặt vận hành',
      //   url: '/notifications/modals',
      //   icon: 'icon-bell'
      // }
    ]
  },
  {
    divider: true
  },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/pages/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/pages/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/pages/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/pages/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success'
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger'
  // }
];
