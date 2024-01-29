import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Picker, withTheme } from '@draftbit/ui';
import { View, useWindowDimensions } from 'react-native';

const FilterPopupBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [pickerValue, setPickerValue] = React.useState(undefined);

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignContent: 'center',
          alignSelf: 'center',
          backgroundColor: '"rgba(0, 0, 0, 0)"',
          borderRadius: 8,
          justifyContent: 'flex-start',
          minHeight: 150,
          width: 300,
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            backgroundColor: theme.colors['Divider'],
            justifyContent: 'center',
            marginBottom: 1,
            minHeight: 50,
          },
          dimensions.width
        )}
      >
        <Picker
          autoDismissKeyboard={true}
          dropDownBackgroundColor={theme.colors.background}
          dropDownBorderColor={theme.colors.divider}
          dropDownBorderWidth={0}
          iconSize={20}
          leftIconMode={'inset'}
          mode={'native'}
          onValueChange={newPickerValue => {
            const pickerValue = newPickerValue;
            try {
              setPickerValue(pickerValue);
            } catch (err) {
              console.error(err);
            }
          }}
          options={['To Do', 'In progress', 'Completed']}
          placeholder={'Status'}
          placeholderTextColor={theme.colors['Light']}
          rightIconName={'AntDesign/downcircleo'}
          selectedIconColor={theme.colors['Light']}
          selectedIconName={'Feather/check'}
          selectedIconSize={20}
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          type={'solid'}
          value={pickerValue}
        />
      </View>
      {/* View 4 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            backgroundColor: theme.colors['Divider'],
            justifyContent: 'center',
            marginBottom: 1,
            minHeight: 50,
          },
          dimensions.width
        )}
      >
        <Picker
          autoDismissKeyboard={true}
          dropDownBackgroundColor={theme.colors.background}
          dropDownBorderColor={theme.colors.divider}
          dropDownBorderRadius={8}
          dropDownBorderWidth={1}
          iconSize={20}
          leftIconMode={'inset'}
          mode={'native'}
          onValueChange={newPickerValue => {
            const pickerValue = newPickerValue;
            try {
              setPickerValue(pickerValue);
            } catch (err) {
              console.error(err);
            }
          }}
          options={['Low', 'Medium', 'High']}
          placeholder={'Priority'}
          rightIconName={'AntDesign/downcircleo'}
          selectedIconColor={theme.colors.strong}
          selectedIconName={'Feather/check'}
          selectedIconSize={20}
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          type={'solid'}
          value={pickerValue}
        />
      </View>
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            backgroundColor: theme.colors['Divider'],
            justifyContent: 'center',
            marginBottom: 1,
            minHeight: 50,
          },
          dimensions.width
        )}
      >
        <Picker
          autoDismissKeyboard={true}
          dropDownBackgroundColor={theme.colors.background}
          dropDownBorderColor={theme.colors.divider}
          dropDownBorderRadius={8}
          dropDownBorderWidth={1}
          iconSize={20}
          leftIconMode={'inset'}
          mode={'native'}
          onValueChange={newPickerValue => {
            const pickerValue = newPickerValue;
            try {
              setPickerValue(pickerValue);
            } catch (err) {
              console.error(err);
            }
          }}
          options={['Upcoming to latest', 'Latest to upcoming']}
          placeholder={'Deadlines'}
          rightIconName={'AntDesign/downcircleo'}
          selectedIconColor={theme.colors.strong}
          selectedIconName={'Feather/check'}
          selectedIconSize={20}
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          type={'solid'}
          value={pickerValue}
        />
      </View>
    </View>
  );
};

export default withTheme(FilterPopupBlock);
