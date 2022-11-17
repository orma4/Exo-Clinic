import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Users']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/admin/users',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '404 Page',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
 
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
