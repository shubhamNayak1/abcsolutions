import React, { useState } from 'react';
import RadioButton from '../radioButton/RadioButton';
import './RadioButtonGroup.css';

interface RadioButtonGroupProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  selectedValue: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <div className="radioButtonGroup">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
