import { useContext } from "react";
import { SynthCoreContext } from "../context/synth-core";

export const useSynthCore = () => {
  const context = useContext(SynthCoreContext);

  return context;
};