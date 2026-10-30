import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import ThemedText from '../ThemedText';
import { useTheme } from '@/theming/ThemeProvider';

type SliderSize = 's' | 'm' | 'l';

interface SliderProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
  value?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  label?: string;
  maxValue?: number;
  minValue?: number;
  step?: number;
  size?: SliderSize;
}

const sizeStyles = {
  s: {
    containerHeight: 20,
    labelText: 'text-xs',
    valueText: 'text-xs',
    trackHeight: 4,
    thumbSize: 16,
  },
  m: {
    containerHeight: 30,
    labelText: 'text-sm',
    valueText: 'text-sm',
    trackHeight: 6,
    thumbSize: 20,
  },
  l: {
    containerHeight: 40,
    labelText: 'text-base',
    valueText: 'text-base',
    trackHeight: 8,
    thumbSize: 24,
  },
};

const clampPercentage = (value: number, minValue: number, maxValue: number) => {
  if (maxValue === minValue) return 0;
  return Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));
};

const Slider = ({
  className = '',
  style,
  value,
  initialValue,
  onValueChange,
  label,
  maxValue = 100,
  minValue = 0,
  step = 1,
  size = 'm',
}: SliderProps) => {
  const { theme } = useTheme();
  const currentSize = sizeStyles[size];

  const effectiveInitialValue = initialValue !== undefined ? initialValue : 0;
  const effectiveValue = value !== undefined ? value : effectiveInitialValue;

  const [containerWidth, setContainerWidth] = useState(0);
  const [percentage, setPercentage] = useState(() =>
    clampPercentage(effectiveValue, minValue, maxValue)
  );
  const [panStartPercentage, setPanStartPercentage] = useState(0);

  useEffect(() => {
    if (value === undefined || maxValue === minValue) return;
    setPercentage(clampPercentage(value, minValue, maxValue));
  }, [value, minValue, maxValue]);

  const displayValue = minValue + percentage * (maxValue - minValue);

  const thumbRadius = currentSize.thumbSize / 2;
  const usableWidth = Math.max(0, containerWidth - currentSize.thumbSize);
  const thumbPosition = percentage * usableWidth + thumbRadius;
  const trackWidth = percentage * usableWidth + thumbRadius;

  const computeSteppedValue = (rawPercentage: number) => {
    let newPercentage = Math.max(0, Math.min(1, rawPercentage));
    const rawValue = minValue + newPercentage * (maxValue - minValue);

    let steppedValue: number;
    if (step > 0) {
      steppedValue = Math.round((rawValue - minValue) / step) * step + minValue;
      steppedValue = Math.min(Math.max(steppedValue, minValue), maxValue);
      newPercentage = maxValue === minValue ? 0 : (steppedValue - minValue) / (maxValue - minValue);
    } else {
      steppedValue = rawValue;
    }

    return { steppedValue, newPercentage };
  };

  const calculateValueFromTap = (x: number) => {
    if (usableWidth <= 0) return;
    const rawPercentage = (x - currentSize.thumbSize / 2) / usableWidth;
    const { steppedValue, newPercentage } = computeSteppedValue(rawPercentage);
    setPercentage(newPercentage);
    if (onValueChange) {
      onValueChange(steppedValue);
    }
  };

  const panHandler = (event: PanGestureHandlerGestureEvent) => {
    if (usableWidth <= 0) return;
    const rawPercentage = panStartPercentage + event.nativeEvent.translationX / usableWidth;
    const { steppedValue, newPercentage } = computeSteppedValue(rawPercentage);
    setPercentage(newPercentage);
    if (onValueChange) {
      onValueChange(steppedValue);
    }
  };

  const onPanStateChange = (event: PanGestureHandlerGestureEvent) => {
    setPanStartPercentage(percentage);
    panHandler(event);
  };

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width <= 0) return;
    setContainerWidth(width);

    if (maxValue !== minValue) {
      const valueToUse = value !== undefined ? value : (initialValue !== undefined ? initialValue : 0);
      setPercentage(clampPercentage(valueToUse, minValue, maxValue));
    }
  }, [value, initialValue, minValue, maxValue]);

  const decimalPoints = step >= 1 ? 0 : String(step).split('.')[1]?.length || 0;
  const formatValue = displayValue.toFixed(decimalPoints);

  const handleTapGesture = useCallback(
    (event: TapGestureHandlerStateChangeEvent) => {
      calculateValueFromTap(event.nativeEvent.x);
    },
    [containerWidth, minValue, maxValue, step, onValueChange]
  );

  return (
    <View className={`w-full ${className}`} style={style}>
      {label && (
        <View className="flex-row justify-between mb-2">
          <ThemedText className={currentSize.labelText}>{label}</ThemedText>
          <ThemedText className={`opacity-60 ${currentSize.valueText}`}>
            {formatValue}
          </ThemedText>
        </View>
      )}

      <View
        style={{ height: currentSize.containerHeight }}
        className="justify-center"
        onLayout={onLayout}
      >
        <TapGestureHandler onHandlerStateChange={handleTapGesture}>
          <View className="w-full h-full justify-center">
            {/* Background Track */}
            <View
              style={{
                position: 'absolute',
                height: currentSize.trackHeight,
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: currentSize.trackHeight / 2,
                width: '100%',
              }}
            />

            {/* Active Track */}
            <View
              style={{
                position: 'absolute',
                height: currentSize.trackHeight,
                backgroundColor: theme.colors.accent,
                borderRadius: currentSize.trackHeight / 2,
                width: trackWidth,
              }}
            />

            {/* Thumb */}
            <PanGestureHandler onGestureEvent={panHandler} onHandlerStateChange={onPanStateChange}>
              <View
                style={{
                  position: 'absolute',
                  width: currentSize.thumbSize,
                  height: currentSize.thumbSize,
                  borderRadius: currentSize.thumbSize / 2,
                  backgroundColor: theme.colors.accent,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  zIndex: 10,
                  transform: [{ translateX: thumbPosition - currentSize.thumbSize / 2 }],
                }}
              />
            </PanGestureHandler>
          </View>
        </TapGestureHandler>
      </View>
    </View>
  );
};

export default Slider;
