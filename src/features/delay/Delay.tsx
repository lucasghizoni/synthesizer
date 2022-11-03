import React, { FC } from 'react';

import { Box } from "../../components/box/Box";
import { Knob } from "../../components/knob/Knob";

export const Delay: FC = () => {

  return (
    <Box label="Delay">
      <Knob value={1} label="Time"/>
    </Box>
  );
}