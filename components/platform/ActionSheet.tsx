import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList as RNFlatList,
  Modal,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

export { RNFlatList as FlatList };

export type ActionSheetRef = {
  show: () => void;
  hide: () => void;
  snapToIndex: (index: number) => void;
  currentSnapIndex: () => number;
};

export type ActionSheetProps = React.PropsWithChildren<{
  CustomHeaderComponent?: React.ReactNode;
  animated?: boolean;
  backgroundInteractionEnabled?: boolean;
  closable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  drawUnderStatusBar?: boolean;
  enableGesturesInScrollView?: boolean;
  gestureEnabled?: boolean;
  initialSnapIndex?: number;
  isModal?: boolean;
  onClose?: () => void;
  overdrawEnabled?: boolean;
  snapPoints?: number[];
  statusBarTranslucent?: boolean;
}>;

const screenHeight = Dimensions.get('window').height;

const absoluteFillObject = {
  position: 'absolute' as const,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const resolveHeight = (snapPoints?: number[], snapIndex?: number) => {
  if (!snapPoints?.length) {
    return undefined;
  }

  const index = Math.max(0, Math.min(snapIndex ?? 0, snapPoints.length - 1));
  return (screenHeight * snapPoints[index]) / 100;
};

const ActionSheet = forwardRef<ActionSheetRef, ActionSheetProps>(
  (
    {
      CustomHeaderComponent,
      backgroundInteractionEnabled = false,
      children,
      closable = true,
      containerStyle,
      initialSnapIndex = 0,
      isModal = true,
      onClose,
      snapPoints,
      statusBarTranslucent = true,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [snapIndex, setSnapIndex] = useState(initialSnapIndex);

    useEffect(() => {
      setSnapIndex(initialSnapIndex);
    }, [initialSnapIndex]);

    const hide = useCallback(() => {
      setVisible(false);
      onClose?.();
    }, [onClose]);

    useImperativeHandle(
      ref,
      () => ({
        show: () => {
          setSnapIndex(initialSnapIndex);
          setVisible(true);
        },
        hide,
        snapToIndex: (index: number) => {
          setVisible(true);
          setSnapIndex(index);
        },
        currentSnapIndex: () => snapIndex,
      }),
      [hide, initialSnapIndex, snapIndex]
    );

    const sheetHeight = useMemo(() => resolveHeight(snapPoints, snapIndex), [snapIndex, snapPoints]);
    const useModal = isModal && !backgroundInteractionEnabled;

    if (!visible) {
      return null;
    }

    const sheet = (
      <View pointerEvents="box-none" style={[absoluteFillObject, { justifyContent: 'flex-end' }]}>
        {!backgroundInteractionEnabled ? (
          <Pressable
            accessibilityRole="button"
            onPress={closable ? hide : undefined}
            style={[absoluteFillObject, { backgroundColor: 'rgba(0, 0, 0, 0.24)' }]}
          />
        ) : null}
        <View
          style={[
            {
              minHeight: sheetHeight,
              maxHeight: sheetHeight ?? screenHeight * 0.9,
              width: '100%',
              overflow: 'hidden',
            },
            containerStyle,
          ]}>
          {CustomHeaderComponent}
          {children}
        </View>
      </View>
    );

    if (useModal) {
      return (
        <Modal animationType="fade" transparent visible statusBarTranslucent={statusBarTranslucent}>
          {sheet}
        </Modal>
      );
    }

    return sheet;
  }
);

ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
