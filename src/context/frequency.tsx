import React, {createContext, FC, useState} from "react";

interface FrequencyContextState {
  frequency: number | null;
  setFrequency: (value: number | null) => void;
}

export const FrequencyContext = createContext({} as FrequencyContextState);

export const FrequencyProvider: FC<{ children: JSX.Element }> = ({ children}) => {
  const [frequency, setFrequency] = useState<number | null>(null);

  return <FrequencyContext.Provider
    value={{
      frequency,
      setFrequency,
    }}
  >
    {children}
  </FrequencyContext.Provider>;
}