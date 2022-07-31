import React, { FC } from 'react';

import styles from './Knob.module.css';

interface Props {
  label?: string;
}

export const Knob: FC<Props> = ({ label }) => {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.knob}/>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}