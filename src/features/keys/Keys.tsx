import React, {FC} from 'react';

import { CMajorScale, Note } from "./c-major-scale/CMajorScale";
import styles from './Keys.module.css';

type Octave = 1 | 2 | 3 | 4;

type HertzOctavesMap = {
  [k in Note]: { [k in Octave]: number }
}

const frequencyOctavesMap: HertzOctavesMap = {
  'C':  { 1: 32, 2: 65,  3: 130, 4: 261},
  'C#': { 1: 34, 2: 69,  3: 138, 4: 277},
  'D':  { 1: 36, 2: 73,  3: 146, 4: 293},
  'D#': { 1: 38, 2: 77,  3: 155, 4: 311},
  'E':  { 1: 41, 2: 82,  3: 164, 4: 329},
  'F':  { 1: 43, 2: 87,  3: 174, 4: 349},
  'F#': { 1: 46, 2: 92,  3: 185, 4: 369},
  'G':  { 1: 49, 2: 98,  3: 196, 4: 392},
  'G#': { 1: 52, 2: 104, 3: 208, 4: 415},
  'A':  { 1: 55, 2: 110, 3: 220, 4: 440},
  'A#': { 1: 58, 2: 116, 3: 233, 4: 466},
  'B':  { 1: 61, 2: 123, 3: 246, 4: 493},
} as const;

interface Props {
  onMouseOver: (freq: number) => void;
  onMouseLeave: () => void;
}

export const Keys: FC<Props> = ({onMouseOver, onMouseLeave}) => {
  const handleMouseOver = (scale: Octave) => (note: Note) => {
    onMouseOver(frequencyOctavesMap[note][scale]);
  };

  return (
    <div className={styles.container}>
      <CMajorScale onMouseLeave={onMouseLeave} onMouseOver={handleMouseOver(1)}/>
      <CMajorScale onMouseLeave={onMouseLeave} onMouseOver={handleMouseOver(2)}/>
      <CMajorScale onMouseLeave={onMouseLeave} onMouseOver={handleMouseOver(3)}/>
      <CMajorScale onMouseLeave={onMouseLeave} onMouseOver={handleMouseOver(4)} isOnlyFirstKeyShown={true}/>
    </div>
  )
}