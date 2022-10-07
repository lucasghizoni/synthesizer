import React, { FC } from 'react';
import { EnvelopeProvider } from "./envelope";
import { MasterProvider } from "./master";
import { OscillatorsProvider } from "./oscillators";
import { FilterProvider } from "./filter";
import { SynthCoreProvider } from "./synth-core";

type FCWithChildren = FC<{ children: JSX.Element }>;

const compose = (providers: FCWithChildren[]) =>
  providers.reduce<FCWithChildren>((Prev, Curr) => ({ children }) =>
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
    , ({ children }) => <>{children}</>
  );

export const AppProvider: FCWithChildren = compose([
  SynthCoreProvider,
  EnvelopeProvider,
  MasterProvider,
  OscillatorsProvider,
  FilterProvider,
]);