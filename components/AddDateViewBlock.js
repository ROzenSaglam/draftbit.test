import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  DatePicker,
  Divider,
  Icon,
  IconButton,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const AddDateViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [date, setDate] = React.useState(new Date());

  return (
    <View
      style={StyleSheet.applyWidth(
        { paddingLeft: 20, paddingRight: 20 },
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
            {'Deadline'}
          </Text>
          <Icon
            color={theme.colors['Strong']}
            name={'MaterialIcons/date-range'}
            size={24}
          />
        </View>
        <IconButton icon={'AntDesign/downcircleo'} size={24} />
        {/* Icon Button 2 */}
        <IconButton icon={'AntDesign/upcircleo'} size={30} />
      </View>
      {/* Edit date */}
      <View
        style={StyleSheet.applyWidth({ borderRadius: 12 }, dimensions.width)}
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
            {Constants['taskDate']}
          </Text>
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

export default withTheme(AddDateViewBlock);
