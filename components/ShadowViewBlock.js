import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Shadow, withTheme } from '@draftbit/ui';
import { View, useWindowDimensions } from 'react-native';

const ShadowViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: 'rgb(67, 73, 164)',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          height: 10,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.86,
        },
        dimensions.width
      )}
    >
      <Shadow
        paintInside={true}
        showShadowCornerBottomEnd={true}
        showShadowCornerBottomStart={true}
        showShadowCornerTopEnd={true}
        showShadowCornerTopStart={true}
        showShadowSideBottom={true}
        showShadowSideEnd={true}
        showShadowSideStart={true}
        showShadowSideTop={true}
      />
    </View>
  );
};

export default withTheme(ShadowViewBlock);
