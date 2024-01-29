import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, withTheme } from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const ReminderBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View>
      {/* View 2 */}
      <View>
        <Text
          accessible={true}
          allowFontScaling={true}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              alignSelf: 'center',
              fontFamily: 'Inter_300Light',
              marginBottom: 5,
              marginTop: 5,
            }),
            dimensions.width
          )}
        >
          {'Do you want to set reminder?'}
        </Text>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'space-around',
            flexDirection: 'row',
            justifyContent: 'center',
          },
          dimensions.width
        )}
      >
        <Button
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
              margin: 10,
            }),
            dimensions.width
          )}
          title={'Yes\n'}
        />
        {/* Button 2 */}
        <Button
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
              margin: 10,
            }),
            dimensions.width
          )}
          title={'No'}
        />
      </View>
    </View>
  );
};

export default withTheme(ReminderBlock);
