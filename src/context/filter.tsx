import React, { createContext, FC, useState } from "react";

interface FilterContextState {
  cutoff: number;
  setCutoff: (value: number, sampleRate: number) => void;
  resonance: number;
  setResonance: (value: number) => void;
  setFilterNode: (filter: BiquadFilterNode) => void;
  filterNode?: BiquadFilterNode;
}

export const FilterContext = createContext({} as FilterContextState);

export const calculateCutoff = (value: number, sampleRate: number) => value * (sampleRate / 2);
export const calculateResonance = (value: number) => value * 30;

export const FilterProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [cutoff, setCutoff] = useState(0.5);
  const [resonance, setResonance] = useState(0.5);
  const [filterNode, setFilterNode] = useState<BiquadFilterNode>();

  return <FilterContext.Provider
    value={{
      cutoff,
      setCutoff: (value, sampleRate) => {
        if(!filterNode) return;
        filterNode.frequency.value = calculateCutoff(value, sampleRate);
        setCutoff(value);
      },
      resonance,
      setResonance: value => {
        if(!filterNode) return;
        filterNode.Q.value = calculateResonance(value);
        setResonance(value);
      },
      filterNode,
      setFilterNode,
    }}
  >
    {children}
  </FilterContext.Provider>;
}