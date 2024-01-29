import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import {
  Button,
  IconButton,
  KeyboardAvoidingView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import {
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ReminderModalBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <Modal animationType={'slide'} transparent={false}>
      {/* View 3 */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)} />
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          { backgroundColor: theme.colors['Light'], borderRadius: 12, flex: 3 },
          dimensions.width
        )}
      >
        <ScrollView
          bounces={true}
          contentContainerStyle={StyleSheet.applyWidth(
            { justifyContent: 'flex-end' },
            dimensions.width
          )}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Light'],
                borderColor: theme.colors['Medium'],
                justifyContent: 'flex-end',
                minHeight: '50%',
              },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-end',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  padding: 5,
                },
                dimensions.width
              )}
            >
              <IconButton icon={'AntDesign/closecircleo'} size={32} />
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'flex-end', padding: 20 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 22,
                    marginBottom: 5,
                  }),
                  dimensions.width
                )}
              >
                {'Title: '}
              </Text>
              <TextInput
                allowFontScaling={true}
                autoCapitalize={'none'}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  const textInputValue = newTextInputValue;
                  try {
                    setTextInputValue(textInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                placeholder={'Enter a title here'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'],
                    { fontFamily: 'Inter_300Light' }
                  ),
                  dimensions.width
                )}
                value={textInputValue}
              />
            </View>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  justifyContent: 'flex-end',
                  padding: 20,
                },
                dimensions.width
              )}
            >
              {/* Text 2 */}
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Strong'],
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 22,
                    marginBottom: 5,
                  }),
                  dimensions.width
                )}
              >
                {'Body:'}
              </Text>
              <TextInput
                allowFontScaling={true}
                changeTextDelay={500}
                multiline={true}
                numberOfLines={4}
                onChangeText={newTextAreaValue => {
                  const textInputValue = newTextAreaValue;
                  try {
                    setTextInputValue(textInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                placeholder={'Write your message here'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Area'],
                    { fontFamily: 'Inter_300Light' }
                  ),
                  dimensions.width
                )}
                textAlignVertical={'top'}
                value={textInputValue}
              />
            </View>
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 20,
                },
                dimensions.width
              )}
            >
              <Button
                onPress={() => {
                  const handler = async () => {
                    try {
                      const Token = await getPushTokenUtil({
                        failMessage:
                          'Failed to get push token for push notification!',
                        deviceMessage:
                          'Must use physical device for Push Notifications',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'],
                    { width: '30%' }
                  ),
                  dimensions.width
                )}
                title={'Save'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={StyleSheet.applyWidth(
          { flex: 2, justifyContent: 'flex-end' },
          dimensions.width
        )}
      />
    </Modal>
  );
};

export default withTheme(ReminderModalBlock);
