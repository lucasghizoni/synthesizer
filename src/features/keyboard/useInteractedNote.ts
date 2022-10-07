import { useEffect, useState } from 'react';
import { allNotesWithComputerKeyMap } from "./octaves";

export type ComputerKeyEvent = 'keyUp' | 'keyDown';
export type ComputerMouseEvent = 'mouseOver';

export interface PressedNote {
  action: ComputerKeyEvent | ComputerMouseEvent;
  freq: number;
}

export const useInteractedNote = (
  setFrequency: (value: number | null) => void,
) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [mouseOverNote, setMouseOverNote] = useState<number | null>();
  const [pressedNote, setPressedNote] = useState<PressedNote | null>(null);

  useEffect(() => {
    const handleOnKeyEvent = (eventName: ComputerKeyEvent) => ({ key }: KeyboardEvent) => {
      const keyNote = allNotesWithComputerKeyMap[key.toLowerCase()];
      if(keyNote) {
        setPressedNote(old => {
          const isSamePressedKey = old?.freq === keyNote.freq && old.action === 'keyDown' && eventName === 'keyDown';
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
  }, []);

  useEffect(() => {
    if(pressedNote) {
      const isKeyUpEvent = pressedNote?.action === 'keyUp';
      setFrequency(isKeyUpEvent ? null : pressedNote.freq);

      if(isKeyUpEvent) {
        setPressedNote(null);
      }
      return;
    }

    if(isMouseDown && mouseOverNote) {
      setFrequency(mouseOverNote);
      return;
    }

    setFrequency(null);
  }, [pressedNote, isMouseDown, mouseOverNote, setFrequency]);

  return {
    onMouseLeave: () => setIsMouseDown(false),
    onMouseUp: () => setIsMouseDown(false),
    onMouseDown: () => setIsMouseDown(true),
    onMouseOverNote: setMouseOverNote,
  };
}