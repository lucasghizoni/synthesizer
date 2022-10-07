import React, { FC } from 'react';
import { Box } from "../../components/box/Box";
import { WaveformSelect } from "../../components/weveform-select/WaveformSelect";
import { useOscillators } from "../../hooks/useOscillators";
import { Knob } from "../../components/knob/Knob";
import styles from './Oscillators.module.css';

export const Oscillators: FC = () => {
  const { firstOscillator, secondOscillator, setWaveform, setVolume } = useOscillators();

  return (
    <Box label="Oscillators">
      <div className={styles.item}>
        <WaveformSelect value={firstOscillator.waveform} onChange={value => setWaveform(value, 'first')}/>
        <div className={styles.knobs}>
          <Knob
            variant="small"
            label="Vol"
            onChange={value =>  setVolume(value, 'first')}
            value={firstOscillator.volume}
          />
          <Knob variant="small" label="Tune" value={0.3} />
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.item}>
        <WaveformSelect value={secondOscillator.waveform} onChange={value => setWaveform(value, 'second')}/>
        <div className={styles.knobs}>
          <Knob
            variant="small"
            label="Vol" onChange={value => setVolume(value, 'second')}
            value={secondOscillator.volume}
          />
          <Knob variant="small" label="Tune" value={0.3} />
        </div>
      </div>
    </Box>
  );
};