import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  CheckboxRow,
  Divider,
  Icon,
  KeyboardAvoidingView,
  Pressable,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const LoginScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [passwordinput2, setPasswordinput2] = React.useState(passwordInput);
  const [textInputValue, setTextInputValue] = React.useState('');
  const myErrorMessage = msg => {
    return 'Invalid username or password';
  };

  return (
    <ScreenContainer
      hasSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Strong Inverse'] },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-evenly',
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 20,
          },
          dimensions.width
        )}
      >
        {/* Logo */}
        <Image
          resizeMode={'cover'}
          source={Images._1}
          style={StyleSheet.applyWidth(
            { height: 220, width: 220 },
            dimensions.width
          )}
        />
        {/* error message */}
        <>
          {!error ? null : (
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Error'],
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                },
                dimensions.width
              )}
            >
              {myErrorMessage(Constants['errorMessage'])}
            </Text>
          )}
        </>
      </View>

      <KeyboardAvoidingView
        behavior={'padding'}
        enabled={true}
        style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, paddingLeft: 24, paddingRight: 24 },
            dimensions.width
          )}
        >
          {/* Email */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['BG Gray'],
                borderBottomWidth: 1,
                borderColor: theme.colors['Divider'],
                borderLeftWidth: 1,
                borderRadius: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors['Custom Color_20']}
              name={'MaterialCommunityIcons/email'}
              size={24}
            />
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              <TextInput
                autoFocus={true}
                clearTextOnFocus={false}
                editable={true}
                onChangeText={newTextInputValue => {
                  try {
                    const valueyaO2Td0q = newTextInputValue;
                    setTextInputValue(valueyaO2Td0q);
                    const emailresponse = valueyaO2Td0q;
                    setGlobalVariableValue({
                      key: 'emailInput',
                      value: emailresponse,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                placeholder={'Email'}
                placeholderTextColor={theme.colors['Custom Color_20']}
                spellcheck={true}
                style={StyleSheet.applyWidth(
                  {
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderRadius: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={textInputValue}
              />
            </View>
          </View>
          {/* Password */}
          <>
            {!!clicked ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['BG Gray'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Divider'],
                    borderLeftWidth: 1,
                    borderRadius: 16,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    flexDirection: 'row',
                    height: 60,
                    justifyContent: 'space-between',
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <Icon
                  color={theme.colors['Custom Color_20']}
                  name={'FontAwesome/lock'}
                  size={24}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, paddingLeft: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  <TextInput
                    defaultValue={Constants['passwordInput']}
                    editable={true}
                    onChangeText={newTextInputValue => {
                      try {
                        const valuemi6QBBad = newTextInputValue;
                        setPasswordInput(valuemi6QBBad);
                        const response = valuemi6QBBad;
                        setGlobalVariableValue({
                          key: 'passwordInput',
                          value: response,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    placeholder={'Password'}
                    placeholderTextColor={theme.colors['Custom Color_20']}
                    secureTextEntry={true}
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        paddingBottom: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 8,
                      },
                      dimensions.width
                    )}
                  />
                </View>

                <Pressable
                  onPress={() => {
                    try {
                      setClicked(!clicked);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <>
                    {!!clicked ? null : (
                      <Icon
                        color={theme.colors['Custom Color_20']}
                        name={'Ionicons/md-eye-off'}
                        size={24}
                      />
                    )}
                  </>
                </Pressable>
              </View>
            )}
          </>
          {/* Password 2 */}
          <>
            {!clicked ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors['BG Gray'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Divider'],
                    borderLeftWidth: 1,
                    borderRadius: 16,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    flexDirection: 'row',
                    height: 60,
                    justifyContent: 'space-between',
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <Icon
                  color={theme.colors['Custom Color_20']}
                  name={'FontAwesome/lock'}
                  size={24}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, paddingLeft: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  <TextInput
                    autoFocus={true}
                    clearTextOnFocus={false}
                    defaultValue={Constants['passwordInput']}
                    editable={true}
                    onChangeText={newTextInputValue => {
                      try {
                        const valuefV856pkJ = newTextInputValue;
                        setPasswordinput2(valuefV856pkJ);
                        const response = valuefV856pkJ;
                        setGlobalVariableValue({
                          key: 'passwordInput',
                          value: response,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    placeholder={'Password'}
                    placeholderTextColor={theme.colors['Custom Color_20']}
                    secureTextEntry={false}
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 8,
                        paddingBottom: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 8,
                      },
                      dimensions.width
                    )}
                  />
                </View>

                <Pressable
                  onPress={() => {
                    try {
                      setClicked(!clicked);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* Icon 2 */}
                  <Icon
                    color={theme.colors['Light']}
                    name={'Ionicons/eye'}
                    size={24}
                  />
                </Pressable>
              </View>
            )}
          </>
          <>
            {!Constants['errorMessage'] ? null : (
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {Constants['errorMessage']}
              </Text>
            )}
          </>
          {/* Sign in */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  const loginresponse = (
                    await XanoApi.loginPOST(Constants, {
                      email: Constants['emailInput'],
                      pswr: Constants['passwordInput'],
                    })
                  )?.json;
                  const authtoken = loginresponse?.authToken;
                  const MessagE = loginresponse?.message;
                  setGlobalVariableValue({
                    key: 'errorMessage',
                    value: MessagE,
                  });
                  if (!authtoken) {
                    return;
                  }
                  setGlobalVariableValue({
                    key: 'Xano_Authtoken',
                    value: 'Bearer ' + authtoken,
                  });
                  navigation.navigate('Welcoming2Screen');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgb(72, 15, 196)',
                borderRadius: 100,
                fontFamily: 'Inter_600SemiBold',
                fontSize: 15,
                height: 58,
                marginTop: 20,
                textAlign: 'center',
                width: '100%',
              },
              dimensions.width
            )}
            title={'Sign in'}
          />
          {/* Sign up */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('SignupScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingBottom: 10,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Custom Color_20'],
                    fontFamily: 'Inter_400Regular',
                  },
                  dimensions.width
                )}
              >
                {'Don’t have an account?'}
              </Text>

              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Custom Color'],
                    fontFamily: 'Inter_500Medium',
                    marginLeft: 7,
                  },
                  dimensions.width
                )}
              >
                {'Sign up'}
              </Text>
            </View>
          </Touchable>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
