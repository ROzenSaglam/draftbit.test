import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput as RNTextInput, Animated, Pressable, TextInputProps } from 'react-native';
import Icon, { IconName } from '../Icon';
import ThemedText from '../ThemedText';
import { useTheme } from '@/theming/ThemeProvider';
import { InputVariant } from './Input';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  error?: string;
  isPassword?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  isMultiline?: boolean;
  variant?: InputVariant;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  rightIcon,
  onRightIconPress,
  error,
  isPassword = false,
  disabled = false,
  className = '',
  containerClassName = '',
  value,
  onChangeText,
  isMultiline = false,
  variant = 'inline',
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const animatedLabelValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Handle label animation
  useEffect(() => {
    if (variant !== 'classic') {
      const hasValue = localValue !== '';
    Animated.timing(animatedLabelValue, {
        toValue: (isFocused || hasValue) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    }
  }, [isFocused, localValue, animatedLabelValue, variant]);

  const handleChangeText = (text: string) => {
    setLocalValue(text);
    onChangeText?.(text);
  };

  const labelStyle = {
    top: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.mutedForeground, theme.colors.foreground],
    }),
    left: 12,
    paddingHorizontal: 8,
    position: 'absolute' as 'absolute',
    zIndex: 50,
    backgroundColor: theme.colors.background,
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine the right icon based on props and password state
  const renderRightIcon = () => {
    if (isPassword) {
      return (
        <Pressable 
          onPress={togglePasswordVisibility} 
          className={`absolute right-3 ${variant === 'classic' ? 'top-[18px]' : 'top-[18px]'} z-10`}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} color={theme.colors.foreground} />
        </Pressable>
      );
    }
    
    if (rightIcon) {
      return (
        <Pressable 
          onPress={onRightIconPress} 
          className={`absolute right-3 ${variant === 'classic' ? 'top-[18px]' : 'top-[18px]'} z-10`}
        >
          <Icon name={rightIcon} size={20} color={theme.colors.foreground} />
        </Pressable>
      );
    }
    
    return null;
  };

  // Inline input with label as placeholder (matching Input.tsx exactly)
  if (variant === 'inline') {
    return (
      <View className={`mb-global relative ${containerClassName}`}>
        {label && (
          <ThemedText className="mb-2 font-medium absolute top-2 left-3 text-xs text-foreground opacity-60">{label}</ThemedText>
        )}
        <RNTextInput
          ref={inputRef}
          className={`border border-border bg-border rounded-lg px-3 ${isMultiline ? 'h-40 pt-4' : 'h-16 pt-7'} ${(isPassword || rightIcon) ? 'pr-10' : ''} 
            text-foreground
            ${isFocused ? 'border-border' : 'border-border/60'}
            ${error ? 'border-red-500' : ''}
            ${disabled ? 'opacity-50' : ''}
            ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={localValue}
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          placeholder={label}
          placeholderTextColor={theme.colors.mutedForeground}
          numberOfLines={isMultiline ? 4 : 1}
          textAlignVertical={isMultiline ? 'top' : 'center'}
          multiline={isMultiline}
          editable={!disabled}
          {...props}
        />
        {renderRightIcon()}
        {error && (
          <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
        )}
      </View>
    );
  }

  // Classic non-animated input (matching Input.tsx exactly)
  if (variant === 'classic') {
    return (
      <View className={`mb-global relative ${containerClassName}`}>
        {label && (
          <ThemedText className="mb-2 font-medium">{label}</ThemedText>
        )}
        <View className="relative">
          <RNTextInput
            ref={inputRef}
            className={`border bg-secondary rounded-lg px-3 ${isMultiline ? 'h-36 pt-4' : 'h-14'} ${(isPassword || rightIcon) ? 'pr-10' : ''} 
              text-foreground bg-transparent
              ${isFocused ? 'border-border' : 'border-border/60'}
              ${error ? 'border-red-500' : ''}
              ${disabled ? 'opacity-50' : ''}
              ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={localValue}
            onChangeText={handleChangeText}
            secureTextEntry={isPassword && !showPassword}
            placeholderTextColor={theme.colors.mutedForeground}
            numberOfLines={isMultiline ? 4 : 1}
            textAlignVertical={isMultiline ? 'top' : 'center'}
            multiline={isMultiline}
            editable={!disabled}
            {...props}
          />
          {renderRightIcon()}
        </View>
        {error && (
          <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
        )}
      </View>
    );
  }

  // Underlined input with only bottom border (matching Input.tsx exactly)
  if (variant === 'underlined') {
    return (
      <View className={`mb-global relative ${containerClassName}`}>
        <View className="relative">
          <Pressable className='px-0 bg-secondary z-40' onPress={() => inputRef.current?.focus()}>
            <Animated.Text
              style={[{
                top: animatedLabelValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, -8],
                }),
                fontSize: animatedLabelValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 12],
                }),
                color: animatedLabelValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [theme.colors.mutedForeground, theme.colors.foreground],
                }),
                left: 0,
                paddingHorizontal: 0,
                position: 'absolute',
                zIndex: 50,
                backgroundColor: theme.colors.background,
              }]}
              className="text-black dark:text-white"
            >
              {label}
            </Animated.Text>
          </Pressable>

          <RNTextInput
            ref={inputRef}
            className={`border-b-2 py-3 px-0 ${isMultiline ? 'h-36 pt-4' : 'h-14'} ${(isPassword || rightIcon) ? 'pr-10' : ''} 
              text-foreground bg-transparent border-t-0 border-l-0 border-r-0
              ${isFocused ? 'border-border' : 'border-border'}
              ${error ? 'border-red-500' : ''}
              ${disabled ? 'opacity-50' : ''}
              ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={localValue}
            onChangeText={handleChangeText}
            secureTextEntry={isPassword && !showPassword}
            placeholderTextColor="transparent"
            numberOfLines={isMultiline ? 4 : 1}
            textAlignVertical={isMultiline ? 'top' : 'center'}
            multiline={isMultiline}
            editable={!disabled}
            {...props}
          />

          {renderRightIcon()}
        </View>

        {error && (
          <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
        )}
      </View>
    );
  }

  // Default animated input (matching Input.tsx exactly)
  return (
    <View className={`mb-8 relative ${containerClassName}`}>
      <Pressable
        className='absolute -left-1.5 top-0 z-40 px-1 bg-background'
        onPress={() => inputRef.current?.focus()}
      >
          <Animated.Text 
            style={[labelStyle]} 
          className="bg-background text-foreground"
          >
            {label}
          </Animated.Text>
        </Pressable>
        
        <RNTextInput
          ref={inputRef}
        className={`border rounded-lg py-3 px-3 ${isMultiline ? 'h-36 pt-4' : 'h-14'} ${(isPassword || rightIcon) ? 'pr-10' : ''} 
            text-foreground bg-transparent
            ${isFocused ? 'border-border' : 'border-border'}
            ${error ? 'border-red-500' : ''}
            ${disabled ? 'opacity-50' : ''}
            ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        value={localValue}
        onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="transparent"
        numberOfLines={isMultiline ? 4 : 1}
        textAlignVertical={isMultiline ? 'top' : 'center'}
        multiline={isMultiline}
        editable={!disabled}
          {...props}
        />
        
        {renderRightIcon()}
      
      {error && (
        <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
      )}
    </View>
  );
};

export default TextInput;
