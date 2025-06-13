'use client';

import React from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        <div className={styles.text}>NOVELUS</div>
      </div>
    </div>
  );
}
