import React, { FC } from 'react';

import styles from './KeyboardSlice.module.css';
import { KeyNote } from "../octaves";

type MajorNote = 'C'|'D'|'E'|'F'|'G'|'A'|'B';
type SharpNote = `${Exclude<MajorNote, 'B' | 'E'>}#`;
export type Note = MajorNote | SharpNote;

const CSS_LEFT_GAP = 1.33;
const BLACK_KEYS_LEFT_MULTIPLIER_VAL: { [k in SharpNote]: number } = {
  'C#': 2,
  'D#': 5,
  'F#': 11,
  'G#': 14,
  'A#': 17,
} as const;

export interface KeyboardSliceProps {
  playingFreq?: number | null;
  keyNotes: readonly KeyNote[];
  onMouseOverNote: (freq: number) => void;
}

export const KeyboardSlice: FC<KeyboardSliceProps> = ({ playingFreq, keyNotes , onMouseOverNote }) => (
  <div className={styles.container}>
    {keyNotes.map(({note, computerKey, freq}) =>
      <div
        key={note}
        className={note.endsWith('#') ? styles.keyBlack : styles.keyWhite}
        onMouseOver={() => onMouseOverNote(freq)}
        style={{
          backgroundColor: playingFreq === freq ? '#4eccff' : '',
          left: note.endsWith('#') ? `${BLACK_KEYS_LEFT_MULTIPLIER_VAL[note as SharpNote] * CSS_LEFT_GAP}rem` : '',
        }}
      >
        {computerKey && <span className={styles.label}>{computerKey}</span>}
      </div>
    )}
  </div>
);