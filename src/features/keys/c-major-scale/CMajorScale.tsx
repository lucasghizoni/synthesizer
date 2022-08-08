import React, { FC } from 'react';

import styles from './CMajorScale.module.css';

type MajorNote = 'C'|'D'|'E'|'F'|'G'|'A'|'B';
type SharpNote = `${Exclude<MajorNote, 'B' | 'E'>}#`;
export type Note = MajorNote | SharpNote;

const C_MAJOR_SCALE: readonly Note[] = ['C', 'C#', 'D', 'E', 'D#', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const CSS_LEFT_GAP = 1.33;
const BLACK_KEYS_LEFT_MULTIPLIER_VAL: { [k in SharpNote]: number } = {
  'C#': 2,
  'D#': 5,
  'F#': 11,
  'G#': 14,
  'A#': 17,
} as const;

interface Props {
  activeKey?: Note;
  isOnlyFirstKeyShown?: boolean;
  onMouseOver: (n: Note) => void;
  onMouseLeave: () => void;
}

export const CMajorScale: FC<Props> = ({activeKey, isOnlyFirstKeyShown, onMouseOver, onMouseLeave}) => {
  const cMajorScale = isOnlyFirstKeyShown ? C_MAJOR_SCALE.slice(0,1) : C_MAJOR_SCALE;

  return (
    <div className={styles.container}>
      {cMajorScale.map(note =>
        <div
          key={note}
          className={note.endsWith('#') ? styles.keyBlack : styles.keyWhite}
          onMouseOver={() => {
            onMouseOver(note);
          }}
          onMouseLeave={() => {
            onMouseLeave();
          }}
          style={{
            backgroundColor: activeKey === note ? '#4eccff' : '',
            left: note.endsWith('#') ? `${BLACK_KEYS_LEFT_MULTIPLIER_VAL[note as SharpNote] * CSS_LEFT_GAP}rem` : '',
          }}
        />
      )}
    </div>
  );
}