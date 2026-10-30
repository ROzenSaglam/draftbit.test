import React, { forwardRef } from 'react';
import ActionSheet, { ActionSheetProps, ActionSheetRef } from '@/components/platform/ActionSheet';
import { useTheme } from '@/theming/ThemeProvider';

interface ActionSheetThemedProps extends ActionSheetProps {}

const ActionSheetThemed = forwardRef<ActionSheetRef, ActionSheetThemedProps>(({ containerStyle, ...props }, ref) => {
  const { theme } = useTheme();

  return (
    <ActionSheet
      {...props}
      ref={ref}
      containerStyle={[
        {
          backgroundColor: theme.colors.popover,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        containerStyle,
      ]}
    />
  );
});

export default ActionSheetThemed;
