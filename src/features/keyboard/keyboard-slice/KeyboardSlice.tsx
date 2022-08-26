import React, { FC, useEffect, useState } from 'react';

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

export type ComputerKeyEvent = 'keyUp' | 'keyDown';
export type ComputerMouseEvent = 'mouseOver' | 'mouseLeave';

export interface InteractedNote {
  action: ComputerKeyEvent | ComputerMouseEvent;
  freq: number;
}

export interface CMajorScaleProps {
  playingFreq?: number | null;
  keyNotes: readonly KeyNote[];
  onChange: (interactedNote: InteractedNote) => void;
}

export const KeyboardSlice: FC<CMajorScaleProps> = ({ playingFreq, keyNotes , onChange }) => {
  const [pressedNote, setPressedNote] = useState<{ freq: number, action: ComputerKeyEvent }>();

  useEffect(() => {
    if(pressedNote) {
      onChange(pressedNote);
    }
  }, [pressedNote, onChange]);

  useEffect(() => {
    const handleOnKeyEvent = (eventName: ComputerKeyEvent) => ({ key }: KeyboardEvent) => {
      const keyNote = keyNotes.find(({ computerKey }) => computerKey === key);
      if(keyNote) {
        setPressedNote(old => {
          const isSamePressedKey = old?.freq === keyNote.freq && old.action === 'keyDown' && eventName === 'keyDown'
          const isMoreThanOneKeyPressed = eventName === 'keyUp' && old?.action === 'keyDown' && old?.freq !== keyNote.freq;

          if(isSamePressedKey || isMoreThanOneKeyPressed) {
            return old;
          }

          return { freq: keyNote.freq, action: eventName };
        });
      }
    };

    const handleOnKeyDown = handleOnKeyEvent('keyDown');
    const handleOnKeyUp = handleOnKeyEvent('keyUp');

    window.addEventListener("keydown", handleOnKeyDown);
    window.addEventListener("keyup", handleOnKeyUp);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleOnKeyDown);
      window.removeEventListener("keyup", handleOnKeyUp);
    };
  }, [keyNotes]);

  return (
    <div className={styles.container}>
      {keyNotes.map(({note, computerKey, freq}) =>
        <div
          key={note}
          className={note.endsWith('#') ? styles.keyBlack : styles.keyWhite}
          onMouseOver={() => {
            onChange({ freq, action: 'mouseOver' });
          }}
          onMouseLeave={() => {
            onChange({ freq, action: 'mouseLeave' });
          }}
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
}