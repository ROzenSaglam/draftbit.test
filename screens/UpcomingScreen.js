import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import filterUserData from '../global-functions/filterUserData';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Icon,
  LinearGradient,
  LinearProgress,
  Pressable,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const UpcomingScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [noProgress, setNoProgress] = React.useState(false);
  const [progressData, setProgressData] = React.useState(0);
  const calculateProgress = tasks => {
    // Filtering tasks that have a status of either "To do", "Completed" or "In progress"
    const relevantTasks = tasks.filter(task =>
      ['To do', 'Completed', 'In progress'].includes(task.Status)
    );

    // Counting tasks that are "Completed"
    const completedTasksCount = relevantTasks.filter(
      task => task.Status === 'Completed'
    ).length;

    // Calculating the progress percentage
    const progress = (completedTasksCount / relevantTasks.length) * 100;

    return Math.round(progress); // Rounding to get an integer percentage
  };

  const getTaskIn7Days = data => {
    const currentDate = new Date();
    const sevenDaysFromNow = new Date();

    // Adding 7 days to the current date
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    // Filtering tasks based on the deadline
    return data.filter(item => {
      const taskDeadline = new Date(item.Deadline);
      return taskDeadline >= currentDate && taskDeadline <= sevenDaysFromNow;
    });
  };

  return (
    <ScreenContainer
      hasSafeArea={true}
      hasTopSafeArea={true}
      scrollable={false}
    >
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
            minHeight: '5%',
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          allowFontScaling={true}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              alignSelf: 'flex-start',
              fontFamily: 'Inter_500Medium',
              fontSize: 18,
              margin: 20,
            }),
            dimensions.width
          )}
        >
          {'Hello '}
          {Constants['userName']}
          {'! '}
        </Text>

        <View>
          <Image
            resizeMode={'cover'}
            source={Images.Reading}
            style={StyleSheet.applyWidth(
              GlobalStyles.ImageStyles(theme)['Image'],
              dimensions.width
            )}
          />
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            borderColor: theme.colors['Background'],
            borderRadius: 14,
            borderWidth: 1,
            margin: 20,
            minHeight: 150,
          },
          dimensions.width
        )}
      >
        <LinearGradient
          color1={theme.colors.primary}
          color2={theme.colors.secondary}
          endX={100}
          endY={100}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.LinearGradientStyles(theme)['Linear Gradient'],
              {
                borderColor: theme.colors['Background'],
                borderRadius: 14,
                borderWidth: 1,
                justifyContent: 'space-around',
                overflow: 'hidden',
                padding: 20,
              }
            ),
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Background'],
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
              }),
              dimensions.width
            )}
          >
            {'See your progress:'}
          </Text>
          {/* Text 2 */}
          <>
            {!!noProgress ? null : (
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: 'rgb(231, 184, 184)',
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                  }),
                  dimensions.width
                )}
              >
                {progressData}
                {' % completed'}
              </Text>
            )}
          </>
          {/* Text 3 */}
          <>
            {!noProgress ? null : (
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: 'rgba(245, 170, 170, 0.94)',
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    textAlign: 'justify',
                    whiteSpace: 'pre-line',
                  }),
                  dimensions.width
                )}
              >
                {
                  'You will see your progress here when you completed at least one of your tasks!'
                }
              </Text>
            )}
          </>
          <XanoApi.FetchFilterByUserIdPOST
            handlers={{
              onData: fetchData => {
                try {
                  const valuea1o9UAcY = calculateProgress(fetchData);
                  setProgressData(valuea1o9UAcY);
                  const result = valuea1o9UAcY;
                  console.log(result);
                  if (!result) {
                    setNoProgress(!noProgress);
                  } else {
                  }
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            user_id={Constants['userID']}
          >
            {({ loading, error, data, refetchFilterByUserId }) => {
              const fetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <LinearProgress
                  animationDuration={500}
                  color={theme.colors['Error']}
                  isAnimated={true}
                  lineCap={'round'}
                  maximumValue={100}
                  showTrack={true}
                  thickness={10}
                  trackColor={theme.colors.divider}
                  trackLineCap={'round'}
                  value={progressData}
                />
              );
            }}
          </XanoApi.FetchFilterByUserIdPOST>
        </LinearGradient>
      </View>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          { marginBottom: 5, marginLeft: 20, marginRight: 20, marginTop: 20 },
          dimensions.width
        )}
      >
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'flex-start' },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 20,
                  marginRight: 10,
                }),
                dimensions.width
              )}
            >
              {'Tasks Due Soon'}
            </Text>
            <Icon name={'MaterialCommunityIcons/timer-sand'} size={24} />
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '30%',
              },
              dimensions.width
            )}
          >
            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('HomepageGridCopyScreen');
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
                    color: theme.colors['Strong'],
                    fontFamily: 'Inter_500Medium',
                  }),
                  dimensions.width
                )}
              >
                {'See all'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth({ flex: 1, margin: 20 }, dimensions.width)}
      >
        <XanoApi.FetchGetTasksGET>
          {({ loading, error, data, refetchGetTasks }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <FlatList
                data={getTaskIn7Days(
                  filterUserData(fetchData, Constants['userID'])
                )}
                keyExtractor={listData => listData}
                listKey={'CodrnkFo'}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: '"rgb(176, 206, 255)"',
                            borderColor: theme.colors['Background'],
                            borderRadius: 12,
                            borderWidth: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            minHeight: 100,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        {/* View 3 */}
                        <View>
                          <Text
                            accessible={true}
                            allowFontScaling={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'],
                                {
                                  fontFamily: 'Inter_500Medium',
                                  fontSize: 14,
                                  margin: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {listData?.Task}
                          </Text>

                          <View
                            style={StyleSheet.applyWidth(
                              { marginLeft: 20 },
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
                                    fontFamily: 'Inter_400Regular',
                                    fontSize: 16,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.Deadline}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
              />
            );
          }}
        </XanoApi.FetchGetTasksGET>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(UpcomingScreen);
