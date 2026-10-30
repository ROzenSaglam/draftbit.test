import React, { useState } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import Icon, { IconName } from './Icon';
import ThemedText from './ThemedText';

interface ExpandableProps {
  icon?: IconName;
  title: string;
  description?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
}

const Expandable: React.FC<ExpandableProps> = ({
  icon,
  title,
  description,
  children,
  defaultExpanded = false,
  expanded,
  onPress,
  className,
  style
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded ?? defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    onPress?.();
  };

  return (
    <View className={`border-b border-border ${className}`} style={style}>
      <Pressable
        onPress={toggleExpand}
        className="flex-row items-center py-6"
      >
        {icon && (
         <View className="mr-4 h-12 w-12 rounded-full border border-border items-center justify-center">
            <Icon name={icon} size={20} />
          </View>
        )}
        <View className="flex-1">
          <ThemedText className="text-lg font-semibold">{title}</ThemedText>
          {description && (
            <ThemedText className="text-sm">
              {description}
            </ThemedText>
          )}
        </View>
        <View style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}>
          <Icon
            name="ChevronDown"
            size={20}
          />
        </View>
      </Pressable>
      {isExpanded && (
        <View className="px-4 pb-4 pt-4">{children}</View>
      )}
    </View>
  );
};

export default Expandable;