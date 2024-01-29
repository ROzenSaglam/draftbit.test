import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { minHeight: 40 } });

export const SwiperStyles = theme =>
  StyleSheet.create({ Swiper: { height: 300, width: '100%' } });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { flex: 1 } });

export const ImageStyles = theme =>
  StyleSheet.create({ Image: { height: 100, width: 100 } });

export const TextStyles = theme =>
  StyleSheet.create({ Text: { color: theme.colors.strong } });

export const CheckboxRowStyles = theme =>
  StyleSheet.create({ 'Checkbox Row': { minHeight: 50 } });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Area': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
    'Text Input': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
  });

export const TabViewItemStyles = theme =>
  StyleSheet.create({ 'Tab View Item': { flex: 1 } });

export const MapViewStyles = theme =>
  StyleSheet.create({ 'Map View': { flex: 1, height: '100%', width: '100%' } });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
  });

export const ViewStyles = theme =>
  StyleSheet.create({
    Shadow: {
      backgroundColor: 'rgb(102, 102, 169)',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      height: 10,
      marginLeft: 10,
      marginRight: 10,
      opacity: 0.86,
    },
    'Shadow 2': {
      backgroundColor: 'rgb(102, 102, 169)',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      height: 10,
      marginLeft: 10,
      marginRight: 10,
      opacity: 0.86,
    },
    'Shadow 3': {
      backgroundColor: 'rgb(102, 102, 169)',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      height: 10,
      marginLeft: 10,
      marginRight: 10,
      opacity: 0.86,
    },
    'Shadow view': {
      backgroundColor: 'rgb(67, 73, 164)',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      height: 10,
      marginLeft: 10,
      marginRight: 10,
      opacity: 0.86,
    },
    'single task view': {
      alignItems: 'flex-start',
      backgroundColor: theme.colors['Studily_Washed_Lavender_White'],
      borderRadius: 12,
      flexDirection: 'column',
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      opacity: 1,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    'todo categories': {
      alignContent: 'space-between',
      alignSelf: 'stretch',
      flex: 1,
      justifyContent: 'space-between',
      width: '100%',
    },
  });

export const SwipeableItemStyles = theme =>
  StyleSheet.create({ 'Swipeable Item': { overflow: 'hidden' } });

export const ScrollViewStyles = theme =>
  StyleSheet.create({
    'todo-detail list': {
      marginTop: 10,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
    },
  });

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { height: 1 } });

export const ActionSheetItemStyles = theme =>
  StyleSheet.create({ 'Action Sheet Item': { textAlign: 'center' } });

export const TableStyles = theme => StyleSheet.create({ Table: { flex: 1 } });

export const TableCellStyles = theme =>
  StyleSheet.create({ 'Table Cell': { flex: 1, flexDirection: 'row' } });

export const CircleStyles = theme =>
  StyleSheet.create({
    Circle: { alignItems: 'center', justifyContent: 'center' },
  });

export const LinearGradientStyles = theme =>
  StyleSheet.create({ 'Linear Gradient': { flex: 1 } });

export const SurfaceStyles = theme =>
  StyleSheet.create({ Surface: { minHeight: 40 } });

export const AccordionGroupStyles = theme =>
  StyleSheet.create({
    Accordion: {
      fontSize: 16,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
  });
