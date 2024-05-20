import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSpeedometer,
} from '@coreui/icons'
import {  CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'History',
    to: '/history',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
