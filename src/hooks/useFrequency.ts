import React from 'react';

import { AudioAPIContext } from "./audio-api-context";

export const useFrequency = () => {
  const { frequency, setFrequency } = React.useContext(AudioAPIContext);

  return { frequency, setFrequency };
};