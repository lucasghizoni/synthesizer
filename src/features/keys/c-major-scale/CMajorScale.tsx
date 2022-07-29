import React, { FC, useState } from 'react';

import styles from './CMajorScale.module.css';

type MajorNote = 'C'|'D'|'E'|'F'|'G'|'A'|'B';
type SharpNote = `${Exclude<MajorNote, 'B' | 'E'>}#`;
export type Note = MajorNote | SharpNote;

const C_MAJOR_SCALE: readonly Note[] = ['C', 'C#', 'D', 'E', 'D#', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const BLACK_KEYS_LEFT_VAL: { [k in SharpNote]: number } = {
  'C#': 2 * 1.34,
  'D#': 5 * 1.34,
  'F#': 11 * 1.33,
  'G#': 14 * 1.33,
  'A#': 17 * 1.33,
} as const;

interface Props {
  isOnlyFirstKeyShown?: boolean;
  onMouseOver: (n: Note) => void;
  onMouseLeave: (n: Note) => void;
}

export const CMajorScale: FC<Props> = ({isOnlyFirstKeyShown, onMouseOver, onMouseLeave}) => {
  const [pressedKey, setPressedKey] = useState<Note | null>();

  const cMajorScale = isOnlyFirstKeyShown ? C_MAJOR_SCALE.slice(0,1) : C_MAJOR_SCALE;

  return (
    <div className={styles.container}>
      {cMajorScale.map(note =>
        <div
          key={note}
          className={note.endsWith('#') ? styles.keyBlack : styles.keyWhite}
          onMouseOver={() => {
            setPressedKey(note);
            onMouseOver(note);
          }}
          onMouseLeave={() => {
            setPressedKey(null);
            onMouseLeave(note);
          }}
          style={{
            backgroundColor: pressedKey === note ? 'antiquewhite' : '',
            left: note.endsWith('#') ? `${BLACK_KEYS_LEFT_VAL[note as SharpNote]}rem` : '',
          }}
        />
      )}
    </div>
  );
}