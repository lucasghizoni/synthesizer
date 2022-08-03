import React, {FC, useEffect, useState} from 'react';

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
  isOnlyFirstKeyShown?: boolean;
  onMouseOver: (n: Note) => void;
  onMouseLeave: () => void;
  isMouseDown: boolean;
}

export const CMajorScale: FC<Props> = ({isOnlyFirstKeyShown, onMouseOver, onMouseLeave, isMouseDown}) => {
  const [activeKey, setActiveKey] = useState<Note | null>(null);

  const cMajorScale = isOnlyFirstKeyShown ? C_MAJOR_SCALE.slice(0,1) : C_MAJOR_SCALE;

  useEffect(() => {
    onMouseLeave();
    if(isMouseDown && activeKey) {
      onMouseOver(activeKey);
    }
  }, [activeKey, isMouseDown]);

  return (
    <div className={styles.container}>
      {cMajorScale.map(note =>
        <div
          key={note}
          className={note.endsWith('#') ? styles.keyBlack : styles.keyWhite}
          onMouseDown={() => {
            setActiveKey(note);
          }}
          onMouseOver={() => {
            setActiveKey(note);
          }}
          onMouseLeave={() => {
            setActiveKey(null);
          }}
          onMouseUp={() => {
            setActiveKey(null);
          }}
          style={{
            backgroundColor: isMouseDown && activeKey === note ? '#4eccff' : '',
            left: note.endsWith('#') ? `${BLACK_KEYS_LEFT_MULTIPLIER_VAL[note as SharpNote] * CSS_LEFT_GAP}rem` : '',
          }}
        />
      )}
    </div>
  );
}