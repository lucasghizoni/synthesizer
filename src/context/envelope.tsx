import React, {createContext, FC, useState} from "react";

interface EnvelopeContextState {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  setAttack: (value: number) => void;
  setDecay: (value: number) => void;
  setSustain: (value: number) => void;
  setRelease: (value: number) => void;
}

export const EnvelopeContext = createContext({} as EnvelopeContextState);

export const EnvelopeProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [attack, setAttack] = useState(0.5);
  const [sustain, setSustain] = useState(0.5);
  const [decay, setDecay] = useState(0.5);
  const [release, setRelease] = useState(0.8);

  return <EnvelopeContext.Provider
    value={{
      attack, setAttack,
      sustain, setSustain,
      decay, setDecay,
      release, setRelease,
    }}
  >
    {children}
  </EnvelopeContext.Provider>;
}