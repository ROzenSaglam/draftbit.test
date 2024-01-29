import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import * as VictoryPieChart from '../custom-files/VictoryPieChart';
import categoryIdByName from '../global-functions/categoryIdByName';
import categoryPercentage from '../global-functions/categoryPercentage';
import countStatus from '../global-functions/countStatus';
import filterByCategoryId from '../global-functions/filterByCategoryId';
import filterUserData from '../global-functions/filterUserData';
import storeNames from '../global-functions/storeNames';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Divider,
  Icon,
  Picker,
  ScreenContainer,
  Spacer,
  Surface,
  Table,
  TableCell,
  TableRow,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const ChartsOptionsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [categoryId, setCategoryId] = React.useState(0);
  const [pickerValue3, setPickerValue3] = React.useState('');
  const [showImage, setShowImage] = React.useState(false);
  const isInclude = (pickerValue, categoryOptions) => {
    if (categoryOptions.includes(pickerValue)) {
      return true;
    }
  };

  const tasksByStatus = (tasks, status) => {
    if (!Array.isArray(tasks)) {
      console.warn('Warning: tasks is not filterable! Detected type:');
      console.log(typeof tasks);
      return [];
    }
    return tasks.filter(task => {
      const matchesStatus = !status || task.Status === status;
      console.log(status);
      console.log('Matches Status:', matchesStatus);
      return matchesStatus;
    });
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const response = (await XanoApi.getAllCategoriesGET(Constants))?.json;
        const result = storeNames(
          filterUserData(response, Constants['userID'])
        );
        const categoriesOfUser = setGlobalVariableValue({
          key: 'category_options',
          value: result,
        });
        if (!pickerValue3) {
          setShowImage(!showImage);
        } else {
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={true}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <View
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'flex-start',
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 20,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
                marginLeft: 20,
                marginRight: 20,
              }),
              dimensions.width
            )}
          >
            {'Select a category:'}
          </Text>
        </View>
        <Spacer bottom={8} left={8} right={8} top={8} />
        <View
          style={StyleSheet.applyWidth({ minHeight: 40 }, dimensions.width)}
        >
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
              const handler = async () => {
                try {
                  const valueRpmEFQUi = newPickerValue;
                  setPickerValue3(valueRpmEFQUi);
                  const picker = valueRpmEFQUi;
                  const response = (
                    await XanoApi.getAllCategoriesGET(Constants)
                  )?.json;

                  const valueK0VtkcXo = categoryIdByName(response, picker);
                  setCategoryId(valueK0VtkcXo);
                  const catID = valueK0VtkcXo;
                  const allTasks = (await XanoApi.getTasksGET(Constants))?.json;
                  const tasksById = setGlobalVariableValue({
                    key: 'filteredUserData',
                    value: filterByCategoryId(
                      filterUserData(allTasks, Constants['userID']),
                      catID
                    ),
                  });
                  console.log(tasksById);
                  const response2 = setGlobalVariableValue({
                    key: 'statusPercentage',
                    value: categoryPercentage(tasksById),
                  });
                  console.log(response2);
                  setGlobalVariableValue({
                    key: 'statusCount',
                    value: countStatus(tasksById),
                  });
                  if (!picker) {
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
            options={Constants['category_options']}
            placeholder={'Select an option'}
            rightIconName={'AntDesign/downcircleo'}
            selectedIconColor={theme.colors.strong}
            selectedIconName={'Feather/check'}
            selectedIconSize={20}
            style={StyleSheet.applyWidth(
              { marginLeft: 40, marginRight: 40 },
              dimensions.width
            )}
            type={'solid'}
            value={pickerValue3}
          />
        </View>
        {/* Spacer 2 */}
        <Spacer bottom={8} left={8} right={8} top={8} />
        <Divider
          color={theme.colors.divider}
          style={StyleSheet.applyWidth(
            GlobalStyles.DividerStyles(theme)['Divider'],
            dimensions.width
          )}
        />
        {/* Spacer 3 */}
        <Spacer bottom={8} left={8} right={8} top={8} />
        {/* View 3 */}
        <>
          {!!showImage ? null : (
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', alignSelf: 'center' },
                dimensions.width
              )}
            >
              <>
                {!isInclude(
                  pickerValue3,
                  Constants['category_options']
                ) ? null : (
                  <Utils.CustomCodeErrorBoundary>
                    <VictoryPieChart.Home />
                  </Utils.CustomCodeErrorBoundary>
                )}
              </>
            </View>
          )}
        </>
        {/* View 4 */}
        <>
          {!!showImage ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  minHeight: 150,
                  paddingLeft: 30,
                  paddingRight: 30,
                },
                dimensions.width
              )}
            >
              <Table
                borderColor={theme.colors.divider}
                borderStyle={'solid'}
                borderWidth={1}
                cellHorizontalPadding={10}
                cellVerticalPadding={10}
                drawTopBorder={true}
                showsVerticalScrollIndicator={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TableStyles(theme)['Table'], {
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                  }),
                  dimensions.width
                )}
              >
                {/* Table Row 2 */}
                <TableRow
                  drawBottomBorder={true}
                  drawStartBorder={true}
                ></TableRow>

                <TableRow drawBottomBorder={true} drawStartBorder={true}>
                  <TableCell
                    drawEndBorder={true}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TableCellStyles(theme)['Table Cell'],
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
                            color: 'rgb(43, 26, 177)',
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 12,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'To do'}
                    </Text>
                  </TableCell>
                  {/* Table Cell 3 */}
                  <TableCell
                    drawEndBorder={true}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TableCellStyles(theme)['Table Cell'],
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
                            color: 'rgb(43, 26, 177)',
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 12,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'In progress'}
                    </Text>
                  </TableCell>
                  {/* Table Cell 2 */}
                  <TableCell
                    drawEndBorder={true}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TableCellStyles(theme)['Table Cell'],
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
                            color: 'rgb(43, 26, 177)',
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 12,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Completed'}
                    </Text>
                  </TableCell>
                </TableRow>
                {/* Table Row 3 */}
                <TableRow drawBottomBorder={true} drawStartBorder={true}>
                  <TableCell
                    drawEndBorder={true}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TableCellStyles(theme)['Table Cell'],
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { fontFamily: 'Inter_500Medium', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {Constants['statusCount'] &&
                        Constants['statusCount']['To do']}
                    </Text>
                  </TableCell>
                  {/* Table Cell 3 */}
                  <TableCell
                    drawEndBorder={true}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TableCellStyles(theme)['Table Cell'],
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { fontFamily: 'Inter_500Medium', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {Constants['statusCount'] &&
                        Constants['statusCount']['In progress']}
                    </Text>
                  </TableCell>
                  {/* Table Cell 2 */}
                  <TableCell
                    drawEndBorder={true}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TableCellStyles(theme)['Table Cell'],
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { fontFamily: 'Inter_500Medium', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {Constants['statusCount'] &&
                        Constants['statusCount']['Completed']}
                    </Text>
                  </TableCell>
                </TableRow>
              </Table>
            </View>
          )}
        </>
        {/* Spacer 4 */}
        <Spacer bottom={8} left={8} right={8} top={8} />
        {/* View 5 */}
        <>
          {!showImage ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'auto',
                  flex: 1,
                  minHeight: 100,
                  paddingLeft: 30,
                  paddingRight: 30,
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                source={Images.Question1}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    height: 200,
                    width: 200,
                  }),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: 'Inter_500Medium',
                    fontSize: 20,
                    textAlign: 'center',
                  }),
                  dimensions.width
                )}
              >
                {"You haven't selected \nan option yet"}
              </Text>
            </View>
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(ChartsOptionsScreen);
