import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useIsOnline from '../utils/useIsOnline';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';

const WelcomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const isOnline = useIsOnline();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Background'] },
        dimensions.width
      )}
    >
      <Touchable
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
      >
        <ImageBackground
          resizeMode={'contain'}
          source={Images._1}
          style={StyleSheet.applyWidth(
            { height: '100%', justifyContent: 'space-evenly', width: '100%' },
            dimensions.width
          )}
        >
          {/* Title */}
          <>
            {!isOnline ? null : (
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Strong'],
                    fontFamily: 'Alata_400Regular',
                    fontSize: 24,
                    marginTop: 300,
                    paddingLeft: 30,
                    paddingRight: 30,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
              >
                {'ease of mind'}
              </Text>
            )}
          </>
          <View>
            {/* Button 2 */}
            <Button
              onPress={() => {
                try {
                  navigation.navigate('SignupScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                  marginBottom: 10,
                  marginLeft: 40,
                  marginRight: 40,
                }),
                dimensions.width
              )}
              title={'Signup'}
            />
            <Button
              onPress={() => {
                try {
                  navigation.navigate('LoginScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: theme.colors['Primary'],
                  borderWidth: 1,
                  color: theme.colors['Primary'],
                  marginLeft: 40,
                  marginRight: 40,
                }),
                dimensions.width
              )}
              title={'Login\n'}
            />
          </View>
        </ImageBackground>
      </Touchable>
    </ScreenContainer>
  );
};

export default withTheme(WelcomeScreen);
