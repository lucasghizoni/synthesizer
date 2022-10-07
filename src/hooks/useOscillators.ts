import { useContext } from 'react';

import { OscillatorsContext } from "../context/oscillators";

export const useOscillators = () => {
  const context = useContext(OscillatorsContext);
  return context;
};