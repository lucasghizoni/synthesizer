import React, {FC, useEffect, useState} from 'react';

import styles from './Knob.module.css';
import cx from "classnames";

interface Props {
  maxValue?: number;
  value: number;
  label?: string;
  variant?: 'small' | 'regular';
  onChange?: (value: number) => void;
}

const DEGREE_VALUES = {
  START: 160,
  END: 510,
} as const;

const SPEED_FACTOR = 8;

const calculateValue = (degree: number, max: number) =>
  Number(((Math.round((degree - DEGREE_VALUES.START) * 100 * max / (DEGREE_VALUES.END - DEGREE_VALUES.START)) / 100).toFixed(1)));

const calculateDegree = (value: number, max: number) =>
  Math.round((((DEGREE_VALUES.END - DEGREE_VALUES.START) * value / max) + DEGREE_VALUES.START));

export const Knob: FC<Props> = ({
  label,
  maxValue = 1,
  onChange = () => {},
  value,
  variant = 'regular',
}) => {
  const [rotateDegree, setRotateDegree] = useState<number>(calculateDegree(value, maxValue));
  const [dragData, setDragData] = useState<{ isDirectionUp?: boolean, y?: number }>({});

  const handleMouseMove = (e: MouseEventInit) => {
    setDragData(old => {
      if(old.y !== undefined && old.y === e.screenY) {
        return old;
      }
      return {
        isDirectionUp: (e.screenY || 0) > (old.y || 0),
        y: e.screenY,
      }
    });
  };

  useEffect(() => {
    if(dragData.isDirectionUp === undefined) return;

    setRotateDegree(rotDegree => {
      let newRotDegree = (rotDegree + (dragData.isDirectionUp ? - SPEED_FACTOR : SPEED_FACTOR));

      if(DEGREE_VALUES.START > newRotDegree) {
        return DEGREE_VALUES.START;
      }

      if(DEGREE_VALUES.END < newRotDegree) {
        return DEGREE_VALUES.END;
      }
      return newRotDegree;
    });
  }, [dragData]);

  useEffect(() => {
    const newValue = calculateValue(rotateDegree, maxValue);
    if(value !== newValue) {
      onChange(newValue);
    }
  }, [rotateDegree, value, onChange, maxValue]);

  const handleMouseUp = () => {
    document.body.removeEventListener('mouseup', handleMouseUp);
    document.body.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = () => {
    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mousemove', handleMouseMove);
  };

  return (
    <div onMouseDown={handleMouseDown} className={cx(styles.container, variant === 'small' && styles.containerSmall)}>
      <div className={cx(styles.slider, variant === 'small' && styles.sliderSmall)}>
        <div
          style={{ transform: `rotate(${rotateDegree}deg)` }}
          className={cx(styles.knob, variant === 'small' && styles.knobSmall)}
        />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}