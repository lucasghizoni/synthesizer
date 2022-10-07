import React, { FC } from 'react';
import cx from "classnames";

import { Svg } from "../svg/Svg";
import { sawtooth, sine, square, triangle } from "../../svg/waveforms";
import styles from './WaveformSelect.module.css';

interface Props {
  value: Omit<OscillatorType, 'custom'>;
  onChange: (value: Omit<OscillatorType, 'custom'>) => void;
}

export const WaveformSelect: FC<Props> = ({value, onChange}) => (
  <div className={styles.container}>
    <Svg
      dimension={value === 'sawtooth' ? '25' : '20'}
      className={cx(styles.svgIcon, value === 'sawtooth' && styles.active)}
      onClick={() => onChange('sawtooth')}
      config={sawtooth}
    />
    <Svg
      dimension={value === 'square' ? '25' : '20'}
      className={cx(styles.svgIcon, value === 'square' && styles.active)}
      onClick={() => onChange('square')}
      config={square}
    />
    <Svg
      dimension={value === 'sine' ? '25' : '20'}
      className={cx(styles.svgIcon, value === 'sine' && styles.active)}
      onClick={() => onChange('sine')}
      config={sine}
    />
    <Svg
      dimension={value === 'triangle' ? '25' : '20'}
      className={cx(styles.svgIcon, value === 'triangle' && styles.active)}
      onClick={() => onChange('triangle')}
      config={triangle}
    />
  </div>
);