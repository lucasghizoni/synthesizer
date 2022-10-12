import React, {createContext, FC, useState} from "react";

interface AudioAPIContextState {
  audioCtx?: AudioContext;
  setAudioCtx: (value: AudioContext) => void;
}

export const AudioAPIContext = createContext({} as AudioAPIContextState);

export const AudioAPIProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [audioCtx, setAudioCtx] = useState<AudioContext>();

  return <AudioAPIContext.Provider
    value={{
      audioCtx,
      setAudioCtx,
    }}
  >
    {children}
  </AudioAPIContext.Provider>;
}