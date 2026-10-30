import React, { useState } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import ThemedText from '../ThemedText';
import Icon, { IconName } from '../Icon';
import { useTheme } from '@/theming/ThemeProvider';

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  description?: string;
  icon?: IconName;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  label,
  description,
  icon,
  disabled = false,
  className = '',
  style,
}) => {
  const { theme } = useTheme();
  const [isOn, setIsOn] = useState(value ?? false);

  // Handle controlled vs uncontrolled state
  const isControlled = value !== undefined;
  const switchValue = isControlled ? value : isOn;

  const toggleSwitch = () => {
    if (disabled) return;

    const newValue = !switchValue;

    // Update internal state if uncontrolled
    if (!isControlled) {
      setIsOn(newValue);
    }

    // Call callback if provided
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleSwitch}
      disabled={disabled}
      className={`flex-row items-center py-1 ${disabled ? 'opacity-100' : ''} ${className}`}
      style={style}
    >
      {icon && (
        <View className="w-12 h-12 rounded-full border border-border mr-4 items-center justify-center">
          <Icon name={icon} size={20} color={theme.colors.foreground} />
        </View>
      )}

      <View className="flex-1">
        {label && (
          <ThemedText className="font-semibold text-lg">{label}</ThemedText>
        )}
        {description && (
          <ThemedText className="text-sm pr-4">
            {description}
          </ThemedText>
        )}
      </View>


        <View className="w-14 h-8 rounded-full">
          <View
            className={`w-full h-full border border-border rounded-full absolute ${switchValue ? 'bg-accent' : 'bg-secondary'}`}
          />
          <View
            style={{ transform: [{ translateX: switchValue ? 28 : 1 }] }}
            className="w-6 h-6 bg-white rounded-full shadow-sm my-1 border border-border"
          />
        </View>
    </TouchableOpacity>
  );
};

export default Switch;
