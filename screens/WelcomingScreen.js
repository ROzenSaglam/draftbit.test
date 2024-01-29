import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const WelcomingScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const authme = (await XanoApi.authmeGET(Constants))?.json;
        const name = authme?.name;
        const id = authme?.id;
        setGlobalVariableValue({
          key: 'userID',
          value: id,
        });
        setGlobalVariableValue({
          key: 'userName',
          value: name,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            flexDirection: 'row',
            height: 48,
            marginTop: 12,
            paddingLeft: 16,
            paddingRight: 16,
          },
          dimensions.width
        )}
      >
        {/* Back Click */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: 48,
              justifyContent: 'center',
              width: 48,
            },
            dimensions.width
          )}
        ></View>
      </View>
      {/* Screen Heading */}
      <Text
        style={StyleSheet.applyWidth(
          {
            color: theme.colors['Strong'],
            fontFamily: 'Inter_600SemiBold',
            fontSize: 28,
            marginTop: 15,
            textAlign: 'center',
          },
          dimensions.width
        )}
      >
        {'Welcome '}
        {null}
        {' !'}
      </Text>
      {/* Sub Heading */}
      <Text
        style={StyleSheet.applyWidth(
          {
            color: theme.colors['Strong'],
            fontFamily: 'Inter_400Regular',
            fontSize: 15,
            letterSpacing: 0.3,
            lineHeight: 21,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 15,
            opacity: 0.75,
            textAlign: 'center',
          },
          dimensions.width
        )}
      >
        {
          'Greet the day with a smile! With Nevermind, every task feels like a breeze.'
        }
      </Text>
      {/* Image */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center' },
          dimensions.width
        )}
      >
        <Image
          resizeMode={'contain'}
          source={Images.GraphicDesigner}
          style={StyleSheet.applyWidth(
            { height: '50%', width: '100%' },
            dimensions.width
          )}
        />
      </View>
      {/* Buttons */}
      <View
        style={StyleSheet.applyWidth(
          {
            borderColor: theme.colors['Divider'],
            borderTopWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingLeft: 20,
            paddingRight: 20,
          },
          dimensions.width
        )}
      >
        {/* Continue */}
        <Button
          onPress={() => {
            try {
              navigation.navigate('BottomTabNavigator', {
                screen: 'HomeNavigator',
                params: { screen: 'HomepageGridCopyScreen' },
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.primary,
              borderRadius: 100,
              fontFamily: 'Inter_600SemiBold',
              fontSize: 15,
              height: 58,
              marginBottom: 20,
              marginTop: 20,
              textAlign: 'center',
              width: '48%',
            },
            dimensions.width
          )}
          title={'Continue '}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(WelcomingScreen);
