import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { withTheme } from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const TaskViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'flex-start',
          backgroundColor: theme.colors['Studily_Washed_Lavender_White'],
          borderRadius: 12,
          flexDirection: 'column',
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          opacity: 1,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        },
        dimensions.width
      )}
    >
      {/* Title */}
      <Text
        style={StyleSheet.applyWidth(
          {
            color: theme.colors.strong,
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
          },
          dimensions.width
        )}
      >
        {'Task : '}
        {null}
      </Text>
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'row' },
          dimensions.width
        )}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', paddingTop: 10 },
            dimensions.width
          )}
        >
          {/* Text 2 */}
          <Text
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Inter_300Light',
                fontSize: 12,
              }),
              dimensions.width
            )}
          >
            {'Priority : '}
          </Text>

          <Text
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Inter_600SemiBold',
                fontSize: 12,
              }),
              dimensions.width
            )}
          >
            {null}
          </Text>
        </View>

        <View
          style={StyleSheet.applyWidth(
            { flex: 1, flexDirection: 'row', marginTop: 10 },
            dimensions.width
          )}
        >
          {/* type  */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.strong,
                fontFamily: 'Inter_300Light',
                fontSize: 12,
                opacity: 0.6,
                paddingLeft: 5,
              },
              dimensions.width
            )}
          >
            {'•   Deadline : '}
            {null}
          </Text>
        </View>
      </View>
      {/* Status Tags */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'flex-start' },
          dimensions.width
        )}
      >
        {/* Pending Payment */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Custom Color_19'],
              borderRadius: 5,
              marginTop: 16,
            },
            dimensions.width
          )}
        >
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Strong'],
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                paddingBottom: 6,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 6,
              },
              dimensions.width
            )}
          >
            {null}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default withTheme(TaskViewBlock);
