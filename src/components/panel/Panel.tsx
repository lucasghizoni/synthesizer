import React, { FC, ReactNode } from 'react';
import cx from 'classnames';

import styles from './Panel.module.css';

interface Props {
  className?: string
  children: ReactNode;
}

export const Panel: FC<Props> = ({children, className}) => (
  <div className={cx(styles.container, className)}>
    {children}
  </div>
);