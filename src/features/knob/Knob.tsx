import React, {FC, useEffect, useState} from 'react';

import styles from './Knob.module.css';

interface Props {
  initialValue?: number; // from 0 to 1
  label?: string;
  onChange?: (value: number) => void; // from 0 to 1
}

const DEGREE_VALUES = {
  START: 160,
  END: 500,
} as const;

const SPEED_FACTOR = 8;

const calculateValue = (degree: number) =>
  Math.round((degree - DEGREE_VALUES.START) * 100 / (DEGREE_VALUES.END - DEGREE_VALUES.START)) / 100;

const calculateDegree = (value: number) =>
  Math.round((((DEGREE_VALUES.END - DEGREE_VALUES.START) * (value * 100)) / 100) + DEGREE_VALUES.START);

export const Knob: FC<Props> = ({ label, onChange = () => {} , initialValue = 80}) => {
  const [rotateDegree, setRotateDegree] = useState<number>(calculateDegree(initialValue));
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
    setRotateDegree(old => {
      const newValue = old + (dragData.isDirectionUp ? -SPEED_FACTOR : SPEED_FACTOR);

      if(DEGREE_VALUES.START > newValue) {
        return DEGREE_VALUES.START;
      }

      if(DEGREE_VALUES.END < newValue) {
        return DEGREE_VALUES.END;
      }

      return newValue;
    });
  }, [dragData]);

  useEffect(() => {
    onChange(calculateValue(rotateDegree));
  }, [onChange, rotateDegree]);

  const handleMouseUp = () => {
    document.body.removeEventListener('mouseup', handleMouseUp);
    document.body.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = () => {
    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mousemove', handleMouseMove);
  };

  return (
    <div onMouseDown={handleMouseDown} className={styles.container}>
      <div className={styles.slider}>
        <div style={{ transform: `rotate(${rotateDegree}deg)` }} className={styles.knob}/>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}