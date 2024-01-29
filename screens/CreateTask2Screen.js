import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import scheduleLocalReminder from '../global-functions/scheduleLocalReminder';
import transformOnlyDate from '../global-functions/transformOnlyDate';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openCameraUtil from '../utils/openCamera';
import {
  AccordionGroup,
  Button,
  DatePicker,
  Divider,
  Icon,
  IconButton,
  Picker,
  Pressable,
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

const CreateTask2Screen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [addImage, setAddImage] = React.useState('');
  const [addNote, setAddNote] = React.useState('');
  const [addTaskNama, setAddTaskNama] = React.useState('');
  const [bodytextAreaValue, setBodytextAreaValue] = React.useState('');
  const [clearPressed, setClearPressed] = React.useState(false);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [datePickerValue2, setDatePickerValue2] = React.useState(new Date());
  const [datePickerValue3, setDatePickerValue3] = React.useState(new Date());
  const [datePressed, setDatePressed] = React.useState('');
  const [dateTextInputValue, setDateTextInputValue] = React.useState('');
  const [editID, setEditID] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorMessage2, setErrorMessage2] = React.useState('');
  const [latit, setLatit] = React.useState('');
  const [longi, setLongi] = React.useState('');
  const [namePressed, setNamePressed] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [priorityPressed, setPriorityPressed] = React.useState('');
  const [reminderSet, setReminderSet] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [statusPressed, setStatusPressed] = React.useState('');
  const [taskAddNote, setTaskAddNote] = React.useState('');
  const [taskImage, setTaskImage] = React.useState('');
  const [taskLoc, setTaskLoc] = React.useState('');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const [titletextInputValue, setTitletextInputValue] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const obligatoryFields = () => {
    let textInputError = false;
    let pickerError = false;

    if (!textInputValue) {
      setErrorMessage('*This field is required!');
      textInputError = true;
    } else {
      setErrorMessage(''); // Clear previous error message for this field
    }

    if (!pickerValue) {
      setErrorMessage2('*This field is required');
      pickerError = true;
    } else {
      setErrorMessage2(''); // Clear previous error message for this field
    }

    return !(textInputError || pickerError);
  };
  const xanoCreateTasksPOST = XanoApi.useCreateTasksPOST();

  return (
    <ScreenContainer
      hasSafeArea={true}
      hasTopSafeArea={true}
      scrollable={false}
    >
      {/* View 2 */}
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
          {'Create Task'}
        </Text>
        <Image
          resizeMode={'cover'}
          source={Images.Calendar1}
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
            {
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingLeft: 20,
              paddingRight: 20,
            },
            dimensions.width
          )}
        >
          {/* Task Name */}
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
                  {'Task Name'}
                </Text>
                <Icon
                  color={theme.colors['Strong']}
                  name={'MaterialIcons/add-task'}
                  size={24}
                />
              </View>
            </View>

            <Pressable
              onPress={() => {
                try {
                  setErrorMessage('');
                  setTextInputValue('');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
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
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    },
                    dimensions.width
                  )}
                >
                  <>
                    {!showForm ? null : (
                      <Text
                        accessible={true}
                        allowFontScaling={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            { color: 'rgb(30, 30, 201)', fontSize: 16 }
                          ),
                          dimensions.width
                        )}
                      >
                        {textInputValue}
                      </Text>
                    )}
                  </>
                  {/* Text 2 */}
                  <>
                    {!errorMessage ? null : (
                      <Text
                        accessible={true}
                        allowFontScaling={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            {
                              color: theme.colors['Custom Color_8'],
                              fontFamily: 'Inter_400Regular',
                              fontSize: 16,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {errorMessage}
                      </Text>
                    )}
                  </>
                </View>
                <>
                  {!!showForm ? null : (
                    <TextInput
                      allowFontScaling={true}
                      autoCapitalize={'none'}
                      changeTextDelay={500}
                      clearButtonMode={'while-editing'}
                      enablesReturnKeyAutomatically={true}
                      onChangeText={newTextInputValue => {
                        const textInputValue = newTextInputValue;
                        try {
                          const valueHMbUy4sb = newTextInputValue;
                          setTextInputValue(valueHMbUy4sb);
                          const response = valueHMbUy4sb;
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      onChangeTextDelayed={newTextInputValue => {
                        const textInputValue = newTextInputValue;
                        try {
                          setAddTaskNama(newTextInputValue);
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
            </Pressable>
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
          <View>
            {/* Section Header */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  marginTop: 25,
                  paddingLeft: 20,
                  paddingRight: 20,
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
            </View>
            {/* Details */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 12, marginLeft: 20, marginRight: 20 },
                dimensions.width
              )}
            >
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
                  {!showForm ? null : (
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { color: 'rgb(30, 30, 201)', fontSize: 16 }
                        ),
                        dimensions.width
                      )}
                    >
                      {pickerValue}
                    </Text>
                  )}
                </>
                {/* Text 2 */}
                <>
                  {!errorMessage2 ? null : (
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Custom Color_8'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 16,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {errorMessage2}
                    </Text>
                  )}
                </>
              </View>
              <>
                {!!showForm ? null : (
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

          <AccordionGroup
            caretSize={24}
            expanded={false}
            icon={'Ionicons/options'}
            iconSize={24}
            label={'More options'}
            style={StyleSheet.applyWidth(
              GlobalStyles.AccordionGroupStyles(theme)['Accordion'],
              dimensions.width
            )}
          >
            {/* Priority */}
            <View>
              {/* Section Header */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-end',
                    alignSelf: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                    marginTop: 25,
                    paddingLeft: 20,
                    paddingRight: 20,
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
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 12, marginLeft: 20, marginRight: 20 },
                  dimensions.width
                )}
              >
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
                    {!showForm ? null : (
                      <Text
                        accessible={true}
                        allowFontScaling={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            { color: 'rgb(30, 30, 201)', fontSize: 16 }
                          ),
                          dimensions.width
                        )}
                      >
                        {pickerValue2}
                      </Text>
                    )}
                  </>
                </View>
                <>
                  {!!showForm ? null : (
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
                        { color: theme.colors['Light'], fontSize: 14 },
                        dimensions.width
                      )}
                      type={'solid'}
                      value={pickerValue2}
                    />
                  )}
                </>
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
                { paddingLeft: 20, paddingRight: 20 },
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
              </View>
              {/* Edit date */}
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 12 },
                  dimensions.width
                )}
              >
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
                    {!showForm ? null : (
                      <Text
                        accessible={true}
                        allowFontScaling={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            { color: 'rgb(30, 30, 201)', fontSize: 16 }
                          ),
                          dimensions.width
                        )}
                      >
                        {dateTextInputValue}
                      </Text>
                    )}
                  </>
                </View>
                <>
                  {!!showForm ? null : (
                    <DatePicker
                      autoDismissKeyboard={true}
                      borderColor={theme.colors['Light']}
                      date={datePickerValue2}
                      label={'Date'}
                      leftIconMode={'inset'}
                      minimumDate={new Date()}
                      mode={'date'}
                      onDateChange={newDatePickerValue => {
                        const date = newDatePickerValue;
                        try {
                          const valuehBHNoy1h = newDatePickerValue;
                          setDatePickerValue2(valuehBHNoy1h);
                          const response = valuehBHNoy1h;
                          setDateTextInputValue(transformOnlyDate(response));
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
            {/* Task Note */}
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
                ></View>
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
                  <>
                    {!showForm ? null : (
                      <Text
                        accessible={true}
                        allowFontScaling={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            {
                              color: 'rgb(30, 30, 201)',
                              fontSize: 16,
                              marginBottom: 10,
                              marginLeft: 5,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {taskAddNote}
                      </Text>
                    )}
                  </>
                  <>
                    {!!showForm ? null : (
                      <TextInput
                        allowFontScaling={true}
                        changeTextDelay={500}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={newTextAreaValue => {
                          try {
                            const valueLbiYZTa4 = newTextAreaValue;
                            setTaskAddNote(valueLbiYZTa4);
                            const response = valueLbiYZTa4;
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        onChangeTextDelayed={newTextAreaValue => {
                          try {
                            setGlobalVariableValue({
                              key: 'taskNote',
                              value: newTextAreaValue,
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
                        value={taskAddNote}
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
            {/* Attachment */}
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
                ></View>
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
                  {/* View 2 */}
                  <>
                    {!!showForm ? null : (
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

                                setAddImage(
                                  (() => {
                                    const e = response;
                                    console.log(e);
                                    return e;
                                  })()
                                );
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
                        {/* Clear */}
                        <Button
                          onPress={() => {
                            try {
                              setAddImage(Constants['defaultImage']);
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
                          title={'Clear\n'}
                        />
                      </View>
                    )}
                  </>
                  <View
                    style={StyleSheet.applyWidth(
                      { minHeight: '3%' },
                      dimensions.width
                    )}
                  >
                    <Image
                      resizeMode={'cover'}
                      source={{ uri: `${addImage}` }}
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
          </AccordionGroup>
        </View>
      </ScrollView>

      <View
        style={StyleSheet.applyWidth(
          { bottom: 20, flexDirection: 'row', justifyContent: 'space-around' },
          dimensions.width
        )}
      >
        {/* Go back */}
        <>
          {!!saved ? null : (
            <Button
              onPress={() => {
                try {
                  navigation.goBack();
                  setTextInputValue('');
                  setTextAreaValue('');
                  setPickerValue('');
                  setDatePickerValue2('');
                  setPickerValue2('');
                  setDatePickerValue('');
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
              title={'Go back'}
            />
          )}
        </>
        {/* Clear */}
        <>
          {!!saved ? null : (
            <Button
              onPress={() => {
                try {
                  setTextInputValue('');
                  setTextAreaValue('');
                  setPickerValue('');
                  setDatePickerValue2('');
                  setPickerValue2('');
                  setAddImage(Constants['defaultImage']);
                  setErrorMessage('');
                  setErrorMessage2('');
                  if (showForm === true) {
                    setShowForm(false);
                  } else {
                  }
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
              title={'Clear'}
            />
          )}
        </>
        {/* Save */}
        <>
          {!!saved ? null : (
            <Button
              onPress={() => {
                try {
                  setShowForm(!showForm);
                  if (addImage) {
                  } else {
                    setAddImage(
                      (() => {
                        const e = Constants['defaultImage'];
                        console.log('default', e);
                        return e;
                      })()
                    );
                  }

                  if (!obligatoryFields()) {
                    return;
                  }
                  setSaved(!saved);
                  if (pickerValue2) {
                  } else {
                    setPickerValue2('Low');
                  }

                  if (!datePickerValue2) {
                  } else {
                    setDatePickerValue2(new Date());
                  }

                  if (textAreaValue) {
                  } else {
                    setTextAreaValue('No notes');
                  }
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
                      await xanoCreateTasksPOST.mutateAsync({
                        categoryId: Constants['categoryNavId'],
                        date: datePickerValue2,
                        file: addImage,
                        note: Constants['taskNote'],
                        priority: pickerValue2,
                        status: pickerValue,
                        task: addTaskNama,
                        userId: Constants['userID'],
                      })
                    )?.json;
                    setGlobalVariableValue({
                      key: 'goBack',
                      value: true,
                    });
                    setTextInputValue('');
                    setTextAreaValue('');
                    setPickerValue('');
                    setPickerValue2('');
                    setTaskImage('');
                    navigation.goBack();
                    console.log(response);
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
      {/* reminder modal */}
      <>
        {!reminderSet ? null : (
          <Modal animationType={'slide'} transparent={false}>
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
            />
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Light'],
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
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 22,
                            marginBottom: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Date:'}
                    </Text>
                    <TextInput
                      allowFontScaling={true}
                      autoCapitalize={'none'}
                      changeTextDelay={500}
                      onChangeText={newTextInputValue => {
                        try {
                          setDateTextInputValue(newTextInputValue);
                          setGlobalVariableValue({
                            key: 'reminderDate',
                            value: newTextInputValue,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      placeholder={'DD/MM/YYYY'}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextInputStyles(theme)['Text Input'],
                          { fontFamily: 'Inter_300Light' }
                        ),
                        dimensions.width
                      )}
                      value={dateTextInputValue}
                    />
                  </View>
                  {/* View 4 */}
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
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 22,
                            marginBottom: 5,
                          }
                        ),
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
                        try {
                          setTitletextInputValue(newTextInputValue);
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
                      value={titletextInputValue}
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
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Strong'],
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 22,
                            marginBottom: 5,
                          }
                        ),
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
                        try {
                          setBodytextAreaValue(newTextAreaValue);
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
                      value={bodytextAreaValue}
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
                            setReminderSet(!reminderSet);
                            console.log();
                            const reminder = await scheduleLocalReminder(
                              Constants['reminderDate'],
                              Constants['title'],
                              Constants['body']
                            );
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
          </Modal>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(CreateTask2Screen);
