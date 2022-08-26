import React, {FC, useCallback, useEffect, useState} from 'react';

import { KeyboardSlice, InteractedNote } from "./keyboard-slice/KeyboardSlice";
import styles from './Keyboard.module.css';
import { firstOctave, fourthOctave, secondOctave, thirdOctave } from "./octaves";

interface Props {
  onPlay: (freq: number | null) => void;
}

export const Keyboard: FC<Props> = ({ onPlay }) => {
  const [interactedNote, setInteractedNote] = useState<InteractedNote | null>(null);
  const [playingFreq, setPlayingFreq] = useState<number | null>();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if(playingFreq || playingFreq === null) {
      onPlay(playingFreq);
    }
  },[playingFreq, onPlay]);

  const handleChange = useCallback(({ freq, action }: InteractedNote) => {
    setInteractedNote(old => {
      const isUserPlayingWithKeys = old?.action === 'keyDown';
      if(isUserPlayingWithKeys && (action === 'mouseLeave' || action === 'mouseOver')) {
        return old;
      }
      return { freq, action };
    });
  }, [setInteractedNote]);

  useEffect(() => {
    const isUserPlayingWithKeys = interactedNote?.action === 'keyDown';
    const isUserPlayingWithMouse = isMouseDown && interactedNote?.action === 'mouseOver';

    if(interactedNote && (isUserPlayingWithKeys || isUserPlayingWithMouse)) {
      const isSameNote = playingFreq === interactedNote.freq;

      if(isSameNote) return;

      clearTimeout(timeoutId);
      setTimeoutId(undefined);

      setPlayingFreq(interactedNote.freq);
    } else {
      if(!playingFreq || timeoutId) return;

      if(interactedNote?.action === 'keyUp') {
        // if its keyup event, we delay it to have smooth sound transition from keyUp to next keyDown event
        const currentTimeoutId = setTimeout(() => setPlayingFreq(null), 300);
        setTimeoutId(currentTimeoutId);
      } else {
        setPlayingFreq(null);
      }
    }
  }, [isMouseDown, setPlayingFreq, interactedNote, timeoutId, playingFreq]);

  return (
    <div
      className={styles.container}
      onMouseLeave={() => setIsMouseDown(false)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseDown={() => setIsMouseDown(true)}
    >
      <KeyboardSlice
        onChange={handleChange}
        keyNotes={firstOctave}
        playingFreq={playingFreq}
      />
      <KeyboardSlice
        onChange={handleChange}
        keyNotes={secondOctave}
        playingFreq={playingFreq}
      />
      <KeyboardSlice
        onChange={handleChange}
        keyNotes={thirdOctave}
        playingFreq={playingFreq}
      />
      <KeyboardSlice
        onChange={handleChange}
        keyNotes={fourthOctave}
        playingFreq={playingFreq}
      />
    </div>
  )
}