import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { IconButton, withTheme } from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const EditOptionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          }),
          dimensions.width
        )}
      >
        {Constants['taskStatus']}
      </Text>
      <IconButton icon={'Feather/edit-3'} size={24} />
      {/* Icon Button 2 */}
      <IconButton icon={'EvilIcons/close-o'} size={30} />
    </View>
  );
};

export default withTheme(EditOptionBlock);
