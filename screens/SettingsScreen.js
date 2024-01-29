import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getLocationUtil from '../utils/getLocation';
import openCameraUtil from '../utils/openCamera';
import {
  Circle,
  Icon,
  IconButton,
  ScreenContainer,
  Switch,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const SettingsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [openInstagram, setOpenInstagram] = React.useState('');
  const [radioButtonGroupValue, setRadioButtonGroupValue] = React.useState('');
  const [switchValue, setSwitchValue] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* 'If/Else' action requires configuration: select If Condition */
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          { height: 48, marginLeft: 20, marginTop: 12 },
          dimensions.width
        )}
      ></View>

      <ScrollView
        bounces={true}
        contentContainerStyle={StyleSheet.applyWidth(
          { flex: 1, marginBottom: 20, paddingBottom: 25 },
          dimensions.width
        )}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        {/* User Details */}
        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'center', minHeight: 90 },
            dimensions.width
          )}
        >
          {/* Photo */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <Touchable
              activeOpacity={0.8}
              disabledOpacity={0.8}
              onPress={() => {
                const handler = async () => {
                  try {
                    const response = await openCameraUtil({
                      mediaTypes: 'Images',
                      allowsEditing: true,
                      cameraType: 'front',
                      videoMaxDuration: undefined,
                      quality: 0.2,
                    });

                    console.log(response);
                    setGlobalVariableValue({
                      key: 'profilePhoto',
                      value: response,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              <Circle
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.CircleStyles(theme)['Circle'],
                    { borderRadius: 5, borderWidth: 1, overflow: 'hidden' }
                  ),
                  dimensions.width
                )}
              >
                <Image
                  resizeMode={'cover'}
                  source={{ uri: `${Constants['profilePhoto']}` }}
                  style={StyleSheet.applyWidth(
                    { height: 100, overflow: 'hidden', width: 100 },
                    dimensions.width
                  )}
                />
              </Circle>
              {/* Circle 2 */}
              <Circle
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.CircleStyles(theme)['Circle'],
                    {
                      backgroundColor: theme.colors['Surface'],
                      borderWidth: 1,
                      height: 40,
                      marginBottom: 0,
                      marginRight: 0,
                      position: 'absolute',
                      width: 40,
                    }
                  ),
                  dimensions.width
                )}
              >
                <IconButton
                  color={theme.colors['Light']}
                  icon={'AntDesign/delete'}
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'profilePhoto',
                        value: Constants['photoDefault'],
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                />
              </Circle>
            </Touchable>
          </View>
          {/* Name */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.strong,
                fontFamily: 'Inter_500Medium',
                fontSize: 18,
                marginTop: 12,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {Constants['userName']}
          </Text>
        </View>
        {/* Menu */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Custom #ffffff'],
              borderRadius: 12,
              flex: 2,
              flexDirection: 'column',
              marginBottom: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
            },
            dimensions.width
          )}
        >
          {/* Privacy */}
          <Touchable
            activeOpacity={0.8}
            disabledOpacity={0.8}
            onPress={() => {
              const handler = async () => {
                try {
                  await WebBrowser.openBrowserAsync(
                    'https://www.freeprivacypolicy.com/live/a2dfeaa9-bde3-460f-b02d-ef8bb6764a1e'
                  );
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', height: 60 },
                dimensions.width
              )}
            >
              <Icon
                color={theme.colors['Strong']}
                name={'MaterialCommunityIcons/security'}
                size={24}
                style={StyleSheet.applyWidth(
                  { opacity: 0.6 },
                  dimensions.width
                )}
              />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 15,
                    marginLeft: 10,
                    opacity: 0.8,
                  },
                  dimensions.width
                )}
              >
                {'Privacy Policy'}
              </Text>
            </View>
          </Touchable>
          {/* Terms and Conditions */}
          <Touchable
            activeOpacity={0.8}
            disabledOpacity={0.8}
            onPress={() => {
              try {
                navigation.navigate('TermAndConditionsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', height: 60 },
                dimensions.width
              )}
            >
              <Icon
                color={theme.colors['Strong']}
                name={'Entypo/text-document'}
                size={24}
                style={StyleSheet.applyWidth(
                  { opacity: 0.6 },
                  dimensions.width
                )}
              />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 15,
                    marginLeft: 10,
                    opacity: 0.8,
                  },
                  dimensions.width
                )}
              >
                {'Term And Conditions'}
              </Text>
            </View>
          </Touchable>
          {/* Contact Us */}
          <Touchable
            activeOpacity={0.8}
            disabledOpacity={0.8}
            onPress={() => {
              try {
                setOpenInstagram(!openInstagram);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', height: 60 },
                  dimensions.width
                )}
              >
                <Icon
                  color={theme.colors['Strong']}
                  name={'AntDesign/contacts'}
                  size={24}
                  style={StyleSheet.applyWidth(
                    { opacity: 0.6 },
                    dimensions.width
                  )}
                />
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'Inter_500Medium',
                      fontSize: 15,
                      marginLeft: 10,
                      opacity: 0.8,
                    },
                    dimensions.width
                  )}
                >
                  {'Contact Us'}
                </Text>
              </View>
              {/* View 2 */}
              <>
                {!openInstagram ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      },
                      dimensions.width
                    )}
                  >
                    <IconButton
                      color={theme.colors['Primary']}
                      icon={'AntDesign/instagram'}
                      onPress={() => {
                        try {
                          Linking.openURL('https://www.instagram.com/r.ozesa/');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                      style={StyleSheet.applyWidth(
                        { marginLeft: 20, marginRight: 10 },
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { color: theme.colors['Primary'] }
                        ),
                        dimensions.width
                      )}
                    >
                      {'nevermind'}
                    </Text>
                  </View>
                )}
              </>
            </View>
          </Touchable>
          {/* Logout */}
          <Touchable
            activeOpacity={0.8}
            disabledOpacity={0.8}
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'auth_header',
                  value: '',
                });
                navigation.navigate('LoginScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', height: 60 },
                dimensions.width
              )}
            >
              <Icon
                color={theme.colors['Strong']}
                name={'AntDesign/logout'}
                size={24}
                style={StyleSheet.applyWidth(
                  { opacity: 0.6 },
                  dimensions.width
                )}
              />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 15,
                    marginLeft: 10,
                    opacity: 0.8,
                  },
                  dimensions.width
                )}
              >
                {'Logout'}
              </Text>
            </View>
          </Touchable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(SettingsScreen);
