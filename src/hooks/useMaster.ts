import React from 'react';

import { AudioAPIContext } from "./audio-api-context";

export const useMaster = () => {
  const { master } = React.useContext(AudioAPIContext);

  return master;
};