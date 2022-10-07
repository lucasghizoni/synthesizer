import { useContext } from "react";
import { EnvelopeContext } from "../context/envelope";

export const useEnvelope = () => {
  const envelope = useContext(EnvelopeContext);

  return envelope;
}