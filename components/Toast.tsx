import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onHide?: () => void;
    isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    duration = 3000,
    onHide,
    isVisible
}) => {
    const { theme } = useTheme();

    const getDotColorClass = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-400';
            default:
                return 'bg-blue-500';
        }
    };

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                if (onHide) {
                    onHide();
                }
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onHide]);

    if (!isVisible) return null;

    return (
        <View
            className="absolute inset-x-0 top-0 z-[99999999] p-4 shadow-md"
            style={{ shadowColor: theme.colors.foreground, elevation: 5 }}
        >
            <View className='rounded-xl py-6 flex-row items-center justify-center bg-dark-primary dark:bg-light-primary'>
                <View className={`w-2 h-2 rounded-full mr-2 ${getDotColorClass()}`} />
                <Text className='text-white dark:text-dark-primary'>{message}</Text>
            </View>
        </View>
    );
};

export default Toast;
