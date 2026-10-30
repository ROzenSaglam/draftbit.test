import React from 'react';
import { View, Dimensions } from 'react-native';

interface ProgressBarProps {
  percentage: number;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  className?: string;
  rounded?: boolean;
  duration?: number;
  delay?: number;
}

const { height: screenHeight } = Dimensions.get('window');

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = 8,
  backgroundColor = 'bg-black/20 dark:bg-dark-darker',
  fillColor = 'bg-accent',
  className = '',
  rounded = true,
  duration = 1000,
  delay = 0
}) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <View
      className={`flex-1 w-full ${backgroundColor} ${rounded ? 'rounded-full' : ''} ${className}`}
      style={{ height }}
    >
      <View
        className={`${fillColor} ${rounded ? 'rounded-full' : ''} h-full`}
        style={{ width: `${clampedPercentage}%` }}
      />
    </View>
  );
};

export default ProgressBar;
