import { useContext } from "react";
import { FrequencyContext } from "../context/frequency";

export const useFrequency = () => {
  const frequency = useContext(FrequencyContext);

  return frequency;
}