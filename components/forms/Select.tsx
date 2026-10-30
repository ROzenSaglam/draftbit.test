import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Pressable, Animated, Platform, ViewStyle } from 'react-native';
import ActionSheet, { ActionSheetRef } from '@/components/platform/ActionSheet';
import { useTheme } from '@/theming/ThemeProvider';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import * as NavigationBar from 'expo-navigation-bar';
import { InputVariant } from './Input';
import { useMinInsets } from '@/utils/useMinInsets';

interface SelectOption {
    label?: string;
    value: string | number;
}

interface SelectProps {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string | number;
    onChange: (value: string | number) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
    containerClassName?: string;
    style?: ViewStyle;
    variant?: InputVariant;
}

const Select: React.FC<SelectProps> = ({
    label,
    placeholder = 'Select option',
    options,
    value,
    onChange,
    error,
    disabled = false,
    className = '',
    containerClassName = '',
    style,
    variant = 'inline'
}) => {
    const { theme } = useTheme();
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(
        options.find(option => option.value === value)
    );

    useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync(theme.colors.background);
            NavigationBar.setButtonStyleAsync(theme.name === 'dark' ? 'light' : 'dark');

            return () => {
                NavigationBar.setBackgroundColorAsync(theme.colors.background);
                NavigationBar.setButtonStyleAsync(theme.name === 'dark' ? 'light' : 'dark');
            };
        }
    }, [theme, theme.colors.background]);

    const animatedLabelValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        if (variant !== 'classic') {
            Animated.timing(animatedLabelValue, {
                toValue: (isFocused || selectedOption) ? 1 : 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    }, [isFocused, selectedOption, animatedLabelValue, variant]);

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

    const handleSelect = (option: SelectOption) => {
        setSelectedOption(option);
        onChange(option.value);
        actionSheetRef.current?.hide();
    };

    const handlePress = () => {
        if (disabled) return;
        setIsFocused(true);
        actionSheetRef.current?.show();
    };

    const handleClose = () => {
        setIsFocused(false);
    };
    const insets = useMinInsets();
    // Render the action sheet
    const renderActionSheet = () => (
        <ActionSheet
            ref={actionSheetRef}
            onClose={handleClose}
            isModal={true}
            enableGesturesInScrollView={true}
            statusBarTranslucent={true}
            drawUnderStatusBar={false}
            containerStyle={{
                backgroundColor: theme.colors.background,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: insets.bottom,
            }}
        >
            <View className="p-4">
                {options.map((option) => (
                    <Pressable
                        key={option.value}
                        onPress={() => handleSelect(option)}
                        className={`py-3 px-4 rounded-lg mb-2 ${selectedOption?.value === option.value ? 'bg-secondary' : ''}`}
                    >
                        <ThemedText>
                            {option.label}
                        </ThemedText>
                    </Pressable>
                ))}
            </View>
        </ActionSheet>
    );

    if (variant === 'inline') {
        return (
            <View className={`mb-global relative ${containerClassName}`} style={style}>
                {label && (
                    <ThemedText className="mb-2 font-medium absolute top-2 left-3 text-xs text-foreground opacity-60">{label}</ThemedText>
                )}
                <TouchableOpacity
                    onPress={handlePress}
                    disabled={disabled}
                    className={`bg-secondary rounded-lg px-global h-16 flex-row justify-between items-center
                        ${isFocused ? 'border-border' : 'border-border/60'}
                        ${error ? 'border-red-500' : ''}
                        ${disabled ? 'opacity-50' : ''}
                        ${className}`}
                >
                    <ThemedText className={selectedOption ? 'text-foreground text-base' : 'text-foreground text-base'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </ThemedText>
                    <Icon name="ChevronDown" size={20} color={theme.colors.foreground} className='' />
                </TouchableOpacity>
                {error && (
                    <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
                )}
                {renderActionSheet()}
            </View>
        );
    }

    if (variant === 'classic') {
        return (
            <View className={`mb-global relative ${containerClassName}`} style={style}>
                {label && (
                    <ThemedText className="mb-2 font-medium">{label}</ThemedText>
                )}
                <View className="relative">
                    <TouchableOpacity
                        onPress={handlePress}
                        disabled={disabled}
                        className={`border bg-secondary rounded-lg px-3 h-14  text-foreground flex-row justify-between items-center
                            ${isFocused ? 'border-border' : 'border-border/60'}
                            ${error ? 'border-red-500' : ''}
                            ${disabled ? 'opacity-50' : ''}
                            ${className}`}
                    >
                        <ThemedText className={selectedOption ? 'text-foreground' : 'text-foreground opacity-60'}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </ThemedText>
                        <Icon name="ChevronDown" size={20} color={theme.colors.foreground} />
                    </TouchableOpacity>
                </View>
                {error && (
                    <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
                )}
                {renderActionSheet()}
            </View>
        );
    }

    if (variant === 'underlined') {
        return (
            <View className={`mb-global relative ${containerClassName}`} style={style}>
                <View className="relative">
                    <Pressable className='px-0 bg-secondary z-40' onPress={handlePress}>
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

                    <TouchableOpacity
                        onPress={handlePress}
                        disabled={disabled}
                        className={`border-b-2 py-3 px-0 h-14 pr-10 text-foreground bg-transparent border-t-0 border-l-0 border-r-0 flex-row justify-between items-center
                            ${isFocused ? 'border-border' : 'border-border'}
                            ${error ? 'border-red-500' : ''}
                            ${disabled ? 'opacity-50' : ''}
                            ${className}`}
                    >
                        <ThemedText className={selectedOption ? 'text-foreground' : 'transparent'}>
                            {selectedOption ? selectedOption.label : ''}
                        </ThemedText>
                        <Icon name="ChevronDown" size={20} color={theme.colors.foreground} />
                    </TouchableOpacity>
                </View>

                {error && (
                    <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
                )}
                {renderActionSheet()}
            </View>
        );
    }

    return (
        <View className={`mb-8 relative ${containerClassName}`} style={style}>
            <Pressable
                className='absolute -left-1.5 top-0 z-40 px-1 bg-background'
                onPress={handlePress}
            >
                <Animated.Text
                    style={[labelStyle]}
                    className="bg-background text-foreground"
                >
                    {label}
                </Animated.Text>
            </Pressable>

            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled}
                className={`border rounded-lg py-3 px-3 h-14 text-foreground bg-transparent flex-row justify-between items-center
                    ${isFocused ? 'border-border' : 'border-border'}
                    ${error ? 'border-red-500' : ''}
                    ${disabled ? 'opacity-50' : ''}
                    ${className}`}
            >
                <ThemedText className={selectedOption ? 'text-foreground' : 'transparent'}>
                    {selectedOption ? selectedOption.label : ''}
                </ThemedText>
                <Icon name="ChevronDown" size={20} color={theme.colors.foreground} />
            </TouchableOpacity>

            {error && (
                <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
            )}
            {renderActionSheet()}
        </View>
    );
};

export default Select;
