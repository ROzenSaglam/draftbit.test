import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openCameraUtil from '../utils/openCamera';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const AddImageViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        },
        dimensions.width
      )}
    >
      {/* Section Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            marginTop: 20,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row' },
            dimensions.width
          )}
        >
          {/* Heading */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.strong,
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                marginRight: 5,
              },
              dimensions.width
            )}
          >
            {'Add image\n'}
          </Text>
          <Icon
            color={theme.colors['Strong']}
            name={'Entypo/images'}
            size={24}
          />
        </View>

        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row' },
            dimensions.width
          )}
        >
          {/* Icon Button 2 */}
          <IconButton icon={'AntDesign/upcircleo'} size={30} />
          <IconButton icon={'AntDesign/downcircleo'} size={24} />
        </View>
      </View>
      {/* Edit Name */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'stretch', borderRadius: 12 },
          dimensions.width
        )}
      >
        {/* edit option */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: 10,
            },
            dimensions.width
          )}
        >
          <Button
            icon={'FontAwesome/camera'}
            onPress={() => {
              const handler = async () => {
                try {
                  const response = await openCameraUtil({
                    mediaTypes: 'Images',
                    allowsEditing: true,
                    cameraType: 'back',
                    videoMaxDuration: undefined,
                    quality: 0.2,
                  });

                  setGlobalVariableValue({
                    key: 'taskImage',
                    value: response,
                  });
                  console.log(response);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                marginBottom: 10,
                width: '20%',
              }),
              dimensions.width
            )}
            title={'\n\n'}
          />
          <View
            style={StyleSheet.applyWidth({ minHeight: '3%' }, dimensions.width)}
          >
            <Image
              resizeMode={'cover'}
              source={{ uri: `${Constants['taskImage']}` }}
              style={StyleSheet.applyWidth(
                GlobalStyles.ImageStyles(theme)['Image'],
                dimensions.width
              )}
            />
          </View>
        </View>
      </View>
      <Spacer bottom={8} left={8} right={8} top={8} />
      <Divider
        color={theme.colors.divider}
        style={StyleSheet.applyWidth(
          GlobalStyles.DividerStyles(theme)['Divider'],
          dimensions.width
        )}
      />
      {/* Spacer 2 */}
      <Spacer bottom={8} left={8} right={8} top={8} />
    </View>
  );
};

export default withTheme(AddImageViewBlock);
