import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Icon, IconButton, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View, useWindowDimensions } from 'react-native';

const DefaultCategoryViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignContent: 'space-between',
          alignSelf: 'stretch',
          flex: 1,
          justifyContent: 'space-between',
          margin: 5,
          marginBottom: 10,
        },
        dimensions.width
      )}
    >
      <Touchable
        onPress={() => {
          try {
            navigation.navigate('BottomTabNavigator', {
              screen: 'HomeNavigator',
              params: { screen: 'DisplayyourtasksScreen' },
            });
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          {
            alignSelf: 'stretch',
            marginBottom: 14,
            marginTop: 14,
            width: '45%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'space-around',
              alignItems: 'stretch',
              alignSelf: 'stretch',
              backgroundColor: theme.colors.background,
              borderBottomWidth: 1,
              borderColor: theme.colors['Primary'],
              borderLeftWidth: 1,
              borderRadius: theme.roundness,
              borderRightWidth: 1,
              borderTopWidth: 1,
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent: 'space-between',
              minHeight: 130,
              paddingBottom: 14,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 14,
              width: 150,
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'flex-start' },
                dimensions.width
              )}
            >
              <Text
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 18,
                    textAlign: 'left',
                    typography: theme.typography.headline6,
                  },
                  dimensions.width
                )}
              >
                {null}
              </Text>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'flex-end' },
                dimensions.width
              )}
            ></View>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(DefaultCategoryViewBlock);
