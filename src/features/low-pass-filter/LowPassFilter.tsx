import React, { FC } from 'react';

import { Box } from "../../components/box/Box";
import { Knob } from "../../components/knob/Knob";
import { useLowPassFilter } from "../../hooks/useLowPassFilter";

export const LowPassFilter: FC = () => {
  const { cutoff, setCutoff, resonance, setResonance } = useLowPassFilter();

  return (
    <Box label="Lowpass filter">
      <Knob value={cutoff} onChange={setCutoff} label="Cutoff"/>
      <Knob value={resonance} onChange={setResonance} label="Res"/>
    </Box>
  );
}