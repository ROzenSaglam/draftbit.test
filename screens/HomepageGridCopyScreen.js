import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import filterUserData from '../global-functions/filterUserData';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Circle,
  IconButton,
  Pressable,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const HomepageGridCopyScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [addCategory, setAddCategory] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [deleteModal, setDeleteModal] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const myFunctionName = (textInput, maxLength) => {
    if (textInput.length <= maxLength) {
      return textInput;
    }
    return `${textInput.substring(0, maxLength - 3)}...`;
  };

  const getTasksDueIn7Days = tasks => {
    const currentDate = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    return tasks.filter(task => {
      const taskDeadline = new Date(task.deadline);
      return taskDeadline >= currentDate && taskDeadline <= sevenDaysFromNow;
    });
  };
  const xanoAddCategoryPOST = XanoApi.useAddCategoryPOST();
  const xanoDeleteCategoryDELETE = XanoApi.useDeleteCategoryDELETE();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 30,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
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
            {/* Section Header */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: '60%',
                },
                dimensions.width
              )}
            >
              {/* Test */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: 'rgb(56, 67, 242)',
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 18,
                    marginBottom: 5,
                    textAlign: 'left',
                    typography: theme.typography.headline4,
                  },
                  dimensions.width
                )}
              >
                {'Hey '}
                {Constants['userName']}
                {'! \n'}
              </Text>

              <Text
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.strong,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    marginTop: 10,
                    textAlign: 'left',
                    typography: theme.typography.headline5,
                  },
                  dimensions.width
                )}
                textBreakStrategy={'highQuality'}
              >
                {'Here is your task categories:'}
              </Text>
            </View>
            <Image
              resizeMode={'cover'}
              source={Images.Chatting}
              style={StyleSheet.applyWidth(
                GlobalStyles.ImageStyles(theme)['Image'],
                dimensions.width
              )}
            />
          </View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'flex-end',
            alignItems: 'stretch',
            alignSelf: 'flex-end',
            marginTop: 15,
            minWidth: '100%',
            paddingLeft: 32,
            paddingRight: 40,
          },
          dimensions.width
        )}
      >
        <Pressable
          onPress={() => {
            try {
              setAddCategory(!addCategory);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Text
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                alignSelf: 'flex-end',
                fontFamily: 'Inter_600SemiBold',
                textDecorationLine: 'underline',
              }),
              dimensions.width
            )}
          >
            {'Add category'}
          </Text>
        </Pressable>
      </View>
      {/* browse-grid */}
      <View
        needsOffscreenAlphaCompositing={false}
        style={StyleSheet.applyWidth(
          {
            alignContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            paddingBottom: 72,
            paddingLeft: 32,
            paddingRight: 32,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <XanoApi.FetchGetAllCategoriesGET>
          {({ loading, error, data, refetchGetAllCategories }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Add category modal */}
                <Modal
                  animationType={'none'}
                  transparent={true}
                  visible={addCategory}
                >
                  {/* Add category */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'stretch',
                        alignSelf: 'center',
                        borderColor: theme.colors['Light Inverse'],
                        borderRadius: 8,
                        borderWidth: 1,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginBottom: 30,
                        minWidth: '70%',
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          backgroundColor: theme.colors['Background'],
                          borderRadius: 8,
                          borderWidth: 1,
                          justifyContent: 'center',
                          minWidth: '60%',
                          width: '60%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-end',
                            backgroundColor: theme.colors['Background'],
                            borderRadius: 8,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <IconButton
                          icon={'AntDesign/close'}
                          onPress={() => {
                            try {
                              setAddCategory(!addCategory);
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
                          { alignItems: 'center', width: '100%' },
                          dimensions.width
                        )}
                      >
                        <TextInput
                          allowFontScaling={true}
                          autoCapitalize={'none'}
                          changeTextDelay={500}
                          onChangeText={newTextInputValue => {
                            const textInputValue = newTextInputValue;
                            try {
                              setTextInputValue(newTextInputValue);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          placeholder={'Enter category name'}
                          placeholderTextColor={theme.colors['Medium']}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)['Text Input'],
                              { bottom: 10, margin: 30 }
                            ),
                            dimensions.width
                          )}
                          value={textInputValue}
                        />
                        <XanoApi.FetchGetAllCategoriesGET>
                          {({
                            loading,
                            error,
                            data,
                            refetchGetAllCategories,
                          }) => {
                            const fetchData = data?.json;
                            if (loading) {
                              return <ActivityIndicator />;
                            }

                            if (
                              error ||
                              data?.status < 200 ||
                              data?.status >= 300
                            ) {
                              return <ActivityIndicator />;
                            }

                            return (
                              <Button
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      if (textInputValue?.length === 0) {
                                        return;
                                      }
                                      (
                                        await xanoAddCategoryPOST.mutateAsync({
                                          id: Constants['userID'],
                                          name: textInputValue,
                                        })
                                      )?.json;
                                      setAddCategory(!addCategory);
                                      setTextInputValue('');
                                      await refetchGetAllCategories();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ButtonStyles(theme)['Button'],
                                    { marginBottom: 20 }
                                  ),
                                  dimensions.width
                                )}
                                title={'Done'}
                              />
                            );
                          }}
                        </XanoApi.FetchGetAllCategoriesGET>
                      </View>
                    </View>
                  </View>
                </Modal>
                {/* Delete category modal */}
                <Modal
                  animationType={'none'}
                  transparent={true}
                  visible={deleteModal}
                >
                  {/* Delete category */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: theme.colors['Light Inverse'],
                        borderRadius: 8,
                        borderWidth: 1,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginBottom: 30,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'stretch',
                          alignSelf: 'center',
                          backgroundColor: theme.colors['Background'],
                          borderRadius: 8,
                          borderWidth: 1,
                          justifyContent: 'center',
                          maxWidth: '60%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-end',
                            backgroundColor: theme.colors['Background'],
                            borderRadius: 8,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <IconButton
                          icon={'AntDesign/close'}
                          onPress={() => {
                            try {
                              setDeleteModal(!deleteModal);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          size={32}
                        />
                      </View>

                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            padding: 20,
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
                                marginBottom: 10,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Do you want to delete this category?'}
                        </Text>
                        <Button
                          onPress={() => {
                            const handler = async () => {
                              try {
                                (
                                  await xanoDeleteCategoryDELETE.mutateAsync({
                                    categories_id: Constants['categoryNavId'],
                                    categoryId: Constants['categoryNavId'],
                                  })
                                )?.json;
                                setDeleteModal(!deleteModal);
                                await refetchGetAllCategories();
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)['Button'],
                              {
                                backgroundColor: 'rgb(58, 48, 234)',
                                marginBottom: 30,
                                width: '30%',
                              }
                            ),
                            dimensions.width
                          )}
                          title={'Yes'}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
                <FlatList
                  data={(() => {
                    const e = filterUserData(fetchData, Constants['userID']);
                    console.log(e);
                    return e;
                  })()}
                  keyExtractor={listData => listData}
                  listKey={'y1bIbgtl'}
                  numColumns={2}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'space-between',
                            alignSelf: 'stretch',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <Touchable
                          onPress={() => {
                            try {
                              setGlobalVariableValue({
                                key: 'categoryNavId',
                                value: (() => {
                                  const e = listData?.id;
                                  console.log(e);
                                  return e;
                                })(),
                              });
                              navigation.navigate('BottomTabNavigator', {
                                screen: 'HomeNavigator',
                                params: {
                                  screen: 'DisplayyourtasksScreen',
                                  params: {
                                    category: (() => {
                                      const e = listData?.id;
                                      console.log(e);
                                      return e;
                                    })(),
                                  },
                                },
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'stretch',
                              marginBottom: 14,
                              marginTop: 14,
                              width: '90%',
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'space-between',
                                alignItems: 'stretch',
                                alignSelf: 'stretch',
                                backgroundColor: 'rgb(228, 227, 227)',
                                borderBottomWidth: 1,
                                borderColor: theme.colors['Divider'],
                                borderLeftWidth: 1,
                                borderRadius: theme.roundness,
                                borderRightWidth: 1,
                                borderTopWidth: 1,
                                flexDirection: 'column',
                                flexWrap: 'nowrap',
                                height: 130,
                                justifyContent: 'space-between',
                                opacity: 1,
                                paddingBottom: 14,
                                paddingLeft: 14,
                                paddingRight: 14,
                                paddingTop: 14,
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  flex: 1,
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                allowFontScaling={true}
                                style={StyleSheet.applyWidth(
                                  {
                                    alignSelf: 'center',
                                    color: 'rgb(39, 46, 222)',
                                    fontFamily: 'Inter_600SemiBold',
                                    fontSize: 14,
                                    marginBottom: 5,
                                    textAlign: 'left',
                                    typography: theme.typography.headline6,
                                  },
                                  dimensions.width
                                )}
                              >
                                {myFunctionName(listData?.Name, 13)}
                              </Text>

                              <Circle
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.CircleStyles(theme)['Circle'],
                                    {
                                      backgroundColor: 'rgba(0, 0, 0, 0)',
                                      marginBottom: 10,
                                      opacity: 0.47,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                <IconButton
                                  color={theme.colors['Primary']}
                                  icon={'MaterialCommunityIcons/delete'}
                                  onPress={() => {
                                    try {
                                      setDeleteModal(!deleteModal);
                                      setGlobalVariableValue({
                                        key: 'categoryNavId',
                                        value: (() => {
                                          const e = listData?.id;
                                          console.log(e);
                                          return e;
                                        })(),
                                      });
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  size={32}
                                  style={StyleSheet.applyWidth(
                                    { overflow: 'hidden' },
                                    dimensions.width
                                  )}
                                />
                              </Circle>
                            </View>
                          </View>
                        </Touchable>
                      </View>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  style={StyleSheet.applyWidth(
                    { width: '100%' },
                    dimensions.width
                  )}
                  contentContainerStyle={StyleSheet.applyWidth(
                    { alignItems: 'stretch', alignSelf: 'auto', flex: 0 },
                    dimensions.width
                  )}
                />
              </>
            );
          }}
        </XanoApi.FetchGetAllCategoriesGET>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomepageGridCopyScreen);
