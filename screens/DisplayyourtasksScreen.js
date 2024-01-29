import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import colorPriority from '../global-functions/colorPriority';
import colorStatus from '../global-functions/colorStatus';
import displayDeadline from '../global-functions/displayDeadline';
import filterTasks from '../global-functions/filterTasks';
import searchList from '../global-functions/searchList';
import sortByDeadline from '../global-functions/sortByDeadline';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  IconButton,
  Picker,
  Pressable,
  ScreenContainer,
  SwipeableItem,
  SwipeableItemButton,
  SwipeableList,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const DisplayyourtasksScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [completed, setCompleted] = React.useState(false);
  const [deadlineSorter, setDeadlineSorter] = React.useState('');
  const [filterModal, setFilterModal] = React.useState(true);
  const [hasIssue, setHasIssue] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [pickerValue3, setPickerValue3] = React.useState('');
  const [priorityFilter, setPriorityFilter] = React.useState('');
  const [selectedTaskId, setSelectedTaskId] = React.useState('');
  const [showAttachments, setShowAttachments] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('');
  const [textInput2Value, setTextInput2Value] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [refreshingNmo9B09s, setRefreshingNmo9B09s] = React.useState(false);
  const checkAndSetAttachmentVariable = (Variables, data) => {
    let hasIssue = false; // Assume no issues initially

    for (const item of data) {
      if (!item.Notes || !item.testimage) {
        hasIssue = true;
        break; // Exit the loop as soon as an issue is found
      }
    }

    // Assuming you have a function called `setScreenVariable`
    // that sets the value of a screen variable
    if (hasIssue) {
      setScreenVariable('attachment', false);
    } else {
      setScreenVariable('attachment', true); // Optional: you can remove this line if you don't need to set it to true
    }
  };

  const checkAttachement = (testimage, notes) => {
    return !notes || !testimage ? 100 : 0;
  };
  const xanoQueryAllTasksPOST = XanoApi.useQueryAllTasksPOST();
  const xanoEditTasksRecordPOST = XanoApi.useEditTasksRecordPOST();
  const xanoFilterByUserAndCatPOST = XanoApi.useFilterByUserAndCatPOST();
  const xanoDeleteTaskDELETE = XanoApi.useDeleteTaskDELETE();

  return (
    <ScreenContainer
      hasSafeArea={true}
      hasTopSafeArea={false}
      scrollable={false}
    >
      <View>
        {/* Heading */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.strong,
              fontFamily: 'Inter_500Medium',
              fontSize: 21,
            },
            dimensions.width
          )}
        >
          {null}
        </Text>
        {/* Search Bar */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: theme.colors['Divider'],
              borderBottomWidth: 1,
              borderColor: theme.colors['Divider'],
              borderLeftWidth: 1,
              borderRadius: 12,
              borderRightWidth: 1,
              borderTopWidth: 1,
              flexDirection: 'row',
              height: 48,
              justifyContent: 'space-between',
              marginBottom: 15,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 15,
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
            <Icon
              name={'EvilIcons/search'}
              size={24}
              style={StyleSheet.applyWidth(
                { marginTop: 5, opacity: 0.5 },
                dimensions.width
              )}
            />
            {/* Text Input 2 */}
            <TextInput
              allowFontScaling={true}
              autoCapitalize={'none'}
              changeTextDelay={500}
              clearButtonMode={'while-editing'}
              onChangeText={newTextInput2Value => {
                const handler = async () => {
                  const textInputValue = newTextInput2Value;
                  try {
                    setTextInput2Value(newTextInput2Value);
                    const response = (
                      await xanoQueryAllTasksPOST.mutateAsync({
                        search: newTextInput2Value,
                      })
                    )?.json;
                    console.log(response);
                    if (!newTextInput2Value) {
                      setShowImage(true);
                    } else {
                      setShowImage(false);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              placeholder={'Search your tasks'}
              placeholderTextColor={theme.colors['Light']}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextInputStyles(theme)['Text Input'],
                dimensions.width
              )}
              value={textInput2Value}
            />
          </View>
          <IconButton
            color={theme.colors['Custom Color_2']}
            icon={'Ionicons/options-outline'}
            onPress={() => {
              try {
                setFilterModal(!filterModal);
              } catch (err) {
                console.error(err);
              }
            }}
            size={28}
            style={StyleSheet.applyWidth({ opacity: 0.52 }, dimensions.width)}
          />
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 25,
            },
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                setShowAttachments(!showAttachments);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 10 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  alignSelf: 'flex-end',
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                  marginRight: 25,
                  textDecorationLine: 'underline',
                }),
                dimensions.width
              )}
            >
              {' Show detail'}
            </Text>
          </Pressable>
          {/* Pressable 2 */}
          <Pressable
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'categoryNavId',
                  value: props.route?.params?.category ?? '',
                });
                navigation.navigate('BottomTabNavigator', {
                  screen: 'HomeNavigator',
                  params: {
                    screen: 'CreateTask2Screen',
                    params: { creat_task: props.route?.params?.category ?? '' },
                  },
                });
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 10 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  alignSelf: 'flex-end',
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                  marginRight: 25,
                  textDecorationLine: 'underline',
                }),
                dimensions.width
              )}
            >
              {'Add new task'}
            </Text>
          </Pressable>
        </View>
      </View>
      {/* Tasks */}
      <>
        {!filterModal ? null : (
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
            <XanoApi.FetchFilterByUserAndCatPOST
              categories_id={props.route?.params?.category ?? ''}
              user_id={Constants['userID']}
            >
              {({ loading, error, data, refetchFilterByUserAndCat }) => {
                const fetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    <Modal
                      animationType={'none'}
                      transparent={true}
                      visible={completed}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'auto',
                            flex: 1,
                            justifyContent: 'center',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: theme.colors['Background'],
                              borderRadius: 8,
                              borderWidth: 1,
                              height: 150,
                              justifyContent: 'center',
                              minWidth: 200,
                            },
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
                                  fontFamily: 'Inter_500Medium',
                                  fontSize: 16,
                                  marginBottom: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Good job!'}
                          </Text>
                          <Button
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  (
                                    await xanoEditTasksRecordPOST.mutateAsync({
                                      date: Constants['taskDate'],
                                      id: selectedTaskId,
                                      image: Constants['taskImage'],
                                      notes: Constants['taskNote'],
                                      priority: Constants['taskPriority'],
                                      status: Constants['taskStatus'],
                                      task: Constants['taskName'],
                                      tasks_id: selectedTaskId,
                                    })
                                  )?.json;
                                  await refetchFilterByUserAndCat();
                                  setCompleted(!completed);
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.ButtonStyles(theme)['Button'],
                              dimensions.width
                            )}
                            title={'Ok'}
                          />
                        </View>
                      </View>
                    </Modal>
                    <SwipeableList
                      data={sortByDeadline(
                        filterTasks(
                          searchList(fetchData, textInput2Value),
                          priorityFilter,
                          statusFilter
                        ),
                        deadlineSorter
                      )}
                      disableScrollWhenSwiping={true}
                      estimatedItemSize={50}
                      inverted={false}
                      keyExtractor={swipeableListData =>
                        swipeableListData?.id ||
                        swipeableListData?.uuid ||
                        JSON.stringify(swipeableListData)
                      }
                      listComponent={'FlatList'}
                      listKey={'Nmo9B09s'}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshingNmo9B09s}
                          onRefresh={() => {
                            const handler = async () => {
                              try {
                                setRefreshingNmo9B09s(true);
                                if (Constants['goBack']) {
                                  await refetchFilterByUserAndCat();
                                }
                                setRefreshingNmo9B09s(false);
                              } catch (err) {
                                console.error(err);
                                setRefreshingNmo9B09s(false);
                              }
                            };
                            handler();
                          }}
                        />
                      }
                      renderItem={({ item }) => {
                        const swipeableListData = item;
                        return (
                          <SwipeableItem
                            closeOnPress={true}
                            friction={20}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SwipeableItemStyles(theme)[
                                  'Swipeable Item'
                                ],
                                { marginBottom: 20 }
                              ),
                              dimensions.width
                            )}
                            swipeActivationPercentage={80}
                            swipeToClosePercent={50}
                            swipeToOpenPercent={50}
                          >
                            <Pressable
                              onPress={() => {
                                try {
                                  setGlobalVariableValue({
                                    key: 'taskName',
                                    value: swipeableListData?.Task,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskStatus',
                                    value: swipeableListData?.Status,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskDate',
                                    value: swipeableListData?.Deadline,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskPriority',
                                    value: swipeableListData?.Priority,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskImage',
                                    value: swipeableListData?.testimage?.url,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskNote',
                                    value: swipeableListData?.Notes,
                                  });
                                  setGlobalVariableValue({
                                    key: 'categoryNavId',
                                    value: swipeableListData?.categories_id,
                                  });
                                  navigation.navigate('BottomTabNavigator', {
                                    screen: 'HomeNavigator',
                                    params: {
                                      screen: 'EditTaskScreen',
                                      params: {
                                        edit_task: swipeableListData?.id,
                                      },
                                    },
                                  });
                                  setGlobalVariableValue({
                                    key: 'goBack',
                                    value: false,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-start',
                                    backgroundColor:
                                      theme.colors[
                                        'Studily_Washed_Lavender_White'
                                      ],
                                    borderRadius: 12,
                                    flexDirection: 'column',
                                    marginLeft: 20,
                                    marginRight: 20,
                                    opacity: 1,
                                    paddingBottom: 20,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    paddingTop: 20,
                                  },
                                  dimensions.width
                                )}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'stretch',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Title */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.strong,
                                        fontFamily: 'Inter_500Medium',
                                        fontSize: 16,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Task : '}
                                    {swipeableListData?.Task}
                                  </Text>
                                </View>
                                {/* View 3 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { flexDirection: 'row' },
                                    dimensions.width
                                  )}
                                >
                                  {/* View 2 */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { flexDirection: 'row', paddingTop: 10 },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      allowFontScaling={true}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            fontFamily: 'Inter_300Light',
                                            fontSize: 12,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {'Priority : '}
                                    </Text>

                                    <Text
                                      accessible={true}
                                      allowFontScaling={true}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: colorPriority(
                                              swipeableListData?.Priority
                                            ),
                                            fontFamily: 'Inter_600SemiBold',
                                            fontSize: 12,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {swipeableListData?.Priority}
                                    </Text>
                                  </View>

                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        flex: 1,
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* type  */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors.strong,
                                          fontFamily: 'Inter_300Light',
                                          fontSize: 12,
                                          opacity: 0.6,
                                          paddingLeft: 5,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'•   Deadline : '}
                                      {displayDeadline(
                                        swipeableListData?.Deadline
                                      )}
                                    </Text>
                                  </View>
                                </View>
                                {/* Status Tags */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { alignItems: 'flex-start' },
                                    dimensions.width
                                  )}
                                >
                                  {/* Pending Payment */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        backgroundColor: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value:
                                              theme.colors['Custom Color_19'],
                                          },
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: colorStatus(
                                              swipeableListData?.Status
                                            ),
                                          },
                                        ],
                                        borderRadius: 5,
                                        marginTop: 16,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors['Strong'],
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 12,
                                          paddingBottom: 6,
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          paddingTop: 6,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {swipeableListData?.Status}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              {/* Attachments */}
                              <>
                                {!showAttachments ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'stretch',
                                        backgroundColor:
                                          theme.colors[
                                            'Studily_Washed_Lavender_White'
                                          ],
                                        borderRadius: 12,
                                        flexDirection: 'column',
                                        marginLeft: 20,
                                        marginRight: 20,
                                        marginTop: 10,
                                        opacity: 1,
                                        paddingBottom: 20,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        paddingTop: 20,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* View 3 */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { alignItems: 'flex-end' },
                                        dimensions.width
                                      )}
                                    >
                                      <IconButton
                                        icon={'AntDesign/close'}
                                        onPress={() => {
                                          try {
                                            setShowAttachments(
                                              !showAttachments
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                        size={24}
                                        style={StyleSheet.applyWidth(
                                          {
                                            opacity: checkAttachement(
                                              swipeableListData?.testimage,
                                              swipeableListData?.Notes
                                            ),
                                          },
                                          dimensions.width
                                        )}
                                      />
                                    </View>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'stretch',
                                          flexDirection: 'column',
                                          justifyContent: 'space-between',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Title */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.strong,
                                            fontFamily: 'Inter_500Medium',
                                            fontSize: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Attachment:'}
                                      </Text>
                                      <Image
                                        resizeMode={'cover'}
                                        source={{
                                          uri: `${swipeableListData?.testimage?.url}`,
                                        }}
                                        style={StyleSheet.applyWidth(
                                          GlobalStyles.ImageStyles(theme)[
                                            'Image'
                                          ],
                                          dimensions.width
                                        )}
                                      />
                                    </View>
                                    {/* View 2 */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'stretch',
                                          flexDirection: 'column',
                                          justifyContent: 'space-between',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Title */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.strong,
                                            fontFamily: 'Inter_500Medium',
                                            fontSize: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Notes:'}
                                      </Text>
                                      {/* Text 2 */}
                                      <Text
                                        accessible={true}
                                        allowFontScaling={true}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ],
                                            {
                                              fontFamily: 'Inter_300Light',
                                              fontSize: 12,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {swipeableListData?.Notes}
                                      </Text>
                                    </View>
                                  </View>
                                )}
                              </>
                            </Pressable>
                            {/* Swipeable Item Button Completed */}
                            <SwipeableItemButton
                              backgroundColor={theme.colors['Light']}
                              closeOnPress={true}
                              color={theme.colors['Strong Inverse']}
                              icon={'AntDesign/checkcircle'}
                              onPress={() => {
                                try {
                                  setGlobalVariableValue({
                                    key: 'taskStatus',
                                    value: 'Completed',
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskName',
                                    value: swipeableListData?.Task,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskPriority',
                                    value: swipeableListData?.Priority,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskDate',
                                    value: swipeableListData?.Deadline,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskNote',
                                    value: swipeableListData?.Notes,
                                  });
                                  setGlobalVariableValue({
                                    key: 'taskImage',
                                    value: swipeableListData?.testimage?.url,
                                  });
                                  setSelectedTaskId(swipeableListData?.id);
                                  setCompleted(!completed);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              revealSwipeDirection={'left'}
                              title={'Completed'}
                            />
                            {/* Swipeable Item Button 2 Delete */}
                            <SwipeableItemButton
                              backgroundColor={theme.colors['Custom Color_8']}
                              closeOnPress={true}
                              icon={'MaterialCommunityIcons/delete'}
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    (
                                      await xanoDeleteTaskDELETE.mutateAsync({
                                        id: swipeableListData?.id,
                                        tasks_id: swipeableListData?.id,
                                      })
                                    )?.json;
                                    await refetchFilterByUserAndCat();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              revealSwipeDirection={'right'}
                              title={'Delete'}
                            />
                          </SwipeableItem>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </>
                );
              }}
            </XanoApi.FetchFilterByUserAndCatPOST>
          </View>
        )}
      </>
      {/* filter popup */}
      <>
        {!!filterModal ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignSelf: 'center',
                backgroundColor: '"rgba(0, 0, 0, 0)"',
                borderRadius: 8,
                justifyContent: 'flex-start',
                minHeight: 150,
                width: 300,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  backgroundColor: theme.colors['Divider'],
                  justifyContent: 'center',
                  marginBottom: 1,
                  minHeight: 50,
                },
                dimensions.width
              )}
            >
              <Picker
                autoDismissKeyboard={true}
                dropDownBackgroundColor={theme.colors.background}
                dropDownBorderColor={theme.colors.divider}
                dropDownBorderWidth={0}
                iconSize={20}
                leftIconMode={'inset'}
                mode={'native'}
                onValueChange={newPickerValue => {
                  const pickerValue = newPickerValue;
                  try {
                    const valueGyTOqQVY = newPickerValue;
                    setPickerValue(valueGyTOqQVY);
                    const response = valueGyTOqQVY;
                    setStatusFilter(response);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                options={['To do', 'In progress', 'Completed']}
                placeholder={'Status'}
                placeholderTextColor={theme.colors['Light']}
                rightIconName={'AntDesign/downcircleo'}
                selectedIconColor={theme.colors['Light']}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
                type={'solid'}
                value={pickerValue}
              />
            </View>
            {/* View 4 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  backgroundColor: theme.colors['Divider'],
                  justifyContent: 'center',
                  marginBottom: 1,
                  minHeight: 50,
                },
                dimensions.width
              )}
            >
              <Picker
                autoDismissKeyboard={true}
                dropDownBackgroundColor={theme.colors.background}
                dropDownBorderColor={theme.colors.divider}
                dropDownBorderRadius={8}
                dropDownBorderWidth={1}
                iconSize={20}
                leftIconMode={'inset'}
                mode={'native'}
                onValueChange={newPickerValue => {
                  const pickerValue = newPickerValue;
                  try {
                    const valueF7AIqRIc = newPickerValue;
                    setPickerValue2(valueF7AIqRIc);
                    const response = valueF7AIqRIc;
                    setPriorityFilter(response);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                options={['Low', 'Medium', 'High']}
                placeholder={'Priority'}
                rightIconName={'AntDesign/downcircleo'}
                selectedIconColor={theme.colors.strong}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
                type={'solid'}
                value={pickerValue2}
              />
            </View>
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  backgroundColor: theme.colors['Divider'],
                  justifyContent: 'center',
                  marginBottom: 1,
                  minHeight: 50,
                },
                dimensions.width
              )}
            >
              <Picker
                autoDismissKeyboard={true}
                dropDownBackgroundColor={theme.colors.background}
                dropDownBorderColor={theme.colors.divider}
                dropDownBorderRadius={8}
                dropDownBorderWidth={1}
                iconSize={20}
                leftIconMode={'inset'}
                mode={'native'}
                onValueChange={newPickerValue => {
                  const pickerValue = newPickerValue;
                  try {
                    const valueaoz5uS48 = newPickerValue;
                    setPickerValue3(valueaoz5uS48);
                    const response = valueaoz5uS48;
                    setDeadlineSorter(response);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                options={['Upcoming to latest', 'Latest to upcoming']}
                placeholder={'Deadlines'}
                rightIconName={'AntDesign/downcircleo'}
                selectedIconColor={theme.colors.strong}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
                type={'solid'}
                value={pickerValue3}
              />
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                },
                dimensions.width
              )}
            >
              {/* Clear button */}
              <Button
                onPress={() => {
                  try {
                    setPriorityFilter('');
                    setStatusFilter('');
                    setDeadlineSorter('No direction set yet!');
                    setPickerValue('');
                    setPickerValue2('');
                    setPickerValue3('');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'],
                    {
                      backgroundColor: theme.colors['Light'],
                      color: theme.colors['Strong'],
                      fontFamily: 'Inter_500Medium',
                      minHeight: '15%',
                      width: '30%',
                    }
                  ),
                  dimensions.width
                )}
                title={'Clear'}
              />
              {/* Apply */}
              <Button
                onPress={() => {
                  try {
                    setFilterModal(!filterModal);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'],
                    {
                      backgroundColor: 'rgb(48, 48, 202)',
                      fontFamily: 'Inter_500Medium',
                      height: '3%',
                      width: '30%',
                    }
                  ),
                  dimensions.width
                )}
                title={'Apply'}
              />
            </View>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(DisplayyourtasksScreen);
