import React from 'react';

import { AudioAPIContext } from "./audio-api-context";

export const useLowPassFilter = () => {
  const { lowPassFilter } = React.useContext(AudioAPIContext);

  return lowPassFilter;
};