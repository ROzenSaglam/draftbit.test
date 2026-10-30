import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(Image, { className: 'style' });
cssInterop(ImageBackground, {
  className: 'style',
  imageClassName: 'imageStyle',
});
cssInterop(LinearGradient, { className: 'style' });
cssInterop(SafeAreaView, { className: 'style' });
cssInterop(GestureHandlerRootView, { className: 'style' });
