import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Divider,
  Icon,
  IconButton,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const DefauktTaskEditViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        },
        dimensions.width
      )}
    >
      {/* Section Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            marginTop: 20,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row' },
            dimensions.width
          )}
        >
          {/* Heading */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.strong,
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                marginRight: 5,
              },
              dimensions.width
            )}
          >
            {'Task Name'}
          </Text>
          <Icon
            color={theme.colors['Strong']}
            name={'MaterialIcons/add-task'}
            size={24}
          />
        </View>
        {/* Icon Button 2 */}
        <IconButton icon={'EvilIcons/close-o'} size={30} />
        <IconButton icon={'AntDesign/pluscircle'} size={24} />
      </View>
      {/* Edit Name */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'stretch', borderRadius: 12 },
          dimensions.width
        )}
      >
        {/* edit option */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: 'rgb(30, 30, 201)',
                fontSize: 16,
              }),
              dimensions.width
            )}
          >
            {Constants['taskName']}
          </Text>
        </View>
        <TextInput
          allowFontScaling={true}
          autoCapitalize={'none'}
          changeTextDelay={500}
          clearButtonMode={'while-editing'}
          enablesReturnKeyAutomatically={true}
          onChangeText={newTextInputValue => {
            const textInputValue = newTextInputValue;
            try {
              setTextInputValue(textInputValue);
              setGlobalVariableValue({
                key: 'taskName',
                value: newTextInputValue,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          placeholder={'Enter task name'}
          placeholderTextColor={theme.colors['Light']}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextInputStyles(theme)['Text Input'],
              {
                backgroundColor: theme.colors['Background'],
                borderColor: theme.colors['Light'],
                padding: 20,
                width: '100%',
              }
            ),
            dimensions.width
          )}
          value={textInputValue}
        />
      </View>
      <Spacer bottom={8} left={8} right={8} top={8} />
      <Divider
        color={theme.colors.divider}
        style={StyleSheet.applyWidth(
          GlobalStyles.DividerStyles(theme)['Divider'],
          dimensions.width
        )}
      />
      {/* Spacer 2 */}
      <Spacer bottom={8} left={8} right={8} top={8} />
    </View>
  );
};

export default withTheme(DefauktTaskEditViewBlock);
