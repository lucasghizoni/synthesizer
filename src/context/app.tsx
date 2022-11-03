import React, { FC } from 'react';
import { EnvelopeProvider } from "./envelope";
import { MasterProvider } from "./master";
import { OscillatorsProvider } from "./oscillators";
import { FilterProvider } from "./filter";
import { AudioAPIProvider } from "./audio-api";
import { FrequencyProvider } from "./frequency";
import { DelayProvider } from "./delay";

type FCWithChildren = FC<{ children: JSX.Element }>;

const compose = (providers: FCWithChildren[]) =>
  providers.reduce<FCWithChildren>((Prev, Curr) => ({ children }) =>
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
    , ({ children }) => <>{children}</>
  );

export const AppProvider: FCWithChildren = compose([
  AudioAPIProvider,
  DelayProvider,
  EnvelopeProvider,
  FrequencyProvider,
  MasterProvider,
  OscillatorsProvider,
  FilterProvider,
]);