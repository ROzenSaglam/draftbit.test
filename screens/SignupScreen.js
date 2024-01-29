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
  Icon,
  KeyboardAvoidingView,
  Pressable,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const SignupScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [passwordinput2, setPasswordinput2] = React.useState(passwordInput);
  const [textInput2Value, setTextInput2Value] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const validateForm = () => {
    // Email regex pattern
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Password regex pattern: At least 8 characters long, with one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!emailRegex.test(textInputValue)) {
      setErrorMessage('Invalid email format.');
      return false;
    }

    if (!passwordRegex.test(passwordInput)) {
      setErrorMessage(
        'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit'
      );
      return false;
    }
    setErrorMessage(''); // Clear any previous error message
    return true;
  };
  const xanoSignupPOST = XanoApi.useSignupPOST();

  return (
    <ScreenContainer
      hasSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Strong Inverse'] },
        dimensions.width
      )}
    >
      <KeyboardAvoidingView
        behavior={'padding'}
        enabled={true}
        style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
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
          {/* Name */}
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
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors['Custom Color_20']}
              name={'FontAwesome/user'}
              size={24}
            />
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* Text Input 2 */}
              <TextInput
                autoCapitalize={'none'}
                changeTextDelay={500}
                onChangeText={newTextInput2Value => {
                  const textInputValue = newTextInput2Value;
                  try {
                    const valuekbXi7H6Y = newTextInput2Value;
                    setTextInput2Value(valuekbXi7H6Y);
                    const nameInputResponse = valuekbXi7H6Y;
                    setGlobalVariableValue({
                      key: 'nameInput',
                      value: nameInputResponse,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                placeholder={'Full Name'}
                placeholderTextColor={theme.colors['text placeholder']}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'],
                    { borderColor: '"rgba(0, 0, 0, 0)"' }
                  ),
                  dimensions.width
                )}
                value={textInput2Value}
              />
            </View>
          </View>
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
                editable={true}
                onChangeText={newTextInputValue => {
                  try {
                    const valueQmm7Mwls = newTextInputValue;
                    setTextInputValue(valueQmm7Mwls);
                    const emailresponse = valueQmm7Mwls;
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
                        const value5c0mrk5i = newTextInputValue;
                        setPasswordInput(value5c0mrk5i);
                        const response = value5c0mrk5i;
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
                        const value6LmaPxPf = passwordInput;
                        setPasswordInput(value6LmaPxPf);
                        const response = value6LmaPxPf;
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
            {!errorMessage ? null : (
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Custom Color_8'],
                  }),
                  dimensions.width
                )}
              >
                {errorMessage}
              </Text>
            )}
          </>
          {/* Sign up */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  if (!validateForm()) {
                    return;
                  }
                  const signupResponse = (
                    await xanoSignupPOST.mutateAsync({
                      email: Constants['emailInput'],
                      name: Constants['nameInput'],
                      psw: Constants['passwordInput'],
                    })
                  )?.json;
                  const auth = signupResponse?.authToken;
                  const error = signupResponse?.message;
                  setErrorMessage(error);
                  console.log(signupResponse);
                  if (!auth) {
                    return;
                  }
                  undefined;
                  navigation.navigate('WelcomingScreen');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgb(82, 30, 237)',
                borderRadius: 100,
                fontFamily: 'Inter_600SemiBold',
                fontSize: 15,
                height: 58,
                textAlign: 'center',
                width: '100%',
              },
              dimensions.width
            )}
            title={'Sign up'}
          />
          {/* Sign up */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('LoginScreen');
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
                {'Already have an account?'}
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
                {'Log in'}
              </Text>
            </View>
          </Touchable>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default withTheme(SignupScreen);
