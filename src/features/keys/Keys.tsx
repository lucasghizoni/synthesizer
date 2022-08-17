import React, { FC, useEffect, useState } from 'react';

import { CMajorScale, CMajorScaleProps, InteractedNote, Note } from "./c-major-scale/CMajorScale";
import styles from './Keys.module.css';

type Octave = 1 | 2 | 3 | 4;

type HertzOctavesMap = {
  [k in Note]: { [k in Octave]: number }
}

const hertzOctavesMap: HertzOctavesMap = {
  'C':  { 1: 32, 2: 65,  3: 130, 4: 261 },
  'C#': { 1: 34, 2: 69,  3: 138, 4: 277 },
  'D':  { 1: 36, 2: 73,  3: 146, 4: 293 },
  'D#': { 1: 38, 2: 77,  3: 155, 4: 311 },
  'E':  { 1: 41, 2: 82,  3: 164, 4: 329 },
  'F':  { 1: 43, 2: 87,  3: 174, 4: 349 },
  'F#': { 1: 46, 2: 92,  3: 185, 4: 369 },
  'G':  { 1: 49, 2: 98,  3: 196, 4: 392 },
  'G#': { 1: 52, 2: 104, 3: 208, 4: 415 },
  'A':  { 1: 55, 2: 110, 3: 220, 4: 440 },
  'A#': { 1: 58, 2: 116, 3: 233, 4: 466 },
  'B':  { 1: 61, 2: 123, 3: 246, 4: 493 },
} as const;

const computerKeys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l'] as const;

interface Props {
  onKeyDown: (freq: number) => void;
  onKeyUp: () => void;
}

export const Keys: FC<Props> = ({onKeyDown, onKeyUp}) => {
  const [interactedNote, setInteractedNote] = useState<({ octave: Octave } & InteractedNote) | null>(null);
  const [playingNote, setPlayingNote] = useState<{note: Note, octave: Octave} | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const isUserPlayingWithKeys = interactedNote?.action === 'keyDown';
  const isUserPlayingWithMouse = isMouseDown && interactedNote?.action === 'mouseOver';

  const handleOnChange = (octave: Octave): CMajorScaleProps['onChange'] => currentInteractedNote => {
    if(!(isUserPlayingWithKeys && (currentInteractedNote.action === 'mouseLeave' || currentInteractedNote.action === 'mouseOver'))) {
      setInteractedNote({ octave, note: currentInteractedNote.note, action: currentInteractedNote.action });
    }
  };

  const getPlayingNote = (octave: Octave) =>
    playingNote && playingNote.octave === octave ? playingNote.note : undefined;

  useEffect(() => {
    if(playingNote) {
      onKeyDown(hertzOctavesMap[playingNote.note][playingNote.octave]);
    } else {
      onKeyUp();
    }
    },[playingNote, onKeyUp, onKeyDown]);

  useEffect(() => {
    if(isUserPlayingWithKeys || isUserPlayingWithMouse) {
      clearTimeout(timeoutId);
      setPlayingNote({ note: interactedNote.note, octave: interactedNote.octave });
    } else {
      const currentTimeoutId = setTimeout(() => {
        setPlayingNote(null);
      }, 500);
      setTimeoutId(currentTimeoutId);
    }
  }, [isMouseDown, setPlayingNote, interactedNote, isUserPlayingWithKeys, isUserPlayingWithMouse]);

  return (
    <div
      className={styles.container}
      onMouseLeave={() => setIsMouseDown(false)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseDown={() => setIsMouseDown(true)}
    >
      <CMajorScale
        onChange={handleOnChange(1)}
        computerKeys={computerKeys.slice(0, 12)}
        activeNote={getPlayingNote(1)}
      />
      <CMajorScale
        onChange={handleOnChange(2)}
        computerKeys={computerKeys.slice(12, 17)}
        activeNote={getPlayingNote(2)}
      />
      <CMajorScale
        onChange={handleOnChange(3)}
        activeNote={getPlayingNote(3)}
      />
      <CMajorScale
        onChange={handleOnChange(4)}
        activeNote={getPlayingNote(4)}
        isOnlyFirstKeyShown={true}
      />
    </div>
  )
}