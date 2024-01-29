import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Icon, IconButton, Touchable, withTheme } from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const TodoCategoriesBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignContent: 'space-between',
          alignSelf: 'stretch',
          flex: 1,
          justifyContent: 'space-between',
          width: '100%',
        },
        dimensions.width
      )}
    >
      <Touchable
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
              alignContent: 'space-between',
              alignItems: 'stretch',
              alignSelf: 'stretch',
              backgroundColor: theme.colors.background,
              borderBottomWidth: 1,
              borderColor: theme.colors.divider,
              borderLeftWidth: 1,
              borderRadius: theme.roundness,
              borderRightWidth: 1,
              borderTopWidth: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingBottom: 14,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 14,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* View 2 */}
              <View>
                <Text
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
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
                  { flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* Icon Button 2 */}
                <IconButton
                  color={theme.colors['style-1']}
                  icon={'AntDesign/edit'}
                  size={24}
                />
                <IconButton
                  color={theme.colors['style-1']}
                  icon={'MaterialCommunityIcons/delete-outline'}
                  size={24}
                />
              </View>
            </View>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 42,
                justifyContent: 'center',
                width: 42,
              },
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors.strong}
              name={'Entypo/bar-graph'}
              size={24}
              style={StyleSheet.applyWidth(
                { height: 24, width: 24 },
                dimensions.width
              )}
            />
          </View>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(TodoCategoriesBlock);
