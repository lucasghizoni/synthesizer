import React from 'react';

import { AudioAPIContext } from "./audio-api-context";

export const useEnvelope = () => {
  const { envelope } = React.useContext(AudioAPIContext);

  return envelope;
};