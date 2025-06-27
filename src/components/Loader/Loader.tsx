'use client';

import React from 'react';
import classes from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={classes.overlay}>
      <div className={classes.content}>
        <div className={classes.spinner} />
        <div className={classes.text}>NOVELUS</div>
      </div>
    </div>
  );
}
