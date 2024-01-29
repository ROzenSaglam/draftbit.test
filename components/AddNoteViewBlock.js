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

const AddNoteViewBlock = props => {
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
            {'Add Note'}
          </Text>
          <Icon
            color={theme.colors['Strong']}
            name={'MaterialCommunityIcons/note-plus'}
            size={24}
          />
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row' },
            dimensions.width
          )}
        >
          {/* Icon Button 2 */}
          <IconButton icon={'AntDesign/upcircleo'} size={30} />
          <IconButton icon={'AntDesign/downcircleo'} size={24} />
        </View>
      </View>
      {/* Add Note */}
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
              alignItems: 'stretch',
              flexDirection: 'column',
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
                marginBottom: 10,
                marginLeft: 5,
              }),
              dimensions.width
            )}
          >
            {Constants['taskNote']}
          </Text>
          <TextInput
            allowFontScaling={true}
            changeTextDelay={500}
            multiline={true}
            numberOfLines={4}
            onChangeText={newTextAreaValue => {
              const textInputValue = newTextAreaValue;
              try {
                setTextInputValue(textInputValue);
                undefined;
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder={'Write a note'}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextInputStyles(theme)['Text Area'],
              dimensions.width
            )}
            textAlignVertical={'top'}
            value={textInputValue}
          />
        </View>
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

export default withTheme(AddNoteViewBlock);
