import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { withTheme } from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const NoOptionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isInclude = (pickerValue, categoryOptions) => {
    if (categoryOptions.includes(pickerValue)) {
      return true;
    }
  };

  const tasksByStatus = (tasks, status) => {
    if (!Array.isArray(tasks)) {
      console.warn('Warning: tasks is not filterable! Detected type:');
      console.log(typeof tasks);
      return [];
    }
    return tasks.filter(task => {
      const matchesStatus = !status || task.Status === status;
      console.log(status);
      console.log('Matches Status:', matchesStatus);
      return matchesStatus;
    });
  };

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'auto',
          flex: 1,
          minHeight: 100,
          paddingLeft: 30,
          paddingRight: 30,
        },
        dimensions.width
      )}
    >
      <Image
        resizeMode={'cover'}
        source={Images.Question1}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
            height: 200,
            width: 200,
          }),
          dimensions.width
        )}
      />
      <Text
        accessible={true}
        allowFontScaling={true}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Inter_500Medium',
            fontSize: 20,
            textAlign: 'center',
          }),
          dimensions.width
        )}
      >
        {"You haven't selected \nan option yet"}
      </Text>
    </View>
  );
};

export default withTheme(NoOptionBlock);
