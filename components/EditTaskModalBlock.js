import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GeocodioApi from '../apis/GeocodioApi.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getLocationUtil from '../utils/getLocation';
import { MapMarker, MapView } from '@draftbit/maps';
import {
  Button,
  DatePicker,
  IconButton,
  Picker,
  TabView,
  TabViewItem,
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

const EditTaskModalBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [date, setDate] = React.useState(new Date());
  const [pickerValue, setPickerValue] = React.useState(undefined);
  const [textInputValue, setTextInputValue] = React.useState('');
  const xanoEditTasksRecordPOST = XanoApi.useEditTasksRecordPOST();
  const mapView6xV3lMcORef = React.useRef();

  return (
    <Modal
      animationType={'fade'}
      presentationStyle={'formSheet'}
      transparent={true}
    >
      <View
        style={StyleSheet.applyWidth({ flex: 2, opacity: 0 }, dimensions.width)}
      />
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'flex-end',
            alignSelf: 'auto',
            backgroundColor: theme.colors['Background'],
            borderColor: theme.colors['Medium'],
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 2,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          dimensions.width
        )}
      >
        <Text
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              fontFamily: 'Inter_500Medium',
              fontSize: 20,
              marginLeft: '5%',
              marginTop: '5%',
            }),
            dimensions.width
          )}
        >
          {'EDIT YOUR TASK'}
        </Text>
        <IconButton
          icon={'AntDesign/closecircle'}
          size={32}
          style={StyleSheet.applyWidth(
            { marginRight: '5%', marginTop: '5%' },
            dimensions.width
          )}
        />
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: theme.colors['Background'],
            flex: 8,
            overflow: 'hidden',
          },
          dimensions.width
        )}
      >
        <TabView
          activeColor={theme.colors.primary}
          indicatorColor={theme.colors.primary}
          initialTabIndex={0}
          keyboardDismissMode={'auto'}
          onIndexChanged={newIndex => {
            const handler = async () => {
              try {
                const location = await getLocationUtil();
                setGlobalVariableValue({
                  key: 'latitude',
                  value: location?.latitude,
                });
                setGlobalVariableValue({
                  key: 'longitude',
                  value: location?.longitude,
                });

                mapView6xV3lMcORef.current.animateToLocation({
                  latitude: Constants['latitude'],
                  longitude: Constants['longitude'],
                  zoom: 15,
                });
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          pressColor={theme.colors.primary}
          swipeEnabled={true}
          tabBarPosition={'top'}
          tabsBackgroundColor={theme.colors.background}
        >
          <TabViewItem
            icon={'AntDesign/edit'}
            style={StyleSheet.applyWidth(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'],
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Background'],
                  marginLeft: '5%',
                  marginRight: '5%',
                },
                dimensions.width
              )}
            >
              {/* Task Name edit */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    marginBottom: '5%',
                    marginTop: '5%',
                    paddingBottom: '1%',
                    paddingTop: '2%',
                  },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontFamily: 'Inter_500Medium',
                      marginBottom: '2%',
                    }),
                    dimensions.width
                  )}
                >
                  {'Rename your task:'}
                </Text>
                <TextInput
                  autoCapitalize={'none'}
                  changeTextDelay={500}
                  clearTextOnFocus={true}
                  onChangeText={newTextInputValue => {
                    const textInputValue = newTextInputValue;
                    try {
                      setTextInputValue(textInputValue);
                      setGlobalVariableValue({
                        key: 'setTask',
                        value: newTextInputValue,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  placeholder={'Enter your task'}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Text Input'],
                      { color: theme.colors['Medium'] }
                    ),
                    dimensions.width
                  )}
                  value={textInputValue}
                />
              </View>
              {/* Deadline picker */}
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: '5%', paddingBottom: '1%', paddingTop: '2%' },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontFamily: 'Inter_500Medium',
                    }),
                    dimensions.width
                  )}
                >
                  {'Choose your deadline:'}
                </Text>
                <DatePicker
                  autoDismissKeyboard={true}
                  date={date}
                  label={'Deadline'}
                  leftIconMode={'inset'}
                  mode={'date'}
                  onDateChange={newDatePickerValue => {
                    const date = newDatePickerValue;
                    try {
                      setDate(date);
                      setGlobalVariableValue({
                        key: 'setDate',
                        value: newDatePickerValue,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  type={'solid'}
                />
              </View>
              {/* Status picker */}
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: '5%', paddingBottom: '1%', paddingTop: '2%' },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontFamily: 'Inter_500Medium',
                    }),
                    dimensions.width
                  )}
                >
                  {'Choose status:'}
                </Text>
                <Picker
                  autoDismissKeyboard={true}
                  iconSize={24}
                  leftIconMode={'inset'}
                  onValueChange={newPickerValue => {
                    const pickerValue = newPickerValue;
                    try {
                      setPickerValue(pickerValue);
                      setGlobalVariableValue({
                        key: 'setStatus',
                        value: newPickerValue,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  options={Constants['statusPicker']}
                  placeholder={'Select an option'}
                  type={'solid'}
                  value={pickerValue}
                />
              </View>
              {/* Priority picker */}
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: '5%' },
                  dimensions.width
                )}
              >
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontFamily: 'Inter_500Medium',
                    }),
                    dimensions.width
                  )}
                >
                  {'Choose priority:\n'}
                </Text>
                <Picker
                  autoDismissKeyboard={true}
                  iconSize={24}
                  leftIconMode={'inset'}
                  onValueChange={newPickerValue => {
                    const pickerValue = newPickerValue;
                    try {
                      setPickerValue(pickerValue);
                      setGlobalVariableValue({
                        key: 'setPriority',
                        value: newPickerValue,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  options={Constants['priorityPicker']}
                  placeholder={'Select an option'}
                  type={'solid'}
                  value={pickerValue}
                />
              </View>
            </View>
            <Button
              onPress={() => {
                const handler = async () => {
                  try {
                    const response = (
                      await xanoEditTasksRecordPOST.mutateAsync({
                        date: Constants['setDate'],
                        id: Constants['setId'],
                        priority: Constants['setPriority'],
                        status: Constants['setStatus'],
                        task: Constants['setTask'],
                        tasks_id: Constants['setId'],
                      })
                    )?.json;
                    console.log(response);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                  marginLeft: '70%',
                  width: '25%',
                }),
                dimensions.width
              )}
              title={'Save'}
            />
          </TabViewItem>
          {/* Tab View Item 2 */}
          <TabViewItem
            icon={'MaterialCommunityIcons/map-marker-radius'}
            style={StyleSheet.applyWidth(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'],
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  flex: 1,
                  marginLeft: '5%',
                  marginRight: '5%',
                  marginTop: '5%',
                },
                dimensions.width
              )}
            >
              <MapView
                apiKey={'AIzaSyBzktToWosjNgrrUawZnbslB9NSXSXCkwo'}
                autoClusterMarkersDistanceMeters={10000}
                customMapStyle={'Beautiful West Coast Villa'}
                latitude={37.40241}
                loadingEnabled={true}
                longitude={-122.12125}
                ref={mapView6xV3lMcORef}
                rotateEnabled={true}
                scrollEnabled={true}
                showsPointsOfInterest={true}
                style={StyleSheet.applyWidth(
                  GlobalStyles.MapViewStyles(theme)['Map View'],
                  dimensions.width
                )}
                zoom={8}
                zoomEnabled={true}
              >
                <MapMarker pinImageSize={50} />
              </MapView>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Background'],
                  flex: 1,
                  marginLeft: '5%',
                  marginRight: '5%',
                  marginTop: '10%',
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    marginBottom: '5%',
                    marginLeft: '5%',
                    marginRight: '5%',
                  }),
                  dimensions.width
                )}
              >
                {"Add your task's location:"}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  const textInputValue = newTextInputValue;
                  try {
                    setTextInputValue(textInputValue);
                    undefined;
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onSubmitEditing={() => {
                  const handler = async () => {
                    const textInputValue = undefined;
                    try {
                      const result = (
                        await GeocodioApi.getLatLongGET(Constants, {
                          address: Constants['address'],
                          api_key: Constants['geocodio_api_key'],
                        })
                      )?.json;
                      /* 'Update Map Location' action requires configuration: select Longitude and Latitude */
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                placeholder={'Enter a value...'}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextInputStyles(theme)['Text Input'],
                  dimensions.width
                )}
                value={textInputValue}
              />
              <Button
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'],
                    { borderLeftWidth: '75%', width: '25%' }
                  ),
                  dimensions.width
                )}
                title={'Add\n'}
              />
            </View>
          </TabViewItem>
        </TabView>
      </View>
    </Modal>
  );
};

export default withTheme(EditTaskModalBlock);
