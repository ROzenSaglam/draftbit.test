import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Icon, Surface, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { View, useWindowDimensions } from 'react-native';

const TopHeader2Block = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          flexDirection: 'row',
          height: 55,
          justifyContent: 'space-between',
          marginTop: 8,
          paddingLeft: 16,
          paddingRight: 16,
          width: '100%',
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          { height: 48, justifyContent: 'center', width: 48 },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Surface
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderRadius: 24,
                height: 48,
                justifyContent: 'center',
                minHeight: 48,
                width: 48,
              },
              dimensions.width
            )}
          >
            <Icon name={'Entypo/chevron-left'} size={24} />
          </Surface>
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(TopHeader2Block);
