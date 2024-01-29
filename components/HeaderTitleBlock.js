import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { withTheme } from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const HeaderTitleBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View style={StyleSheet.applyWidth({ padding: 20 }, dimensions.width)}>
      <Text
        accessible={true}
        allowFontScaling={true}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
          }),
          dimensions.width
        )}
      >
        {'Create Task'}
      </Text>
    </View>
  );
};

export default withTheme(HeaderTitleBlock);
