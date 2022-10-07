import React, {createContext, FC, useState} from "react";

interface SynthCoreContextState {
  audioCtx: AudioContext | null;
  frequency: number | null;
  setFrequency: (value: number | null) => void;
  setAudioCtx: (value: AudioContext) => void;
}

export const SynthCoreContext = createContext({} as SynthCoreContextState);

export const SynthCoreProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [frequency, setFrequency] = useState<number | null>(null);
  const [audioCtx, setAudioCtx] = useState<null | AudioContext>(null);

  return <SynthCoreContext.Provider
    value={{
      frequency,
      setFrequency,
      audioCtx,
      setAudioCtx,
    }}
  >
    {children}
  </SynthCoreContext.Provider>;
}