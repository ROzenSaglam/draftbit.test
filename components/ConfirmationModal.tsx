import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import ActionSheet, { ActionSheetRef } from '@/components/platform/ActionSheet';
import { useTheme } from '@/theming/ThemeProvider';
import ThemedText from '@/components/ThemedText';
import * as NavigationBar from 'expo-navigation-bar';

interface ConfirmationModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    actionSheetRef: React.RefObject<ActionSheetRef>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    actionSheetRef
}) => {
    const { theme } = useTheme();
    const isDark = theme.name === 'dark';

    React.useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync(theme.colors.background);
            NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');

            return () => {
                // Reset to default theme color when modal closes
                NavigationBar.setBackgroundColorAsync(theme.colors.background);
                NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
            };
        }
    }, [isDark, theme.colors.background]);

    const handleConfirm = () => {
        actionSheetRef.current?.hide();
        onConfirm();
    };

    const handleCancel = () => {
        actionSheetRef.current?.hide();
        onCancel();
    };

    return (
        <ActionSheet
            ref={actionSheetRef}
            gestureEnabled={true}
            drawUnderStatusBar={false}
            statusBarTranslucent={true}
            containerStyle={{
                backgroundColor: theme.colors.background,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}
        >
            <View className="p-8 pb-14">
                <ThemedText className="text-xl font-bold mb-2">{title}</ThemedText>
                <ThemedText className="text-light-subtext dark:text-dark-subtext mb-6">{message}</ThemedText>
                
                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        onPress={handleCancel}
                        className="px-4 py-3 flex-1 rounded-lg items-center bg-secondary  "
                    >
                        <ThemedText>{cancelText}</ThemedText>
                    </Pressable>
                    <Pressable
                        onPress={handleConfirm}
                        className="px-4 py-3 flex-1 items-center rounded-lg bg-red-500"
                    >
                        <Text className="text-white">{confirmText}</Text>
                    </Pressable>
                </View>
            </View>
        </ActionSheet>
    );
};

export default ConfirmationModal;
