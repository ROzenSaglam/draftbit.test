import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

interface ToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  value,
  onChange,
  disabled = false,
  className = ''
}) => {
  const [isActive, setIsActive] = useState(value ?? false);

  // Handle controlled and uncontrolled modes
  const isControlled = value !== undefined;
  const isOn = isControlled ? value : isActive;

  const toggleSwitch = () => {
    if (disabled) return;

    const newValue = !isOn;
    if (!isControlled) {
      setIsActive(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      className={`w-12 h-7 rounded-full ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <View
        className={`w-full h-full rounded-full absolute ${isOn ? 'bg-accent' : 'bg-secondary  '}`}
      />
      <View
        style={{ transform: [{ translateX: isOn ? 21 : 2 }] }}
        className="w-6 h-6 bg-white rounded-full shadow-sm my-0.5"
      />
    </Pressable>
  );
};

export default Toggle;
