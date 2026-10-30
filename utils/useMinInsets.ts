import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MIN_TOP = 16;
const MIN_BOTTOM = 8;

export function useMinInsets() {
  const insets = useSafeAreaInsets();
  return {
    top: Math.max(insets.top, MIN_TOP),
    bottom: Math.max(insets.bottom, MIN_BOTTOM),
    left: insets.left,
    right: insets.right,
  };
}
