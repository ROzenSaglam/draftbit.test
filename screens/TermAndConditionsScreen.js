import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Icon,
  Markdown,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';

const TermAndConditionsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* Top header */}
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

      <View>
        <Text
          accessible={true}
          allowFontScaling={true}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              fontFamily: 'Inter_500Medium',
              fontSize: 18,
              margin: 20,
              marginTop: 30,
            }),
            dimensions.width
          )}
        >
          {'Term and Conditions'}
        </Text>

        <View style={StyleSheet.applyWidth({ margin: 20 }, dimensions.width)}>
          <ScrollView
            bounces={true}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
          >
            <Markdown
              style={StyleSheet.applyWidth(
                { fontFamily: 'Inter_400Regular' },
                dimensions.width
              )}
            >
              {
                '**1. Acceptance of Terms**\nBy accessing and using the Nevermind app, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please refrain from using our app.\n\n**2. Changes to Terms**\nNevermind reserves the right to modify these terms at any time without prior notice. Continued use of the app after such changes indicates your acceptance of the updated terms.\n\n**3. Use of the App**\nNevermind grants you a non-exclusive, non-transferable, limited right to access and use the app for personal, non-commercial purposes, provided you comply with these terms.\n\n**4. Limitation of Liability**\nUnder no circumstances will Nevermind be liable for any direct, indirect, special, or consequential damages, including but not limited to, loss of profits arising out of the use or inability to use the app.\n\n**5. Intellectual Property**\nAll content, including but not limited to graphics, logos, and text, is the property of Nevermind or its content suppliers and is protected by copyright laws.\n\n**6. Image Credits**\nThe graphics and illustrations used in this app are sourced from [Doodle Hand Drawn Flat collection on Flaticon.com.](https://www.flaticon.com/authors/stickers/flat?author_id=1167&type=sticker) All rights and credits belong to their respective creators. We thank Flaticon and the creators for their wonderful designs.\n\n**7. Privacy Policy**\nYour privacy is important to us. Please refer to our Privacy Policy, which explains how we collect, use, and protect the personal information you provide to us.\n\n**8. Termination**\nNevermind reserves the right to terminate your access to the app, without any advance notice.\n\n**9. Governing Law**\nThese terms are governed by and construed in accordance with the laws of [Your Country/State], and you agree to submit to the exclusive jurisdiction of the Turkey courts.\n\n**10. Contact Us**\nFor any questions or suggestions regarding these terms, please contact us at rumeysaozensaglam@gmail.com.'
              }
            </Markdown>
          </ScrollView>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(TermAndConditionsScreen);
