import React, {FC, ReactNode} from "react";
import styles from './Box.module.css';

interface Props {
  children: ReactNode;
  label?: string;
}

export const Box: FC<Props> = ({label, children}) => {
  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
};