import React, {createContext, FC, useCallback, useState} from "react";

interface MasterContextState {
  volume: number;
  setVolume: (value: number) => void;
  setMasterNode: (gainNode: GainNode) => void;
  masterGainNode?: GainNode;
}

export const MasterContext = createContext({} as MasterContextState);

export const MasterProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [volume, setVolume] = useState(0.5);
  const [masterGainNode, setMasterGainNode] = useState<GainNode>();

  const setMasterNode = useCallback((gainNode: GainNode) => {
    gainNode.gain.value = volume;
    setMasterGainNode(gainNode);
  }, [volume]);

  return <MasterContext.Provider
    value={{
      volume,
      setVolume,
      masterGainNode,
      setMasterNode,
    }}
  >
    {children}
  </MasterContext.Provider>;
}