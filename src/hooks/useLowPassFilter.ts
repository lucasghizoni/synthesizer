import { useContext } from 'react';

import { FilterContext } from "../context/filter";
import { SynthCoreContext } from "../context/synth-core";

export const useLowPassFilter = () => {
  const { audioCtx } = useContext(SynthCoreContext);
  const { setCutoff, ...rest } = useContext(FilterContext);

  return {
    setCutoff: (value: number) => setCutoff(value, audioCtx!.sampleRate),
    ...rest,
  };
};