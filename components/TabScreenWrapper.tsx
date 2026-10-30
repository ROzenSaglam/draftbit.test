import React from 'react';
import { View } from 'react-native';

interface TabScreenWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function TabScreenWrapper({
    children,
    className
}: TabScreenWrapperProps) {
    return (
        <View className='bg-background  flex-1'>
            <View className={`flex-1 ${className ?? ''}`}>
                {children}
            </View>
        </View>
    );
}
