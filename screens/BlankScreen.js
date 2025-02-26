import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import palettes from '../themes/palettes';
import useWindowDimensions from '../utils/useWindowDimensions';

const BlankScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return <ScreenContainer hasSafeArea={false} scrollable={false} />;
};

export default withTheme(BlankScreen);
