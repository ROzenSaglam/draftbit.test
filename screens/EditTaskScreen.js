import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import schedulePushNotification from '../global-functions/schedulePushNotification';
import transformOnlyDate from '../global-functions/transformOnlyDate';
import { parseBoolean } from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import openCameraUtil from '../utils/openCamera';
import {
  Button,
  DatePicker,
  Divider,
  Icon,
  IconButton,
  Picker,
  ScreenContainer,
  Spacer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const EditTaskScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [addImage, setAddImage] = React.useState('');
  const [addNote, setAddNote] = React.useState('');
  const [date, setDate] = React.useState('');
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [datePickerValue2, setDatePickerValue2] = React.useState(new Date());
  const [datePressed, setDatePressed] = React.useState('');
  const [editID, setEditID] = React.useState('');
  const [namePressed, setNamePressed] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [priorityPressed, setPriorityPressed] = React.useState('');
  const [reminderSet, setReminderSet] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const [statusPressed, setStatusPressed] = React.useState('');
  const [taskImage, setTaskImage] = React.useState('');
  const [taskNote, setTaskNote] = React.useState('');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const xanoEditTasksRecordPOST = XanoApi.useEditTasksRecordPOST();

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      {/* Header title */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          allowFontScaling={true}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              fontFamily: 'Inter_700Bold',
              fontSize: 24,
            }),
            dimensions.width
          )}
        >
          {'Edit Task'}
        </Text>
        <Image
          resizeMode={'cover'}
          source={Images.File}
          style={StyleSheet.applyWidth(
            GlobalStyles.ImageStyles(theme)['Image'],
            dimensions.width
          )}
        />
      </View>

      <ScrollView
        bounces={true}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, flexDirection: 'column', justifyContent: 'flex-start' },
            dimensions.width
          )}
        >
          {/* Task Name */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 30, paddingRight: 30 },
              dimensions.width
            )}
          >
            {/* Edit Name */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flexDirection: 'row' },
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
                  {'Task Name'}
                </Text>
                <Icon
                  color={theme.colors['Strong']}
                  name={'MaterialIcons/add-task'}
                  size={24}
                />
              </View>
              {/* edit option */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                <>
                  {!!namePressed ? null : (
                    <IconButton
                      icon={'AntDesign/downcircleo'}
                      onPress={() => {
                        try {
                          setNamePressed(!namePressed);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
                {/* Icon Button 2 */}
                <>
                  {!namePressed ? null : (
                    <IconButton
                      icon={'AntDesign/upcircleo'}
                      onPress={() => {
                        try {
                          setNamePressed(!namePressed);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
              </View>
            </View>
            {/* View 2 */}
            <View>
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: 'rgb(30, 30, 201)',
                    fontSize: 16,
                    margin: 10,
                    marginLeft: 5,
                  }),
                  dimensions.width
                )}
              >
                {Constants['taskName']}
              </Text>
              <>
                {!namePressed ? null : (
                  <TextInput
                    allowFontScaling={true}
                    autoCapitalize={'none'}
                    changeTextDelay={500}
                    clearButtonMode={'while-editing'}
                    enablesReturnKeyAutomatically={true}
                    onChangeText={newTextInputValue => {
                      try {
                        const valueGMzWOSyz = newTextInputValue;
                        setTextInputValue(valueGMzWOSyz);
                        const response = valueGMzWOSyz;
                        setGlobalVariableValue({
                          key: 'taskName',
                          value: newTextInputValue,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    placeholder={'Enter task name'}
                    placeholderTextColor={theme.colors['Light']}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'],
                        {
                          backgroundColor: theme.colors['Background'],
                          borderColor: theme.colors['Light'],
                          padding: 20,
                          width: '100%',
                        }
                      ),
                      dimensions.width
                    )}
                    value={textInputValue}
                  />
                )}
              </>
            </View>
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
          {/* Priority */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 30, paddingRight: 30 },
              dimensions.width
            )}
          >
            {/* Section Header */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  alignSelf: 'auto',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginTop: 25,
                },
                dimensions.width
              )}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', justifyContent: 'space-between' },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'flex-start', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Priority */}
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
                    {'Priority'}
                  </Text>
                  <Icon
                    color={theme.colors['Strong']}
                    name={'MaterialIcons/notification-important'}
                    size={24}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 12,
                      flexDirection: 'row',
                      marginBottom: 10,
                    },
                    dimensions.width
                  )}
                >
                  <>
                    {!!priorityPressed ? null : (
                      <IconButton
                        icon={'AntDesign/downcircleo'}
                        onPress={() => {
                          try {
                            setPriorityPressed(!priorityPressed);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        size={24}
                      />
                    )}
                  </>
                  {/* Icon Button 2 */}
                  <>
                    {!priorityPressed ? null : (
                      <IconButton
                        icon={'AntDesign/upcircleo'}
                        onPress={() => {
                          try {
                            setPriorityPressed(!priorityPressed);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        size={24}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* edit option */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: 'rgb(30, 30, 201)',
                      fontSize: 16,
                      marginBottom: 10,
                    }),
                    dimensions.width
                  )}
                >
                  {Constants['taskPriority']}
                </Text>
                <>
                  {!priorityPressed ? null : (
                    <Picker
                      autoDismissKeyboard={true}
                      dropDownBackgroundColor={theme.colors.background}
                      dropDownBorderColor={theme.colors.divider}
                      dropDownBorderRadius={8}
                      dropDownBorderWidth={1}
                      iconSize={24}
                      leftIconMode={'inset'}
                      mode={'native'}
                      onValueChange={newPickerValue => {
                        try {
                          setPickerValue2(newPickerValue);
                          setGlobalVariableValue({
                            key: 'taskPriority',
                            value: newPickerValue,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      options={Constants['priorityPicker']}
                      placeholder={'Select an option'}
                      placeholderTextColor={theme.colors['Light']}
                      rightIconName={'AntDesign/down'}
                      selectedIconColor={theme.colors.strong}
                      selectedIconName={'Feather/check'}
                      selectedIconSize={20}
                      style={StyleSheet.applyWidth(
                        { color: theme.colors['Primary'], fontSize: 14 },
                        dimensions.width
                      )}
                      type={'solid'}
                      value={pickerValue2}
                    />
                  )}
                </>
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
          {/* Deadline */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'column', paddingLeft: 30, paddingRight: 30 },
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
                  {'Deadline'}
                </Text>
                <Icon
                  color={theme.colors['Strong']}
                  name={'MaterialIcons/date-range'}
                  size={24}
                />
              </View>
              {/* edit option */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                <>
                  {!!datePressed ? null : (
                    <IconButton
                      icon={'AntDesign/downcircleo'}
                      onPress={() => {
                        try {
                          setDatePressed(!datePressed);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
                {/* Icon Button 2 */}
                <>
                  {!datePressed ? null : (
                    <IconButton
                      icon={'AntDesign/upcircleo'}
                      onPress={() => {
                        try {
                          setDatePressed(!datePressed);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
              </View>
            </View>
            {/* Edit date */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 12 },
                dimensions.width
              )}
            >
              <View>
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: 'rgb(30, 30, 201)',
                      fontSize: 16,
                      marginBottom: 10,
                    }),
                    dimensions.width
                  )}
                >
                  {Constants['taskDate']}
                </Text>
                <>
                  {!datePressed ? null : (
                    <DatePicker
                      autoDismissKeyboard={true}
                      borderColor={theme.colors['Light']}
                      date={(() => {
                        const e = transformOnlyDate(datePickerValue2);
                        console.log(e);
                        return e;
                      })()}
                      label={'Date'}
                      leftIconMode={'inset'}
                      mode={'date'}
                      onDateChange={newDatePickerValue => {
                        const date = newDatePickerValue;
                        try {
                          const valueXloEjImM =
                            transformOnlyDate(newDatePickerValue);
                          setDatePickerValue2(valueXloEjImM);
                          const response = valueXloEjImM;
                          setGlobalVariableValue({
                            key: 'taskDate',
                            value: response,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      rightIconName={'AntDesign/down'}
                      style={StyleSheet.applyWidth(
                        { color: theme.colors['Light'], fontSize: 14 },
                        dimensions.width
                      )}
                      type={'solid'}
                    />
                  )}
                </>
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
          {/* Task status */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 30, paddingRight: 30 },
              dimensions.width
            )}
          >
            {/* Section Header */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: 25,
                },
                dimensions.width
              )}
            >
              {/* Details */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                    {'Status'}
                  </Text>
                  <Icon name={'Entypo/sound'} size={24} />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginBottom: 10,
                    },
                    dimensions.width
                  )}
                >
                  <>
                    {!!statusPressed ? null : (
                      <IconButton
                        icon={'AntDesign/downcircleo'}
                        onPress={() => {
                          try {
                            setStatusPressed(!statusPressed);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        size={24}
                      />
                    )}
                  </>
                  {/* Icon Button 2 */}
                  <>
                    {!statusPressed ? null : (
                      <IconButton
                        icon={'AntDesign/upcircleo'}
                        onPress={() => {
                          try {
                            setStatusPressed(!statusPressed);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        size={24}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* View 2 */}
              <View>
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: 'rgb(30, 30, 201)',
                      fontSize: 16,
                      marginBottom: 10,
                    }),
                    dimensions.width
                  )}
                >
                  {Constants['taskStatus']}
                </Text>
                <>
                  {!statusPressed ? null : (
                    <Picker
                      autoDismissKeyboard={true}
                      dropDownBackgroundColor={theme.colors['Background']}
                      dropDownBorderColor={theme.colors.divider}
                      dropDownBorderRadius={8}
                      dropDownBorderWidth={1}
                      iconSize={24}
                      leftIconMode={'inset'}
                      mode={'native'}
                      onValueChange={newPickerValue => {
                        const pickerValue = newPickerValue;
                        try {
                          setPickerValue(newPickerValue);
                          setGlobalVariableValue({
                            key: 'taskStatus',
                            value: newPickerValue,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      options={Constants['statusPicker']}
                      placeholder={'Select an option'}
                      placeholderTextColor={theme.colors['Light']}
                      rightIconName={'AntDesign/down'}
                      selectedIconColor={theme.colors.strong}
                      selectedIconName={'Feather/check'}
                      selectedIconSize={20}
                      style={StyleSheet.applyWidth(
                        { color: theme.colors['Light'], fontSize: 14 },
                        dimensions.width
                      )}
                      type={'solid'}
                      value={pickerValue}
                    />
                  )}
                </>
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
          {/* add note view */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingLeft: 30,
                paddingRight: 30,
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
                  {'Add Note'}
                </Text>
                <Icon
                  color={theme.colors['Strong']}
                  name={'MaterialCommunityIcons/note-plus'}
                  size={24}
                />
              </View>
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* Icon Button 2 */}
                <>
                  {!addNote ? null : (
                    <IconButton
                      icon={'AntDesign/upcircleo'}
                      onPress={() => {
                        try {
                          setAddNote(!addNote);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
                <>
                  {!!addNote ? null : (
                    <IconButton
                      icon={'AntDesign/downcircleo'}
                      onPress={() => {
                        try {
                          setAddNote(!addNote);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
              </View>
            </View>
            {/* Add Note */}
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
                    alignItems: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: 'rgb(30, 30, 201)',
                      fontSize: 16,
                      marginBottom: 10,
                      marginLeft: 5,
                    }),
                    dimensions.width
                  )}
                >
                  {Constants['taskNote']}
                </Text>
                <>
                  {!addNote ? null : (
                    <TextInput
                      allowFontScaling={true}
                      changeTextDelay={500}
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={newTextAreaValue => {
                        try {
                          const valueHRavpiyi = newTextAreaValue;
                          setTextAreaValue(valueHRavpiyi);
                          const response = valueHRavpiyi;
                          setGlobalVariableValue({
                            key: 'taskNote',
                            value: response,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      placeholder={'Write a note'}
                      placeholderTextColor={theme.colors['Light']}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextInputStyles(theme)['Text Area'],
                        dimensions.width
                      )}
                      textAlignVertical={'top'}
                      value={textAreaValue}
                    />
                  )}
                </>
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
          {/* add image view */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingLeft: 30,
                paddingRight: 30,
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
                <>
                  {!addImage ? null : (
                    <IconButton
                      icon={'AntDesign/upcircleo'}
                      onPress={() => {
                        try {
                          setAddImage(!addImage);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
                <>
                  {!!addImage ? null : (
                    <IconButton
                      icon={'AntDesign/downcircleo'}
                      onPress={() => {
                        try {
                          setAddImage(!addImage);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      size={24}
                    />
                  )}
                </>
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
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <>
                    {!parseBoolean(addImage) ? null : (
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
                                value: (() => {
                                  const e = response;
                                  console.log(e);
                                  return e;
                                })(),
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
                            { marginBottom: 10, width: '23%' }
                          ),
                          dimensions.width
                        )}
                        title={'\n\n'}
                      />
                    )}
                  </>
                  {/* Remove */}
                  <>
                    {!parseBoolean(addImage) ? null : (
                      <Button
                        onPress={() => {
                          try {
                            setGlobalVariableValue({
                              key: 'taskImage',
                              value: Constants['defaultImage'],
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button'],
                            { marginBottom: 10, width: '23%' }
                          ),
                          dimensions.width
                        )}
                        title={'Clear'}
                      />
                    )}
                  </>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    { minHeight: '3%' },
                    dimensions.width
                  )}
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
              color={theme.colors['Divider']}
              style={StyleSheet.applyWidth(
                GlobalStyles.DividerStyles(theme)['Divider'],
                dimensions.width
              )}
            />
            {/* Spacer 2 */}
            <Spacer bottom={8} left={8} right={8} top={8} />
          </View>
        </View>
      </ScrollView>

      <View
        style={StyleSheet.applyWidth(
          { bottom: 20, flexDirection: 'row', justifyContent: 'space-around' },
          dimensions.width
        )}
      >
        {/* Cancel */}
        <>
          {!!saved ? null : (
            <Button
              onPress={() => {
                try {
                  navigation.goBack();
                  setGlobalVariableValue({
                    key: 'taskName',
                    value: '',
                  });
                  setGlobalVariableValue({
                    key: 'taskStatus',
                    value: '',
                  });
                  setGlobalVariableValue({
                    key: 'taskDate',
                    value: '',
                  });
                  setGlobalVariableValue({
                    key: 'taskPriority',
                    value: '',
                  });
                  setGlobalVariableValue({
                    key: 'taskNote',
                    value: '',
                  });
                  setGlobalVariableValue({
                    key: 'taskImage',
                    value: '',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Light'],
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Light'],
                  borderLeftWidth: 1,
                  borderRadius: 12,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: theme.colors['Strong'],
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  height: 45,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 35,
                  textAlign: 'center',
                  width: 80,
                },
                dimensions.width
              )}
              title={'Cancel'}
            />
          )}
        </>
        {/* Save */}
        <>
          {!!saved ? null : (
            <Button
              onPress={() => {
                try {
                  if (Constants['taskImage']) {
                  } else {
                    const response3 = setGlobalVariableValue({
                      key: 'taskImage',
                      value: (() => {
                        const e = Constants['defaultImage'];
                        console.log('default', e);
                        return e;
                      })(),
                    });
                  }

                  setSaved(!saved);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgb(60, 48, 206)',
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Light'],
                  borderLeftWidth: 1,
                  borderRadius: 12,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: theme.colors['Background'],
                  fontFamily: 'Inter_500Medium',
                  fontSize: 15,
                  height: 45,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 35,
                  textAlign: 'center',
                  width: 80,
                },
                dimensions.width
              )}
              title={'Save'}
            />
          )}
        </>
        {/* Done */}
        <>
          {!saved ? null : (
            <Button
              onPress={() => {
                const handler = async () => {
                  try {
                    const response = (
                      await xanoEditTasksRecordPOST.mutateAsync({
                        date: Constants['taskDate'],
                        id: props.route?.params?.edit_task ?? '',
                        image: (() => {
                          const e = Constants['taskImage'];
                          console.log('posted', e);
                          return e;
                        })(),
                        notes: Constants['taskNote'],
                        priority: Constants['taskPriority'],
                        status: Constants['taskStatus'],
                        task: Constants['taskName'],
                        tasks_id: props.route?.params?.edit_task ?? '',
                      })
                    )?.json;
                    navigation.navigate('DisplayyourtasksScreen', {
                      category: Constants['categoryNavId'],
                    });
                    setGlobalVariableValue({
                      key: 'taskName',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'taskNote',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'taskPriority',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'taskStatus',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'taskDate',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'taskImage',
                      value: '',
                    });
                    console.log(response);
                    setGlobalVariableValue({
                      key: 'goBack',
                      value: true,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgb(60, 48, 206)',
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Light'],
                  borderLeftWidth: 1,
                  borderRadius: 12,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: theme.colors['Background'],
                  fontFamily: 'Inter_500Medium',
                  fontSize: 15,
                  height: 45,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 35,
                  textAlign: 'center',
                  width: 80,
                },
                dimensions.width
              )}
              title={'Done'}
            />
          )}
        </>
      </View>

      <Modal animationType={'fade'} transparent={true} visible={reminderSet}>
        {/* View 3 */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)} />
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(249, 249, 249, 0.94)',
              borderRadius: 12,
              flex: 3,
            },
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
                  backgroundColor: 'rgba(223, 218, 218, 0.84)',
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
                <IconButton
                  icon={'AntDesign/closecircleo'}
                  onPress={() => {
                    try {
                      setReminderSet(!reminderSet);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                />
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
                      setTextInputValue2(newTextInputValue);
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
                  value={textInputValue2}
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
                      setTextAreaValue(newTextAreaValue);
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
                  value={textAreaValue}
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

                        await schedulePushNotification(
                          Token,
                          textInputValue2,
                          textAreaValue
                        );
                        setReminderSet(!reminderSet);
                        /* 'Conditional Stop' action requires configuration: select Check Value */
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
    </ScreenContainer>
  );
};

export default withTheme(EditTaskScreen);
