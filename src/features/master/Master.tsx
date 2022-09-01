import React, { FC } from 'react';
import { Box } from "../../components/box/Box";
import { Knob } from "../../components/knob/Knob";
import { useMaster } from "../../hooks/useMaster";

export const Master: FC = () => {
  const { volume, setVolume } = useMaster();

  return (
    <Box label="Master">
      <Knob value={volume} onChange={setVolume} label="Vol"/>
    </Box>
  );
};