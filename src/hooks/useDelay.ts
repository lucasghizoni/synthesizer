import { useContext } from 'react';

import { DelayContext } from "../context/delay";

export const useDelay = () => {
  const context = useContext(DelayContext);

  return context;
};