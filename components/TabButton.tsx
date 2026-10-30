import { useTheme } from '@/theming/ThemeProvider';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import { Text, Pressable, View } from 'react-native';
import Icon, { IconName } from '@/components/Icon';
import ThemedText from './ThemedText';
import Avatar from './Avatar';

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: IconName;
  avatar?: string;
  customContent?: ReactNode;
  labelAnimated?: boolean;
  hasBadge?: boolean;
};

export const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon, avatar, children, isFocused, onPress, customContent, labelAnimated = true, hasBadge = false, ...props }, ref) => {
    const { theme } = useTheme();

    // Render icon or custom content
    const renderContent = () => {
      if (customContent) {
        return customContent;
      }
      
      if (icon) {
        return (
          <View className="relative">
            <View className={`w-full relative ${isFocused ? 'opacity-100' : 'opacity-40'}`}>
              <Icon name={icon} size={24} strokeWidth={isFocused ? 2.5 : 2} color={isFocused ? theme.colors.accent : theme.colors.foreground} />
            </View>
            {hasBadge && (
              <View className="absolute w-3 h-3 border border-light-primary dark:border-dark-primary rounded-full bg-red-500 -top-1 -right-1.5" />
            )}
          </View>
        );
      }
      if (avatar) {
        return (
          <View className={`rounded-full border-2 ${isFocused ? 'border-highlight' : 'border-transparent'}`}>
            <Avatar src={avatar} size="xxs"  />
          </View>
        );
      }
      return null;
    };

    return (
      <Pressable
        className={`w-1/5 overflow-hidden ${isFocused ? '' : ''}`}
        ref={ref}
        {...props}
        onPress={onPress}>
        <View className="flex-col items-center justify-center pt-4 pb-0 w-full relative">
          {/*<Animated.View className="absolute w-full h-[2px] bg-black dark:bg-white left-0 top-0"
            style={{
              opacity: lineScale,
              transform: [{ scaleX: lineScale }],
            }}
          />*/}
          
          {renderContent()}

          {labelAnimated ? (
            <View className={`relative ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
              <Text className={`text-[9px] mt-px text-highlight`}>
                {children}
              </Text>
            </View>
          ) : (
            <ThemedText className={`text-[9px] mt-px`}>
              {children}
            </ThemedText>
          )}
        </View>
      </Pressable>
    );
  }
);
