import React, { FC, useCallback, useEffect, useState } from 'react';

import styles from './CMajorScale.module.css';

type MajorNote = 'C'|'D'|'E'|'F'|'G'|'A'|'B';
type SharpNote = `${Exclude<MajorNote, 'B' | 'E'>}#`;
export type Note = MajorNote | SharpNote;

const C_MAJOR_SCALE: readonly Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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
  note: Note;
}

export interface CMajorScaleProps {
  activeNote?: Note;
  computerKeys?: string[];
  isOnlyFirstKeyShown?: boolean;
  onChange: (interactedNote: InteractedNote) => void;
}

export const CMajorScale: FC<CMajorScaleProps> = ({activeNote, computerKeys = [], onChange, isOnlyFirstKeyShown}) => {
  const [pressedNote, setPressedNote] = useState<{ note: Note, action: ComputerKeyEvent }>();
  const cMajorScale = isOnlyFirstKeyShown ? C_MAJOR_SCALE.slice(0,1) : C_MAJOR_SCALE;

  useEffect(() => {
    if(pressedNote) {
      onChange(pressedNote);
    }
  }, [pressedNote]);

  const handleOnKeydown = useCallback(({ key }: any) => {
    const index = computerKeys?.indexOf(key);
    if(index !== -1) {
      setPressedNote(old => {
        if(old?.note === cMajorScale[index] && old.action === 'keyDown') {
          return old;
        }
        return { note: cMajorScale[index], action: 'keyDown' };
      });
    }
  }, [setPressedNote]);

  const handleKeyup = useCallback(({key}: any) => {
    const index = computerKeys?.indexOf(key);
    if(index !== -1) {
      setPressedNote({ note: cMajorScale[index], action: 'keyUp' });
    }
  }, [setPressedNote, pressedNote]);

  useEffect(() => {
    window.addEventListener("keydown", handleOnKeydown);
    window.addEventListener("keyup", handleKeyup);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleOnKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return (
    <div className={styles.container}>
      {cMajorScale.map((note, index) =>
        <div
          key={note}
          className={note.endsWith('#') ? styles.keyBlack : styles.keyWhite}
          onMouseOver={() => {
              onChange({ note, action: 'mouseOver' });
          }}
          onMouseLeave={() => {
            onChange({ note, action: 'mouseLeave' });
          }}
          style={{
            backgroundColor: activeNote === note ? '#4eccff' : '',
            left: note.endsWith('#') ? `${BLACK_KEYS_LEFT_MULTIPLIER_VAL[note as SharpNote] * CSS_LEFT_GAP}rem` : '',
          }}
        >
          {computerKeys[index] && <span className={styles.label}>{computerKeys[index]}</span>}
        </div>
      )}
    </div>
  );
}