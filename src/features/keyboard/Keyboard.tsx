import React, { FC } from 'react';

import { KeyboardSlice } from "./keyboard-slice/KeyboardSlice";
import styles from './Keyboard.module.css';
import { firstOctave, fourthOctave, secondOctave, thirdOctave } from "./octaves";
import { useFrequency } from "../../hooks/useFrequency";
import { useInteractedNote } from "./useInteractedNote";

export const Keyboard: FC = () => {
  const { setFrequency, frequency } = useFrequency();
  const { onMouseOverNote, ...rest } = useInteractedNote(frequency, setFrequency);

  return (
    <div
      className={styles.container}
      {...rest}
    >
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={firstOctave}
        playingFreq={frequency}
      />
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={secondOctave}
        playingFreq={frequency}
      />
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={thirdOctave}
        playingFreq={frequency}
      />
      <KeyboardSlice
        onMouseOverNote={onMouseOverNote}
        keyNotes={fourthOctave}
        playingFreq={frequency}
      />
    </div>
  )
}