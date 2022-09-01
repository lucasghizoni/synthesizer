import {Note} from "./keyboard-slice/KeyboardSlice";

export interface KeyNote {
  note: Note;
  freq: number;
  computerKey?: string;
}

export const firstOctave: readonly KeyNote[] = [
  { note: 'C',  freq: 32, computerKey: 'a' },
  { note: 'C#', freq: 34, computerKey: 'w' },
  { note: 'D',  freq: 36, computerKey: 's' },
  { note: 'D#', freq: 38, computerKey: 'e' },
  { note: 'E',  freq: 41, computerKey: 'd' },
  { note: 'F',  freq: 43, computerKey: 'f' },
  { note: 'F#', freq: 46, computerKey: 't' },
  { note: 'G',  freq: 49, computerKey: 'g' },
  { note: 'G#', freq: 52, computerKey: 'y' },
  { note: 'A',  freq: 55, computerKey: 'h' },
  { note: 'A#', freq: 58, computerKey: 'u' },
  { note: 'B',  freq: 61, computerKey: 'j' },
];

export const secondOctave: readonly  KeyNote[] = [
  { note: 'C',  freq: 65, computerKey: 'k' },
  { note: 'C#', freq: 69, computerKey: 'o' },
  { note: 'D',  freq: 73, computerKey: 'l' },
  { note: 'D#', freq: 77  },
  { note: 'E',  freq: 82  },
  { note: 'F',  freq: 87  },
  { note: 'F#', freq: 92  },
  { note: 'G',  freq: 98  },
  { note: 'G#', freq: 104 },
  { note: 'A',  freq: 110 },
  { note: 'A#', freq: 116 },
  { note: 'B',  freq: 123 },
];

export const thirdOctave: readonly KeyNote[] = [
  { note: 'C',  freq: 130 },
  { note: 'C#', freq: 138 },
  { note: 'D',  freq: 146 },
  { note: 'D#', freq: 155 },
  { note: 'E',  freq: 164 },
  { note: 'F',  freq: 174 },
  { note: 'F#', freq: 185 },
  { note: 'G',  freq: 196 },
  { note: 'G#', freq: 208 },
  { note: 'A',  freq: 220 },
  { note: 'A#', freq: 233 },
  { note: 'B',  freq: 246 },
];

export const fourthOctave: readonly KeyNote[] = [
  { note: 'C',  freq: 261 },
];

export const allNotesWithComputerKeyMap =
  [...firstOctave, ...secondOctave, ...thirdOctave, ...fourthOctave]
    .reduce<{[k: string]: KeyNote}>((prev, curr) => ({
      ...prev,
      ...curr.computerKey && {[curr.computerKey]: curr},
    }), {});