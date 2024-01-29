import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { withTheme } from '@draftbit/ui';
import { View, useWindowDimensions } from 'react-native';

const ShadowBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: 'rgb(102, 102, 169)',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          height: 10,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.86,
        },
        dimensions.width
      )}
    />
  );
};

export default withTheme(ShadowBlock);
