import React from 'react';
import { View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

type SkeletonVariant = 'list' | 'grid' | 'article' | 'chat';

interface SkeletonLoaderProps {
    variant: SkeletonVariant;
    count?: number;
    className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant, count = 1, className = '' }) => {
    const renderListItem = () => (
        <View className="flex-row items-center py-4 ">
            <View className="w-16 h-16 rounded-lg bg-secondary" />
            <View className="ml-3 flex-1">
                <View className="h-5 rounded-md mb-2 w-3/4 bg-secondary" />
                <View className="h-4 rounded-md w-1/2 bg-secondary" />
            </View>
        </View>
    );

    const renderGridItem = () => (
        <View className="w-1/2 p-2">
            <View className="aspect-square rounded-lg mb-2 bg-secondary" />
            <View className="h-4 rounded-md mb-1 w-3/4 bg-secondary" />
            <View className="h-4 rounded-md w-1/2 bg-secondary" />
        </View>
    );

    const renderArticle = () => (
        <View className="flex-1">
            <View
                className="bg-secondary"
                style={{ width: windowWidth, height: windowWidth }}
            />
            <View className="p-4 flex-1">
                <View className="h-8 rounded-md mb-4 w-3/4 bg-secondary" />
                <View className="h-6 rounded-md mb-4 w-1/2 bg-secondary" />
                <View className="h-4 rounded-md mb-2 w-full bg-secondary" />
                <View className="h-4 rounded-md mb-2 w-full bg-secondary" />
                <View className="h-4 rounded-md w-3/4 bg-secondary" />
            </View>
        </View>
    );

    const renderChat = () => (
        <View className="p-4">
            <View className="flex-row justify-start mb-4">
                <View className="w-3/4">
                    <View className="h-12 rounded-2xl bg-secondary" />
                </View>
            </View>
            <View className="flex-row justify-end mb-4">
                <View className="w-3/4">
                    <View className="h-16 rounded-2xl bg-secondary" />
                </View>
            </View>
            <View className="flex-row justify-start">
                <View className="w-2/4">
                    <View className="h-12 rounded-2xl bg-secondary" />
                </View>
            </View>
        </View>
    );

    const renderContent = () => {
        switch (variant) {
            case 'list':
                return Array(count).fill(null).map((_, index) => (
                    <React.Fragment key={index}>{renderListItem()}</React.Fragment>
                ));
            case 'grid':
                return (
                    <View className="flex-row flex-wrap">
                        {Array(count).fill(null).map((_, index) => (
                            <React.Fragment key={index}>{renderGridItem()}</React.Fragment>
                        ))}
                    </View>
                );
            case 'article':
                return renderArticle();
            case 'chat':
                return renderChat();
            default:
                return null;
        }
    };

    return (
        <View className={`flex-1 bg-background  ${className}`}>
            {renderContent()}
        </View>
    );
};

export default SkeletonLoader;
