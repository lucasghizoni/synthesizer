import {Note} from "./keyboard-slice/KeyboardSlice";

export interface KeyNote {
  note: Note;
  freq: number;
  computerKey?: string;
}

export const firstOctave: readonly KeyNote[] = [
  { note: 'C',  freq: 65.41  },
  { note: 'C#', freq: 69.30  },
  { note: 'D',  freq: 73.42  },
  { note: 'D#', freq: 77.78  },
  { note: 'E',  freq: 82.41  },
  { note: 'F',  freq: 87.31  },
  { note: 'F#', freq: 92.50  },
  { note: 'G',  freq: 98.00  },
  { note: 'G#', freq: 103.83 },
  { note: 'A',  freq: 110.00 },
  { note: 'A#', freq: 116.54 },
  { note: 'B',  freq: 123.47 },
];

export const secondOctave: readonly  KeyNote[] = [
  { note: 'C',  freq: 130.81, computerKey: 'a' },
  { note: 'C#', freq: 138.59, computerKey: 'w' },
  { note: 'D',  freq: 146.83, computerKey: 's' },
  { note: 'D#', freq: 155.56, computerKey: 'e' },
  { note: 'E',  freq: 164.81, computerKey: 'd' },
  { note: 'F',  freq: 174.61, computerKey: 'f' },
  { note: 'F#', freq: 185.00, computerKey: 't' },
  { note: 'G',  freq: 196.00, computerKey: 'g' },
  { note: 'G#', freq: 207.65, computerKey: 'y' },
  { note: 'A',  freq: 220.00, computerKey: 'h' },
  { note: 'A#', freq: 233.08, computerKey: 'u' },
  { note: 'B',  freq: 246.94, computerKey: 'j' },
];

export const thirdOctave: readonly KeyNote[] = [
  { note: 'C',  freq: 261.63, computerKey: 'k' },
  { note: 'C#', freq: 277.18, computerKey: 'o' },
  { note: 'D',  freq: 293.66, computerKey: 'l' },
  { note: 'D#', freq: 311.13 },
  { note: 'E',  freq: 329.63 },
  { note: 'F',  freq: 349.23 },
  { note: 'F#', freq: 369.99 },
  { note: 'G',  freq: 392.00 },
  { note: 'G#', freq: 415.30 },
  { note: 'A',  freq: 440.00 },
  { note: 'A#', freq: 466.16 },
  { note: 'B',  freq: 493.88 },
];

export const fourthOctave: readonly KeyNote[] = [
  { note: 'C',  freq: 523.25 }
];

export const allNotesWithComputerKeyMap =
  [...firstOctave, ...secondOctave, ...thirdOctave, ...fourthOctave]
    .reduce<{[k: string]: KeyNote}>((prev, curr) => ({
      ...prev,
      ...curr.computerKey && {[curr.computerKey]: curr},
    }), {});