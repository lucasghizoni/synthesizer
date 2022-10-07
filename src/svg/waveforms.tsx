import React, { ReactNode } from 'react';

export interface SvgConfig {
  markup: ReactNode;
  width: string;
  height: string;
  viewBox: string;
}

export const sine: SvgConfig = {
  width: '20',
  height: '20',
  viewBox: '0 0 256 256',
  markup: <path xmlns="http://www.w3.org/2000/svg" d="M24,128c104-224,104,224,208,0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/>
};

export const square: SvgConfig = {
  width: '20',
  height: '20',
  viewBox: '0 0 256 256',
  markup: <polyline xmlns="http://www.w3.org/2000/svg" fill="none" points="232 128 232 184 128 184 128 72 24 72 24 128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/>
};

export const triangle: SvgConfig = {
  width: '20',
  height: '20',
  viewBox: '0 0 256 256',
  markup: <polyline xmlns="http://www.w3.org/2000/svg" fill="none" points="24 128 76 56 180 200 232 128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/>
};

export const sawtooth: SvgConfig = {
  width: '20',
  height: '20',
  viewBox: '0 0 256 256',
  markup: <polyline xmlns="http://www.w3.org/2000/svg" fill="none" points="24 128 128 64 128 192 232 128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/>
};