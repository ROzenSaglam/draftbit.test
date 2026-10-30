import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import ThemedText from './ThemedText';
import { useTheme } from '@/theming/ThemeProvider';

interface PageLoaderProps {
    text?: string;
}

export default function PageLoader({ text }: PageLoaderProps) {
    const { theme } = useTheme();

    return (
        <View className="flex-1 items-center justify-center bg-background ">
            <ActivityIndicator size="large" color={theme.colors.accent} />
            {text && (
                <ThemedText className="mt-4 text-light-subtext dark:text-dark-subtext">
                    {text}
                </ThemedText>
            )}
        </View>
    );
}