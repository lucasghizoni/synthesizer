import React, { createContext, FC, useCallback, useState } from "react";

interface DelayContextState {
  time: number;
  setTime: (value: number, sampleRate: number) => void;
  setDelayNodes: (nodes: {delay: DelayNode, gainNode: GainNode}) => void;
  delayNodes?: { delay: DelayNode, gainNode: GainNode };
}

export const DelayContext = createContext({} as DelayContextState);

const calculateDelayTime = (value: number) => value * 2;

export const DelayProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [time, setTime] = useState(0.5);
  const [delayNodes, setDelayNodes] = useState<{ delay: DelayNode, gainNode: GainNode }>();

  return <DelayContext.Provider
    value={{
      time,
      setTime: (value) => {
        if(!delayNodes) return;
        delayNodes.delay.delayTime.value = calculateDelayTime(value);
        setTime(value);
      },
      delayNodes,
      setDelayNodes:  useCallback((nodes: {delay: DelayNode, gainNode: GainNode}) => {
        nodes.delay.delayTime.value = calculateDelayTime(time);
        nodes.gainNode.gain.value = 0.2;
        setDelayNodes(nodes);
      }, [time]),
    }}
  >
    {children}
  </DelayContext.Provider>;
}