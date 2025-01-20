import React from 'react';
import { Picker, ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { test: null };

const BlankScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [pickerValue, setPickerValue] = React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      console.log(/* invalid CustomFunctionCall */ undefined);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { alignItems: 'center', justifyContent: 'center' },
        dimensions.width
      )}
    >
      <Picker
        autoDismissKeyboard={true}
        dropDownBackgroundColor={theme.colors.background.base}
        dropDownBorderColor={theme.colors.border.base}
        dropDownBorderRadius={8}
        dropDownBorderWidth={1}
        dropDownTextColor={theme.colors.text.strong}
        leftIconMode={'inset'}
        onValueChange={newPickerValue => {
          const pickerValue = newPickerValue;
          try {
            setPickerValue(newPickerValue);
          } catch (err) {
            console.error(err);
          }
        }}
        placeholder={'Select an option'}
        selectedIconColor={theme.colors.text.strong}
        selectedIconName={'Feather/check'}
        selectedIconSize={20}
        type={'solid'}
        dropdownOverlayColor={theme.colors.branding.secondary}
        iconColor={theme.colors.branding.primary}
        iconSize={16}
        leftIconName={'AntDesign/pluscircle'}
        mode={'dropdown'}
        style={StyleSheet.applyWidth(
          { paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 },
          dimensions.width
        )}
        value={pickerValue}
      />
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
