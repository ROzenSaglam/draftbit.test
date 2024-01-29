import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';

const Welcoming2Screen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [myVariable, setMyVariable] = React.useState(false);
  const setTimeVar = () => {
    setTimeout(() => {
      setMyVariable(true);
    }, 3000);

    return console.log(myVariable);
  };
  const xanoFilterByUserIdPOST = XanoApi.useFilterByUserIdPOST();
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
        const response = setTimeVar();
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
        {'Welcome back '}
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
        {'Your tasks are loading...'}
      </Text>
      {/* Buttons */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            borderColor: theme.colors['Divider'],
            borderTopWidth: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minHeight: 200,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 40,
          },
          dimensions.width
        )}
      >
        {/* Continue */}
        <>
          {!myVariable ? null : (
            <Button
              onPress={() => {
                const handler = async () => {
                  try {
                    const response = (
                      await xanoFilterByUserIdPOST.mutateAsync({
                        user_id: Constants['userID'],
                      })
                    )?.json;
                    console.log(response);
                    if (response) {
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'HomeNavigator',
                        params: { screen: 'UpcomingScreen' },
                      });
                    } else {
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'HomeNavigator',
                        params: { screen: 'HomepageGridCopyScreen' },
                      });
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
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
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Welcoming2Screen);
