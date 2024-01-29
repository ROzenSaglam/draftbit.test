import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  SwipeableItem,
  SwipeableItemButton,
  SwipeableList,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const TodoDetailListBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const xanoQueryAllTasksPOST = XanoApi.useQueryAllTasksPOST();

  return (
    <ScrollView
      bounces={true}
      contentContainerStyle={StyleSheet.applyWidth(
        {
          marginTop: 10,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
        },
        dimensions.width
      )}
      showsVerticalScrollIndicator={true}
    >
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
            marginTop: 15,
            paddingLeft: 20,
            paddingRight: 20,
          },
          dimensions.width
        )}
      >
        <Icon
          name={'EvilIcons/search'}
          size={24}
          style={StyleSheet.applyWidth({ opacity: 0.5 }, dimensions.width)}
        />
        <TextInput
          autoCapitalize={'none'}
          onSubmitEditing={() => {
            const handler = async () => {
              try {
                const response = (await xanoQueryAllTasksPOST.mutateAsync({}))
                  ?.json;
                console.log(response);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          placeholder={'Search'}
          placeholderTextColor={theme.colors['Light']}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Divider'],
              borderRadius: 8,
              fontFamily: 'Inter_400Regular',
              fontSize: 15,
              paddingBottom: 8,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              width: '80%',
            },
            dimensions.width
          )}
        />
      </View>
      {/* Categories 2 */}
      <XanoApi.FetchGetTasksGET>
        {({ loading, error, data, refetchGetTasks }) => {
          const categories2Data = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <SwipeableList
              data={categories2Data}
              disableScrollWhenSwiping={true}
              estimatedItemSize={50}
              keyExtractor={swipeableListData => swipeableListData}
              listComponent={'FlatList'}
              listKey={'A0bOCYmC'}
              numColumns={1}
              onEndReachedThreshold={0.5}
              renderItem={({ item }) => {
                const swipeableListData = item;
                return (
                  <SwipeableItem
                    closeOnPress={true}
                    friction={20}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.SwipeableItemStyles(theme)['Swipeable Item'],
                      dimensions.width
                    )}
                    swipeActivationPercentage={80}
                    swipeToClosePercent={50}
                    swipeToOpenPercent={50}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Custom Color'],
                          borderRadius: 12,
                          flexDirection: 'row',
                          height: 104,
                          paddingLeft: 12,
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          { marginLeft: 15 },
                          dimensions.width
                        )}
                      >
                        {/* Name */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Background'],
                              fontFamily: 'Inter_500Medium',
                              fontSize: 16,
                              marginTop: '5%',
                            },
                            dimensions.width
                          )}
                        >
                          {'! '}
                          {swipeableListData?.Task}
                        </Text>
                        {/* Deadline */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Background'],
                              fontFamily: 'Inter_500Medium',
                              fontSize: 16,
                              marginTop: 5,
                              opacity: 0.7,
                            },
                            dimensions.width
                          )}
                        >
                          {'Deadline : '}
                          {swipeableListData?.Deadline}
                        </Text>
                        {/* Status */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Background'],
                              fontFamily: 'Inter_500Medium',
                              fontSize: 16,
                              marginBottom: '5%',
                              marginTop: '5%',
                              opacity: 0.7,
                            },
                            dimensions.width
                          )}
                        >
                          {'Status: '}
                          {swipeableListData?.Status}
                        </Text>
                        {/* Priority */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Background'],
                              fontFamily: 'Inter_500Medium',
                              fontSize: 16,
                              opacity: 0.7,
                            },
                            dimensions.width
                          )}
                        >
                          {swipeableListData?.Priority}
                          {' Priority'}
                        </Text>
                      </View>
                    </View>
                    <SwipeableItemButton
                      backgroundColor={theme.colors['Light']}
                      closeOnPress={true}
                      icon={'AntDesign/checkcircleo'}
                      revealSwipeDirection={'right'}
                      title={'Completed'}
                    />
                    {/* Swipeable Item Button 2 */}
                    <SwipeableItemButton
                      backgroundColor={theme.colors['Custom Color_8']}
                      closeOnPress={true}
                      icon={'MaterialCommunityIcons/delete-sweep-outline'}
                      revealSwipeDirection={'left'}
                      title={'Delete'}
                    />
                  </SwipeableItem>
                );
              }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
            />
          );
        }}
      </XanoApi.FetchGetTasksGET>
      <Button
        onPress={() => {
          try {
            navigation.navigate('ChartsNavigator');
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          GlobalStyles.ButtonStyles(theme)['Button'],
          dimensions.width
        )}
        title={'Get Started'}
      />
    </ScrollView>
  );
};

export default withTheme(TodoDetailListBlock);
