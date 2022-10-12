import { useContext } from 'react';

import { FilterContext } from "../context/filter";
import { useAudioAPI } from "./useAudioAPI";

export const useLowPassFilter = () => {
  const { getAudioCtx } = useAudioAPI();
  const { setCutoff, ...rest } = useContext(FilterContext);

  return {
    setCutoff: (value: number) => setCutoff(value, getAudioCtx().sampleRate),
    ...rest,
  };
};