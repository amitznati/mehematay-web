import React from 'react';
import {AppBar} from 'az-ui-library';
import * as logo from '../styles/assets/ic_launcher_round.png';
const navigationLinks = [
  { title: 'בית', to: '/', active: true },
  { title: 'זמני היום', to: '/day-times' },
  { title: 'תפילה קרובה', to: '#' },
  { title: 'אודות', to: '#' }
];

export default function Navigation() {
  return (
    <AppBar logoSrc={logo} navigationLinks={navigationLinks} title="זמני היום" />
  );
}
