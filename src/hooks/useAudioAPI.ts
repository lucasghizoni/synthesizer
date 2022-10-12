import { useCallback, useContext } from "react";

import { AudioAPIContext } from "../context/audio-api";
import { OscillatorsContext } from "../context/oscillators";
import { MasterContext } from "../context/master";
import { FilterContext } from "../context/filter";

const createGainNode = (audioCtx: AudioContext) => audioCtx.createGain();

const createOscillatorNode = (audioCtx: AudioContext) => {
  const oscillator = audioCtx.createOscillator();
  oscillator.frequency.value = 0;
  oscillator.start();
  return oscillator;
}

export const useAudioAPI = () => {
  const { setAudioCtx, audioCtx, ...rest } = useContext(AudioAPIContext);
  const { setOscillatorNodes } = useContext(OscillatorsContext);
  const { setMasterNode } = useContext(MasterContext);
  const { setFilterNode } = useContext(FilterContext);

  return {
    getAudioCtx: useCallback(() => {
      if(audioCtx) return audioCtx;

      const newAudioCtx = new AudioContext();

      const masterGainNode = createGainNode(newAudioCtx);

      const firstOscNodes = {
        oscillator: createOscillatorNode(newAudioCtx),
        gain: createGainNode(newAudioCtx),
      };
      const secondOscNodes = {
        oscillator: createOscillatorNode(newAudioCtx),
        gain: createGainNode(newAudioCtx),
      };

      firstOscNodes.oscillator.connect(firstOscNodes.gain);
      secondOscNodes.oscillator.connect(secondOscNodes.gain);

      firstOscNodes.gain.connect(masterGainNode);
      secondOscNodes.gain.connect(masterGainNode);

      const filterNode = newAudioCtx.createBiquadFilter();

      masterGainNode.connect(filterNode);
      filterNode.connect(newAudioCtx.destination);

      setMasterNode(masterGainNode);
      setOscillatorNodes(firstOscNodes, secondOscNodes);
      setFilterNode(filterNode, newAudioCtx.sampleRate);
      setAudioCtx(newAudioCtx);

      return newAudioCtx;
    }, [audioCtx, setAudioCtx, setFilterNode, setMasterNode, setOscillatorNodes]),
    ...rest,
  };
};