import React, { FC } from 'react';
import { Box } from "../../components/box/Box";
import { Knob } from "../../components/knob/Knob";
import {useEnvelope} from "../../hooks/useEnvelope";

export const Envelope: FC = () => {
  const {
    attack, release, decay, sustain,
    setAttack, setDecay, setSustain, setRelease,
  } = useEnvelope();

  return (
    <Box label="Envelope">
      <Knob value={attack} onChange={setAttack} label="Atk"/>
      <Knob value={decay} onChange={setDecay} label="Dec"/>
      <Knob value={sustain} onChange={setSustain} label="Sus"/>
      <Knob value={release} onChange={setRelease} label="Rel"/>
    </Box>
  );
}